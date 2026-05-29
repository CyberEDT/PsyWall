import { neon } from '@neondatabase/serverless';

/**
 * PsyWall — Neon DB Client
 * Central threat intelligence database from CyberEDT
 */
let sql;

if (process.env.NEON_DATABASE_URL) {
    sql = neon(process.env.NEON_DATABASE_URL);
} else {
    // Mock SQL tagged template literal for Zero-Retention / Local MVP mode
    sql = async function(strings, ...values) {
        const query = strings.join('?').toLowerCase();
        
        // Mock getThreatStats
        if (query.includes('count(*)') && query.includes('malicious_urls')) return [{ cnt: '12046' }];
        if (query.includes('count(*)') && query.includes('phishing_urls')) return [{ cnt: '614' }];
        if (query.includes('count(*)') && query.includes('scam_messages')) return [{ cnt: '52287' }];
        if (query.includes('count(*)') && query.includes('scam_patterns')) return [{ cnt: '17' }];

        // Mock getRecentThreats
        if (query.includes('malicious_urls') && query.includes('order by created_at desc')) {
             return Array.from({ length: 10 }).map((_, i) => ({
                 id: `m-${i}`, url: `http://malicious-domain-${i}.com/payload.exe`, 
                 threat_type: 'Ransomware', source: 'URLHaus', created_at: new Date(Date.now() - i * 600000).toISOString(), category: 'malware'
             }));
        }
        if (query.includes('phishing_urls') && query.includes('order by created_at desc')) {
             return Array.from({ length: 10 }).map((_, i) => ({
                 id: `p-${i}`, url: `http://secure-login-verify-${i}.net/auth`, 
                 threat_type: 'Phishing', source: 'PhishTank', created_at: new Date(Date.now() - i * 800000).toISOString(), category: 'phishing'
             }));
        }
        
        // All other queries (text analysis, url analysis) default to empty
        return [];
    };
}

export default sql;
