/**
 * Global Security Middleware for Injection and Pollution attacks
 */

/**
 * Recursively checks if an object contains prototype pollution keys.
 */
const hasPrototypePollution = (obj) => {
    if (!obj || typeof obj !== 'object') return false;

    for (const key in obj) {
        if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
            return true;
        }
        // Recursively inspect objects
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            if (hasPrototypePollution(obj[key])) {
                return true;
            }
        }
    }
    return false;
};

/**
 * Detects common SQL injection signatures in string inputs.
 */
const hasSQLInjectionSignatures = (val) => {
    if (typeof val !== 'string') return false;
    const sqliPatterns = [
        /UNION\s+ALL\s+SELECT/i,
        /UNION\s+SELECT/i,
        /SELECT\s+.*\s+FROM/i,
        /INSERT\s+INTO/i,
        /UPDATE\s+.*\s+SET/i,
        /DELETE\s+FROM/i,
        /DROP\s+TABLE/i,
        /OR\s+['"]?\d+['"]?\s*=\s*['"]?\d+/i,
        /['"]\s*OR\s*['"]\s*['"]\s*=\s*['"]/i,
        /--/ // SQL single line comment
    ];
    return sqliPatterns.some(pattern => pattern.test(val));
};

/**
 * Detects command injection patterns (e.g., trying to run terminal shell commands).
 */
const hasCommandInjectionSignatures = (val) => {
    if (typeof val !== 'string') return false;
    const cmdiPatterns = [
        /[|&;`$]\s*(?:cat|ls|pwd|whoami|id|sh|bash|powershell|cmd|curl|wget|ping|ncat|nc|netcat)\b/i,
        /\$\(.+\)/, // $(command)
        /eval\s*\(/i
    ];
    return cmdiPatterns.some(pattern => pattern.test(val));
};

/**
 * Detects NoSQL Injection patterns (e.g., MongoDB operators).
 */
const hasNoSQLInjectionSignatures = (val) => {
    if (typeof val !== 'string') return false;
    const nosqlPatterns = [
        /\$where/i,
        /\$ne/i,
        /\$gt/i,
        /\$lt/i,
        /\$regex/i
    ];
    return nosqlPatterns.some(pattern => pattern.test(val));
};

/**
 * Detects Directory Traversal (LFI/RFI) patterns.
 */
const hasDirectoryTraversalSignatures = (val) => {
    if (typeof val !== 'string') return false;
    const traversalPatterns = [
        /\.\.\//,
        /\.\.\\/
    ];
    return traversalPatterns.some(pattern => pattern.test(val));
};

/**
 * Middleware function that intercepts requests and scans for malicious payloads.
 */
export const securityMiddleware = (req, res, next) => {
    // 1. Raw URL Prototype Pollution Check
    const urlDecoded = decodeURIComponent(req.originalUrl || req.url || '');
    if (/(?:__proto__|constructor|prototype)\s*[\[=]/i.test(urlDecoded)) {
        return res.status(400).json({
            status: "error",
            code: "SECURITY_VIOLATION",
            message: "Malformed request query parameter detected (Prototype Pollution attempt)."
        });
    }

    // 2. Object Prototype Pollution Check
    if (hasPrototypePollution(req.body) || hasPrototypePollution(req.query) || hasPrototypePollution(req.params)) {
        return res.status(400).json({
            status: "error",
            code: "SECURITY_VIOLATION",
            message: "Malformed request payload detected (Prototype Pollution attempt)."
        });
    }

    // 2. Scan request parameters (excluding req.body.text because it can legitimately contain any content/emails for analysis)
    // for SQL/Command injection signatures in parameters like query params, headers or other body parameters.
    const checkParams = { ...req.query, ...req.params };
    
    // Check all body parameters except 'text'
    if (req.body && typeof req.body === 'object') {
        for (const [key, value] of Object.entries(req.body)) {
            if (key !== 'text') {
                checkParams[key] = value;
            }
        }
    }

    for (const [key, value] of Object.entries(checkParams)) {
        const stringVal = typeof value === 'string' ? value : JSON.stringify(value);
        if (hasSQLInjectionSignatures(stringVal)) {
            return res.status(400).json({
                status: "error",
                code: "SECURITY_VIOLATION",
                message: `Malformed request parameter detected (Potential SQL Injection in field: ${key}).`
            });
        }
        if (hasCommandInjectionSignatures(stringVal)) {
            return res.status(400).json({
                status: "error",
                code: "SECURITY_VIOLATION",
                message: `Malformed request parameter detected (Potential Command Injection in field: ${key}).`
            });
        }
        if (hasNoSQLInjectionSignatures(stringVal)) {
            return res.status(400).json({
                status: "error",
                code: "SECURITY_VIOLATION",
                message: `Malformed request parameter detected (Potential NoSQL Injection in field: ${key}).`
            });
        }
        if (hasDirectoryTraversalSignatures(stringVal)) {
            return res.status(400).json({
                status: "error",
                code: "SECURITY_VIOLATION",
                message: `Malformed request parameter detected (Potential Directory Traversal in field: ${key}).`
            });
        }
    }

    next();
};
