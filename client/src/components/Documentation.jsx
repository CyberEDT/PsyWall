import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
                    <motion.section
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        key="overview"
                    >
                        <h1 className="text-3xl font-bold text-white mb-6">Overview</h1>
                        <div className="prose prose-invert max-w-none space-y-4 text-slate-400">
                            <p>
                                PsyWall is a cognitive intrusion detection system (CIDS) engineered to evaluate linguistic and psychological manipulation signals within text-based digital content. Unlike traditional security systems that focus on code-based vulnerabilities, PsyWall addresses the human-centric vulnerability of cognitive exploitation.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
                                <div>
                                    <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-3">Purpose</h3>
                                    <p className="text-sm leading-relaxed">To provide users with an analytical layer of protection against sophisticated influence operations and predatory communication tactics.</p>
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-3">Intended Users</h3>
                                    <p className="text-sm leading-relaxed">Security researchers, financial analysts, investigative journalists, and high-risk digital asset holders.</p>
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-3">Scope</h3>
                                    <p className="text-sm leading-relaxed">Analysis of synchronous and asynchronous text communications, including marketing copy, investment pitches, and social media discourse.</p>
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-3">Non-Goals</h3>
                                    <p className="text-sm leading-relaxed">PsyWall does not perform fact-checking, determine truth/falsity, or provide legal advice.</p>
                                </div>
                            </div>
                        </div>
                    </motion.section>
                );
            case 'architecture':
                return (
                    <motion.section
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        key="architecture"
                    >
                        <h2 className="text-2xl font-bold text-white mb-8 border-b border-slate-800 pb-4">System Architecture</h2>
                        <div className="bg-[#0e0e0f] border border-slate-800 p-8 rounded font-mono text-xs text-blue-400 mb-8 overflow-x-auto whitespace-pre">
                            {`Input Content
      ↓
Preprocessing Layer (Normalization & Tokenization)
      ↓
Linguistic Pattern Scanner (Heuristic Signal Extraction)
      ↓
Psychological Trigger Classifier (Multistage Pattern Matching)
      ↓
Weighted Risk Scoring Engine (Intensity & Confidence Calculation)
      ↓
Structure JSON Report / UI Visualization Output`}
                        </div>
                        <div className="space-y-6 text-sm leading-relaxed text-slate-400">
                            <div>
                                <h4 className="text-slate-200 font-bold mb-1">Preprocessing Layer</h4>
                                <p>Normalizes input text by removing non-semantic characters and performing standard tokenization for downstream analysis.</p>
                            </div>
                            <div>
                                <h4 className="text-slate-200 font-bold mb-1">Linguistic Pattern Scanner</h4>
                                <p>Extracts specific syntactic structures and vocabulary choices frequently associated with influence operations.</p>
                            </div>
                            <div>
                                <h4 className="text-slate-200 font-bold mb-1">Psychological Trigger Classifier</h4>
                                <p>Matches extracted patterns against our proprietary framework of known manipulation categories.</p>
                            </div>
                            <div>
                                <h4 className="text-slate-200 font-bold mb-1">Risk Scoring Engine</h4>
                                <p>Synthesizes classified triggers into a unified risk metric based on signal density and established tactical weights.</p>
                            </div>
                        </div>
                    </motion.section>
                );
            case 'engine':
                return (
                    <motion.section
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        key="engine"
                    >
                        <h2 className="text-2xl font-bold text-white mb-8 border-b border-slate-800 pb-4">Detection Engine</h2>
                        <div className="space-y-6 text-sm text-slate-400">
                            <p>The PsyWall engine operates on a deterministic heuristic model, avoiding the interpretability issues often associated with &quot;black box&quot; machine learning approaches. This ensures that every detection can be traced back to specific linguistic evidence.</p>
                            <ul className="list-none space-y-4">
                                <li className="pl-4 border-l-2 border-slate-800">
                                    <strong className="text-slate-200">Heuristic Trigger Detection:</strong> Predefined rulesets that identify high-probability manipulation markers.
                                </li>
                                <li className="pl-4 border-l-2 border-slate-800">
                                    <strong className="text-slate-200">Emotional Tone Markers:</strong> Identification of extreme sentiment shifts designed to invoke panic or euphoria.
                                </li>
                                <li className="pl-4 border-l-2 border-slate-800">
                                    <strong className="text-slate-200">Signal Weighting:</strong> Not all triggers are equal; the engine applies dynamic weights based on the rarity and severity of the detected pattern.
                                </li>
                            </ul>
                        </div>
                    </motion.section>
                );
            case 'scoring':
                return (
                    <motion.section
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        key="scoring"
                    >
                        <h2 className="text-2xl font-bold text-white mb-8 border-b border-slate-800 pb-4">Risk Scoring Methodology</h2>
                        <div className="space-y-6 text-sm text-slate-400">
                            <p>The risk score is a numerical representation of the likelihood and intensity of cognitive manipulation present in the sample.</p>
                            <div className="bg-[#111113] p-6 rounded border border-slate-800">
                                <h4 className="text-white font-bold mb-4 text-xs uppercase">Scoring Tiers</h4>
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div className="p-3 bg-red-500/5 border border-red-500/20 rounded">
                                        <div className="text-red-400 font-bold">70–100</div>
                                        <div className="text-[10px] uppercase text-slate-500">Critical</div>
                                    </div>
                                    <div className="p-3 bg-yellow-500/5 border border-yellow-500/20 rounded">
                                        <div className="text-yellow-400 font-bold">30–69</div>
                                        <div className="text-[10px] uppercase text-slate-500">Elevated</div>
                                    </div>
                                    <div className="p-3 bg-emerald-500/5 border border-emerald-500/20 rounded">
                                        <div className="text-emerald-400 font-bold">0–29</div>
                                        <div className="text-[10px] uppercase text-slate-500">Minimal</div>
                                    </div>
                                </div>
                            </div>
                            <p>False positive handling is managed through confidence mapping. Samples with sparse evidence result in lower confidence scores, even if the primary risk score is high, signaling the need for increased human scrutiny.</p>
                        </div>
                    </motion.section>
                );
            case 'categories':
                return (
                    <motion.section
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        key="categories"
                    >
                        <h2 className="text-2xl font-bold text-white mb-8 border-b border-slate-800 pb-4">Detection Categories</h2>
                        <div className="space-y-12 text-slate-400">
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
                                    signals: 'Catastrophic predictions, "don\'t lose everything", threat-adjacent metaphors.',
                                    impact: 'Emotional hijacking toward specific actions.'
                                }
                            ].map((cat, i) => (
                                <div key={i} className="space-y-3">
                                    <h3 className="text-lg font-bold text-white">{cat.name}</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                                        <div>
                                            <span className="text-[10px] uppercase font-bold text-slate-600">Definition</span>
                                            <p className="mt-1">{cat.def}</p>
                                        </div>
                                        <div>
                                            <span className="text-[10px] uppercase font-bold text-slate-600">Example Signals</span>
                                            <p className="mt-1 font-mono text-slate-500 italic text-xs">{cat.signals}</p>
                                        </div>
                                        <div>
                                            <span className="text-[10px] uppercase font-bold text-slate-600">Impact Risk</span>
                                            <p className="mt-1 text-slate-300">{cat.impact}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.section>
                );
            case 'usecases':
                return (
                    <motion.section
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        key="usecases"
                    >
                        <h2 className="text-2xl font-bold text-white mb-8 border-b border-slate-800 pb-4">Use Cases</h2>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none text-sm text-slate-400">
                            <li className="p-4 bg-slate-900/40 rounded border border-slate-800">
                                <h4 className="text-slate-200 font-bold mb-2">Scam Detection Analysis</h4>
                                <p className="text-slate-500">Deconstructing phishing emails and fraudulent investment offers for high-pressure tactics.</p>
                            </li>
                            <li className="p-4 bg-slate-900/40 rounded border border-slate-800">
                                <h4 className="text-slate-200 font-bold mb-2">Investment Pitch Review</h4>
                                <p className="text-slate-500">Identifying FOMO-driven persuasion and authority bias in financial presentations.</p>
                            </li>
                            <li className="p-4 bg-slate-900/40 rounded border border-slate-800">
                                <h4 className="text-slate-200 font-bold mb-2">Marketing Evaluation</h4>
                                <p className="text-slate-500">Auditing copywriting for predatory psychological triggers and manipulative framing.</p>
                            </li>
                            <li className="p-4 bg-slate-900/40 rounded border border-slate-800">
                                <h4 className="text-slate-200 font-bold mb-2">Security Research</h4>
                                <p className="text-slate-500">Analyzing coordinated influence operations and disinformation narratives.</p>
                            </li>
                        </ul>
                    </motion.section>
                );
            case 'limitations':
                return (
                    <motion.section
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        key="limitations"
                    >
                        <h2 className="text-2xl font-bold text-white mb-8 border-b border-slate-800 pb-4 text-red-400">Limitations</h2>
                        <div className="bg-red-500/5 border border-red-500/10 p-6 rounded text-sm space-y-4">
                            <p>PsyWall is an analytical support tool, not an absolute truth engine. Users should be aware of the following critical boundaries:</p>
                            <ul className="list-disc list-inside space-y-2 text-slate-400">
                                <li><strong className="text-slate-200 italic">Not a lie detector:</strong> It analyzes intent through linguistic framing, not the factual accuracy of statements.</li>
                                <li><strong className="text-slate-200 italic">Probabilistic output:</strong> Results indicate risk signals, not definite proof of malice.</li>
                                <li><strong className="text-slate-200 italic">Context dependency:</strong> Certain patterns (e.g., authority bias) may be contextually appropriate in institutional settings.</li>
                                <li><strong className="text-slate-200 italic">Requires human interpretation:</strong> Final judgment should always be exercised by a qualified analyst.</li>
                            </ul>
                        </div>
                    </motion.section>
                );
            case 'version':
                return (
                    <motion.section
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        key="version"
                    >
                        <h2 className="text-2xl font-bold text-white mb-8 border-b border-slate-800 pb-4">Version History</h2>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-24 text-sm font-mono text-blue-500 shrink-0">v0.1.0-alpha</div>
                                <div className="text-sm">
                                    <p className="text-slate-200 font-bold mb-1">Initial Engine Deployment</p>
                                    <ul className="list-disc list-inside text-slate-500 space-y-1">
                                        <li>Core heuristic pattern scanner</li>
                                        <li>Basic risk scoring algorithms</li>
                                        <li>Browser extension integration (Alpha)</li>
                                        <li>Standard category classification (6 categories)</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </motion.section>
                );
            default:
                return null;
        }
    };

    return (
        <div className="max-w-[1200px] mx-auto px-6 font-sans text-slate-400">
            <div className="flex gap-12 py-12 min-h-[600px]">
                {/* SIDEBAR NAVIGATION */}
                <aside className="w-64 shrink-0 sticky top-24 h-fit hidden md:block">
                    <nav className="flex flex-col gap-2">
                        {sections.map((s) => (
                            <button
                                key={s.id}
                                onClick={() => setActiveSection(s.id)}
                                className={`text-left text-sm py-2 px-3 rounded transition-all border-l-2 ${activeSection === s.id
                                    ? 'bg-blue-500/10 text-blue-400 border-blue-500 font-bold'
                                    : 'text-slate-500 border-transparent hover:bg-slate-800/50 hover:text-white'
                                    }`}
                            >
                                {s.title}
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* MAIN CONTENT */}
                <main className="flex-1 pb-32">
                    <AnimatePresence mode="wait">
                        {renderContent()}
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
};

export default Documentation;
