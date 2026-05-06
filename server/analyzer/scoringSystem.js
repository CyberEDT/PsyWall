/**
 * Scoring System v3.0 — Transparent Manipulation Risk Score (MRS)
 *
 * Formula: MRS = (0.35 × I) + (0.40 × C) + (0.15 × D) + (0.10 × A)
 *              − Benign Penalty
 *              + Compound Tactic Bonus
 *              + Advanced Pattern Bonus
 *              + Multi-Trigger Combination Bonus
 *
 *  I   = Emotional Intensity         (weighted avg confidence across detections)
 *  C   = Confidence Aggregation      (top-3 high-confidence classifications avg)
 *  D   = Signal Density              (sigmoid-normalized markers per 100 words)
 *  A   = Amplifier Density           (co-occurring call-to-action / urgency signals)
 *  B   = Benign Context Penalty      (subtracted when educational context detected)
 *
 *  Bonus rules:
 *    - Advanced pattern present              → +15 per unique advanced tactic (max +30)
 *    - Sextortion present                    → +20 (floor: score never below 65 if detected)
 *    - 3+ unique tactic categories active    → +12 (coordinated attack indicator)
 *    - 4+ unique tactic categories active    → +20 (compound manipulation campaign)
 *    - 2+ advanced tactics co-occurring      → +18 (multi-layer psychological attack)
 *    - Any advanced + 2+ core tactics        → +10 (layered attack bonus)
 */

export const calculateRiskScore = (detections, classifications, text, globalBenignFactor = 0) => {
    if (detections.length === 0) return { score: 0, breakdown: null };

    const wordCount = Math.max(text.split(/\s+/).length, 1);

    // Separate advanced and core detections
    const advancedDetections = detections.filter(d => d._isAdvanced);
    const coreDetections = detections.filter(d => !d._isAdvanced);

    // ── I: Emotional Intensity ────────────────────────────────────────────────
    const totalWeight = detections.reduce((sum, d) => sum + d.count, 0);
    const intensityRaw = totalWeight > 0
        ? detections.reduce((sum, d) => sum + d.confidence * d.count, 0) / totalWeight
        : 0;
    const intensity = Math.min(intensityRaw, 1.0);

    // ── C: Confidence Aggregation ─────────────────────────────────────────────
    const highConf = classifications
        .filter(c => !c.isLowCertainty)
        .sort((a, b) => b.confidence - a.confidence)
        .slice(0, 3);

    const confidence = highConf.length > 0
        ? highConf.reduce((sum, c) => sum + c.confidence, 0) / highConf.length
        : (classifications.length > 0
            ? classifications.reduce((sum, c) => sum + c.confidence, 0) / classifications.length * 0.5
            : 0);

    // ── D: Signal Density ─────────────────────────────────────────────────────
    const markerCount = detections.reduce((sum, d) => sum + d.count, 0);
    const signalsPer100Words = (markerCount / wordCount) * 100;
    const densityRaw = 1 / (1 + Math.exp(-1.2 * (signalsPer100Words - 4)));
    const density = Math.min(densityRaw, 1.0);

    // ── A: Amplifier Presence ─────────────────────────────────────────────────
    const totalAmplifiers = detections.reduce((sum, d) => sum + (d._meta?.amplifierHits ?? 0), 0);
    const amplifierScore = Math.min(totalAmplifiers * 0.15, 1.0);

    // ── MRS raw ───────────────────────────────────────────────────────────────
    const rawScore = (0.35 * intensity) + (0.40 * confidence) + (0.15 * density) + (0.10 * amplifierScore);

    // ── B: Benign Context Penalty ─────────────────────────────────────────────
    // Advanced tactics are penalized less by benign context (partial immunity)
    const benignPenaltyRaw = globalBenignFactor * 0.25;
    const advancedImmunity = advancedDetections.length > 0 ? 0.4 : 0; // advanced reduces benign discount
    const benignPenalty = benignPenaltyRaw * (1 - advancedImmunity);

    const adjustedScore = Math.max(0, Math.min(rawScore - benignPenalty, 1.0));
    let finalScore = Math.min(Math.round(adjustedScore * 100), 100);

    // ── BONUS CALCULATIONS ────────────────────────────────────────────────────

    // Count unique high-confidence tactic categories
    const highConfTacticTypes = new Set(highConf.map(c => c.tactic));
    const totalHighConfCount = highConfTacticTypes.size;
    const advancedHighConfCount = [...highConfTacticTypes].filter(t =>
        advancedDetections.some(d => d.type === t)
    ).length;
    const coreHighConfCount = totalHighConfCount - advancedHighConfCount;

    // Per-advanced-pattern bonus (capped at 2)
    const advancedPatternBonus = Math.min(advancedHighConfCount * 15, 30);

    // Sextortion override: always floor at 65 if detected with any confidence
    const hasSextortion = detections.some(d => d.type === 'SEXTORTION');
    const sextortionBonus = hasSextortion ? 20 : 0;

    // Multi-category coordination bonus
    let coordinationBonus = 0;
    if (totalHighConfCount >= 4) coordinationBonus = 20;
    else if (totalHighConfCount >= 3) coordinationBonus = 12;

    // Compound advanced co-occurrence bonus
    const multiAdvancedBonus = advancedHighConfCount >= 2 ? 18 : 0;

    // Layered attack: advanced + 2+ core tactics
    const layeredBonus = (advancedHighConfCount >= 1 && coreHighConfCount >= 2) ? 10 : 0;

    // Legacy compound bonus (for 2 or fewer high-conf without qualifying for others)
    const legacyCompoundBonus = totalHighConfCount === 2 && coordinationBonus === 0 ? 4 : 0;

    const totalBonus = advancedPatternBonus + sextortionBonus + coordinationBonus +
        multiAdvancedBonus + layeredBonus + legacyCompoundBonus;

    let scoredWithBonus = Math.min(finalScore + totalBonus, 100);

    // Sextortion floor override: even with benign context, minimum score is 65
    if (hasSextortion && scoredWithBonus < 65) {
        scoredWithBonus = 65;
    }

    return {
        score: scoredWithBonus,
        raw_mrs: Number(rawScore.toFixed(3)),
        adjusted_mrs: Number(adjustedScore.toFixed(3)),
        hasAdvancedTactics: advancedDetections.length > 0,
        advancedTacticCount: advancedHighConfCount,
        breakdown: {
            emotionalIntensity: Math.round(intensity * 100),
            confidenceAggregation: Math.round(confidence * 100),
            densityFactor: Math.round(density * 100),
            amplifierPresence: Math.round(amplifierScore * 100),
            benignContextPenalty: Math.round(benignPenalty * 100),
            // Bonus breakdown
            advancedPatternBonus,
            sextortionBonus,
            coordinationBonus,
            multiAdvancedBonus,
            layeredBonus,
            legacyCompoundBonus: legacyCompoundBonus,
            compoundBonus: totalBonus  // legacy field name kept for UI compat
        },
        formula: "MRS = (0.35×I) + (0.40×C) + (0.15×D) + (0.10×A) − Benign Penalty + Bonuses"
    };
};
