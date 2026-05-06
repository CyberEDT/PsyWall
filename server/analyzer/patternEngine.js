import { MANIPULATION_PATTERNS, GLOBAL_BENIGN_SIGNALS, ADVANCED_PATTERN_KEYS } from '../utils/patternLibrary.js';
import { classifyBias } from './biasClassifier.js';
import { calculateRiskScore } from './scoringSystem.js';

/**
 * Manipulation Pattern Analyzer Engine v3.0
 * Context-aware: uses neutralizers, amplifiers, and global benign signals
 * to differentiate scenarios on the same topic.
 * Supports advanced psychological manipulation patterns with heightened scoring.
 */
export const analyzeManipulation = (text) => {
    const cleanText = text.replace(/\s+/g, ' ').trim();
    const wordCount = cleanText.split(/\s+/).length;

    // ── Step 1: Global benign context check ──────────────────────────────────
    const globalBenignMatches = [...cleanText.matchAll(GLOBAL_BENIGN_SIGNALS)];
    GLOBAL_BENIGN_SIGNALS.lastIndex = 0;
    const globalBenignFactor = Math.min(globalBenignMatches.length * 0.15, 0.6);
    const isLikelyBenignContext = globalBenignMatches.length >= 2;

    // ── Step 2: Per-pattern detection ────────────────────────────────────────
    const detections = [];

    for (const [key, pattern] of Object.entries(MANIPULATION_PATTERNS)) {
        const isAdvanced = ADVANCED_PATTERN_KEYS.has(key);

        // Clone regexes to avoid state issues with the global flag
        const primaryRegex = new RegExp(pattern.regex.source, pattern.regex.flags);
        const neutralizerRegex = pattern.neutralizer
            ? new RegExp(pattern.neutralizer.source, pattern.neutralizer.flags)
            : null;
        const amplifierRegex = pattern.amplifiers
            ? new RegExp(pattern.amplifiers.source, pattern.amplifiers.flags)
            : null;

        const primaryMatches = [...cleanText.matchAll(primaryRegex)];
        if (primaryMatches.length === 0) continue;

        // Count neutralizing signals
        const neutralizerMatches = neutralizerRegex
            ? [...cleanText.matchAll(neutralizerRegex)]
            : [];

        // Count amplifying signals
        const amplifierMatches = amplifierRegex
            ? [...cleanText.matchAll(amplifierRegex)]
            : [];

        // ── Contextual score calculation ──────────────────────────────────────
        // log-normalized match count — denominator log1p(3) means 1 hit yields ~55% of weight
        const matchWeight = Math.log1p(primaryMatches.length) / Math.log1p(3);
        let baseScore = pattern.weight * Math.min(matchWeight, 1.0);

        // Advanced patterns get a base multiplier — one credible hit is significant
        if (isAdvanced) {
            baseScore = Math.min(baseScore * 1.20, pattern.weight);
        }

        const neutralizerPenalty = Math.min(neutralizerMatches.length * 0.18, 0.45);
        // Advanced patterns are less discounted by neutralizers (harder to fake as education)
        const effectiveNeutralizerPenalty = isAdvanced
            ? neutralizerPenalty * 0.5
            : neutralizerPenalty;

        const amplifierBonus = Math.min(amplifierMatches.length * 0.14, 0.40);
        const benignDiscount = isAdvanced
            ? globalBenignFactor * 0.20   // advanced: reduced benign discount
            : globalBenignFactor * 0.45;  // core: moderate benign discount

        const signalDensity = Math.min((primaryMatches.length / Math.max(wordCount, 1)) * 100, 20);
        // Density bonus fires at >1 signal/100 words (was >3) — catches short but dense texts
        const densityBonus = signalDensity > 1 ? Math.min(signalDensity * 0.015, 0.12) : 0;

        let contextualScore = baseScore + amplifierBonus + densityBonus - effectiveNeutralizerPenalty - benignDiscount;

        // Non-benign minimum floor: if the primary regex fires in a non-educational context,
        // the confidence can never fall below a meaningful floor (prevents over-suppression)
        if (!isLikelyBenignContext && primaryMatches.length >= 1) {
            const floor = isAdvanced ? 0.32 : 0.28;
            contextualScore = Math.max(contextualScore, floor);
        }

        contextualScore = Math.max(0.0, Math.min(contextualScore, 0.99));

        // Build evidence with context windows
        const evidence = primaryMatches.map(match => ({
            text: match[0],
            context: `...${cleanText.substring(
                Math.max(0, match.index - 60),
                Math.min(cleanText.length, match.index + match[0].length + 60)
            )}...`
        }));

        detections.push({
            type: key,
            label: pattern.label,
            count: primaryMatches.length,
            confidence: contextualScore,
            description: pattern.description,
            evidence,
            _isAdvanced: isAdvanced,
            _meta: {
                neutralizerHits: neutralizerMatches.length,
                amplifierHits: amplifierMatches.length,
                globalBenignHits: globalBenignMatches.length,
                baseScore: Number(baseScore.toFixed(3)),
                adjustedScore: Number(contextualScore.toFixed(3)),
                neutralizerPenalty: Number(effectiveNeutralizerPenalty.toFixed(3)),
                amplifierBonus: Number(amplifierBonus.toFixed(3)),
                benignDiscount: Number(benignDiscount.toFixed(3))
            }
        });
    }

    // ── Step 3: Downstream classification and scoring ────────────────────────
    const classifications = classifyBias(detections, cleanText, isLikelyBenignContext);
    const riskAnalysis = calculateRiskScore(detections, classifications, cleanText, globalBenignFactor);

    // ── Step 4: Alert payload ────────────────────────────────────────────────
    const highConfidenceTactics = detections
        .map(d => {
            const c = classifications.find(cl => cl.tactic === d.type);
            return {
                ...d,
                confidencePercent: Math.round((c?.confidence ?? d.confidence) * 100),
                isLowCertainty: c?.isLowCertainty ?? true
            };
        })
        .filter(d => !d.isLowCertainty)
        .sort((a, b) => b.confidencePercent - a.confidencePercent);

    // Compute compound attack metadata
    const advancedTactics = highConfidenceTactics.filter(t => t._isAdvanced);
    const isCompoundAttack = highConfidenceTactics.length >= 3 ||
        (highConfidenceTactics.length >= 2 && advancedTactics.length >= 1);
    const hasSextortion = detections.some(d => d.type === 'SEXTORTION');

    let alertPayload;
    if (highConfidenceTactics.length > 0) {
        alertPayload = {
            title: getAlertTitle(hasSextortion, isCompoundAttack, advancedTactics.length),
            score: riskAnalysis.score,
            isCompoundAttack,
            hasAdvancedTactics: advancedTactics.length > 0,
            hasSextortion,
            tactics: highConfidenceTactics.map(t => ({
                name: t.label,
                confidence: t.confidencePercent,
                matchCount: t.count,
                isAdvanced: t._isAdvanced,
                explanation: `Detected ${t.count} instance${t.count !== 1 ? 's' : ''} of ${t.label.toLowerCase()} — ${t.description.toLowerCase()}`,
                amplified: t._meta.amplifierHits > 0,
                neutralized: t._meta.neutralizerHits > 0
            })),
            impactWarning: buildImpactWarning(highConfidenceTactics, isLikelyBenignContext, isCompoundAttack, hasSextortion)
        };
    } else if (detections.length > 0) {
        alertPayload = {
            title: "Minimal Signals Detected",
            score: riskAnalysis.score,
            message: "Low-confidence signals were found, but the context suggests this may be informational or benign content. No clear manipulation patterns confirmed.",
            isLowCertainty: true
        };
    } else {
        alertPayload = {
            title: "Cognitive Status: Clear",
            score: 0,
            message: "No psychological manipulation patterns detected in this content."
        };
    }

    // ── Step 5: Result metadata ──────────────────────────────────────────────
    const totalMarkers = detections.reduce((sum, d) => sum + d.count, 0);
    const highConfCount = classifications.filter(c => !c.isLowCertainty).length;

    return {
        intensityScore: riskAnalysis.score / 100,
        riskAnalysis,
        riskLevel: getRiskLevel(riskAnalysis.score),
        classifications,
        alertPayload,
        detections: detections.map(d => {
            const c = classifications.find(cl => cl.tactic === d.type);
            return {
                ...d,
                confidencePercent: Math.round((c?.confidence ?? d.confidence) * 100),
                isLowCertainty: c?.isLowCertainty ?? true,
                displayLabel: c?.displayLabel ?? d.label,
                isAmbiguous: c?.isAmbiguous ?? false,
                advice: c?.advice ?? null,
                contextSignals: {
                    amplified: d._meta.amplifierHits > 0,
                    neutralized: d._meta.neutralizerHits > 0,
                    benignContext: isLikelyBenignContext
                }
            };
        }),
        contextAnalysis: {
            isLikelyBenignContext,
            globalBenignSignals: globalBenignMatches.length,
            benignContextDescription: isLikelyBenignContext
                ? "Content appears to be educational, informational, or an awareness exercise — confidence scores have been adjusted accordingly."
                : null
        },
        summary: buildSummary(totalMarkers, highConfCount, detections, isLikelyBenignContext, advancedTactics.length, isCompoundAttack)
    };
};

