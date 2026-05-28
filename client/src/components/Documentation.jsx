import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Documentation = () => {
    const [activeSection, setActiveSection] = useState('overview');

    const sections = [
        { id: 'overview', title: 'Overview' },
        { id: 'architecture', title: 'System Architecture' },
        { id: 'engine', title: 'Detection Engine' },
        { id: 'scoring', title: 'Risk Scoring Methodology' },
        { id: 'categories', title: 'Detection Categories' },
        { id: 'usecases', title: 'Use Cases' },
        { id: 'limitations', title: 'Limitations' },
        { id: 'version', title: 'Version History' },
    ];

    const renderContent = () => {
        switch (activeSection) {
            case 'overview':
                return (
                    <motion.section key="overview" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                        <h1>Overview</h1>
                        <p>
                            PsyWall is a cognitive intrusion detection system (CIDS) engineered to evaluate linguistic and psychological manipulation signals within text-based digital content. Unlike traditional security systems that focus on code-based vulnerabilities, PsyWall addresses the human-centric vulnerability of cognitive exploitation.
                        </p>
                        <div>
                            <div>
                                <h3>Purpose</h3>
                                <p>To provide users with an analytical layer of protection against sophisticated influence operations and predatory communication tactics.</p>
                            </div>
                            <div>
                                <h3>Intended Users</h3>
                                <p>Security researchers, financial analysts, investigative journalists, and high-risk digital asset holders.</p>
                            </div>
                            <div>
                                <h3>Scope</h3>
                                <p>Analysis of synchronous and asynchronous text communications, including marketing copy, investment pitches, and social media discourse.</p>
                            </div>
                            <div>
                                <h3>Non-Goals</h3>
                                <p>PsyWall does not perform fact-checking, determine truth/falsity, or provide legal advice.</p>
                            </div>
                        </div>
                    </motion.section>
                );
            case 'architecture':
                return (
                    <motion.section key="architecture" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                        <h2>System Architecture</h2>
                        <pre>{`Input Content
      ↓
Preprocessing Layer (Normalization & Tokenization)
      ↓
Linguistic Pattern Scanner (Heuristic Signal Extraction)
      ↓
Psychological Trigger Classifier (Multistage Pattern Matching)
      ↓
Weighted Risk Scoring Engine (Intensity & Confidence Calculation)
      ↓
Structure JSON Report / UI Visualization Output`}</pre>
                        <div>
                            <h4>Preprocessing Layer</h4>
                            <p>Normalizes input text by removing non-semantic characters and performing standard tokenization for downstream analysis.</p>
                        </div>
                        <div>
                            <h4>Linguistic Pattern Scanner</h4>
                            <p>Extracts specific syntactic structures and vocabulary choices frequently associated with influence operations.</p>
                        </div>
                        <div>
                            <h4>Psychological Trigger Classifier</h4>
                            <p>Matches extracted patterns against our proprietary framework of known manipulation categories.</p>
                        </div>
                        <div>
                            <h4>Risk Scoring Engine</h4>
                            <p>Synthesizes classified triggers into a unified risk metric based on signal density and established tactical weights.</p>
                        </div>
                    </motion.section>
                );
            case 'engine':
                return (
                    <motion.section key="engine" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                        <h2>Detection Engine</h2>
                        <p>The PsyWall engine operates on a deterministic heuristic model, avoiding the interpretability issues often associated with "black box" machine learning approaches. This ensures that every detection can be traced back to specific linguistic evidence.</p>
                        <ul>
                            <li><strong>Heuristic Trigger Detection:</strong> Predefined rulesets that identify high-probability manipulation markers.</li>
                            <li><strong>Emotional Tone Markers:</strong> Identification of extreme sentiment shifts designed to invoke panic or euphoria.</li>
                            <li><strong>Signal Weighting:</strong> Not all triggers are equal; the engine applies dynamic weights based on the rarity and severity of the detected pattern.</li>
                        </ul>
                    </motion.section>
                );
            case 'scoring':
                return (
                    <motion.section key="scoring" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                        <h2>Risk Scoring Methodology</h2>
                        <p>The risk score is a numerical representation of the likelihood and intensity of cognitive manipulation present in the sample.</p>
                        <table>
                            <thead>
                                <tr>
                                    <th>Range</th>
                                    <th>Level</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>70–100</td><td>Critical</td></tr>
                                <tr><td>30–69</td><td>Elevated</td></tr>
                                <tr><td>0–29</td><td>Minimal</td></tr>
                            </tbody>
                        </table>
                        <p>False positive handling is managed through confidence mapping. Samples with sparse evidence result in lower confidence scores, even if the primary risk score is high, signaling the need for increased human scrutiny.</p>
                    </motion.section>
                );
            case 'categories':
                return (
                    <motion.section key="categories" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                        <h2>Detection Categories</h2>
                        {[
                            {
                                name: 'Artificial Urgency',
                                def: 'The use of manufactured deadlines or time-pressure to force bypass of critical thinking.',
                                signals: 'Countdown language, "expires soon", "one-time opportunity".',
                                impact: 'High risk of FOMO-induced error.'
                            },
                            {
                                name: 'Authority Bias',
                                def: 'Subtle or overt signaling of rank, expertise, or institution to discourage questioning.',
                                signals: 'Appeals to unspecified "experts", credential dropping, formalistic jargon.',
                                impact: 'Suppression of healthy skepticism.'
                            },
                            {
                                name: 'Fear-Based Persuasion',
                                def: 'Framing information around a perceived threat to induce defensive action.',
                                signals: "Catastrophic predictions, \"don't lose everything\", threat-adjacent metaphors.",
                                impact: 'Emotional hijacking toward specific actions.'
                            }
                        ].map((cat, i) => (
                            <div key={i}>
                                <h3>{cat.name}</h3>
                                <div>
                                    <div><strong>Definition</strong><p>{cat.def}</p></div>
                                    <div><strong>Example Signals</strong><p>{cat.signals}</p></div>
                                    <div><strong>Impact Risk</strong><p>{cat.impact}</p></div>
                                </div>
                            </div>
                        ))}
                    </motion.section>
                );
            case 'usecases':
                return (
                    <motion.section key="usecases" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                        <h2>Use Cases</h2>
                        <ul>
                            <li>
                                <h4>Scam Detection Analysis</h4>
                                <p>Deconstructing phishing emails and fraudulent investment offers for high-pressure tactics.</p>
                            </li>
                            <li>
                                <h4>Investment Pitch Review</h4>
                                <p>Identifying FOMO-driven persuasion and authority bias in financial presentations.</p>
                            </li>
                            <li>
                                <h4>Marketing Evaluation</h4>
                                <p>Auditing copywriting for predatory psychological triggers and manipulative framing.</p>
                            </li>
                            <li>
                                <h4>Security Research</h4>
                                <p>Analyzing coordinated influence operations and disinformation narratives.</p>
                            </li>
                        </ul>
                    </motion.section>
                );
            case 'limitations':
                return (
                    <motion.section key="limitations" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                        <h2>Limitations</h2>
                        <p>PsyWall is an analytical support tool, not an absolute truth engine. Users should be aware of the following critical boundaries:</p>
                        <ul>
                            <li><strong>Not a lie detector:</strong> It analyzes intent through linguistic framing, not the factual accuracy of statements.</li>
                            <li><strong>Probabilistic output:</strong> Results indicate risk signals, not definite proof of malice.</li>
                            <li><strong>Context dependency:</strong> Certain patterns (e.g., authority bias) may be contextually appropriate in institutional settings.</li>
                            <li><strong>Requires human interpretation:</strong> Final judgment should always be exercised by a qualified analyst.</li>
                        </ul>
                    </motion.section>
                );
            case 'version':
                return (
                    <motion.section key="version" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                        <h2>Version History</h2>
                        <div>
                            <span>v0.1.0-alpha</span>
                            <div>
                                <p><strong>Initial Engine Deployment</strong></p>
                                <ul>
                                    <li>Core heuristic pattern scanner</li>
                                    <li>Basic risk scoring algorithms</li>
                                    <li>Browser extension integration (Alpha)</li>
                                    <li>Standard category classification (6 categories)</li>
                                </ul>
                            </div>
                        </div>
                    </motion.section>
                );
            default:
                return null;
        }
    };

    return (
        <div className="max-w-6xl mx-auto py-8 px-6">
            <Link to="/" className="inline-flex items-center gap-2 text-indigo-600 font-bold mb-8 hover:text-indigo-700">
                <ArrowLeft size={16} /> Back to Home
            </Link>
            <div className="flex gap-8 items-start">
                {/* SIDEBAR NAV */}
                <aside>
                    <nav>
                        {sections.map((s) => (
                            <button
                                key={s.id}
                                onClick={() => setActiveSection(s.id)}
                                style={{ fontWeight: activeSection === s.id ? 'bold' : 'normal' }}
                            >
                                {s.title}
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* MAIN CONTENT */}
                <main>
                    <AnimatePresence mode="wait">
                        {renderContent()}
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
};

export default Documentation;
