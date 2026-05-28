import express from 'express';
import { analyzeManipulation } from '../analyzer/patternEngine.js';
import { validateAnalysisRequest } from './middleware/validation.js';
import { analysisRateLimit } from './middleware/rateLimiter.js';
import { checkTextAgainstThreatDB } from '../utils/threatIntelService.js';

const router = express.Router();

/**
 * Real-time Content Analysis Route
 * Enhanced with CyberEDT Threat Intelligence (scam_patterns + scam_messages)
 */
router.post('/', analysisRateLimit, validateAnalysisRequest, async (req, res) => {
    try {
        // Phase 2: Advanced De-obfuscation & Semantic Preparation
        let processedText = req.sanitizedText;

        // 1. Remove zero-width characters and unusual spacing
        processedText = processedText.replace(/[\u200B-\u200D\uFEFF]/g, '');
        // 2. Remove typical punctuation obfuscation inside words (e.g., U.R.G.E.N.T -> URGENT)
        processedText = processedText.replace(/([a-zA-Z])([._-])([a-zA-Z])/g, '$1$3');
        // 3. Normalize leetspeak (basic semantic alignment)
        processedText = processedText.replace(/0/g, 'o').replace(/1/g, 'i').replace(/3/g, 'e').replace(/@/g, 'a').replace(/\$/g, 's');

        // Run pattern engine + CyberEDT DB check in parallel
        const [analysis, dbResult] = await Promise.all([
            new Promise((resolve) => {
                setImmediate(() => resolve(analyzeManipulation(processedText)));
            }),
            checkTextAgainstThreatDB(processedText)
        ]);

        // Add semantic meta-analysis flag if obfuscation was heavily detected
        const wasObfuscated = processedText.length !== req.sanitizedText.length || processedText !== req.sanitizedText;
        if (wasObfuscated && analysis.detections) {
            analysis.detections.push({
                displayLabel: 'Text Obfuscation Detected',
                confidencePercent: 95,
                _isAdvanced: true,
                description: 'The payload contained intentional zero-width characters, leetspeak, or punctuation masking designed to bypass security filters.',
                evidence: [{ context: 'Original length vs Normalized length mismatch or structural alteration.' }]
            });
            analysis.riskAnalysis = analysis.riskAnalysis || { score: 0 };
            analysis.riskAnalysis.score = Math.min(100, analysis.riskAnalysis.score + 15);
        }

        // ── Merge CyberEDT DB findings ────────────────────────────────────────
        const dbDetections = [];

        if (dbResult.hasThreats && dbResult.detections?.length > 0) {
            // Deduplicate by pattern to avoid showing the same DB detection twice
            const seen = new Set();
            const uniqueDetections = dbResult.detections.filter(d => {
                const key = `${d.category}:${d.pattern}`;
                if (seen.has(key)) return false;
                seen.add(key);
                return true;
            });
            dbDetections.push(...uniqueDetections.map(d => ({
                displayLabel: d.displayLabel,
                confidencePercent: d.confidencePercent,
                _isAdvanced: true,
                _source: 'CyberEDT DB',
                description: d.description,
                evidence: [{ context: `Pattern: "${d.pattern}" | Category: ${d.category} | Risk Weight: ${d.risk_score}` }]
            })));

            // Boost risk score based on matched DB patterns
            if (analysis.riskAnalysis && dbResult.patternRiskAccumulated > 0) {
                const boost = Math.round(dbResult.patternRiskAccumulated * 0.6); // scale contribution
                analysis.riskAnalysis.score = Math.min(100, analysis.riskAnalysis.score + boost);
            }
        }

        // Spam signal from scam_messages corpus
        if (dbResult.spamSignal && dbResult.spamSignal.verdict === 'spam' && dbResult.spamSignal.spamRatio > 55) {
            dbDetections.push({
                displayLabel: 'Corpus Match: Spam Classification',
                confidencePercent: dbResult.spamSignal.spamRatio,
                _isAdvanced: false,
                _source: 'CyberEDT DB',
                description: `Pattern analysis against 52,287 labelled messages in the CyberEDT corpus classified this content as spam with ${dbResult.spamSignal.spamRatio}% confidence (${dbResult.spamSignal.spamCount} spam matches vs ${dbResult.spamSignal.hamCount} ham matches).`,
                evidence: [{ context: `Spam ratio: ${dbResult.spamSignal.spamRatio}% from corpus analysis` }]
            });
        }

        // Inject DB detections at the front
        if (dbDetections.length > 0) {
            analysis.detections = [...dbDetections, ...(analysis.detections || [])];
        }

        // DB intelligence summary tag
        const dbSummary = dbResult.hasThreats
            ? `CyberEDT DB matched ${dbResult.matchedPatterns.length} threat pattern(s) in this content.`
            : null;

        res.json({
            status: "success",
            ...analysis,
            threatIntel: {
                source: 'CyberEDT Central Threat DB',
                patternsMatched: dbResult.matchedPatterns.length,
                spamSignal: dbResult.spamSignal,
                dbSummary,
                dbError: dbResult.dbError || false,
            },
            meta: {
                processedAt: new Date().toISOString(),
                version: '3.1.0-neon'
            }
        });
    } catch (error) {
        console.error('API_ROUTE_ERROR:', error);
        res.status(500).json({
            status: "error",
            code: "INTERNAL_FAILURE",
            message: "An internal processing failure occurred."
        });
    }
});

export default router;
