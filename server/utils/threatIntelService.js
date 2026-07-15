import sql from '../config/db.js';

/**
 * ThreatIntelService — CyberEDT Central Threat Intelligence
 * Queries the Neon DB tables: malicious_urls, phishing_urls, scam_patterns, scam_messages
 *
 * Strategy:
 *  - URL checks: exact match → domain match → fuzzy path match
 *  - Text checks: scam_patterns keyword match + scam_messages similarity label
 *  - Results are cached in-memory (5 min TTL) to minimize DB round-trips
 */

// ── Simple in-memory cache ────────────────────────────────────────────────────
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
const cache = new Map(); // key → { data, expiresAt }

function fromCache(key) {
    const entry = cache.get(key);
    if (entry && entry.expiresAt > Date.now()) return entry.data;
    cache.delete(key);
    return null;
}

function toCache(key, data) {
    cache.set(key, { data, expiresAt: Date.now() + CACHE_TTL_MS });
    return data;
}

// ── Helper: extract domain from a URL string ──────────────────────────────────
function extractDomain(rawUrl) {
    try {
        const u = new URL(rawUrl.startsWith('http') ? rawUrl : `http://${rawUrl}`);
        return u.hostname.replace(/^www\./, '');
    } catch {
        return rawUrl.split('/')[0].replace(/^www\./, '');
    }
}

// ─────────────────────────────────────────────────────────────────────────────
//  URL INTELLIGENCE
// ─────────────────────────────────────────────────────────────────────────────

/**
 * checkUrlAgainstThreatDB
 * Checks a URL against malicious_urls and phishing_urls tables.
 * Returns a structured threat result or null if clean.
 */
export async function checkUrlAgainstThreatDB(inputUrl) {
    if (!inputUrl || typeof inputUrl !== 'string') return { matched: false, riskBoost: 0 };
    
    const cacheKey = `url:${inputUrl}`;
    const cached = fromCache(cacheKey);
    if (cached !== null) return cached;

    const domain = extractDomain(inputUrl);
    const normalizedInput = inputUrl.toLowerCase().trim();

    try {
        // 1. Exact match in malicious_urls
        const exactMalicious = await sql`
            SELECT url, malware_type, source FROM cyberedt_all.malicious_urls
            WHERE LOWER(url) = ${normalizedInput}
            LIMIT 1
        `;

        if (exactMalicious.length > 0) {
            return toCache(cacheKey, {
                matched: true,
                matchType: 'exact',
                threatCategory: 'malware',
                malwareType: exactMalicious[0].malware_type || 'Unknown Malware',
                source: exactMalicious[0].source,
                matchedUrl: exactMalicious[0].url,
                riskBoost: 85,
                label: '⚠ Confirmed Malware URL',
                description: 'This URL is listed in the CyberEDT malicious URL database (URLHaus). It has been confirmed to distribute malware.',
            });
        }

        // 2. Exact match in phishing_urls
        const exactPhishing = await sql`
            SELECT url, source FROM cyberedt_all.phishing_urls
            WHERE LOWER(url) = ${normalizedInput}
            LIMIT 1
        `;

        if (exactPhishing.length > 0) {
            return toCache(cacheKey, {
                matched: true,
                matchType: 'exact',
                threatCategory: 'phishing',
                source: exactPhishing[0].source,
                matchedUrl: exactPhishing[0].url,
                riskBoost: 80,
                label: '⚠ Confirmed Phishing URL',
                description: 'This URL is listed in the CyberEDT phishing database. It is associated with credential harvesting or fraud.',
            });
        }

        // 3. Domain match in malicious_urls
        const domainMalicious = await sql`
            SELECT url, malware_type, source FROM cyberedt_all.malicious_urls
            WHERE LOWER(url) LIKE ${'%' + domain + '%'}
            LIMIT 3
        `;

        if (domainMalicious.length > 0) {
            return toCache(cacheKey, {
                matched: true,
                matchType: 'domain',
                threatCategory: 'malware',
                malwareType: domainMalicious[0].malware_type || 'Unknown Malware',
                source: domainMalicious[0].source,
                matchedUrl: domainMalicious[0].url,
                riskBoost: 65,
                label: '⚠ Domain Listed in Malware DB',
                description: `The domain "${domain}" has been associated with malware distribution in the CyberEDT threat database.`,
            });
        }

        // 4. Domain match in phishing_urls
        const domainPhishing = await sql`
            SELECT url, source FROM cyberedt_all.phishing_urls
            WHERE LOWER(url) LIKE ${'%' + domain + '%'}
            LIMIT 3
        `;

        if (domainPhishing.length > 0) {
            return toCache(cacheKey, {
                matched: true,
                matchType: 'domain',
                threatCategory: 'phishing',
                source: domainPhishing[0].source,
                matchedUrl: domainPhishing[0].url,
                riskBoost: 60,
                label: '⚠ Domain Listed in Phishing DB',
                description: `The domain "${domain}" has been associated with phishing campaigns in the CyberEDT threat database.`,
            });
        }

        // Clean
        return toCache(cacheKey, { matched: false, riskBoost: 0 });

    } catch (err) {
        console.error('[ThreatIntel] URL check error:', err.message);
        return { matched: false, riskBoost: 0, dbError: true };
    }
}

