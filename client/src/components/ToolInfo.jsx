import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const ToolInfo = () => {
    return (
        <div className="max-w-4xl mx-auto py-12 px-6">
            <Link to="/" className="inline-flex items-center gap-2 text-indigo-600 font-bold mb-8 hover:text-indigo-700">
                <ArrowLeft size={16} /> Back to Home
            </Link>
            {/* HERO */}
            <section>
                <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    PsyWall (MIDS): A Cognitive Firewall for Human-Centric Security
                </motion.h1>
                <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    Analyze digital content for persuasion tactics, bias triggers, and emotional manipulation patterns in real time.
                </motion.p>
            </section>

            {/* OVERVIEW */}
            <section>
                <div>
                    <h2>Overview</h2>
                    <p>
                        PsyWall is a Cognitive Firewall that operates as a Mental Intrusion Detection System (MIDS). Just as a conventional firewall inspects network packets for threat signatures before they reach a system, PsyWall inspects digital content for cognitive threat signatures before they reach the user's decision-making process.
                    </p>
                    <p>
                        The system analyzes digital text in real time, detecting linguistic patterns associated with psychological manipulation, and classifies them into six cognitive bias categories grounded in behavioral psychology research by Cialdini and Kahneman.
                    </p>
                </div>
                <div>
                    <h3>Key Highlights</h3>
                    <ul>
                        {[
                            { label: 'Real-time analysis', desc: 'Instantaneous linguistic processing' },
                            { label: 'Risk scoring engine', desc: 'Probabilistic manipulation intensity metrics' },
                            { label: 'Manipulation breakdown', desc: 'Categorical tactical identification' },
                            { label: 'Confidence indicator', desc: 'Statistical reliability mapping' }
                        ].map((item, i) => (
                            <li key={i}>
                                <strong>{item.label}</strong>
                                <span>{item.desc}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* WHAT IT DETECTS */}
            <section>
                <h2>Detection Intelligence</h2>
                <div>
                    {[
                        { title: 'Fear Amplification', desc: 'Generates disproportionate anxiety about a stated or implied threat to motivate compliance.' },
                        { title: 'Scarcity and Urgency Framing', desc: 'Creates artificial time or resource pressure to compress decision time and suppress reasoning.' },
                        { title: 'Authority Exploitation', desc: 'Leverages perceived institutional or expert credibility to lower the critical evaluation threshold.' },
                        { title: 'Social Proof Manipulation', desc: 'Uses real or fabricated evidence of peer behavior to trigger conformity heuristics.' },
                        { title: 'Reciprocity Baiting', desc: 'Establishes a prior exchange — real or implied — to create a sense of obligation.' },
                        { title: 'Commitment Trapping', desc: 'References a previous action or agreement by the target to constrain current choices through consistency pressure.' }
                    ].map((card, i) => (
                        <div key={i}>
                            <span>0{i + 1}</span>
                            <h4>{card.title}</h4>
                            <p>{card.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section>
                <h2>Operational Pipeline</h2>
                <div>
                    {[
                        { step: '01', title: 'Content Ingestion', desc: 'User inputs digital content via the interface or automated extension extraction.' },
                        { step: '02', title: 'Linguistic Scanning', desc: 'The engine performs deep syntactic analysis to isolate trigger phrases and structural markers.' },
                        { step: '03', title: 'Tactical Classification', desc: 'Pattern classifiers evaluate signals against our proprietary psychological framework.' },
                        { step: '04', title: 'Result Synthesis', desc: 'A weighted risk score and categorical breakdown are generated for the end-user.' }
                    ].map((item, i) => (
                        <div key={i}>
                            <span>{item.step}</span>
                            <div>
                                <h4>{item.title}</h4>
                                <p>{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* WHY IT MATTERS */}
            <section>
                <h2>The Cognitive Threat Landscape</h2>
                <blockquote>
                    "In an era of algorithmic persuasion, the primary security vulnerability is no longer the network, but the human mind."
                </blockquote>
                <p>
                    Digital manipulation has moved beyond simple marketing—it now shapes financial markets, political discourse, and institutional trust. By quantifying these invisible triggers, PsyWall empowers users to reclaim cognitive autonomy from automated influence systems and predatory communication strategies.
                </p>
            </section>
        </div>
    );
};

export default ToolInfo;
