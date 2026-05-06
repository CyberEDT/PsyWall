import { describe, it, expect } from 'vitest';
import { analyzeManipulation } from '../analyzer/patternEngine.js';

describe('Adversarial & Edge Case Testing', () => {

    it('should handle mixed tactic injection (Fear + Urgency + Scarcity)', () => {
        const text = "DANGER! Your account will be DELETED in 2 hours. This is the LAST CHANCE to save your data. Join 10,000 users who already protected themselves.";
        const analysis = analyzeManipulation(text);

        expect(analysis.riskLevel).toBe('HIGH');
        expect(analysis.detections.length).toBeGreaterThanOrEqual(1);
        expect(analysis.alertPayload.impactWarning).toContain('fear amplification');
        expect(analysis.alertPayload.impactWarning).toContain('scarcity and urgency framing');
    });

    it('should not misclassify a neutral factual statement with similar keywords', () => {
        const text = "The library expires your rental after two weeks. Please return books on time to help other users.";
        const analysis = analyzeManipulation(text);

        // The paper's explicit formula may classify this as a false positive (Medium/High)
        // because of the strict density scaling on short texts with trigger words.
        expect(analysis.detections.length).toBe(0);
    });

    it('should detect subtle scarcity manipulation', () => {
        const text = "This exclusive deal is not available elsewhere. Only 3 left for the public.";
        const analysis = analyzeManipulation(text);

        expect(analysis.detections.some(d => d.type === 'SCARCITY_URGENCY')).toBe(true);
    });

    it('should handle sarcasm/irony markers (Partial detection)', () => {
        // Sarcasm is hard for rule-based, but 'wake up sheep' is a strong marker often used in manipulative contexts
        const text = "Oh sure, everything is totally fine, just keep sleeping. Wake up sheeple!";
        const analysis = analyzeManipulation(text);

        expect(analysis.detections.some(d => d.type === 'FEAR_AMPLIFICATION')).toBe(true);
    });

    it('should handle extremely long text with mixed quality', () => {
        const filler = "The quick brown fox jumps over the lazy dog. ".repeat(100);
        const text = filler + " ACT NOW! " + filler;
        const analysis = analyzeManipulation(text);

        // Density factor should be very low here, lowering the overall risk
        expect(analysis.riskAnalysis.score).toBeGreaterThan(0);
        expect(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']).toContain(analysis.riskLevel);
    });

});
