import { analyzeManipulation } from './analyzer/patternEngine.js';

const SCENARIOS = [
    {
        name: "1. Account Suspension",
        text: `Subject: Immediate Action Required – Account Suspension Notice
Dear User,
We detected unusual activity on your account from an unrecognized device. For your protection, your account access has been temporarily restricted.
To prevent permanent suspension, please verify your identity within the next 15 minutes using the secure link below.
Failure to complete verification may result in irreversible account termination.
Security Operations Team`
    },
    {
        name: "2. CEO Impersonation",
        text: `Subject: Immediate Task – Confidential
Hi,
I need you to process a confidential payment today. I’m currently in meetings and cannot take calls.
This must be completed within the next hour to secure a sensitive acquisition opportunity.
Do not discuss this with anyone until finalized. Confirm once done.
– CEO`
    },
    {
        name: "3. Charity Emotional Exploitation",
        text: `Subject: Your Help Is Needed Today
Families are facing devastating losses after last night’s disaster.
Even a small donation made immediately could save lives.
Don’t wait while others suffer.
Triggers: Emotional exploitation, Guilt induction, Immediate action pressure, Moral framing`
    },
    {
        name: "4. Multi-Layer High Density Phish",
        text: `Subject: Final Compliance Verification Required
This is your final notification.
Regulatory authorities require immediate revalidation of your identity before the upcoming audit cycle.
Only verified accounts will retain uninterrupted access.
Thousands have already completed this step.
Complete verification now to avoid permanent restriction.`
    }
];

SCENARIOS.forEach(s => {
    const result = analyzeManipulation(s.text);
    console.log(`\nSCENARIO: ${s.name}`);
    console.log(`Risk Score: ${result.riskAnalysis.score}`);
    console.log(`Tactics Detected: ${result.detections.map(d => d.label).join(', ')}`);
    console.log(`Summary: ${result.summary}`);
    console.log('-'.repeat(40));
});
