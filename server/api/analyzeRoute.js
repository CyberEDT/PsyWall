import express from 'express';
import { analyzeManipulation } from '../analyzer/patternEngine.js';
import { validateAnalysisRequest } from './middleware/validation.js';
import { analysisRateLimit } from './middleware/rateLimiter.js';

const router = express.Router();

/**
 * Real-time Content Analysis Route
 * Optimized with Async processing pipeline
 */
router.post('/', analysisRateLimit, validateAnalysisRequest, async (req, res) => {
    try {
        // Optimization: Async execution context
        const analysis = await new Promise((resolve) => {
            // Small timeout to move to next tick if CPU bound
            setImmediate(() => {
                resolve(analyzeManipulation(req.sanitizedText));
            });
        });

        res.json({
            status: "success",
            ...analysis,
            meta: {
                processedAt: new Date().toISOString(),
                version: '3.0.0-optimized'
            }
        });
    } catch (error) {
        console.error('API_ROUTE_ERROR:', error);
        res.status(500).json({
            status: "error",
            code: "INTERNAL_FAILURE",
            message: "An internal processing failure occurred."
        });
    }
});

export default router;
