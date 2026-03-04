import { describe, it, expect } from 'vitest';
import { analyzeManipulation } from '../analyzer/patternEngine.js';

describe('Adversarial & Edge Case Testing', () => {

    it('should handle mixed tactic injection (Fear + Urgency + Scarcity)', () => {
        const text = "DANGER! Your account will be DELETED in 2 hours. This is the LAST CHANCE to save your data. Join 10,000 users who already protected themselves.";
        const analysis = analyzeManipulation(text);

        expect(analysis.riskLevel).toBe('CRITICAL');
        expect(analysis.detections.length).toBeGreaterThanOrEqual(3);
        expect(analysis.alertPayload.impactWarning).toContain('fear amplification');
        expect(analysis.alertPayload.impactWarning).toContain('urgency pressure');
    });

    it('should not misclassify a neutral factual statement with similar keywords', () => {
        const text = "The library expires your rental after two weeks. Please return books on time to help other users.";
        const analysis = analyzeManipulation(text);

        // While it might pick up 'expires', the overall score should be low because density and intensity are low
        expect(analysis.riskAnalysis.score).toBeLessThan(30);
        expect(analysis.riskLevel).not.toBe('CRITICAL');
    });

    it('should detect subtle scarcity manipulation', () => {
        const text = "This unique opportunity is not available elsewhere. We only have a few left for the public.";
        const analysis = analyzeManipulation(text);

        expect(analysis.detections.some(d => d.type === 'SCARCITY')).toBe(true);
    });

    it('should handle sarcasm/irony markers (Partial detection)', () => {
        // Sarcasm is hard for rule-based, but 'wake up sheep' is a strong marker often used in manipulative contexts
        const text = "Oh sure, everything is totally fine, just keep sleeping. Wake up sheep!";
        const analysis = analyzeManipulation(text);

        expect(analysis.detections.some(d => d.type === 'RAGE_TRIGGER')).toBe(true);
    });

    it('should handle extremely long text with mixed quality', () => {
        const filler = "The quick brown fox jumps over the lazy dog. ".repeat(100);
        const text = filler + " ACT NOW! " + filler;
        const analysis = analyzeManipulation(text);

        // Density factor should be very low here, lowering the overall risk
        expect(analysis.riskAnalysis.breakdown.densityFactor).toBeLessThan(20);
        expect(analysis.riskLevel).toBe('LOW'); // One match in a huge text is low risk
    });

});
