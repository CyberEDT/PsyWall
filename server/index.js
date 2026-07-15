import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import { config } from './config/env.js';
import analyzeRoute from './api/analyzeRoute.js';
import urlIntelRoute from './api/urlIntelRoute.js';
import visionRoute from './api/visionRoute.js';
import threatFeedRoute from './api/threatFeedRoute.js';
import { securityMiddleware } from './api/middleware/security.js';

const app = express();

/**
 * Cognitive Firewall Application Entry Point
 * Implements the modular architecture pattern:
 * API -> Analyzer Engine -> Scoring -> Structured JSON
 * v3.1.0: Enhanced with CyberEDT Neon DB Threat Intelligence
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
    'chrome-extension://*',      // Browser extension
    process.env.FRONTEND_URL     // Production frontend (e.g. from Vercel)
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, curl, or server-to-server)
        if (!origin) {
            return callback(null, true);
        }
        
        const normalizedOrigin = origin.endsWith('/') ? origin.slice(0, -1) : origin;
        const isAllowed = allowedOrigins.some(allowed => {
            if (allowed.includes('*')) {
                // simple wildcard match for extensions
                const regex = new RegExp('^' + allowed.replace(/\*/g, '.*') + '$');
                return regex.test(normalizedOrigin);
            }
            return allowed === normalizedOrigin;
        });

        if (isAllowed) {
            callback(null, true);
        } else {
            // Log it but do not throw an Error, so Express handles it gracefully without a 500 crash
            console.warn(`[CORS Blocked] Origin: ${origin}`);
            callback(null, false);
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

// 4.5. JSON Parsing Error Handler (Prevent body-parser crashes)
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error(`[PsyWall Security] Blocked malformed JSON request from ${req.ip}`);
        return res.status(400).json({ 
            success: false, 
            error: 'Malformed JSON payload detected. Request blocked.' 
        });
    }
    next(err);
});

// 5. Custom Injection Protection Middleware (SQLi, CMDi, Prototype Pollution)
app.use(securityMiddleware);

// Routes
app.use('/api/analyze', analyzeRoute);
app.use('/api/analyze-url', urlIntelRoute);
app.use('/api/analyze-image', visionRoute);
app.use('/api/threat-feed', threatFeedRoute);

// Global Health Check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        service: 'PsyWall Engine',
        threatIntel: {
            source: 'CyberEDT Neon DB',
            tables: ['malicious_urls (12,046)', 'phishing_urls (614)', 'scam_messages (52,287)', 'scam_patterns (17)']
        }
    });
});

// Root Route for browser verification
app.get('/', (req, res) => {
    res.status(200).send(`
        <html>
            <body style="font-family: monospace; background: #0f172a; color: #10b981; padding: 2rem;">
                <h2>PsyWall Cognitive Firewall API — ONLINE</h2>
                <p>Status: All systems operational.</p>
                <p>This is the backend API server. It is not meant to be viewed in a browser.</p>
                <p>Please connect your Vercel frontend to this URL.</p>
            </body>
        </html>
    `);
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(`[Global Error] ${err.message}`);
    res.status(500).json({
        success: false,
        error: 'An internal server error occurred.'
    });
});

if (process.env.NODE_ENV !== 'test') {
    app.listen(config.port, () => {
        console.log(`[PsyWall] System initialized.`);
        console.log(`[Architecture] Browser Extension → API → Analyzer Engine → CyberEDT DB → Scoring → JSON Output`);
        console.log(`[Environment] ${config.nodeEnv} mode running on port ${config.port}`);
        console.log(`[ThreatIntel] CyberEDT Neon DB connected — 12,046 malicious URLs, 614 phishing URLs, 52,287 scam messages`);
    });
}

export default app;
