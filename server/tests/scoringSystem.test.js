import { describe, it, expect } from 'vitest';
import { calculateRiskScore } from '../analyzer/scoringSystem.js';

describe('Scoring System Transparency', () => {
    it('should calculate risk using the transparent formula', () => {
        const rawDetections = [
            { count: 5, confidence: 0.8 },
            { count: 5, confidence: 0.9 }
        ];
        const classifications = [
            { confidence: 0.8 },
            { confidence: 0.9 }
        ];
        const text = "A piece of text aimed at being exactly long enough. Act now, danger! Act now, danger! Act now, danger! Act now, danger! Act now, danger!"; // ~25 words

        const result = calculateRiskScore(rawDetections, classifications, text);

        expect(result.breakdown).toHaveProperty('emotionalIntensity');
        expect(result.breakdown).toHaveProperty('confidenceAggregation');
        expect(result.breakdown).toHaveProperty('densityFactor');
        expect(result.formula).toContain('Risk');
    });

    it('should return zero score for empty detections', () => {
        const result = calculateRiskScore([], [], "Hello world");
        expect(result.score).toBe(0);
    });
});
