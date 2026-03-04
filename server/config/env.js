import dotenv from 'dotenv';
dotenv.config();

/**
 * Global Configuration Object with Deployment Optimizations
 */
export const config = {
    port: parseInt(process.env.PORT) || 3001,
    nodeEnv: process.env.NODE_ENV || 'development',
    maxContentLength: parseInt(process.env.MAX_CONTENT_LENGTH) || 25000,
    rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW) || 60 * 1000,
    rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX) || 100,
    confidenceThreshold: parseFloat(process.env.CONFIDENCE_THRESHOLD) || 0.4,
    openaiApiKey: process.env.OPENAI_API_KEY || null
};
