import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

/**
 * Validation and Sanitization Middleware
 */
export const validateAnalysisRequest = (req, res, next) => {
    const { text } = req.body;

    if (!text || typeof text !== 'string') {
        return res.status(400).json({
            status: "error",
            code: "INVALID_INPUT",
            message: "No textual content provided."
        });
    }

    if (text.length > 25000) {
        return res.status(413).json({
            status: "error",
            code: "LENGTH_EXCEEDED",
            message: "Content exceeds cognitive processing limits (max 25k chars)."
        });
    }

    // Sanitization
    req.sanitizedText = DOMPurify.sanitize(text, { ALLOWED_TAGS: [] });
    next();
};
