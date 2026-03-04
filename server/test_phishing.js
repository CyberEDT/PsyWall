import { analyzeManipulation } from './analyzer/patternEngine.js';

const phishingEmail = `Dear Customer,

Our fraud detection system has identified a potentially unauthorized transaction on your account.

According to regulatory compliance requirements, you must confirm your account details immediately to avoid account freezing.

Click below to secure your funds before access is permanently restricted.

Bank Compliance Department`;

const result = analyzeManipulation(phishingEmail);
console.log(JSON.stringify(result, null, 2));
