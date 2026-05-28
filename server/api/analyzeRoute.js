import express from 'express';
import { analyzeManipulation } from '../analyzer/patternEngine.js';
import { validateAnalysisRequest } from './middleware/validation.js';
import { analysisRateLimit } from './middleware/rateLimiter.js';

const router = express.Router();

/**
 * Real-time Content Analysis Route
 * Optimized with Async processing pipeline
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

        // Optimization: Async execution context
        const analysis = await new Promise((resolve) => {
            setImmediate(() => {
                resolve(analyzeManipulation(processedText));
            });
        });

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

        res.json({
            status: "success",
            ...analysis,
            meta: {
                processedAt: new Date().toISOString(),
                version: '3.0.0-optimized'
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
