import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import { config } from './config/env.js';
import analyzeRoute from './api/analyzeRoute.js';
import { securityMiddleware } from './api/middleware/security.js';

const app = express();

/**
 * Cognitive Firewall Application Entry Point
 * Implements the modular architecture pattern:
 * API -> Analyzer Engine -> Scoring -> Structured JSON
 */

// Global Security Middleware

// 1. Helmet headers configuration with strict Content Security Policy (CSP)
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:"],
            connectSrc: ["'self'"],
            frameAncestors: ["'none'"]
        }
    },
    crossOriginEmbedderPolicy: true,
    crossOriginOpenerPolicy: { policy: "same-origin" },
    crossOriginResourcePolicy: { policy: "same-origin" },
    dnsPrefetchControl: { allow: false },
    frameguard: { action: "deny" },
    hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
    ieNoOpen: true,
    noSniff: true,
    referrerPolicy: { policy: "no-referrer" },
    xssFilter: true
}));

// 2. CORS configuration - restrict to specific origins to prevent unauthorized injection requests
const allowedOrigins = [
    'http://localhost:3000',     // Local React frontend
    'http://localhost:5173',     // Vite default local server
    'chrome-extension://*'       // Browser extension
];

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, curl, or server-to-server)
        if (!origin) {
            return callback(null, true);
        }
        
        const isAllowed = allowedOrigins.some(allowed => {
            if (allowed.includes('*')) {
                // simple wildcard match for extensions
                const regex = new RegExp('^' + allowed.replace(/\*/g, '.*') + '$');
                return regex.test(origin);
            }
            return allowed === origin;
        });

        if (isAllowed) {
            callback(null, true);
        } else {
            callback(new Error('Blocked by CORS policy (PsyWall Security)'));
        }
    },
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// 3. Prevent HTTP Parameter Pollution
app.use(hpp());

// 4. Rate-limit and size-limit parsing of request body to block huge buffer-exhaustion injection attacks
app.use(express.json({ limit: '100kb' }));

// 5. Custom Injection Protection Middleware (SQLi, CMDi, Prototype Pollution)
app.use(securityMiddleware);

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

