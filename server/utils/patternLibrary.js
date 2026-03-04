/**
 * Manipulation Pattern Library
 * Optimized: Precompiled Regex markers for high-performance scanning.
 */

export const MANIPULATION_PATTERNS = {
    URGENCY: {
        label: 'Urgency Pressure',
        weight: 0.85,
        regex: /\b(act now|limited time|expires|last chance|hurry|don't wait|only a few hours|deadline|must act|immediately|today only|within the next (hour|15 minutes|30 minutes)|expiring today|final notice|final notification|scheduled within|before 5:00 PM|urgent response required|quick confirmation|finalize shortly|before my [0-9]+ PM meeting)\b/gi,
        description: 'Attempts to bypass rational thought by creating artificial time pressure.'
    },
    FEAR: {
        label: 'Fear Amplification',
        weight: 0.95,
        regex: /\b(danger|threat|warning|scary|terrifying|killer|victim|attack|crisis|emergency|collapse|ruin|protect yourself|stay safe|account suspension|unrecognized device|account termination|payment delay|data loss|deletion|compromised|legal notice|penalty|enforcement|legal escalation|suspension|breach detected|risk exposure|multiple login attempts|asset seizure|formal investigation|returned to sender|legal proceedings|non-compliance)\b/gi,
        description: 'Uses emotional distress or anxiety to influence decision making.'
    },
    AUTHORITY: {
        label: 'Authority Bias',
        weight: 0.7,
        regex: /\b(experts say|doctors recommend|scientists prove|official source|verified|renowned|leading|academic|verified by|authorized|regulatory compliance|legally required|mandatory update|official policy|Security Operations Team|Human Resources|Investment Advisory Team|hiring board|Executive Recruitment Team|CEO|CFO|Taxpayer|IRS|federal guidelines|internal audit|regulators require|compliance mandate|Federal Tax Statute|Post Office|Board of Directors|Finance Department)\b/gi,
        description: 'Uses perceived status or expertise to discourage questioning of information.'
    },
    SCARCITY: {
        label: 'Scarcity Modeling',
        weight: 0.8,
        regex: /\b(running out|low stock|exclusive|rare|hard to find|only [0-9]+ left|unique opportunity|not available elsewhere|limited allocation|Only [0-9]+ allocations|early participation|confidential|shortlist closes|early access|discounted pricing|surge dramatically|private token sale)\b/gi,
        description: 'Creates a sense of shortage to increase perceived value.'
    },
    SOCIAL_PROOF: {
        label: 'Social Proof / Bandwagon',
        weight: 0.6,
        regex: /\b(everyone is|join thousands|trusted by|join now|[0-9]+ users|millions|people are talking|don't be left out|thousands of investors|thousands have already|most users|industry leaders)\b/gi,
        description: 'Uses group consensus to validate a claim without evidence.'
    },
    RAGE_TRIGGER: {
        label: 'Rage / Outrage Trigger',
        weight: 0.95,
        regex: /\b(outrageous|disgrace|unacceptable|betrayal|shameful|insult|disgusting|furious|horrifying|wake up|sheep)\b/gi,
        description: 'Designed to provoke anger or indignation to increase engagement/sharing.'
    },
    DECEPTIVE_IMPERSONATION: {
        label: 'Institutional Impersonation',
        weight: 0.8,
        regex: /\b(Dear Customer|Dear User|Valued Customer|Dear Account Holder|Security Department|Compliance Department|Fraud Detection System|Security Team|IT Support|Billing Department|Support Desk|Service Desk|Administrator|Account Verification|Vendor Management|Payroll Department|IT Helpdesk|Mailbox Support|Post Office Delivery)\b/gi,
        description: 'Uses generic greetings or fake institutional titles to establish false trust.'
    },
    THREAT_CONSEQUENCE: {
        label: 'Coercive Consequence',
        weight: 0.95,
        regex: /\b(account freezing|permanently restricted|unauthorized transaction|account suspended|unusual activity|suspicious login|verify your identity|prevent access loss|identity theft|security breach|compromised|action required|final notice|urgent notice)\b/gi,
        description: 'Threatens negative outcomes to force immediate, unthinking action.'
    },
    CREDENTIAL_HARVESTING: {
        label: 'Data Extraction Hook',
        weight: 0.95,
        regex: /\b(confirm your account|verify your details|login to secure|click below|secure your funds|update your information|confirm now|action required immediately|validate your account|click here|follow the link|update payment|verification form)\b/gi,
        description: 'Directs users toward specific actions intended to capture sensitive information.'
    },
    IRREVERSIBILITY: {
        label: 'Irreversibility Framing',
        weight: 0.9,
        regex: /\b(irreversible|permanent data loss|permanently removed|cannot be undone|access is permanently restricted|forfeiture|final notification)\b/gi,
        description: 'Frames a situation as unchangeable to increase anxiety and prevent second thoughts.'
    },
    EMOTIONAL_EXPLOITATION: {
        label: 'Emotional Manipulation',
        weight: 0.85,
        regex: /\b(help is needed|devastating losses|others suffer|save lives|protect what matters|your family|guilt|don't let them down)\b/gi,
        description: 'Uses guilt, sympathy, or moral pressure to bypass logical analysis.'
    }
};
