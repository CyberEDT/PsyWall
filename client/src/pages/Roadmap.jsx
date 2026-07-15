import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RadialBarChart, RadialBar, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Treemap, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { Shield, Brain, Network, Zap, CheckCircle2, Circle, ArrowRight, Activity, Terminal, Database, ShieldAlert, Cpu, Lock, Globe, Server, User, BookOpen } from 'lucide-react';

const COLORS = {
  electricBlue: '#4f46e5', // Using indigo-600
  purple: '#9333ea',       // purple-600
  cyan: '#0891b2',         // cyan-600
  emerald: '#059669',      // emerald-600
};

const CHART_COLORS = ['#4f46e5', '#9333ea', '#0891b2', '#059669', '#ea580c', '#db2777'];

// --- Data ---
const radialProgressData = [
  { name: 'Research', uv: 15, fill: COLORS.emerald },
  { name: 'Enterprise', uv: 0, fill: '#db2777' },
  { name: 'Browser', uv: 0, fill: COLORS.cyan },
  { name: 'Intelligence', uv: 10, fill: COLORS.purple },
  { name: 'Foundation', uv: 35, fill: COLORS.electricBlue },
];

const radarMaturityData = [
  { subject: 'Research', A: 80, fullMark: 100 },
  { subject: 'Detection Engine', A: 65, fullMark: 100 },
  { subject: 'Architecture', A: 70, fullMark: 100 },
  { subject: 'Browser', A: 20, fullMark: 100 },
  { subject: 'Dataset', A: 90, fullMark: 100 },
  { subject: 'AI', A: 50, fullMark: 100 },
  { subject: 'Visualization', A: 60, fullMark: 100 },
  { subject: 'Documentation', A: 40, fullMark: 100 },
];

const areaGrowthData = Array.from({ length: 10 }).map((_, i) => ({
  name: `P${i + 1}`,
  capabilities: Math.floor(Math.pow(i + 1, 1.5) * 10 + Math.random() * 10)
}));

const treemapExpansionData = [
  { name: 'Core Engine', size: 400 },
  { name: 'Browser Ext', size: 300 },
  { name: 'Enterprise', size: 300 },
  { name: 'Research', size: 200 },
  { name: 'Mobile', size: 250 },
  { name: 'AI', size: 350 },
  { name: 'Multimodal', size: 200 },
  { name: 'Visualization', size: 150 },
  { name: 'API', size: 100 }
];

const pieTechData = [
  { name: 'Frontend', value: 30 },
  { name: 'Backend', value: 25 },
  { name: 'Security', value: 20 },
  { name: 'Research', value: 10 },
  { name: 'AI', value: 15 },
];

