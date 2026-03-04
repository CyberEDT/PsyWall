import { MANIPULATION_PATTERNS } from '../utils/patternLibrary.js';
import { classifyBias } from './biasClassifier.js';
import { calculateRiskScore } from './scoringSystem.js';

/**
 * Manipulation Pattern Analyzer Engine
 */
export const analyzeManipulation = (text) => {
    const detections = [];
    let totalScore = 0;
    let matchesCount = 0;

    const cleanText = text.replace(/\s+/g, ' ');

    for (const [key, pattern] of Object.entries(MANIPULATION_PATTERNS)) {
        const matches = [...cleanText.matchAll(pattern.regex)];

        if (matches.length > 0) {
            const categoryScore = Math.min(pattern.weight * matches.length, 1.0);
            totalScore += categoryScore;
            matchesCount += matches.length;

            detections.push({
                type: key,
                label: pattern.label,
                count: matches.length,
                confidence: categoryScore,
                description: pattern.description,
                evidence: matches.map(match => ({
                    text: match[0],
                    context: `...${cleanText.substring(Math.max(0, match.index - 40), Math.min(cleanText.length, match.index + match[0].length + 40))}...`
                }))
            });
        }
    }

    const classifications = classifyBias(detections, text);
    const riskAnalysis = calculateRiskScore(detections, classifications, text);

    // Payload for the User Alert Interface
    const highConfidenceTactics = detections
        .slice()
        .map(d => {
            const c = classifications.find(cl => cl.tactic === d.type);
            return { ...d, confidencePercent: Math.round(c.confidence * 100), isLowCertainty: c.isLowCertainty };
        })
        .filter(d => !d.isLowCertainty);

    const alertPayload = highConfidenceTactics.length > 0 ? {
        title: "Cognitive Firewall Alert",
        score: riskAnalysis.score,
        tactics: highConfidenceTactics.map(t => ({
            name: t.label,
            confidence: t.confidencePercent,
            explanation: `Detected lexical markers of ${t.label.toLowerCase()} which ${t.description.toLowerCase()}.`
        })),
        impactWarning: `This content is attempting to emotionally override rational evaluation by using ${highConfidenceTactics.map(t => t.label.toLowerCase()).join(' and ')}.`
    } : {
        title: "Cognitive Status: Clear",
        message: "No significant manipulation patterns detected."
    };

    return {
        intensityScore: riskAnalysis.score / 100,
        riskAnalysis,
        riskLevel: getRiskLevel(riskAnalysis.score / 100),
        classifications,
        alertPayload,
        detections: detections.map(d => {
            const c = classifications.find(cl => cl.tactic === d.type);
            return {
                ...d,
                confidencePercent: Math.round(c.confidence * 100),
                isLowCertainty: c.isLowCertainty,
                displayLabel: c.displayLabel,
                isAmbiguous: c.isAmbiguous,
                advice: c.advice
            };
        }),
        summary: matchesCount > 0
            ? `Identified ${matchesCount} markers with ${classifications.filter(c => !c.isLowCertainty).length} high-confidence tactics.`
            : "No clear psychological manipulation patterns detected."
    };
};

const getRiskLevel = (score) => {
    if (score > 0.7) return 'CRITICAL';
    if (score > 0.4) return 'HIGH';
    if (score > 0.1) return 'ELEVATED';
    return 'LOW';
};
