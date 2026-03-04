/**
 * Scoring System - Transparent Logic for Cognitive Firewall
 */

export const calculateRiskScore = (detections, classifications, text) => {
    if (detections.length === 0) return { score: 0, breakdown: null };

    const wordCount = text.split(/\s+/).length;

    // 1. Emotional Intensity
    const totalWeight = detections.reduce((sum, d) => sum + d.confidence, 0);
    const emotionalIntensity = totalWeight / (detections.length || 1);

    // 2. Tactic Confidence
    const confidenceSum = classifications.reduce((sum, c) => sum + c.confidence, 0);
    const confidenceAggregation = confidenceSum / (classifications.length || 1);

    // 3. Persuasion Density
    const markerCount = detections.reduce((sum, d) => sum + d.count, 0);
    const densityBase = (markerCount / (wordCount || 1)) * 10;
    const densityFactor = Math.min(densityBase, 1.0);

    /**
     * Final Risk Score Formula:
     * (Weighted Intensity + Confidence + Density)
     * 
     * NEW: Progressive Relevance Scaling
     * If manipulation markers are sparse, we aggressively scale down the risk 
     * to avoid alarmist detection on long contents with isolated markers.
     */
    let relevanceScale = 1.0;
    if (densityFactor < 0.05) relevanceScale = 0.1;
    else if (densityFactor < 0.15) relevanceScale = 0.5;

    const rawScore = ((emotionalIntensity * 0.4) + (confidenceAggregation * 0.4) + (densityFactor * 0.2)) * relevanceScale;

    // Anti-False Positive for single markers in short snippets
    let finalRawScore = rawScore;
    if (detections.length === 1 && markerCount === 1 && wordCount < 50) {
        finalRawScore = Math.min(finalRawScore, 0.2);
    }

    const finalScore = Math.round(finalRawScore * 100);

    return {
        score: finalScore,
        breakdown: {
            emotionalIntensity: Math.round(emotionalIntensity * 100),
            confidenceAggregation: Math.round(confidenceAggregation * 100),
            densityFactor: Math.round(densityFactor * 100)
        },
        formula: "Risk = ((0.4*Int + 0.4*Conf + 0.2*Dens) * RelScale)"
    };
};
