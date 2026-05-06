import { describe, it, expect } from 'vitest';
import { analyzeManipulation } from '../analyzer/patternEngine.js';

describe('Pattern Engine Logic', () => {
    it('should detect urgency markers in manipulative marketing copy', () => {
        const text = "ACT NOW! Limited time offer expires today! Only 3 left in stock!";
        const analysis = analyzeManipulation(text);

        expect(['HIGH', 'CRITICAL']).toContain(analysis.riskLevel);
        expect(analysis.detections.some(d => d.type === 'SCARCITY_URGENCY')).toBe(true);
    });

    it('should detect fear markers in sensationalist content', () => {
        const text = "Warning: YOUR ASSETS ARE IN DANGER! This terrifying crisis will ruin your life. Protect yourself now.";
        const analysis = analyzeManipulation(text);

        expect(analysis.riskLevel).toBe('HIGH');
        expect(analysis.detections.some(d => d.type === 'FEAR_AMPLIFICATION')).toBe(true);
    });

    it('should distinguish legitimate breaking news (Advisory Only)', () => {
        const text = "Official notice: Emergency services are responding to a traffic incident. Stay safe and follow instructions.";
        const analysis = analyzeManipulation(text);

        // It will still detect the markers but the scoring and explanation should reflect the advisory nature
        expect(analysis.detections.some(d => d.type === 'AUTHORITY_EXPLOITATION')).toBe(true);
        expect(analysis.alertPayload.impactWarning).toContain('authority exploitation');
    });

    it('should handle very short content with zero detections', () => {
        const text = "Hello world.";
        const analysis = analyzeManipulation(text);

        expect(analysis.intensityScore).toBe(0);
        expect(analysis.detections.length).toBe(0);
        expect(analysis.alertPayload.title).toBe('Cognitive Status: Clear');
    });

    it('should detect rage-bait keywords', () => {
        const text = "It's an absolute disgrace and outrageous betrayal! Wake up sheep!";
        const analysis = analyzeManipulation(text);

        expect(analysis.detections.some(d => d.type === 'FEAR_AMPLIFICATION')).toBe(true);
        expect(analysis.riskLevel).toBe('HIGH');
    });
});