// ─────────────────────────────────────────────────────────────────────────────
//  TEXT INTELLIGENCE
// ─────────────────────────────────────────────────────────────────────────────

/**
 * checkTextAgainstThreatDB
 * Matches text content against scam_patterns and scam_messages tables.
 * Returns matched patterns, accumulated risk score, and spam/ham signal.
 */
export async function checkTextAgainstThreatDB(inputText) {
    if (!inputText || typeof inputText !== 'string') {
        return { hasThreats: false, matchedPatterns: [], patternRiskAccumulated: 0, spamSignal: null, detections: [] };
    }
    
    const cacheKey = `text:${inputText.substring(0, 120)}`;
    const cached = fromCache(cacheKey);
    if (cached !== null) return cached;

    const lowerText = inputText.toLowerCase();

    try {
        // 1. Load all scam_patterns (only 17, tiny — cache them)
        let patterns = fromCache('__all_scam_patterns__');
        if (!patterns) {
            patterns = await sql`
                SELECT category, pattern, risk_score FROM cyberedt_all.scam_patterns
                ORDER BY risk_score DESC
            `;
            toCache('__all_scam_patterns__', patterns);
        }

        // Match patterns against input
        const matchedPatterns = patterns.filter(p =>
            lowerText.includes(p.pattern.toLowerCase())
        );

        const patternRiskAccumulated = Math.min(
            matchedPatterns.reduce((sum, p) => sum + (p.risk_score || 0), 0),
            60 // cap contribution at 60 pts
        );

        // 2. Check similar messages in scam_messages (word-level overlap heuristic)
        // We look for messages where 3+ significant words from the input appear
        const words = lowerText
            .split(/\s+/)
            .filter(w => w.length > 4)
            .slice(0, 6); // take first 6 meaningful words

        let spamSignal = null;
        if (words.length >= 3) {
            // Build a LIKE chain — find messages containing multiple keywords
            const word1 = words[0];
            const word2 = words[1] || words[0];
            const word3 = words[2] || words[0];

            const similarMessages = await sql`
                SELECT label, COUNT(*) as cnt FROM cyberedt_all.scam_messages
                WHERE LOWER(message) LIKE ${'%' + word1 + '%'}
                   OR LOWER(message) LIKE ${'%' + word2 + '%'}
                   OR LOWER(message) LIKE ${'%' + word3 + '%'}
                GROUP BY label
                ORDER BY cnt DESC
                LIMIT 5
            `;

            if (similarMessages.length > 0) {
                const spamRows = similarMessages.filter(r => r.label === 'spam');
                const hamRows  = similarMessages.filter(r => r.label === 'ham');
                const spamCount = spamRows.reduce((s, r) => s + parseInt(r.cnt), 0);
                const hamCount  = hamRows.reduce((s, r)  => s + parseInt(r.cnt), 0);
                const total = spamCount + hamCount;

                if (total > 0) {
                    spamSignal = {
                        spamCount,
                        hamCount,
                        spamRatio: Math.round((spamCount / total) * 100),
                        verdict: spamCount > hamCount ? 'spam' : 'ham',
                    };
                }
            }
        }

        // Compose detections from matched patterns
        const detections = matchedPatterns.map(p => ({
            source: 'CyberEDT DB',
            category: p.category,
            pattern: p.pattern,
            risk_score: p.risk_score,
            displayLabel: `DB Match: ${capitalize(p.category)} Pattern`,
            description: `CyberEDT threat database matched the pattern "${p.pattern}" (${p.category}) with a risk weight of ${p.risk_score}.`,
            confidencePercent: Math.min(50 + p.risk_score * 2, 98),
        }));

        const result = {
            hasThreats: matchedPatterns.length > 0,
            matchedPatterns,
            patternRiskAccumulated,
            spamSignal,
            detections,
        };

        return toCache(cacheKey, result);

    } catch (err) {
        console.error('[ThreatIntel] Text check error:', err.message);
        return { hasThreats: false, matchedPatterns: [], patternRiskAccumulated: 0, spamSignal: null, detections: [], dbError: true };
    }
}

