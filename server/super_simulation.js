import { analyzeManipulation } from './analyzer/patternEngine.js';

const THREAT_SCENARIOS = [
    {
        model: "Business Email Compromise (BEC)",
        text: `Subject: Urgent Invoice Change - Action Required
Hi Finance Team, 
We've updated our banking details for all future vendor payments starting today. 
Please use the attached details for the pending March invoice to avoid late fees. 
This must be finalized shortly to ensure the CFO's payment schedule remains on track.
Confirm once the vendor register is updated.
- Finance Department`
    },
    {
        model: "WhatsApp/SMS Smishing (Smishing)",
        text: `POST OFFICE: Your package could not be delivered due to an incomplete address. 
Please update your delivery details via the link below. 
Failure to act within the next hour will result in the package being returned to sender.
Post Office Delivery Helpdesk`
    },
    {
        model: "Fake Government/Audit Notice",
        text: `Subject: IRS COMPLIANCE AUDIT #92831 - FINAL NOTIFICATION
Your business has been flagged for an immediate compliance audit under Federal Tax Statute 11-B. 
Discrepancies in your 2024 earnings require immediate re-validation. 
Failure to comply within 48 hours will trigger a formal investigation and potential asset seizure. 
Visit our official compliance portal immediately to submit documents.
IRS Compliance Team`
    },
    {
        model: "Stealthy Spear Phishing",
        text: `Subject: Quick look at the project projection gaps
Hey Nitesh,
I'm finishing up the final report for the Board of Directors. 
I noticed some projection gaps in the shared folder we discussed last week. 
Can you quickly confirm the details on the attached schedule before my 2 PM meeting?
Need to get this finalized shortly. Thanks!`
    }
];

console.log("=========================================");
console.log("PSY-WALL COMPREHENSIVE THREAT SIMULATION");
console.log("=========================================");

THREAT_SCENARIOS.forEach(scenario => {
    const result = analyzeManipulation(scenario.text);
    console.log(`\nTHREAT MODEL: ${scenario.model}`);
    console.log(`Risk Score: ${result.riskAnalysis.score}/100 [Level: ${result.riskLevel}]`);
    console.log(`Tactics Detected: ${result.detections.length}`);

    result.detections.forEach(d => {
        console.log(`  - [${d.label}] (Confidence: ${d.confidencePercent}%)`);
        if (d.advice) console.log(`    Advice: ${d.advice}`);
    });

    console.log(`Impact Warning: ${result.alertPayload.impactWarning}`);
    console.log("-----------------------------------------");
});