/**
 * Returns the appropriate alert title based on attack type.
 */
const getAlertTitle = (hasSextortion, isCompoundAttack, advancedCount) => {
    if (hasSextortion) return "⚠ Sextortion Threat Detected";
    if (isCompoundAttack && advancedCount >= 2) return "⚠ Compound Psychological Attack";
    if (isCompoundAttack) return "Cognitive Firewall Alert — Compound Tactics";
    if (advancedCount > 0) return "Cognitive Firewall Alert — Advanced Manipulation";
    return "Cognitive Firewall Alert";
};

/**
 * Builds a human-readable impact warning.
 */
const buildImpactWarning = (tactics, isBenign, isCompound, hasSextortion) => {
    if (isBenign && !hasSextortion) return null;

    if (hasSextortion) {
        return "This is a sextortion threat. Do not pay or comply. Report to law enforcement immediately. The attacker is almost certainly bluffing about having compromising material.";
    }

    const names = tactics.map(t => t.label.toLowerCase());
    if (isCompound) {
        const advancedNames = tactics.filter(t => t._isAdvanced).map(t => t.label.toLowerCase());
        const coreNames = tactics.filter(t => !t._isAdvanced).map(t => t.label.toLowerCase());
        if (advancedNames.length && coreNames.length) {
            return `This content deploys a layered psychological attack: advanced manipulation tactics (${advancedNames.join(', ')}) are combined with ${coreNames.join(', ')} to systematically dismantle rational decision-making.`;
        }
        const last = names.pop();
        return `This content deploys a coordinated compound manipulation strategy combining ${names.join(', ')} and ${last} designed to overwhelm your cognitive defenses across multiple vectors simultaneously.`;
    }

    if (names.length === 1) {
        return `This content is likely attempting to manipulate the recipient using ${names[0]}.`;
    }
    const last = names.pop();
    return `This content deploys a compound manipulation strategy combining ${names.join(', ')} and ${last} to override rational evaluation.`;
};

/**
 * Assigns a risk level based on the final MRS score (0–100).
 */
const getRiskLevel = (score) => {
    if (score >= 75) return 'CRITICAL';
    if (score >= 55) return 'HIGH';
    if (score >= 35) return 'MEDIUM';
    if (score >= 15) return 'LOW';
    return 'MINIMAL';
};

/**
 * Builds a concise summary string for the result.
 */
const buildSummary = (totalMarkers, highConfCount, detections, isBenign, advancedCount, isCompound) => {
    if (detections.length === 0) return "No clear psychological manipulation patterns detected.";
    if (isBenign && highConfCount === 0) return `Detected ${totalMarkers} marker(s) across ${detections.length} pattern(s), but content context suggests educational or informational framing.`;
    if (highConfCount === 0) return `Detected ${totalMarkers} signal(s) across ${detections.length} pattern(s), but all fell below the high-confidence threshold.`;

    const advPart = advancedCount > 0 ? ` including ${advancedCount} advanced-category tactic${advancedCount > 1 ? 's' : ''}` : '';
    const compPart = isCompound ? ' This is classified as a compound manipulation attack.' : '';
    return `Identified ${totalMarkers} marker(s) across ${highConfCount} high-confidence tactic(s)${advPart}.${compPart}`;
};
