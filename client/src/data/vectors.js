export const vectors = [
  {
    id: "urgency-pressure",
    title: "Urgency Pressure",
    category: "Psychological Manipulation",
    severity: "Critical",
    frequency: 94,
    impactScore: 98,
    icon: "Zap",
    color: "text-red-500",
    bg: "bg-red-50",
    border: "border-red-100",
    overview: {
      definition: "Artificial time pressure designed to bypass rational thinking and force immediate action."
    },
    psychology: {
      triggers: ["Fear response", "Emotional hijacking", "Cognitive overload", "Panic psychology"],
      explanation: "Emotional arousal narrows cognitive focus. When an individual experiences strong urgency, their capacity for critical analysis is reduced. The threat-response system prioritises immediate action over deliberate analysis."
    },
    attackerUsage: {
      explanation: "Attackers create artificial deadlines to prevent victims from verifying requests. It compresses the decision window, preventing consultation with colleagues or reflection."
    },
    examples: [
      "Your account will be permanently deleted in 24 hours unless you verify your identity immediately.",
      "Urgent executive request: I am in a meeting, need you to process this transfer right now."
    ],
    warningSigns: [
      "⚠ 'Act immediately'",
      "⚠ 'Your account will be suspended'",
      "⚠ 'Only 10 minutes remaining'",
      "⚠ 'Do not tell anyone'"
    ],
    defense: [
      "✓ Pause before acting",
      "✓ Verify through official channels",
      "✓ Never trust urgency alone",
      "✓ Use callback verification",
      "✓ Consult another person"
    ],
    caseStudies: [
      {
        title: "Urgency Scam Targeting an Executive",
        attackerMindset: "Exploited the COO's relationship with the CEO. Used the 'broken phone' pretext to explain the unknown number. Kept the request small enough to avoid triggering financial control processes.",
        victimBehavior: "Wanted to be helpful to a senior colleague, felt comfortable with the relatively small amount, did not wish to challenge a perceived superior.",
        psychologicalTriggers: ["Authority", "Helpfulness", "Relationship loyalty", "Urgency"],
        defenseOpportunity: "Verification of all financial requests regardless of stated identity. Establishment of executive verification codes for out-of-hours requests."
      }
    ],
    relatedVectors: ["authority-bias", "fear-exploitation", "scarcity-framing"],
    radarImpact: { 'Urgency': 100, 'Fear': 80, 'Authority': 50, 'Emotional': 70, 'Financial': 60, 'Scarcity': 90 },
    explainability: {
      flaggedPhrase: "Immediate account suspension",
      intent: "Forces victim into a reactive state to prevent them from inspecting the sender URL or consulting a colleague."
    }
  },
  {
    id: "authority-bias",
    title: "Authority Impersonation",
    category: "Cognitive Exploitation",
    severity: "High",
    frequency: 88,
    impactScore: 92,
    icon: "ShieldCheck",
    color: "text-blue-500",
    bg: "bg-blue-50",
    border: "border-blue-100",
    overview: {
      definition: "The tendency to comply with or believe instructions from perceived authority figures without independent verification."
    },
    psychology: {
      triggers: ["Subservience", "Social conditioning", "Fear of reprimand"],
      explanation: "Social conditioning leads individuals to defer to authority. Humans are programmed from childhood to obey authority figures to maintain social harmony and avoid punishment."
    },
    attackerUsage: {
      explanation: "Impersonation of executives (Whaling), government agencies (HMRC/IRS), banks, or IT departments. They use official titles, logos, and an authoritative tone to demand compliance."
    },
    examples: [
      "An email purportedly from the IT Director instructing staff to reset their passwords via a provided link.",
      "A phone call from the 'Police' or 'Tax Agency' threatening immediate arrest for unpaid balances."
    ],
    warningSigns: [
      "⚠ Requests bypassing normal controls",
      "⚠ Extreme secrecy instructions",
      "⚠ Unsolicited contact from senior executives",
      "⚠ Official logos in poorly formatted emails"
    ],
    defense: [
      "✓ Implement out-of-band verification protocols",
      "✓ Train staff to question authority in digital contexts",
      "✓ Separate gratitude/obedience from professional obligation",
      "✓ Use dual-authorisation for large transactions"
    ],
    caseStudies: [
      {
        title: "Business Email Compromise (BEC) - CFO Targeted",
        attackerMindset: "Highly researched attack impersonating the CEO. Requested an urgent wire transfer for a confidential acquisition to bypass standard checks.",
        victimBehavior: "Did not wish to delay a major transaction or trouble a senior executive. Processed the payment.",
        psychologicalTriggers: ["Authority", "Urgency", "Social pressure"],
        defenseOpportunity: "Mandatory call-back verification for new payment details. Dual-authorisation for large transactions."
      }
    ],
    relatedVectors: ["urgency-pressure", "halo-effect", "fear-exploitation"],
    radarImpact: { 'Urgency': 60, 'Fear': 75, 'Authority': 100, 'Emotional': 50, 'Financial': 80, 'Scarcity': 30 },
    explainability: {
      flaggedPhrase: "As the CEO, I require you to process this immediately",
      intent: "Leverages hierarchical power dynamics to override standard operating procedures."
    }
  },
  {
    id: "fear-exploitation",
    title: "Fear Conditioning",
    category: "Emotional Hijacking",
    severity: "Critical",
    frequency: 82,
    impactScore: 95,
    icon: "AlertTriangle",
    color: "text-orange-500",
    bg: "bg-orange-50",
    border: "border-orange-100",
    overview: {
      definition: "The use of threatening stimuli to produce habitual avoidance or panicked compliance responses."
    },
    psychology: {
      triggers: ["Amygdala hijack", "Threat-response system", "Panic"],
      explanation: "Fear activates the threat-response system, which prioritises immediate action over deliberate analysis. It completely bypasses the logical pre-frontal cortex."
    },
    attackerUsage: {
      explanation: "Repeated ransomware warnings, persistent popup notifications threatening legal action, or sextortion emails threatening to expose compromising material."
    },
    examples: [
      "Ransomware notification: 'Your files are encrypted. Pay within 48 hours or they will be deleted.'",
      "Fake IT Support: 'Your computer is infected with 34 viruses. Call this number immediately.'"
    ],
    warningSigns: [
      "⚠ Threats of legal action or arrest",
      "⚠ Threats of public exposure",
      "⚠ Account termination warnings",
      "⚠ Persistent, escalating threats"
    ],
    defense: [
      "✓ Teach individuals to pause and verify before responding",
      "✓ Establish an incident reporting process that normalises escalation",
      "✓ Understand that legitimate entities rarely threaten immediate catastrophic action"
    ],
    caseStudies: [
      {
        title: "Vishing Impersonation of IT Support",
        attackerMindset: "Constructed a fear-inducing scenario justifying an otherwise unusual request. Used LinkedIn data to appear credible.",
        victimBehavior: "Alarmed by the scenario. Trusted the caller's apparent knowledge. Provided password to 'protect the account'.",
        psychologicalTriggers: ["Fear (account compromise)", "Authority (IT security)", "False helpfulness"],
        defenseOpportunity: "No legitimate IT function requests passwords. Established internal IT verification codes."
      }
    ],
    relatedVectors: ["urgency-pressure", "emotional-hijacking", "authority-bias"],
    radarImpact: { 'Urgency': 85, 'Fear': 100, 'Authority': 70, 'Emotional': 90, 'Financial': 70, 'Scarcity': 40 },
    explainability: {
      flaggedPhrase: "Your data will be permanently deleted and authorities notified",
      intent: "Triggers survival instincts to force irrational compliance."
    }
  },
  {
    id: "social-proof",
    title: "Social Proof",
    category: "Cognitive Exploitation",
    severity: "Moderate",
    frequency: 65,
    impactScore: 60,
    icon: "Network",
    color: "text-purple-500",
    bg: "bg-purple-50",
    border: "border-purple-100",
    overview: {
      definition: "The tendency to conform to the behaviour of others when uncertain about the correct course of action."
    },
    psychology: {
      triggers: ["Herd mentality", "Fear of missing out (FOMO)", "Peer pressure"],
      explanation: "In ambiguous situations, humans look to the actions of others to determine the correct behavior. If 'everyone else is doing it', the brain assumes it must be safe."
    },
    attackerUsage: {
      explanation: "Fabricated endorsements, fake user counts, or manufactured peer behaviour. Used heavily in crypto scams and fake software downloads."
    },
    examples: [
      "Phishing emails stating: 'Thousands of users have already updated their security settings.'",
      "Fake reviews on a malicious browser extension showing 5-star ratings."
    ],
    warningSigns: [
      "⚠ Exaggerated popularity claims",
      "⚠ Unverifiable testimonials",
      "⚠ 'Join 10,000 others who already secured their account'"
    ],
    defense: [
      "✓ Foster independent verification habits",
      "✓ Encourage scepticism of popularity-based claims",
      "✓ Evaluate requests based on policy, not peer behavior"
    ],
    caseStudies: [
      {
        title: "Fake Software Update Scam",
        attackerMindset: "Leveraged social proof by indicating all other employees had already installed the required update.",
        victimBehavior: "Did not want to be the only employee non-compliant, installed the malicious payload.",
        psychologicalTriggers: ["Social Proof", "Fear of reprimand"],
        defenseOpportunity: "Cross-reference update mandates with official IT communication channels."
      }
    ],
    relatedVectors: ["confirmation-bias", "halo-effect"],
    radarImpact: { 'Urgency': 30, 'Fear': 20, 'Authority': 40, 'Emotional': 50, 'Financial': 40, 'Scarcity': 60 },
    explainability: {
      flaggedPhrase: "Most of your colleagues have already completed this",
      intent: "Uses peer pressure to bypass independent security evaluation."
    }
  },
  {
    id: "halo-effect",
    title: "Halo Effect (Brand Spoofing)",
    category: "Cognitive Exploitation",
    severity: "High",
    frequency: 85,
    impactScore: 75,
    icon: "Shield",
    color: "text-indigo-500",
    bg: "bg-indigo-50",
    border: "border-indigo-100",
    overview: {
      definition: "The tendency to extend a positive overall impression of an entity to all its attributes, leading to uncritical trust."
    },
    psychology: {
      triggers: ["Brand trust", "Familiarity bias", "Cognitive ease"],
      explanation: "When we see a familiar, trusted logo (like Microsoft or Google), our brain experiences cognitive ease and automatically transfers the trust we have for the brand to the current message."
    },
    attackerUsage: {
      explanation: "Brand impersonation of trusted organisations. Attackers clone login pages, email templates, and use lookalike domains (typosquatting) to hijack the trust response."
    },
    examples: [
      "An email from 'Microsoft Security' using perfect HTML templates but sent from 'security@m1crosoft-support.com'.",
      "A perfectly cloned PayPal login page hosted on a compromised WordPress site."
    ],
    warningSigns: [
      "⚠ Familiar branding but mismatched sender domains",
      "⚠ Generic salutations ('Dear Customer') from known brands",
      "⚠ Hovering over links reveals strange URLs"
    ],
    defense: [
      "✓ Train individuals to verify sender addresses, not display names",
      "✓ Never assume legitimacy based on appearance or logos alone",
      "✓ Access services directly via bookmarks, not email links"
    ],
    caseStudies: [
      {
        title: "O365 Credential Harvesting",
        attackerMindset: "Replicated Microsoft's exact branding and CSS to harvest enterprise credentials.",
        victimBehavior: "Saw the familiar Microsoft logo and immediately typed in their password without checking the URL bar.",
        psychologicalTriggers: ["Halo Effect", "Habit Exploitation"],
        defenseOpportunity: "Implement FIDO2 hardware keys or enforce strict URL inspection training."
      }
    ],
    relatedVectors: ["social-proof", "authority-bias"],
    radarImpact: { 'Urgency': 40, 'Fear': 30, 'Authority': 85, 'Emotional': 20, 'Financial': 50, 'Scarcity': 10 },
    explainability: {
      flaggedPhrase: "Microsoft Logo Detected - Mismatched Domain",
      intent: "Hijacking established brand trust to bypass visual scrutiny."
    }
  },
  {
    id: "reciprocity-bait",
    title: "Reciprocity Bait",
    category: "Social Manipulation",
    severity: "Moderate",
    frequency: 45,
    impactScore: 70,
    icon: "Gift",
    color: "text-teal-500",
    bg: "bg-teal-50",
    border: "border-teal-100",
    overview: {
      definition: "Exploiting the social norm of returning favours received, even when unsolicited, to extract access or data."
    },
    psychology: {
      triggers: ["Social obligation", "Guilt", "Helpfulness"],
      explanation: "Humans are socially wired to balance the scales. When someone does us a favour, we feel an overwhelming psychological pressure to return it."
    },
    attackerUsage: {
      explanation: "Trust farming, unsolicited gifts of information, or extreme helpfulness. An attacker might 'solve' a minor problem for a target before asking for sensitive network details."
    },
    examples: [
      "An attacker sends a useful free industry report before requesting a favour (e.g., a list of employee emails).",
      "A fake IT vendor helps troubleshoot a minor issue, then asks for admin credentials to 'finish the job'."
    ],
    warningSigns: [
      "⚠ Unsolicited helpfulness from unknown parties",
      "⚠ Free gifts or highly valuable information offered for nothing",
      "⚠ Immediate requests for favors after providing 'help'"
    ],
    defense: [
      "✓ Separate gratitude from professional obligation",
      "✓ Train staff to report unsolicited gifts or unusual helpfulness",
      "✓ Strict information-sharing protocols"
    ],
    caseStudies: [
      {
        title: "The Helpful Contractor",
        attackerMindset: "Attacker posed as a software vendor, providing free tech support for an unrelated issue to build rapport.",
        victimBehavior: "Felt indebted to the 'vendor' for saving them time, and willingly handed over API keys when asked later.",
        psychologicalTriggers: ["Reciprocity", "Trust farming"],
        defenseOpportunity: "Identity verification procedures and strict access control policies regardless of relationship."
      }
    ],
    relatedVectors: ["authority-bias", "social-proof"],
    radarImpact: { 'Urgency': 10, 'Fear': 10, 'Authority': 40, 'Emotional': 80, 'Financial': 50, 'Scarcity': 20 },
    explainability: {
      flaggedPhrase: "I've attached that free report for you. By the way, could you...",
      intent: "Creating social debt to extract disproportionate value in return."
    }
  },
  {
    id: "scarcity-framing",
    title: "Scarcity Framing",
    category: "Psychological Manipulation",
    severity: "High",
    frequency: 72,
    impactScore: 85,
    icon: "Clock",
    color: "text-pink-500",
    bg: "bg-pink-50",
    border: "border-pink-100",
    overview: {
      definition: "The perception that limited availability increases value and induces intense urgency."
    },
    psychology: {
      triggers: ["Loss aversion", "FOMO", "Competitive instinct"],
      explanation: "The human brain values things more when they are rare. Scarcity triggers loss aversion—the psychological pain of losing out on an opportunity overrides logical risk assessment."
    },
    attackerUsage: {
      explanation: "Used extensively in fraud, crypto scams, and fake HR emails. Attackers create artificial limits on time or quantity to force immediate action."
    },
    examples: [
      "'Only 3 Bitcoin remaining at this price. Buy now.'",
      "'This executive bonus sign-up portal closes in 30 minutes.'"
    ],
    warningSigns: [
      "⚠ Countdown timers in emails or websites",
      "⚠ 'Limited time offer'",
      "⚠ 'Account deletion pending - act now'"
    ],
    defense: [
      "✓ Recognise artificial urgency/scarcity as a primary red flag",
      "✓ Establish mandatory cooling-off periods for financial actions",
      "✓ Assume that legitimate corporate actions rarely expire in minutes"
    ],
    caseStudies: [
      {
        title: "Fake HR Bonus Scam",
        attackerMindset: "Sent an email offering a limited pool of bonus funds for the first 50 employees who registered their bank details.",
        victimBehavior: "Rushed to enter details to avoid missing out on free money.",
        psychologicalTriggers: ["Scarcity", "Reward anticipation", "Urgency"],
        defenseOpportunity: "Verify internal HR communications via the company intranet before entering sensitive data."
      }
    ],
    relatedVectors: ["urgency-pressure", "fear-exploitation"],
    radarImpact: { 'Urgency': 95, 'Fear': 60, 'Authority': 30, 'Emotional': 70, 'Financial': 90, 'Scarcity': 100 },
    explainability: {
      flaggedPhrase: "Offer expires in 15 minutes",
      intent: "Weaponizing FOMO to eliminate the victim's critical thinking window."
    }
  }
];