const phases = [
  { id: 1, title: 'Foundation', status: 'Current', difficulty: 'Hard', progress: 35, desc: 'Establishing the core Mental Intrusion Detection System architecture.', features: ['Mental Intrusion Detection System', 'Cognitive Firewall', 'CMRS', 'Pattern Recognition', 'Bias Classification', 'Explainability Engine', 'Privacy First Processing'] },
  { id: 2, title: 'Intelligence Expansion', status: 'Planned', difficulty: 'Medium', progress: 10, desc: 'Expanding the threat database with cognitive models.', features: ['Pattern Database', 'Persuasion Library', 'Cognitive Bias Knowledge Base', 'Context Engine', 'Confidence Scoring', 'Knowledge Graph'] },
  { id: 3, title: 'Browser Protection', status: 'Planned', highlight: true, difficulty: 'Hard', progress: 0, desc: 'Real-time protection directly inside the user\'s browser.', features: ['Browser Extension', 'Website Analysis', 'Social Media Detection', 'Email Analysis', 'Live Cognitive Alerts'] },
  { id: 4, title: 'Communication Protection', status: 'Planned', difficulty: 'Extreme', progress: 0, desc: 'Securing chat platforms from psychological manipulation.', features: ['WhatsApp', 'Telegram', 'Discord', 'Slack', 'Signal', 'Scam Detection', 'Psychological Manipulation Detection', 'Fake Authority Detection'] },
  { id: 5, title: 'Multimodal Detection', status: 'Future', difficulty: 'Extreme', progress: 0, desc: 'Analyzing images, audio, and video for manipulation tactics.', features: ['Image Analysis', 'Audio Analysis', 'Video Analysis', 'Voice Manipulation Detection', 'Visual Persuasion Detection'] },
  { id: 6, title: 'Adaptive Intelligence', status: 'Future', difficulty: 'Hard', progress: 0, desc: 'Self-learning AI models that adapt to new manipulation strategies.', features: ['AI Learning', 'Federated Learning', 'Pattern Updates', 'Community Intelligence'] },
  { id: 7, title: 'Enterprise Platform', status: 'Future', difficulty: 'Medium', progress: 0, desc: 'Tools for organizations to protect their workforce.', features: ['Dashboard', 'Threat Reports', 'Analytics', 'APIs', 'SIEM Integration', 'SOC Support'] },
  { id: 8, title: 'Human Awareness', status: 'Future', difficulty: 'Medium', progress: 0, desc: 'Training users to recognize cognitive threats natively.', features: ['Interactive Learning', 'Awareness Modules', 'Personalized Feedback', 'Cognitive Security Education'] },
  { id: 9, title: 'Behavioral Cybersecurity Lab', status: 'Future', difficulty: 'Hard', progress: 0, desc: 'A dedicated research hub for cognitive security.', features: ['Research', 'Experiments', 'Public Datasets', 'Publications', 'Threat Intelligence'] },
  { id: 10, title: 'Global Cognitive Security', status: 'Vision', difficulty: 'Extreme', progress: 0, desc: 'A worldwide network protecting human cognition at scale.', features: ['Enterprise', 'Government', 'Education', 'Healthcare', 'Browser APIs', 'AI Platform', 'Global Research Network'] },
];

// --- Components ---

const GlassCard = ({ children, className = '' }) => (
  <div className={`bg-white border border-slate-200 rounded-2xl p-6 shadow-sm ${className}`}>
    {children}
  </div>
);

const AnimatedCounter = ({ end, suffix = '' }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end]);
  return <span>{count}{suffix}</span>;
};

