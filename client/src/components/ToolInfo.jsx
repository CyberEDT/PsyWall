import React from 'react';
import { motion } from 'framer-motion';

const ToolInfo = () => {
    return (
        <div className="max-w-[1200px] mx-auto px-6 py-12 text-slate-300 font-sans selection:bg-blue-500/30">
            {/* HERO SECTION */}
            <section className="text-center py-24 mb-16">
                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl font-black text-white mb-6 tracking-tight"
                >
                    Cognitive Manipulation Detection Engine
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed"
                >
                    Analyze digital content for persuasion tactics, bias triggers, and emotional manipulation patterns in real time.
                </motion.p>
            </section>

            {/* WHAT IS PSYWALL */}
            <section className="grid md:grid-cols-2 gap-16 mb-24 items-center">
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white uppercase tracking-widest text-sm text-blue-500">Overview</h2>
                    <p className="text-lg leading-relaxed text-slate-400">
                        PsyWall represents the next frontier in defensive cognitive security. As digital discourse becomes increasingly saturated with sophisticated influence operations, PsyWall provides an analytical layer that strips away emotional framing to reveal the underlying structural tactics used to shape human perception.
                    </p>
                    <p className="text-lg leading-relaxed text-slate-400">
                        Designed for researchers, analysts, and security-conscious individuals, the engine processes natural language through a multi-stage classification pipeline to identify known psychological exploitation patterns.
                    </p>
                </div>
                <div className="bg-[#111113] border border-slate-800 p-8 rounded-lg shadow-sm">
                    <h3 className="text-white font-bold mb-6 text-lg uppercase tracking-wider">Key Highlights</h3>
                    <ul className="space-y-4">
                        {[
                            { label: 'Real-time analysis', desc: 'Instantaneous linguistic processing' },
                            { label: 'Risk scoring engine', desc: 'Probabilistic manipulation intensity metrics' },
                            { label: 'Manipulation breakdown', desc: 'Categorical tactical identification' },
                            { label: 'Confidence indicator', desc: 'Statistical reliability mapping' }
                        ].map((item, i) => (
                            <li key={i} className="flex flex-col">
                                <span className="text-white font-semibold flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                                    {item.label}
                                </span>
                                <span className="text-sm text-slate-500 ml-3.5">{item.desc}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* WHAT IT DETECTS */}
            <section className="mb-24">
                <h2 className="text-center text-sm font-black text-blue-500 uppercase tracking-[0.3em] mb-12">Detection Intelligence</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { title: 'Artificial Urgency', desc: 'Pressure-inducing timestamps and false deadlines designed to bypass rational friction.' },
                        { title: 'Fear-based Persuasion', desc: 'Catastrophizing narratives aimed at triggering the amygdala for rapid decision making.' },
                        { title: 'Authority Bias', desc: 'Exploitation of perceived expertise or institutional rank to suppress critical questioning.' },
                        { title: 'Scarcity Framing', desc: 'Manipulating perceived value through coordinated signaling of limited availability.' },
                        { title: 'Social Proof Pressure', desc: 'Leveraging manufactured consensus to induce conformity and herd behavior.' },
                        { title: 'Emotional Exploitation', desc: 'Precise targeting of specific sentimental vulnerabilities to cloud logical evaluation.' }
                    ].map((card, i) => (
                        <div key={i} className="bg-[#0e0e0f] border border-slate-800/50 p-6 rounded-lg hover:border-slate-700 transition-colors group">
                            <div className="w-8 h-8 border border-slate-800 rounded mb-4 flex items-center justify-center text-[10px] text-slate-600 group-hover:border-blue-500/50 group-hover:text-blue-500 transition-colors">
                                0{i + 1}
                            </div>
                            <h4 className="text-white font-bold mb-2">{card.title}</h4>
                            <p className="text-sm text-slate-500 leading-relaxed">{card.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="mb-24 py-16 border-y border-slate-800/30">
                <h2 className="text-center text-sm font-black text-blue-500 uppercase tracking-[0.3em] mb-16">Operational Pipeline</h2>
                <div className="max-w-xl mx-auto space-y-12">
                    {[
                        { step: '01', title: 'Content Ingestion', desc: 'User inputs digital content via the interface or automated extension extraction.' },
                        { step: '02', title: 'Linguistic Scanning', desc: 'The engine performs deep syntactic analysis to isolate trigger phrases and structural markers.' },
                        { step: '03', title: 'Tactical Classification', desc: 'Pattern classifiers evaluate signals against our proprietary psychological framework.' },
                        { step: '04', title: 'Result Synthesis', desc: 'A weighted risk score and categorical breakdown are generated for the end-user.' }
                    ].map((item, i) => (
                        <div key={i} className="relative flex gap-8">
                            {i !== 3 && <div className="absolute left-[15px] top-10 bottom-[-48px] w-[1px] bg-slate-800"></div>}
                            <div className="z-10 w-8 h-8 rounded-full bg-[#0a0a0b] border border-slate-700 flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                                {item.step}
                            </div>
                            <div className="pb-1">
                                <h4 className="text-white font-bold mb-1">{item.title}</h4>
                                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* WHY IT MATTERS */}
            <section className="mb-24 max-w-4xl mx-auto text-center">
                <h2 className="text-sm font-black text-blue-500 uppercase tracking-[0.3em] mb-8">The Cognitive Threat Landscape</h2>
                <p className="text-lg leading-relaxed text-slate-400 italic">
                    "In an era of algorithmic persuasion, the primary security vulnerability is no longer the network, but the human mind."
                </p>
                <p className="mt-8 text-slate-400 leading-relaxed">
                    Digital manipulation has moved beyond simple marketing—it now shapes financial markets, political discourse, and institutional trust. By quantifying these invisible triggers, PsyWall empowers users to reclaim cognitive autonomy from automated influence systems and predatory communication strategies.
                </p>
            </section>
        </div>
    );
};

export default ToolInfo;
