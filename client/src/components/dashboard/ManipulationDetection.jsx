import React, { useState, useMemo } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import { Zap, AlertTriangle, ShieldCheck, BrainCircuit, Lock, Link as LinkIcon, Gift, HelpCircle, Clock, Shield, Network, X, Brain, Target, ShieldAlert, BookOpen, AlertCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { vectors } from '../../data/vectors';

const iconMap = {
  Zap, AlertTriangle, ShieldCheck, BrainCircuit, Lock, LinkIcon, Gift, HelpCircle, Clock, Shield, Network
};

const defaultRadarData = [
  { subject: 'Urgency', value: 40 },
  { subject: 'Fear', value: 35 },
  { subject: 'Authority', value: 45 },
  { subject: 'Emotional', value: 30 },
  { subject: 'Financial', value: 35 },
  { subject: 'Scarcity', value: 20 },
];

export default function ManipulationDetection() {
  const [selectedVector, setSelectedVector] = useState(null);
  const [hoveredVector, setHoveredVector] = useState(null);

  // Dynamic Radar Calculation
  const currentRadarData = useMemo(() => {
    const activeVector = selectedVector || hoveredVector;
    if (!activeVector) return defaultRadarData;
    
    return [
      { subject: 'Urgency', value: activeVector.radarImpact.Urgency },
      { subject: 'Fear', value: activeVector.radarImpact.Fear },
      { subject: 'Authority', value: activeVector.radarImpact.Authority },
      { subject: 'Emotional', value: activeVector.radarImpact.Emotional },
      { subject: 'Financial', value: activeVector.radarImpact.Financial },
      { subject: 'Scarcity', value: activeVector.radarImpact.Scarcity },
    ];
  }, [selectedVector, hoveredVector]);

  return (
    <div className="flex flex-col lg:flex-row gap-6 relative">
      
      {/* Main Grid: Interactive Nodes */}
      <div className="flex-1 order-2 lg:order-1">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {vectors.map(vector => {
            const Icon = iconMap[vector.icon] || HelpCircle;
            return (
              <motion.div 
                key={vector.id} 
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onHoverStart={() => setHoveredVector(vector)}
                onHoverEnd={() => setHoveredVector(null)}
                onClick={() => setSelectedVector(vector)}
                className={`bg-white border ${vector.border} rounded-xl shadow-sm p-5 flex flex-col transition-all cursor-pointer overflow-hidden relative group hover:shadow-md hover:border-gray-300`}
              >
                {/* Glow Effect */}
                <div className={`absolute -inset-4 opacity-0 group-hover:opacity-10 transition-opacity blur-xl ${vector.bg}`} />
                
                <div className="flex items-center gap-3 mb-3 relative z-10">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${vector.bg} border ${vector.border} ${vector.color}`}>
                    <Icon size={20} />
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 leading-tight">{vector.title}</h4>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed flex-1 mb-4 relative z-10">
                  {vector.overview.definition}
                </p>
                <div className="mt-auto relative z-10">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Impact Score</span>
                    <span className={`text-[10px] font-bold ${vector.color}`}>{vector.impactScore}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${vector.color.replace('text-', 'bg-')}`} style={{ width: `${vector.impactScore}%` }}></div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Sticky Sidebar Radar (Dynamic) */}
      <div className="w-full lg:w-80 order-1 lg:order-2 shrink-0">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sticky top-24 transition-colors">
          <h3 className="text-base font-bold text-gray-900 text-center flex items-center justify-center gap-2">
            <Target size={16} className="text-indigo-500" />
            Dynamic Threat Radar
          </h3>
          <p className="text-[10px] text-gray-500 text-center mt-1 mb-6 uppercase tracking-widest font-bold">
            {hoveredVector ? `Targeting: ${hoveredVector.title}` : 'Network Aggregate'}
          </p>
          
          <div className="h-64 w-full relative">
            {/* Radar Background Glow */}
            <div className={`absolute inset-0 blur-3xl opacity-10 transition-colors duration-500 ${hoveredVector ? hoveredVector.bg : 'bg-indigo-500'}`}></div>
            
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="65%" data={currentRadarData}>
                <PolarGrid stroke="#E5E7EB" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#4B5563', fontSize: 10, fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar 
                  name="Influence" 
                  dataKey="value" 
                  stroke={hoveredVector ? (hoveredVector.color.includes('red') ? '#EF4444' : hoveredVector.color.includes('blue') ? '#3B82F6' : hoveredVector.color.includes('orange') ? '#F97316' : '#8B5CF6') : '#8B5CF6'} 
                  strokeWidth={2} 
                  fill={hoveredVector ? (hoveredVector.color.includes('red') ? '#EF4444' : hoveredVector.color.includes('blue') ? '#3B82F6' : hoveredVector.color.includes('orange') ? '#F97316' : '#8B5CF6') : '#8B5CF6'} 
                  fillOpacity={0.3} 
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Intelligence Modal */}
      <AnimatePresence>
        {selectedVector && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-10">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setSelectedVector(null)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-6xl h-[90vh] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col lg:flex-row"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedVector(null)} 
                className="absolute top-4 right-4 z-50 p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 hover:text-gray-900 transition-colors border border-gray-200"
              >
                <X size={20} />
              </button>

              {/* Left Panel: Overview & AI Explainability */}
              <div className="w-full lg:w-1/3 bg-gray-50/50 border-r border-gray-100 flex flex-col p-8 overflow-y-auto shrink-0">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${selectedVector.bg} border ${selectedVector.border} w-fit mb-6`}>
                  {React.createElement(iconMap[selectedVector.icon] || HelpCircle, { size: 14, className: selectedVector.color })}
                  <span className={`text-xs font-bold uppercase tracking-wider ${selectedVector.color}`}>
                    {selectedVector.category}
                  </span>
                </div>
                
                <h2 className="text-3xl font-black text-gray-900 mb-2">{selectedVector.title}</h2>
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-xs font-bold text-gray-700 bg-gray-200 px-2 py-1 rounded">Severity: {selectedVector.severity}</span>
                  <span className="text-xs font-bold text-gray-700 bg-gray-200 px-2 py-1 rounded">Impact: {selectedVector.impactScore}/100</span>
                </div>

                <div className="mb-8">
                  <h3 className="text-sm font-bold text-gray-700 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Brain size={16} className="text-indigo-500" /> Psychological Impact
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedVector.psychology.triggers.map(t => (
                      <span key={t} className="px-2.5 py-1 bg-white border border-gray-200 text-gray-700 text-xs font-mono font-bold rounded shadow-sm">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* AI Explainability Layer */}
                <div className="mt-auto bg-indigo-50 border border-indigo-100 rounded-xl p-5 relative overflow-hidden shadow-sm">
                  <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
                  <h3 className="text-xs font-bold text-indigo-700 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <BrainCircuit size={14} /> AI Explainability Layer
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-[10px] uppercase text-gray-500 font-bold mb-1">Detected Marker Example</p>
                      <p className="text-xs font-mono text-gray-800 italic border-l-2 border-indigo-300 pl-2">"{selectedVector.explainability.flaggedPhrase}"</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase text-gray-500 font-bold mb-1">Attacker Intent</p>
                      <p className="text-xs text-indigo-900 leading-relaxed">{selectedVector.explainability.intent}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Panel: Deep Dive Intelligence Scroll */}
              <div className="flex-1 overflow-y-auto p-8 lg:p-12 space-y-12">
                
                {/* Section 1: Overview */}
                <section>
                  <p className="text-lg text-gray-800 leading-relaxed font-medium">
                    {selectedVector.overview.definition}
                  </p>
                </section>

                {/* Section 2: Psychological Breakdown */}
                <section>
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <BookOpen size={16} /> Psychological Breakdown
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {selectedVector.psychology.explanation}
                  </p>
                </section>

                {/* Section 3 & 4: Attacker Usage & Examples */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <section>
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Target size={16} /> Attacker Usage
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {selectedVector.attackerUsage.explanation}
                    </p>
                  </section>
                  <section>
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Common Examples</h3>
                    <ul className="space-y-3">
                      {selectedVector.examples.map((ex, i) => (
                        <li key={i} className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-200">
                          {ex}
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>

                {/* Section 5 & 6: Warning Signs & Defense */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <section>
                    <h3 className="text-sm font-bold text-red-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <AlertCircle size={16} /> Visual Red Flags
                    </h3>
                    <ul className="space-y-2">
                      {selectedVector.warningSigns.map((ws, i) => (
                        <li key={i} className="text-sm text-red-800 font-mono bg-red-50 border border-red-100 p-2 rounded">
                          {ws}
                        </li>
                      ))}
                    </ul>
                  </section>
                  <section>
                    <h3 className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <ShieldCheck size={16} /> Defensive Countermeasures
                    </h3>
                    <ul className="space-y-2">
                      {selectedVector.defense.map((df, i) => (
                        <li key={i} className="text-sm text-emerald-800 bg-emerald-50 border border-emerald-100 p-2 rounded flex gap-2">
                          {df}
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>

                {/* Section 7: Case Study */}
                {selectedVector.caseStudies.map((cs, idx) => (
                  <section key={idx} className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
                    <h3 className="text-sm font-bold text-gray-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <ShieldAlert size={16} className="text-indigo-500" /> Case Study: {cs.title}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-[10px] uppercase text-gray-500 font-bold mb-1">Attacker Mindset</p>
                        <p className="text-sm text-gray-700 mb-4">{cs.attackerMindset}</p>
                        <p className="text-[10px] uppercase text-gray-500 font-bold mb-1">Victim Behavior</p>
                        <p className="text-sm text-gray-700">{cs.victimBehavior}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase text-gray-500 font-bold mb-1">Exploited Triggers</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {cs.psychologicalTriggers.map(t => (
                            <span key={t} className="text-xs font-mono bg-gray-100 text-gray-700 px-2 py-1 rounded border border-gray-200 shadow-sm">{t}</span>
                          ))}
                        </div>
                        <p className="text-[10px] uppercase text-emerald-600 font-bold mb-1">Defense Opportunity</p>
                        <p className="text-sm text-emerald-800 bg-emerald-50 p-2 rounded border border-emerald-100">{cs.defenseOpportunity}</p>
                      </div>
                    </div>
                  </section>
                ))}

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