export default function Roadmap() {
  const [expandedPhase, setExpandedPhase] = useState(1);

  return (
    <div className="bg-white text-slate-900 selection:bg-indigo-500/30 font-sans overflow-hidden rounded-2xl shadow-sm border border-slate-200 pb-20">
      
      {/* ── HERO SECTION ── */}
      <section className="relative pt-20 pb-16 px-6 flex flex-col items-center text-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px] mix-blend-multiply opacity-50 animate-pulse" />
          <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[100px] mix-blend-multiply opacity-40 animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="z-10 flex flex-col items-center">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-200 bg-indigo-50 mb-6">
            <Brain size={14} className="text-indigo-600" />
            <span className="text-xs font-semibold text-indigo-700 uppercase tracking-widest">Mental Intrusion Detection Systems</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 text-slate-900">
            PsyWall Roadmap
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-500 max-w-2xl font-medium mb-10">
            Building the Future of Human-Centric Security
          </p>
          
          <div className="flex gap-4">
            <button className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 hover:scale-105 transition-all flex items-center gap-2 shadow-lg shadow-indigo-500/20">
              Explore Roadmap <ArrowRight size={18} />
            </button>
            <button className="px-8 py-4 bg-white border border-slate-200 text-slate-700 font-bold rounded-full hover:bg-slate-50 transition-colors shadow-sm">
              Research Paper
            </button>
          </div>
        </motion.div>
      </section>

      {/* ── LIVE STATS ── */}
      <section className="px-6 max-w-7xl mx-auto mb-20 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Roadmap Phases', value: 10, icon: Network, color: 'text-indigo-600' },
            { label: 'Manipulation Vectors', value: 9, suffix: '+', icon: ShieldAlert, color: 'text-purple-600' },
            { label: 'Core Modules', value: 7, suffix: '+', icon: Cpu, color: 'text-cyan-600' },
            { label: 'Future Integrations', value: 20, suffix: '+', icon: Zap, color: 'text-emerald-600' },
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <GlassCard className="flex flex-col items-center text-center hover:border-indigo-200 transition-colors group">
                <stat.icon size={24} className={`${stat.color} mb-3 group-hover:scale-110 transition-transform`} />
                <h3 className="text-4xl font-black text-slate-900 mb-1"><AnimatedCounter end={stat.value} suffix={stat.suffix} /></h3>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">{stat.label}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── ROADMAP DASHBOARD (RECHARTS) ── */}
      <section className="px-6 max-w-7xl mx-auto mb-32 relative z-10">
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Development Intelligence</h2>
            <p className="text-sm font-medium text-slate-500">Real-time metrics on PsyWall's engineering maturity.</p>
          </div>
          <div className="flex gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse mt-0.5" />
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Live Data</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Chart 1: Radial Progress */}
          <GlassCard className="h-80 flex flex-col">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Roadmap Progress</h3>
            <div className="flex-1 -ml-6">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="100%" barSize={10} data={radialProgressData}>
                  <RadialBar minAngle={15} background={{ fill: '#f1f5f9' }} clockWise dataKey="uv" cornerRadius={10} />
                  <Tooltip cursor={false} contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a', fontWeight: 'bold' }} />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* Chart 2: Radar Maturity */}
          <GlassCard className="h-80 flex flex-col">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Development Maturity</h3>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarMaturityData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }} />
                  <Radar name="Maturity" dataKey="A" stroke={COLORS.electricBlue} fill={COLORS.electricBlue} fillOpacity={0.2} />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a', fontWeight: 'bold' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* Chart 3: Area Growth */}
          <GlassCard className="h-80 flex flex-col">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Capability Growth</h3>
            <div className="flex-1 -ml-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={areaGrowthData}>
                  <defs>
                    <linearGradient id="colorCap" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.purple} stopOpacity={0.2}/>
                      <stop offset="95%" stopColor={COLORS.purple} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a', fontWeight: 'bold' }} />
                  <Area type="monotone" dataKey="capabilities" stroke={COLORS.purple} fillOpacity={1} fill="url(#colorCap)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>

        <div className="flex justify-center gap-6">
          {/* Chart 5: Pie Tech */}
          <GlassCard className="h-80 flex flex-col w-full max-w-lg">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Technology Distribution</h3>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieTechData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value" stroke="none">
                    {pieTechData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a', fontWeight: 'bold' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {pieTechData.map((d, i) => (
                <div key={d.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }} />
                  <span className="text-xs font-bold text-slate-600">{d.name}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </section>

      {/* ── MILESTONE TIMELINE ── */}
      <section className="px-6 max-w-7xl mx-auto mb-32 relative z-10 overflow-hidden py-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-12">Milestone Timeline</h2>
        <div className="relative flex items-center justify-between w-full">
          <div className="absolute left-0 right-0 h-1 bg-slate-200 top-1/2 -translate-y-1/2 rounded-full" />
          <motion.div className="absolute left-0 h-1 bg-indigo-500 top-1/2 -translate-y-1/2 rounded-full shadow-[0_0_10px_rgba(79,70,229,0.5)]" initial={{ width: 0 }} whileInView={{ width: '20%' }} transition={{ duration: 1.5, ease: "easeOut" }} viewport={{ once: true }} />
          
          {['Ideation', 'MVP Engine', 'Browser Beta', 'Enterprise', 'Global'].map((milestone, i) => {
            const isActive = i === 1;
            const isPast = i < 1;
            return (
              <div key={i} className="relative flex flex-col items-center group z-10">
                <div className={`w-4 h-4 rounded-full border-2 mb-4 transition-colors bg-white ${isActive ? 'border-indigo-600 shadow-[0_0_15px_rgba(79,70,229,0.4)] scale-150' : isPast ? 'border-indigo-500' : 'border-slate-300 group-hover:border-slate-400'}`} />
                <span className={`text-xs font-bold ${isActive ? 'text-indigo-700' : isPast ? 'text-slate-600' : 'text-slate-400'}`}>{milestone}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── ROADMAP PHASES ── */}
      <section className="px-6 max-w-5xl mx-auto mb-32 relative z-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-12 text-center">Development Phases</h2>
        <div className="space-y-4">
          {phases.map((phase) => (
            <motion.div key={phase.id} layout onClick={() => setExpandedPhase(phase.id === expandedPhase ? null : phase.id)} className={`cursor-pointer bg-white border ${phase.id === expandedPhase ? 'border-indigo-300 shadow-md' : phase.highlight ? 'border-indigo-400 shadow-[0_0_15px_rgba(79,70,229,0.2)]' : 'border-slate-200 hover:border-slate-300 shadow-sm'} rounded-2xl overflow-hidden transition-all`}>
              <div className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black ${phase.highlight ? 'bg-indigo-50 text-indigo-500' : 'bg-slate-50 text-slate-400'}`}>
                    {phase.id.toString().padStart(2, '0')}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-3">
                      {phase.title}
                      {phase.status === 'Current' && <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-indigo-50 text-indigo-600 border border-indigo-200">Current</span>}
                      {phase.status === 'Planned' && <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-purple-50 text-purple-600 border border-purple-200">Planned</span>}
                      {(phase.status === 'Future' || phase.status === 'Vision') && <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-slate-100 text-slate-500 border border-slate-200">{phase.status}</span>}
                    </h3>
                    <p className="text-sm font-medium text-slate-500 mt-1">{phase.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="hidden md:flex flex-col items-end">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1">Progress</span>
                    <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${phase.progress}%` }} />
                    </div>
                  </div>
                  <motion.div animate={{ rotate: phase.id === expandedPhase ? 90 : 0 }} className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center">
                    <ArrowRight size={16} className="text-slate-400" />
                  </motion.div>
                </div>
              </div>

              <AnimatePresence>
                {phase.id === expandedPhase && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                    <div className="p-6 pt-0 border-t border-slate-100 mt-2">
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 mt-6">Key Features / Deliverables</h4>
                      <div className="flex flex-wrap gap-2">
                        {phase.features.map(f => (
                          <span key={f} className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-sm font-medium text-slate-700 flex items-center gap-2">
                            <CheckCircle2 size={14} className={phase.progress > 0 ? "text-indigo-500" : "text-slate-400"} />
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── DEPENDENCY GRAPH ── */}
      <section className="px-6 max-w-7xl mx-auto mb-32 relative z-10 text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-12">Architecture Dependencies</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 flex-wrap">
          {['Foundation', 'Intelligence', 'Browser', 'Communication', 'Multimodal', 'Enterprise', 'Awareness', 'Research', 'Global Platform'].map((node, i, arr) => (
            <React.Fragment key={node}>
              <div className="px-6 py-3 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-700 shadow-sm">
                {node}
              </div>
              {i < arr.length - 1 && (
                <ArrowRight size={20} className="text-slate-400 hidden md:block" />
              )}
              {i < arr.length - 1 && (
                <ArrowRight size={20} className="text-slate-400 block md:hidden rotate-90 my-2" />
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* ── VISION SECTION ── */}
      <section className="px-6 py-24 relative overflow-hidden text-center border-t border-slate-200 bg-gradient-to-b from-transparent to-slate-50 rounded-b-2xl">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
          <Brain size={400} className="text-indigo-900 blur-[20px]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black leading-tight text-slate-900 mb-6">
            "The future of cybersecurity is not only protecting systems—it is protecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">human cognition.</span>"
          </h2>
          <p className="text-lg text-slate-500 font-bold uppercase tracking-widest">Team EDT</p>
        </div>
      </section>

    </div>
  );
}
