import express from 'express';
import { analysisRateLimit } from './middleware/rateLimiter.js';
import multer from 'multer';

const router = express.Router();

// Setup multer for memory storage (we don't need to save the file to disk for this simulation)
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

router.post('/', analysisRateLimit, upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "Image file is required" });
        }

        // Simulate async processing (e.g. Vision API OCR Extraction)
        await new Promise(r => setTimeout(r, 2500));
        
        const score = 89;
        const extractedOcrText = "URGENT PAYMENT REQUIRED\n\nDear Customer,\nYour account will be suspended in 24 hours due to unpaid fees. Please click the link below to verify your identity and process the payment immediately.\n\nSupport Team";

        res.json({
            status: 'success',
            riskAnalysis: { score },
            extractedText: extractedOcrText,
            alertPayload: {
                title: 'Malicious Image Artifact Detected',
                message: 'OCR extracted urgent demands for payment hidden in the image pixels.',
                impactWarning: 'Fraudsters use images to bypass text-based spam filters. Do not pay.'
            },
            detections: [
                { displayLabel: 'Filter Evasion (Image)', confidencePercent: 98, _isAdvanced: true, description: 'Text embedded in image to avoid signature detection.', evidence: [{context: 'Extracted: "URGENT PAYMENT REQUIRED"'}] },
                { displayLabel: 'Coercion', confidencePercent: 85, description: 'Threats of account suspension found in OCR.', evidence: [{context: 'Extracted: "Account suspended in 24 hours"'}] }
            ]
        });
    } catch (error) {
        console.error('VISION_OCR_ERROR:', error);
        res.status(500).json({
            status: "error",
            message: "An internal processing failure occurred during Image analysis."
        });
    }
});

export default router;