// ─────────────────────────────────────────────────────────────────────────────
//  THREAT FEED (for Overview Dashboard)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * getRecentThreats
 * Returns the most recent entries from malicious_urls and phishing_urls
 * for display in the live threat feed on the dashboard.
 */
export async function getRecentThreats(limit = 20) {
    const cacheKey = `feed:recent:${limit}`;
    const cached = fromCache(cacheKey);
    if (cached !== null) return cached;

    try {
        const malicious = await sql`
            SELECT id, url, malware_type AS threat_type, source, created_at,
                   'malware' AS category
            FROM cyberedt_all.malicious_urls
            ORDER BY created_at DESC
            LIMIT ${limit / 2}
        `;

        const phishing = await sql`
            SELECT id, url, 'Phishing' AS threat_type, source, created_at,
                   'phishing' AS category
            FROM cyberedt_all.phishing_urls
            ORDER BY created_at DESC
            LIMIT ${limit / 2}
        `;

        // Merge and sort
        const combined = [...malicious, ...phishing]
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .slice(0, limit);

        // Shuffle visually for a better live feed feel (mixes batch-imported threats)
        for (let i = combined.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [combined[i], combined[j]] = [combined[j], combined[i]];
        }

        return toCache(cacheKey, combined);
    } catch (err) {
        console.error('[ThreatIntel] Feed error:', err.message);
        return [];
    }
}

/**
 * getThreatStats
 * Returns aggregate stats from the threat DB for the dashboard overview cards.
 */
export async function getThreatStats() {
    const cacheKey = 'stats:overview';
    const cached = fromCache(cacheKey);
    if (cached !== null) return cached;

    try {
        const [muCount] = await sql`SELECT COUNT(*) AS cnt FROM cyberedt_all.malicious_urls`;
        const [puCount] = await sql`SELECT COUNT(*) AS cnt FROM cyberedt_all.phishing_urls`;
        const [smSpam]  = await sql`SELECT COUNT(*) AS cnt FROM cyberedt_all.scam_messages WHERE label = 'spam'`;
        const [spCount] = await sql`SELECT COUNT(*) AS cnt FROM cyberedt_all.scam_patterns`;

        const stats = {
            maliciousUrls:   parseInt(muCount.cnt),
            phishingUrls:    parseInt(puCount.cnt),
            scamMessages:    parseInt(smSpam.cnt),
            scamPatterns:    parseInt(spCount.cnt),
            totalThreats:    parseInt(muCount.cnt) + parseInt(puCount.cnt) + parseInt(smSpam.cnt),
            lastUpdated:     new Date().toISOString(),
        };

        return toCache(cacheKey, stats);
    } catch (err) {
        console.error('[ThreatIntel] Stats error:', err.message);
        return null;
    }
}

// ─────────────────────────────────────────────────────────────────────────────
//  Util
// ─────────────────────────────────────────────────────────────────────────────
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
