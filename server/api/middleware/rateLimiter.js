import { rateLimit } from 'express-rate-limit';

/**
 * Standard Rate Limiter Middleware
 */
export const analysisRateLimit = rateLimit({
    windowMs: 60 * 1000,
    max: 100,
    message: {
        status: "error",
        code: "RATE_LIMIT_EXCEEDED",
        message: "Too many requests. Please try again after a minute."
    },
    standardHeaders: true,
    legacyHeaders: false,
});
