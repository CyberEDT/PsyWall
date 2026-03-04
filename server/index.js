import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config/env.js';
import analyzeRoute from './api/analyzeRoute.js';

const app = express();

/**
 * Cognitive Firewall Application Entry Point
 * Implements the modular architecture pattern:
 * API -> Analyzer Engine -> Scoring -> Structured JSON
 */

// Global Security Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/analyze', analyzeRoute);

// Global Health Check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        service: 'PsyWall Engine'
    });
});

if (process.env.NODE_ENV !== 'test') {
    app.listen(config.port, () => {
        console.log(`[PsyWall] System initialized.`);
        console.log(`[Architecture] Browser Extension → API → Analyzer Engine → Scoring → JSON Output`);
        console.log(`[Environment] ${config.nodeEnv} mode running on port ${config.port}`);
    });
}

export default app;

