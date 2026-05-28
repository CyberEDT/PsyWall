import express from 'express';
import { getRecentThreats, getThreatStats } from '../utils/threatIntelService.js';

const router = express.Router();

/**
 * GET /api/threat-feed
 * Returns the most recent threat entries from the CyberEDT central database
 * Used by Overview dashboard and live feed components
 */
router.get('/', async (req, res) => {
    try {
        const limit = Math.min(parseInt(req.query.limit) || 20, 50);
        const threats = await getRecentThreats(limit);

        res.json({
            status: 'success',
            count: threats.length,
            source: 'CyberEDT Central Threat DB',
            threats,
            meta: {
                fetchedAt: new Date().toISOString(),
                tables: ['malicious_urls', 'phishing_urls'],
            }
        });
    } catch (error) {
        console.error('THREAT_FEED_ERROR:', error);
        res.status(500).json({ status: 'error', message: 'Failed to fetch threat feed.' });
    }
});

/**
 * GET /api/threat-feed/stats
 * Returns aggregate threat database statistics for dashboard overview cards
 */
router.get('/stats', async (req, res) => {
    try {
        const stats = await getThreatStats();
        if (!stats) {
            return res.status(503).json({ status: 'error', message: 'Stats unavailable.' });
        }
        res.json({ status: 'success', ...stats });
    } catch (error) {
        console.error('THREAT_STATS_ERROR:', error);
        res.status(500).json({ status: 'error', message: 'Failed to fetch threat stats.' });
    }
});

export default router;
