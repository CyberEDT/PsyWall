import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, ArrowRight, CheckCircle, Zap, Eye, AlertTriangle, Lock, Users, Activity, BarChart, FileText, ChevronRight } from 'lucide-react';
import shieldGraphic from '../../assets/shield-graphic.png';

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-sans selection:bg-indigo-500/30 selection:text-indigo-200 overflow-x-hidden">
      
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#020617]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
            <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center overflow-hidden shrink-0 shadow-[0_0_15px_rgba(79,70,229,0.5)] group-hover:scale-105 transition-transform">
               <img src="/logo.jpg" alt="PsyWall" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-sm font-black text-white leading-tight tracking-wide">PsyWall</h1>
              <p className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest">Cognitive Firewall</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#how" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors">How it works</a>
            <a href="#psychology" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors">Psychology</a>
            <a href="#examples" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors">Examples</a>
            <a href="#awareness" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors">Awareness</a>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/dashboard')} 
              className="text-sm font-bold text-slate-400 hover:text-white transition-colors"
            >
              Sign in
            </button>
            <button 
              onClick={() => navigate('/dashboard')} 
              className="px-5 py-2.5 rounded-full bg-white hover:bg-slate-200 text-slate-900 text-sm font-bold shadow-lg shadow-white/10 transition-all hover:-translate-y-0.5"
            >
              Open Dashboard
            </button>
          </div>
        </div>
      </nav>

      <main>
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Deep Space Background Blobs */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] -z-10 mix-blend-screen"></div>
        <div className="absolute top-40 right-1/4 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[100px] -z-10 mix-blend-screen"></div>
        <div className="absolute -top-20 right-0 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[120px] -z-10 mix-blend-screen"></div>
        
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] -z-10 opacity-50"></div>
        
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[10px] font-black uppercase tracking-widest mb-6 backdrop-blur-sm shadow-[0_0_15px_rgba(79,70,229,0.2)]">
              <Zap size={14} className="fill-indigo-400 text-indigo-400" />
              Cognitive AI - Now in public preview
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.05] mb-6">
              A <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400 drop-shadow-sm">cognitive</span><br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400 drop-shadow-sm">firewall</span> for the human mind.
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 leading-relaxed mb-8 max-w-lg">
              PsyWall detects the psychological manipulation behind phishing, scams, and social engineering — so people, not just systems, stay protected.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button 
                onClick={() => navigate('/scanner')}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-base transition-all shadow-[0_0_30px_rgba(79,70,229,0.3)] hover:shadow-[0_0_40px_rgba(79,70,229,0.5)] hover:-translate-y-0.5"
              >
                <Shield size={20} />
                Analyze Message
              </button>
              <button 
                onClick={() => navigate('/dashboard')}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white border border-slate-700 font-bold text-base transition-all hover:border-slate-500"
              >
                Try Demo
                <ArrowRight size={20} className="text-slate-400" />
              </button>
            </div>
            
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-bold uppercase tracking-wider text-slate-500">
              <span className="flex items-center gap-1.5"><CheckCircle size={14} className="text-emerald-500" /> Zero-knowledge analysis</span>
              <span className="flex items-center gap-1.5"><CheckCircle size={14} className="text-emerald-500" /> On-device option</span>
              <span className="flex items-center gap-1.5"><CheckCircle size={14} className="text-emerald-500" /> GDPR & FERPA aware</span>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-3xl -rotate-3 scale-105 blur-2xl -z-10"></div>
            <div className="relative bg-[#0F172A]/80 backdrop-blur-xl p-2 rounded-3xl shadow-2xl border border-slate-800">
              {/* Premium dark shield graphic placeholder */}
              <div className="w-full h-[440px] rounded-2xl bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-slate-800/50 flex flex-col items-center justify-center pb-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>
                <div className="w-32 h-32 rounded-full border border-indigo-500/30 flex items-center justify-center relative z-10 shadow-[0_0_50px_rgba(79,70,229,0.2)]">
                   <div className="w-24 h-24 rounded-full bg-indigo-500/10 border border-indigo-500/50 flex items-center justify-center backdrop-blur-md">
                      <Shield size={48} className="text-indigo-400" />
                   </div>
                   {/* Orbiting dots */}
                   <div className="absolute w-full h-full animate-spin" style={{animationDuration: '10s'}}>
                      <div className="w-2 h-2 rounded-full bg-emerald-400 absolute -top-1 left-1/2 shadow-[0_0_10px_rgba(52,211,153,1)]"></div>
                   </div>
                </div>
                <div className="mt-8 text-center relative z-10">
                   <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-2">
                     <Lock size={12} /> Encrypted Analysis
                   </div>
                   <h3 className="text-2xl font-black text-white tracking-tight">PsyWall Core Engine</h3>
                </div>
              </div>
              
              {/* Floating Widget 1 */}
              <div className="absolute -top-6 -left-6 bg-[#1E293B]/90 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-slate-700 flex gap-4 items-center animate-bounce" style={{animationDuration: '4s'}}>
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 48 48">
                    <circle cx="24" cy="24" r="20" stroke="#334155" strokeWidth="4" fill="transparent" />
                    <circle cx="24" cy="24" r="20" stroke="#ef4444" strokeWidth="4" fill="transparent" strokeDasharray="125.6" strokeDashoffset="12.5" />
                  </svg>
                  <span className="absolute text-xs font-black text-white">87</span>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Threat Analysis</p>
                  <p className="text-sm font-bold text-white mt-0.5">Scam probability <span className="text-red-400">92%</span></p>
                </div>
              </div>
              
              {/* Floating Widget 2 */}
              <div className="absolute -bottom-12 -right-4 md:-right-8 bg-[#020617]/95 backdrop-blur-xl p-5 rounded-2xl shadow-2xl border border-indigo-500/30 w-72">
                <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest flex items-center justify-between mb-4">
                  Detected Tactics
                  <span className="flex items-center gap-1.5 text-emerald-400"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_5px_rgba(16,185,129,0.8)]"></span> live</span>
                </p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm font-bold text-white">
                    <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.8)]"></span> Urgency Pressure</span>
                    <span className="text-slate-400 font-mono text-xs">94%</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-bold text-white">
                    <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_5px_rgba(99,102,241,0.8)]"></span> Authority Impersonation</span>
                    <span className="text-slate-400 font-mono text-xs">81%</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-bold text-white">
                    <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_5px_rgba(249,115,22,0.8)]"></span> Fear Exploitation</span>
                    <span className="text-slate-400 font-mono text-xs">78%</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="py-10 border-y border-white/5 bg-[#0F172A]/50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-8">Trusted by researchers & teams</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 hover:opacity-100 transition-all duration-500">
            <a href="https://www.cyberedt.com" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform">
              <img src="/cyberedt-wordmark.jpg" alt="CyberEDT" className="h-16 md:h-20 object-contain" />
            </a>
          </div>
        </div>
      </section>

      {/* THREE STEPS */}
      <section id="how" className="py-24 bg-[#020617]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h3 className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-3">How PsyWall Works</h3>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-6">From signal to safety in three calm steps.</h2>
            <p className="text-lg text-slate-400">A defensive layer between attackers and human cognition. No browser plugins. No noise.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: '1', title: 'Capture', icon: Eye, color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20', shadow: 'shadow-[0_0_20px_rgba(79,70,229,0.15)]', desc: 'Paste, forward, or stream any suspicious message into PsyWall.' },
              { num: '2', title: 'Cognify', icon: Activity, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20', shadow: 'shadow-[0_0_20px_rgba(168,85,247,0.15)]', desc: 'Our LLM models map the message to known psychological influence vectors.' },
              { num: '3', title: 'Defend', icon: Shield, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', shadow: 'shadow-[0_0_20px_rgba(16,185,129,0.15)]', desc: 'Receive a risk score, manipulation breakdown, and personalized countermeasures.' }
            ].map((step) => (
              <div key={step.num} className={`bg-[#0F172A] p-8 rounded-[2rem] border border-slate-800 ${step.shadow} hover:-translate-y-1 hover:border-slate-600 transition-all group relative overflow-hidden`}>
                <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full ${step.bg} group-hover:scale-150 transition-transform duration-700`}></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-5xl font-black text-slate-800">{step.num}</span>
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${step.bg} ${step.border} ${step.color}`}>
                      <step.icon size={28} />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SIX LEVERS */}
      <section id="psychology" className="py-24 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <h3 className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-3">Scam Psychology, Explained</h3>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-6">The six levers attackers always pull.</h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              PsyWall maps every message against decades of behavioral-science research — from Cialdini's influence vectors to Kahneman's dual-process theory.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: AlertTriangle, title: 'Urgency Pressure', color: 'bg-red-500/10 text-red-400', border: 'hover:border-red-500/30', desc: 'Time-bound threats short-circuit deliberate, slow thinking.' },
              { icon: Activity, title: 'Fear Exploitation', color: 'bg-orange-500/10 text-orange-400', border: 'hover:border-orange-500/30', desc: 'Loss-aversion makes victims act before evaluating evidence.' },
              { icon: Shield, title: 'Authority Impersonation', color: 'bg-blue-500/10 text-blue-400', border: 'hover:border-blue-500/30', desc: 'Borrowed credibility from banks, IT, government, or executives.' },
              { icon: Zap, title: 'Emotional Manipulation', color: 'bg-purple-500/10 text-purple-400', border: 'hover:border-purple-500/30', desc: 'Engineered panic, hope, or empathy to bypass reasoning.' },
              { icon: Lock, title: 'Financial Coercion', color: 'bg-emerald-500/10 text-emerald-400', border: 'hover:border-emerald-500/30', desc: 'Implied monetary loss to extract credentials or transfers.' },
              { icon: Users, title: 'Reciprocity & Scarcity', color: 'bg-pink-500/10 text-pink-400', border: 'hover:border-pink-500/30', desc: "Free gifts, limited slots — Cialdini's classic levers." }
            ].map((lever, i) => (
              <div key={i} className={`p-6 rounded-2xl border border-slate-800 ${lever.border} bg-[#020617]/50 hover:bg-[#1E293B]/50 transition-colors group`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${lever.color} group-hover:scale-110 transition-transform`}>
                  <lever.icon size={24} />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{lever.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{lever.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXAMPLES */}
      <section id="examples" className="py-24 bg-[#020617] text-white relative overflow-hidden border-y border-white/5">
        {/* Dark Bg Effects */}
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#020617] to-[#020617] -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h3 className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-3">Real Threat Examples</h3>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight">Caught in the wild.</h2>
            </div>
            <button onClick={() => navigate('/reports')} className="group flex items-center gap-2 text-sm font-bold text-indigo-400 hover:text-indigo-300 transition-colors">
              Browse all reports <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { type: 'SMS', text: '“Your bank account will be locked in 30 minutes.”', risk: 92, color: 'text-red-400', tags: ['Urgency', 'Authority', 'Fear'] },
              { type: 'Email', text: '“CEO needs gift cards for client gifts — confidential.”', risk: 88, color: 'text-orange-400', tags: ['Authority', 'Secrecy', 'Urgency'] },
              { type: 'DM', text: '“You won the iPhone 15! Claim within 1 hour.”', risk: 84, color: 'text-yellow-400', tags: ['Greed', 'Scarcity', 'Curiosity'] }
            ].map((ex, i) => (
              <div key={i} className="bg-[#1E293B]/30 backdrop-blur-md border border-slate-700/50 p-8 rounded-3xl hover:bg-[#1E293B]/60 transition-colors hover:border-slate-600 shadow-xl">
                <div className="flex justify-between items-center mb-6">
                  <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700">{ex.type}</span>
                  <span className={`text-sm font-black ${ex.color}`}>Risk {ex.risk}</span>
                </div>
                <p className="text-xl font-medium leading-relaxed text-slate-200 mb-8 font-serif italic">"{ex.text}"</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {ex.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRAINING */}
      <section id="awareness" className="py-24 bg-indigo-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <h3 className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest mb-3">Awareness & Education</h3>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6 text-white drop-shadow-md">Train the most important firewall — your team.</h2>
            <p className="text-lg text-indigo-100 leading-relaxed mb-10 max-w-lg">
              Interactive lessons, simulated phishing, and personalized weak-spot reports. Backed by behavioral science, designed for students and researchers.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => navigate('/awareness')} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-indigo-900 font-bold hover:bg-slate-100 shadow-xl transition-transform hover:-translate-y-0.5">
                <Shield size={18} /> Open Awareness Center
              </button>
              <button onClick={() => navigate('/settings')} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-700 border border-indigo-400 text-white font-bold hover:bg-indigo-800 transition-colors">
                <FileText size={18} /> Research Lab
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-[#020617]/20 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex flex-col items-center justify-center text-center shadow-2xl">
              <Users size={32} className="text-indigo-200 mb-4 drop-shadow-md" />
              <p className="text-4xl font-black mb-1">0</p>
              <p className="text-sm text-indigo-200 font-bold">Learners trained</p>
            </div>
            <div className="bg-[#020617]/20 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex flex-col items-center justify-center text-center shadow-2xl">
              <Activity size={32} className="text-indigo-200 mb-4 drop-shadow-md" />
              <p className="text-4xl font-black mb-1">1</p>
              <p className="text-sm text-indigo-200 font-bold">Universities & teams</p>
            </div>
            <div className="bg-[#020617]/20 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex flex-col items-center justify-center text-center shadow-2xl">
              <Shield size={32} className="text-indigo-200 mb-4 drop-shadow-md" />
              <p className="text-4xl font-black mb-1">98.4%</p>
              <p className="text-sm text-indigo-200 font-bold">Detection precision</p>
            </div>
            <div className="bg-[#020617]/20 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex flex-col items-center justify-center text-center shadow-2xl">
              <BarChart size={32} className="text-indigo-200 mb-4 drop-shadow-md" />
              <p className="text-4xl font-black mb-1">47</p>
              <p className="text-sm text-indigo-200 font-bold">Tactic patterns mapped</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="py-32 bg-[#0F172A] text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6">Stop manipulation before it reaches the click.</h2>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Join the public preview and protect your organization with the first true cognitive firewall.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => navigate('/dashboard')} className="w-full sm:w-auto px-10 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-lg shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all hover:-translate-y-0.5 border border-indigo-500">
              Open Dashboard
            </button>
            <button onClick={() => navigate('/scanner')} className="w-full sm:w-auto px-10 py-4 rounded-xl bg-[#1E293B] hover:bg-slate-800 text-white border border-slate-700 font-bold text-lg transition-colors hover:border-slate-500">
              Analyze a Message
            </button>
          </div>
        </div>
      </section>
      </main>
      
      {/* Footer minimal */}
      <footer className="py-8 bg-[#020617] border-t border-slate-800 text-center text-slate-500 text-sm font-semibold">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-6 gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full overflow-hidden shrink-0 bg-gray-900">
               <img src="/logo.jpg" alt="PsyWall" className="w-full h-full object-cover" />
            </div>
            <span>PsyWall Cognitive Firewall <span className="text-slate-700 mx-2">|</span> Powered by <a href="https://www.cyberedt.com" target="_blank" rel="noopener noreferrer" className="inline-block hover:opacity-100 transition-opacity"><img src="/cyberedt-wordmark.jpg" alt="CyberEDT" className="h-7 inline-block ml-1 opacity-90" /></a></span>
          </div>
          <div className="flex gap-6">
            <button onClick={() => navigate('/privacy')} className="hover:text-slate-300 transition-colors">Privacy</button>
            <button onClick={() => navigate('/terms')} className="hover:text-slate-300 transition-colors">Terms</button>
            <button onClick={() => navigate('/documentation')} className="hover:text-slate-300 transition-colors">Research</button>
          </div>
        </div>
      </footer>

    </div>
  );
}
