import { config } from '../config/env.js';

const CONFIDENCE_THRESHOLD = config.confidenceThreshold; // default 0.4

const TACTIC_ADVICE = {
    // ── Core tactics ──────────────────────────────────────────────────────────
    FEAR_AMPLIFICATION: "Fear is engineered to cloud your judgment. Pause — verify any claimed threat independently before acting.",
    SCARCITY_URGENCY: "Artificial deadlines are a classic tactic to suppress rational thinking. Real opportunities rarely expire in hours.",
    AUTHORITY_EXPLOITATION: "Institutional language and official-sounding titles are trivially faked. Verify the sender's identity through an independent channel — not the contact info in this message.",
    SOCIAL_PROOF: "Consensus cues and peer pressure bypass independent reasoning. Evaluate claims on their own merits, not on claimed popularity.",
    RECIPROCITY_BAITING: "A perceived gift or favor creates a psychological obligation to comply. Be aware of this social contract being weaponized.",
    COMMITMENT_TRAPPING: "References to past agreements you don't recall making are designed to lock you into the narrative. You are not obligated to comply with unverified claims.",

    // ── Advanced tactics ──────────────────────────────────────────────────────
    SEXTORTION: "This is a sextortion attempt. Do NOT pay. These attackers almost never have the material they claim — it is a bluff. Report this to your national cybercrime authority immediately (e.g., FBI IC3, Action Fraud UK, or local police) and block the sender.",
    EMOTIONAL_DEPENDENCY: "This message is exploiting emotional attachment to manufacture leverage. Genuine relationships do not require compliance under psychological duress. Threats of self-harm in this context are a manipulation tactic — if you believe there is real risk, contact emergency services rather than complying.",
    GUILT_SYMPATHY_PRESSURE: "Guilt and manufactured sympathy are being weaponized to override your rational judgment. Legitimate requests do not require you to feel responsible for another person's suffering before you can think clearly.",
    GASLIGHTING: "This content is attempting to undermine your perception of reality and self-trust. Trust your own memory and instincts. Seek an independent perspective from someone you trust — gaslighting loses its power when exposed to a third, grounded observer.",
    TRUST_GROOMING: "Long-term trust-building followed by a specific request is a textbook grooming pattern. Secrecy requirements ('don't tell anyone') are a definitive red flag indicating the relationship is being constructed for exploitation.",
    COGNITIVE_OVERLOAD: "Complexity and jargon are being used to prevent you from evaluating the actual request. Strip away the language and ask: what exactly is being requested from me, and why? If you cannot answer that clearly, do not proceed.",
    SOCIAL_OBLIGATION: "Social pressure and group conformity are being used to substitute for your independent decision-making. Your participation in any request must be your own choice — not something extracted by making you responsible for the collective.",
    IDENTITY_PERSONALIZATION: "The use of personal details creates a false sense of legitimacy and lowers your guard. Data about you is publicly available or easily obtained — knowing your name, employer, or interests does not make a message trustworthy."
};

/**
 * Bias Classifier v3.0
 * Produces per-tactic confidence scores using the contextual signal data
 * from the pattern engine (neutralizer hits, amplifier hits, benign context).
 * Advanced-category detections receive an inherent confidence floor boost.
 */
export const classifyBias = (detections, text, isLikelyBenignContext = false) => {
    const classifications = detections.map(det => {
        // Use the ALREADY pre-computed contextual score from patternEngine!
        let score = det.confidence;

        // Advanced tactic floor: advanced patterns get a confidence floor boost
        // because even a single credible match of sextortion/gaslighting is significant
        const advancedFloor = det._isAdvanced ? 0.10 : 0;

        score = Math.max(advancedFloor, Math.min(score, 0.99));

        const isLowCertainty = score < CONFIDENCE_THRESHOLD;

        return {
            tactic: det.type,
            label: det.label,
            confidence: score,
            isLowCertainty,
            isAdvanced: det._isAdvanced ?? false,
            displayLabel: isLowCertainty
                ? `Low Certainty: ${det.label}`
                : det.label
        };
    });

    // Sort by descending confidence
    const sorted = [...classifications].sort((a, b) => b.confidence - a.confidence);

    // Mark ambiguous tactics (score gap < 0.10 between adjacent high-confidence items)
    return sorted.map((c, index) => {
        const next = sorted[index + 1];
        const isAmbiguous = !c.isLowCertainty && next && !next.isLowCertainty && (c.confidence - next.confidence < 0.10);

        let advice = TACTIC_ADVICE[c.tactic] ?? null;
        if (isAmbiguous && advice) {
            advice = `${advice} Note: multiple tactics are active simultaneously — this compound approach is a strong indicator of deliberate, coordinated manipulation.`;
        }

        return {
            ...c,
            isAmbiguous,
            advice
        };
    });
};
