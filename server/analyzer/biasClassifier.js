import { config } from '../config/env.js';

const CONFIDENCE_THRESHOLD = config.confidenceThreshold;

const TACTIC_ADVICE = {
    URGENCY: "Time pressure is a tactic to stop you from thinking. Take a breath and verify from a trusted source.",
    FEAR: "Fear is used to cloud judgment. Don't let anxiety drive your clicks.",
    AUTHORITY: "Official-sounding language is easily faked. Verify the sender's identity independently.",
    DECEPTIVE_IMPERSONATION: "Generic greetings and fake departments are red flags. Real institutions usually address you by name.",
    THREAT_CONSEQUENCE: "Legitimate businesses don't threaten to freeze accounts via email without prior verified notification.",
    CREDENTIAL_HARVESTING: "NEVER click links to 'verify' accounts. Go directly to the official website by typing the URL yourself.",
    IRREVERSIBILITY: "Phishers use 'final' and 'irreversible' language to create panic. Most real issues can be resolved with a phone call.",
    EMOTIONAL_EXPLOITATION: "Charity or emergency pleas that require 'immediate' money are often scams. Verify the organization separately."
};

export const classifyBias = (detections, text) => {
    const classifications = detections.map(det => {
        const textDensity = det.count / (text.split(' ').length / 50);
        const weightMultiplier = det.confidence > 0.8 ? 1.2 : 1.0;

        let score = (det.confidence * weightMultiplier) + (textDensity * 0.1);
        score = Math.min(score, 0.98);

        return {
            tactic: det.type,
            label: det.label,
            confidence: score,
            isLowCertainty: score < CONFIDENCE_THRESHOLD,
            displayLabel: score < CONFIDENCE_THRESHOLD ? `Low Certainty Detection (${det.label})` : det.label
        };
    });

    const sorted = [...classifications].sort((a, b) => b.confidence - a.confidence);

    const results = sorted.map((c, index) => {
        const next = sorted[index + 1];
        const isAmbiguous = next && (c.confidence - next.confidence < 0.1);

        let advice = TACTIC_ADVICE[c.tactic] || null;
        if (isAmbiguous) {
            advice = `Tactical overlap: ${advice} Also, multiple biases are being used simultaneously.`;
        }

        return {
            ...c,
            isAmbiguous,
            advice
        };
    });

    return results;
};
