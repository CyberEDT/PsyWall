import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../index.js';

describe('Cognitive Firewall API Integration', () => {
    it('GET /api/health should return 200', async () => {
        const res = await request(app).get('/api/health');
        expect(res.status).toBe(200);
        expect(res.body.status).toBe('healthy');
    });

    it('POST /api/analyze should process valid text', async () => {
        const res = await request(app)
            .post('/api/analyze')
            .send({ text: "ACT NOW! Limited time offer expires today!" });

        expect(res.status).toBe(200);
        expect(res.body.status).toBe('success');
        expect(res.body.riskAnalysis.score).toBeGreaterThan(0);
        expect(res.body.alertPayload.title).toBe('Cognitive Firewall Alert');
    });

    it('POST /api/analyze should reject empty text', async () => {
        const res = await request(app)
            .post('/api/analyze')
            .send({ text: "" });

        expect(res.status).toBe(400);
        expect(res.body.code).toBe('INVALID_INPUT');
    });

    it('POST /api/analyze should reject excessively long text', async () => {
        const longText = "a".repeat(26000);
        const res = await request(app)
            .post('/api/analyze')
            .send({ text: longText });

        expect(res.status).toBe(413);
        expect(res.body.code).toBe('LENGTH_EXCEEDED');
    });
});
