import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../index.js';

describe('PsyWall Security Hardening Suite (Injection Protections)', () => {

    it('should reject requests containing Prototype Pollution in the body', async () => {
        const res = await request(app)
            .post('/api/analyze')
            .set('Content-Type', 'application/json')
            .send('{"text": "ACT NOW!", "__proto__": {"polluted": true}}');

        expect(res.status).toBe(400);
        expect(res.body.code).toBe('SECURITY_VIOLATION');
        expect(res.body.message).toContain('Prototype Pollution');
    });

    it('should reject requests containing Prototype Pollution in query parameters', async () => {
        const res = await request(app)
            .post('/api/analyze?__proto__[polluted]=true')
            .send({ text: "ACT NOW!" });

        expect(res.status).toBe(400);
        expect(res.body.code).toBe('SECURITY_VIOLATION');
        expect(res.body.message).toContain('Prototype Pollution');
    });

    it('should reject requests containing SQL Injection signatures in query parameters', async () => {
        const res = await request(app)
            .post('/api/analyze?id=1%20UNION%20SELECT%20username,%20password%20FROM%20users')
            .send({ text: "ACT NOW!" });

        expect(res.status).toBe(400);
        expect(res.body.code).toBe('SECURITY_VIOLATION');
        expect(res.body.message).toContain('Potential SQL Injection');
    });

    it('should reject requests containing OS Command Injection signatures in query parameters', async () => {
        const res = await request(app)
            .post('/api/analyze?path=;%20cat%20/etc/passwd')
            .send({ text: "ACT NOW!" });

        expect(res.status).toBe(400);
        expect(res.body.code).toBe('SECURITY_VIOLATION');
        expect(res.body.message).toContain('Potential Command Injection');
    });

    it('should reject requests with unexpected properties in the body to prevent parameter injection', async () => {
        const res = await request(app)
            .post('/api/analyze')
            .send({
                text: "ACT NOW!",
                unexpectedField: "malicious"
            });

        expect(res.status).toBe(400);
        expect(res.body.code).toBe('INVALID_INPUT');
        expect(res.body.message).toContain('Unexpected properties');
    });

    it('should allow legitimate scan content that happens to mention SQL/command terms as data', async () => {
        const scamEmailWithSQLKeywords = "Dear user, the system administrator reported a database select error. Please select * from users where id=5 and verify your details.";
        
        const res = await request(app)
            .post('/api/analyze')
            .send({ text: scamEmailWithSQLKeywords });

        expect(res.status).toBe(200);
        expect(res.body.status).toBe('success');
        expect(res.body.intensityScore).toBeDefined();
    });

    it('should allow legitimate scan content that happens to mention command/terminal terms as data', async () => {
        const scamEmailWithTerminalTerms = "Hey, run this command in your powershell: ping 8.8.8.8; whoami";
        
        const res = await request(app)
            .post('/api/analyze')
            .send({ text: scamEmailWithTerminalTerms });

        expect(res.status).toBe(200);
        expect(res.body.status).toBe('success');
        expect(res.body.intensityScore).toBeDefined();
    });

    it('should block requests from untrusted CORS origins', async () => {
        const res = await request(app)
            .post('/api/analyze')
            .set('Origin', 'http://malicious-attacker.com')
            .send({ text: "ACT NOW!" });

        // A CORS failure in Express CORS middleware drops the request / returns error
        expect(res.status).toBe(500); // Express CORS throws error which is caught by error handler or returns 500
    });

    it('should accept requests from allowed CORS origins', async () => {
        const res = await request(app)
            .post('/api/analyze')
            .set('Origin', 'http://localhost:3000')
            .send({ text: "ACT NOW!" });

        expect(res.status).toBe(200);
        expect(res.body.status).toBe('success');
    });
});
