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
                    <motion.section key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-10">
                        <div>
                            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-6">PsyWall Overview</h1>
                            <p className="text-xl text-slate-600 leading-relaxed max-w-3xl">
                                PsyWall is a cognitive intrusion detection system (CIDS) engineered to evaluate linguistic and psychological manipulation signals within text-based digital content. Unlike traditional security systems that focus on code-based vulnerabilities, PsyWall addresses the human-centric vulnerability of cognitive exploitation.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                                <h3 className="text-lg font-bold text-slate-900 mb-3">Core Purpose</h3>
                                <p className="text-slate-600 leading-relaxed">To provide users with an analytical layer of protection against sophisticated influence operations and predatory communication tactics.</p>
                            </div>
                            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                                <h3 className="text-lg font-bold text-slate-900 mb-3">Intended Users</h3>
                                <p className="text-slate-600 leading-relaxed">Security researchers, financial analysts, investigative journalists, and high-risk digital asset holders.</p>
                            </div>
                            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                                <h3 className="text-lg font-bold text-slate-900 mb-3">Scope of Analysis</h3>
                                <p className="text-slate-600 leading-relaxed">Analysis of synchronous and asynchronous text communications, including marketing copy, investment pitches, and social media discourse.</p>
                            </div>
                            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 shadow-sm">
                                <h3 className="text-lg font-bold text-slate-900 mb-3">Non-Goals</h3>
                                <p className="text-slate-600 leading-relaxed">PsyWall does <strong className="text-slate-900">not</strong> perform fact-checking, determine truth/falsity, or provide legal advice.</p>
                            </div>
                        </div>
                    </motion.section>
                );
            case 'architecture':
                return (
                    <motion.section key="architecture" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-10">
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-6">System Architecture</h1>
                        <div className="bg-slate-900 text-slate-300 p-8 rounded-2xl font-mono text-sm leading-relaxed overflow-x-auto shadow-xl">
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
Structured JSON Report / UI Visualization Output`}</pre>
                        </div>
                        <div className="space-y-6 mt-8">
                            {[
                                { title: 'Preprocessing Layer', desc: 'Normalizes input text by removing non-semantic characters and performing standard tokenization for downstream analysis.' },
                                { title: 'Linguistic Pattern Scanner', desc: 'Extracts specific syntactic structures and vocabulary choices frequently associated with influence operations.' },
                                { title: 'Psychological Trigger Classifier', desc: 'Matches extracted patterns against our proprietary framework of known manipulation categories.' },
                                { title: 'Risk Scoring Engine', desc: 'Synthesizes classified triggers into a unified risk metric based on signal density and established tactical weights.' }
                            ].map((item, idx) => (
                                <div key={idx} className="flex gap-4 items-start bg-white p-6 rounded-xl border border-slate-200">
                                    <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold shrink-0">{idx + 1}</div>
                                    <div>
                                        <h4 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h4>
                                        <p className="text-slate-600">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.section>
                );
            case 'engine':
                return (
                    <motion.section key="engine" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-6">Detection Engine</h1>
                        <p className="text-xl text-slate-600 leading-relaxed max-w-3xl">
                            The PsyWall engine operates on a deterministic heuristic model, avoiding the interpretability issues often associated with "black box" machine learning approaches. This ensures that every detection can be traced back to specific linguistic evidence.
                        </p>
                        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-8 mt-8">
                            <ul className="space-y-6">
                                <li className="flex gap-4 items-start">
                                    <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2 shrink-0"></div>
                                    <div>
                                        <strong className="text-indigo-900 block text-lg mb-1">Heuristic Trigger Detection</strong>
                                        <span className="text-indigo-700">Predefined rulesets that identify high-probability manipulation markers.</span>
                                    </div>
                                </li>
                                <li className="flex gap-4 items-start">
                                    <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2 shrink-0"></div>
                                    <div>
                                        <strong className="text-indigo-900 block text-lg mb-1">Emotional Tone Markers</strong>
                                        <span className="text-indigo-700">Identification of extreme sentiment shifts designed to invoke panic or euphoria.</span>
                                    </div>
                                </li>
                                <li className="flex gap-4 items-start">
                                    <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2 shrink-0"></div>
                                    <div>
                                        <strong className="text-indigo-900 block text-lg mb-1">Signal Weighting</strong>
                                        <span className="text-indigo-700">Not all triggers are equal; the engine applies dynamic weights based on the rarity and severity of the detected pattern.</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </motion.section>
                );
            case 'scoring':
                return (
                    <motion.section key="scoring" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-6">Risk Scoring Methodology</h1>
                        <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mb-8">
                            The risk score is a numerical representation of the likelihood and intensity of cognitive manipulation present in the sample.
                        </p>
                        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden max-w-2xl">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="py-4 px-6 font-bold text-slate-900 border-b border-slate-200">Score Range</th>
                                        <th className="py-4 px-6 font-bold text-slate-900 border-b border-slate-200">Threat Level</th>
                                        <th className="py-4 px-6 font-bold text-slate-900 border-b border-slate-200">Indicator</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-slate-100">
                                        <td className="py-4 px-6 font-mono text-slate-700">70–100</td>
                                        <td className="py-4 px-6 font-bold text-red-600">Critical</td>
                                        <td className="py-4 px-6"><div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"></div></td>
                                    </tr>
                                    <tr className="border-b border-slate-100">
                                        <td className="py-4 px-6 font-mono text-slate-700">30–69</td>
                                        <td className="py-4 px-6 font-bold text-amber-500">Elevated</td>
                                        <td className="py-4 px-6"><div className="w-3 h-3 rounded-full bg-amber-400"></div></td>
                                    </tr>
                                    <tr>
                                        <td className="py-4 px-6 font-mono text-slate-700">0–29</td>
                                        <td className="py-4 px-6 font-bold text-emerald-500">Minimal</td>
                                        <td className="py-4 px-6"><div className="w-3 h-3 rounded-full bg-emerald-400"></div></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="bg-slate-50 border-l-4 border-slate-400 p-6 rounded-r-xl mt-8 max-w-3xl">
                            <p className="text-slate-700 leading-relaxed">
                                <strong>Confidence Mapping:</strong> False positive handling is managed through confidence mapping. Samples with sparse evidence result in lower confidence scores, even if the primary risk score is high, signaling the need for increased human scrutiny.
                            </p>
                        </div>
                    </motion.section>
                );
            case 'categories':
                return (
                    <motion.section key="categories" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-8">Detection Categories</h1>
                        <div className="grid gap-6">
                            {[
                                {
                                    name: 'Artificial Urgency',
                                    def: 'The use of manufactured deadlines or time-pressure to force bypass of critical thinking.',
                                    signals: 'Countdown language, "expires soon", "one-time opportunity".',
                                    impact: 'High risk of FOMO-induced error.',
                                    color: 'bg-red-50 border-red-200 text-red-900'
                                },
                                {
                                    name: 'Authority Bias',
                                    def: 'Subtle or overt signaling of rank, expertise, or institution to discourage questioning.',
                                    signals: 'Appeals to unspecified "experts", credential dropping, formalistic jargon.',
                                    impact: 'Suppression of healthy skepticism.',
                                    color: 'bg-indigo-50 border-indigo-200 text-indigo-900'
                                },
                                {
                                    name: 'Fear-Based Persuasion',
                                    def: 'Framing information around a perceived threat to induce defensive action.',
                                    signals: "Catastrophic predictions, \"don't lose everything\", threat-adjacent metaphors.",
                                    impact: 'Emotional hijacking toward specific actions.',
                                    color: 'bg-amber-50 border-amber-200 text-amber-900'
                                }
                            ].map((cat, i) => (
                                <div key={i} className={`p-8 rounded-2xl border ${cat.color} shadow-sm`}>
                                    <h3 className="text-2xl font-bold mb-6">{cat.name}</h3>
                                    <div className="grid md:grid-cols-3 gap-6">
                                        <div className="bg-white/60 p-4 rounded-xl border border-black/5">
                                            <strong className="block text-xs uppercase tracking-wider mb-2 opacity-70">Definition</strong>
                                            <p className="font-medium">{cat.def}</p>
                                        </div>
                                        <div className="bg-white/60 p-4 rounded-xl border border-black/5">
                                            <strong className="block text-xs uppercase tracking-wider mb-2 opacity-70">Example Signals</strong>
                                            <p className="font-medium">{cat.signals}</p>
                                        </div>
                                        <div className="bg-white/60 p-4 rounded-xl border border-black/5">
                                            <strong className="block text-xs uppercase tracking-wider mb-2 opacity-70">Impact Risk</strong>
                                            <p className="font-medium">{cat.impact}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.section>
                );
            case 'usecases':
                return (
                    <motion.section key="usecases" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-8">Use Cases</h1>
                        <div className="grid md:grid-cols-2 gap-6">
                            {[
                                { title: 'Scam Detection Analysis', desc: 'Deconstructing phishing emails and fraudulent investment offers for high-pressure tactics.' },
                                { title: 'Investment Pitch Review', desc: 'Identifying FOMO-driven persuasion and authority bias in financial presentations.' },
                                { title: 'Marketing Evaluation', desc: 'Auditing copywriting for predatory psychological triggers and manipulative framing.' },
                                { title: 'Security Research', desc: 'Analyzing coordinated influence operations and disinformation narratives.' }
                            ].map((uc, i) => (
                                <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-300 transition-colors">
                                    <h4 className="text-xl font-bold text-slate-900 mb-3">{uc.title}</h4>
                                    <p className="text-slate-600 leading-relaxed">{uc.desc}</p>
                                </div>
                            ))}
                        </div>
                    </motion.section>
                );
            case 'limitations':
                return (
                    <motion.section key="limitations" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-6">Limitations</h1>
                        <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mb-8">
                            PsyWall is an analytical support tool, not an absolute truth engine. Users should be aware of the following critical boundaries:
                        </p>
                        <div className="bg-white border border-slate-200 rounded-2xl p-8">
                            <ul className="space-y-6">
                                {[
                                    { title: 'Not a lie detector', desc: 'It analyzes intent through linguistic framing, not the factual accuracy of statements.' },
                                    { title: 'Probabilistic output', desc: 'Results indicate risk signals, not definite proof of malice.' },
                                    { title: 'Context dependency', desc: 'Certain patterns (e.g., authority bias) may be contextually appropriate in institutional settings.' },
                                    { title: 'Requires human interpretation', desc: 'Final judgment should always be exercised by a qualified analyst.' }
                                ].map((lim, i) => (
                                    <li key={i} className="flex gap-4 items-start">
                                        <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2.5 shrink-0"></div>
                                        <div>
                                            <strong className="text-slate-900 block text-lg mb-1">{lim.title}</strong>
                                            <span className="text-slate-600">{lim.desc}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.section>
                );
            case 'version':
                return (
                    <motion.section key="version" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-8">Version History</h1>
                        <div className="relative pl-8 border-l-2 border-indigo-100 space-y-12">
                            <div className="relative">
                                <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full border-4 border-white bg-indigo-600 shadow-sm"></div>
                                <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-widest rounded-full mb-4">v0.1.0-alpha</span>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4">Initial Engine Deployment</h3>
                                <ul className="space-y-3">
                                    {['Core heuristic pattern scanner', 'Basic risk scoring algorithms', 'Browser extension integration (Alpha)', 'Standard category classification (6 categories)'].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-slate-600">
                                            <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                                            {item}
                                        </li>
                                    ))}
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
        <div className="min-h-screen bg-slate-50 font-sans">
            <div className="max-w-7xl mx-auto py-12 px-6 lg:px-12">
                <Link to="/" className="inline-flex items-center gap-2 text-sm text-slate-500 font-bold mb-12 hover:text-indigo-600 transition-colors">
                    <ArrowLeft size={16} /> Back to Home
                </Link>
                
                <div className="flex flex-col lg:flex-row gap-12 items-start">
                    {/* SIDEBAR NAV */}
                    <aside className="w-full lg:w-72 shrink-0 sticky top-12">
                        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 px-4">Documentation</h2>
                        <nav className="flex flex-col space-y-1">
                            {sections.map((s) => (
                                <button
                                    key={s.id}
                                    onClick={() => setActiveSection(s.id)}
                                    className={`text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                                        activeSection === s.id 
                                            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20' 
                                            : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900'
                                    }`}
                                >
                                    {s.title}
                                </button>
                            ))}
                        </nav>
                    </aside>

                    {/* MAIN CONTENT */}
                    <main className="flex-1 min-w-0">
                        <AnimatePresence mode="wait">
                            {renderContent()}
                        </AnimatePresence>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Documentation;
