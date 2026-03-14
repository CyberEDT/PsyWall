import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, AlertTriangle, CheckCircle, Info, Zap, Search, Activity, ArrowLeft } from 'lucide-react'
import LiquidEther from './components/LiquidEther'
import TermsOfUse from './components/TermsOfUse'
import PrivacyPolicy from './components/PrivacyPolicy'
import ToolInfo from './components/ToolInfo'
import Documentation from './components/Documentation'
import './App.css'

function App() {
  const [inputText, setInputText] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [currentView, setCurrentView] = useState('main') // 'main', 'terms', 'privacy', 'tool-info', 'documentation'

  useEffect(() => {
    const titles = {
      main: 'Home',
      'tool-info': 'About the Tool',
      documentation: 'Technical Documentation',
      terms: 'Terms of Use',
      privacy: 'Privacy Policy'
    }
    document.title = `PsyWall | ${titles[currentView] || 'Cognitive Security'}`
  }, [currentView])

  const handleAnalyze = async () => {
    if (!inputText) return
    setLoading(true)
    setResult(null)
    try {
      const response = await fetch('http://localhost:3001/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText })
      })
      const data = await response.json()

      if (data.status === 'error') {
        setResult({ error: `${data.code}: ${data.message}` })
      } else {
        setResult(data)
      }
    } catch (error) {
      console.error('Error analyzing text:', error)
      setResult({ error: 'COGNITIVE_FAILURE: Backend unreachable or offline' })
    } finally {
      setLoading(false)
    }
  }

  const renderMainApp = () => (
    <div className="min-h-screen bg-[#0a0a0b] text-slate-200 relative overflow-x-hidden">
      {/* BACKGROUND EFFECT */}
      <div className="fixed inset-0 z-0 opacity-40">
        <LiquidEther
          colors={['#5227FF', '#FF9FFC', '#B19EEF']}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          dt={0.014}
          BFECC={true}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={1000}
          autoRampDuration={0.6}
        />
      </div>

      {/* NEW NAVBAR */}
      <nav className="relative z-10 w-full border-b border-slate-800/50 bg-[#0a0a0b]/80 backdrop-blur-md pointer-events-auto">
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex justify-between items-center">
          <div
            className="text-white font-black text-xl cursor-pointer hover:text-blue-400 transition-colors"
            onClick={() => setCurrentView('main')}
          >
            PsyWall
          </div>
          <div className="flex gap-8 text-[13px] font-medium tracking-wide items-center">
            <button
              onClick={() => setCurrentView('main')}
              className={`${currentView === 'main' ? 'text-white' : 'text-slate-500'} hover:text-white transition-colors`}
            >
              Analyze
            </button>
            <button
              onClick={() => setCurrentView('tool-info')}
              className={`${currentView === 'tool-info' ? 'text-white' : 'text-slate-500'} hover:text-white transition-colors`}
            >
              Tool Info
            </button>
            <button
              onClick={() => setCurrentView('documentation')}
              className={`${currentView === 'documentation' ? 'text-white' : 'text-slate-500'} hover:text-white transition-colors`}
            >
              Documentation
            </button>
            <span className="text-slate-700 select-none">|</span>
            <span className="text-slate-500 font-mono text-[11px] bg-slate-800/50 px-2 py-0.5 rounded">
              v0.1.0
            </span>
          </div>
        </div>
      </nav>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center p-8 min-h-[calc(100-4rem)] pointer-events-none">
        <div className="w-full max-w-4xl flex justify-center mb-8 pt-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="pointer-events-auto flex flex-col items-center gap-2"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-xl border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                <Shield className="text-blue-400" size={32} />
              </div>
              <h1 className="text-4xl font-black tracking-tighter text-white">
                PSY<span className="text-blue-500">WALL</span>
              </h1>
            </div>
            <p className="text-slate-500 text-[10px] uppercase font-bold tracking-[0.3em]">Cognitive Intrusion Detection</p>
          </motion.div>
        </div>

        <main className="w-full max-w-2xl pointer-events-auto space-y-6">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div
                key="input-card"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="bg-slate-900/40 backdrop-blur-2xl border border-slate-800/50 rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              >
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <Search size={14} className="text-blue-400" />
                      Content Analysis Terminal
                    </label>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-red-500/50" />
                      <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                      <div className="w-2 h-2 rounded-full bg-green-500/50" />
                    </div>
                  </div>
                  <textarea
                    className="w-full h-56 bg-black/40 border border-slate-800 focus:border-blue-500/50 rounded-2xl p-5 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-4 focus:ring-blue-500/5 transition-all resize-none text-sm leading-relaxed font-mono"
                    placeholder="Paste communication content here to detect psychological manipulation, logical fallacies, or persuasive techniques..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                  />
                </div>

                <button
                  onClick={handleAnalyze}
                  disabled={loading || !inputText}
                  className={`w-full py-4.5 rounded-2xl font-black text-[13px] uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-3 group relative overflow-hidden ${loading || !inputText
                    ? 'bg-slate-800/50 text-slate-500 cursor-not-allowed border border-slate-700/50'
                    : 'bg-white text-black hover:bg-blue-50 hover:scale-[1.01] active:scale-[0.99] border border-white'
                    }`}
                >
                  {loading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      >
                        <Activity size={18} />
                      </motion.div>
                      Decrypting Patterns...
                    </>
                  ) : (
                    <>
                      <Zap size={18} className="group-hover:text-blue-600 transition-colors" />
                      Run Cognitive Audit
                    </>
                  )}
                </button>
              </motion.div>
            ) : result?.error ? (
              <motion.div
                key="error-card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-8 bg-red-500/5 border border-red-500/20 rounded-3xl text-red-400 text-sm font-mono flex flex-col items-center gap-4 text-center shadow-[0_0_30px_rgba(239,68,68,0.1)] backdrop-blur-xl"
              >
                <div className="p-3 bg-red-500/10 rounded-full">
                  <AlertTriangle size={32} />
                </div>
                <div className="space-y-1">
                  <p className="font-black uppercase tracking-widest text-xs opacity-50">System Failure</p>
                  <p className="text-lg font-bold">COGNITIVE_DETECTOR_ERROR</p>
                </div>
                <div className="p-4 bg-black/40 border border-red-500/20 rounded-xl w-full text-left">
                  {result.error}
                </div>
                <button
                  onClick={() => setResult(null)}
                  className="mt-4 text-xs font-black uppercase tracking-widest bg-white text-black px-6 py-2 rounded-full hover:bg-slate-200 transition-colors"
                >
                  Reset Terminal
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="result-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Result Control Box */}
                <div className="flex justify-between items-center bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 p-4 rounded-2xl">
                  <button
                    onClick={() => setResult(null)}
                    className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-widest"
                  >
                    <ArrowLeft size={14} />
                    New Audit
                  </button>
                  <div className="text-[10px] font-mono text-blue-500 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                    SCAN_ID: {Math.random().toString(36).substring(7).toUpperCase()}
                  </div>
                </div>

                {/* Primary Alert */}
                <div className={`relative overflow-hidden p-8 rounded-3xl border transition-all ${result.alertPayload.score > 40
                  ? 'bg-red-500/5 border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.1)]'
                  : result.alertPayload.score > 10
                    ? 'bg-yellow-500/5 border-yellow-500/20'
                    : 'bg-emerald-500/5 border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.1)]'
                  }`}>
                  <div className={`absolute top-0 right-0 p-3 font-black text-[80px] opacity-5 select-none ${result.alertPayload.score > 40 ? 'text-red-500' : 'text-slate-500'
                    }`}>
                    {result.alertPayload.score}
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`p-2 rounded-lg ${result.alertPayload.score > 40 ? 'bg-red-500/20 text-red-400' :
                        result.alertPayload.score > 10 ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-emerald-500/20 text-emerald-400'
                        }`}>
                        {result.alertPayload.score > 40 ? (
                          <AlertTriangle size={24} />
                        ) : result.alertPayload.score > 10 ? (
                          <AlertTriangle size={24} />
                        ) : (
                          <CheckCircle size={24} />
                        )}
                      </div>
                      <h2 className="text-2xl font-black text-white tracking-tight">
                        {result.alertPayload.title}
                      </h2>
                    </div>

                    {result.alertPayload.tactics ? (
                      <div className="space-y-6">
                        <div className="bg-black/20 rounded-2xl p-5 border border-white/5">
                          <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Detected Vectors:</p>
                          <div className="space-y-4">
                            {result.alertPayload.tactics.map((t, i) => (
                              <div key={i} className="group">
                                <div className="flex justify-between items-center mb-1">
                                  <span className="text-sm font-bold text-slate-100 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgb(59,130,246)]" />
                                    {t.name}
                                  </span>
                                  <span className="text-[10px] font-mono font-black text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded border border-blue-400/20">
                                    CONFIDENCE: {t.confidence}%
                                  </span>
                                </div>
                                <p className="text-xs text-slate-400 pl-3.5 leading-relaxed mt-1 opacity-80 group-hover:opacity-100 transition-opacity">
                                  {t.explanation}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="p-5 bg-slate-950/40 rounded-2xl border border-slate-800/50">
                          <p className="text-xs font-black text-slate-500 mb-2 uppercase tracking-tight flex items-center gap-2">
                            <Info size={12} />
                            Cognitive Impact Assessment
                          </p>
                          <p className="text-sm text-slate-300 font-medium leading-relaxed italic">
                            &quot;{result.alertPayload.impactWarning}&quot;
                          </p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-slate-400 italic bg-black/20 p-4 rounded-xl border border-white/5">
                        {result.alertPayload.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Advanced Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 p-6 rounded-3xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 blur-3xl transition-all group-hover:bg-blue-500/10" />
                    <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-3">Threat Intensity</p>
                    <div className="flex items-end gap-3">
                      <span className={`text-6xl font-black leading-none ${result.riskLevel === 'CRITICAL' ? 'text-red-500' :
                        result.riskLevel === 'HIGH' ? 'text-orange-500' :
                          result.riskLevel === 'ELEVATED' ? 'text-yellow-500' : 'text-emerald-500'
                        }`}>
                        {Math.round(result.intensityScore * 100)}
                      </span>
                      <div className="flex flex-col mb-1">
                        <span className="text-xs font-bold text-slate-600">/ 100</span>
                        <span className={`text-[11px] font-black uppercase tracking-tighter ${result.riskLevel === 'CRITICAL' ? 'text-red-500' :
                          result.riskLevel === 'HIGH' ? 'text-orange-500' :
                            result.riskLevel === 'ELEVATED' ? 'text-yellow-500' : 'text-emerald-400'
                          }`}>
                          {result.riskLevel} SEVERITY
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 p-6 rounded-3xl space-y-4">
                    <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Audit Breakdown</p>
                    <div className="space-y-3">
                      {[
                        { label: 'Emotion Spectrum', val: result.riskAnalysis?.breakdown?.emotionalIntensity, color: 'bg-blue-500' },
                        { label: 'Confidence Score', val: result.riskAnalysis?.breakdown?.confidenceAggregation, color: 'bg-purple-500' },
                        { label: 'Tactical Density', val: result.riskAnalysis?.breakdown?.densityFactor, color: 'bg-emerald-500' }
                      ].map((item, i) => (
                        <div key={i} className="space-y-1.5">
                          <div className="flex justify-between text-[10px] font-black uppercase tracking-tighter">
                            <span className="text-slate-400">{item.label}</span>
                            <span className="text-white">{item.val}%</span>
                          </div>
                          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${item.val}%` }}
                              className={`h-full ${item.color}`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sub-detections */}
                {result.detections?.length > 0 && (
                  <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-3xl overflow-hidden shadow-2xl">
                    <div className="p-6 border-b border-slate-800/50 flex justify-between items-center">
                      <h3 className="text-xs font-black text-slate-300 uppercase tracking-widest">Neural Breakdown</h3>
                      <div className="text-[10px] font-mono text-slate-500">{result.detections.length} Signals Captured</div>
                    </div>
                    <div className="divide-y divide-slate-800/50">
                      {result.detections.map((det, idx) => (
                        <div key={idx} className="p-6 hover:bg-white/5 transition-colors group">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-1">
                                <span className={`text-sm font-black tracking-tight ${det.isLowCertainty ? 'text-slate-500 italic' : 'text-slate-100'}`}>
                                  {det.displayLabel}
                                </span>
                                {det.isAmbiguous && (
                                  <span className="text-[9px] bg-yellow-500/10 text-yellow-500 px-2 py-0.5 rounded-full border border-yellow-500/20 font-black">
                                    AMBIGUOUS
                                  </span>
                                )}
                              </div>
                              <p className="text-[13px] text-slate-400 leading-relaxed font-medium opacity-70 group-hover:opacity-100 transition-opacity pr-8">
                                {det.description}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="text-xs font-black text-white mb-1">{det.count}x</div>
                              <div className="text-[9px] font-mono text-slate-600 uppercase">Instances</div>
                            </div>
                          </div>

                          {det.advice && (
                            <div className="mt-4 p-3 bg-blue-500/5 border border-blue-500/20 rounded-xl flex items-start gap-3">
                              <Info size={14} className="text-blue-400 shrink-0 mt-0.5" />
                              <p className="text-[11px] text-blue-300/80 font-medium leading-normal italic">
                                {det.advice}
                              </p>
                            </div>
                          )}

                          <div className="mt-4 flex gap-2 overflow-x-auto no-scrollbar pb-1">
                            {det.evidence.slice(0, 2).map((ev, i) => (
                              <div key={i} className="text-[10px] font-mono px-3 py-2 bg-black/40 border border-slate-800/50 text-slate-400 rounded-lg whitespace-nowrap opacity-60 hover:opacity-100 transition-opacity">
                                &quot;{ev.context.length > 40 ? ev.context.substring(0, 40) + '...' : ev.context}&quot;
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="p-6 bg-blue-500/5 border border-blue-500/10 rounded-3xl text-center">
                  <p className="text-[11px] text-blue-400/60 font-mono italic leading-relaxed">
                    NEURAL_LOG: {result.summary}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <footer className="mt-20 pb-8 text-slate-600 text-[11px] font-mono text-center space-y-3 pointer-events-auto">
          <div className="flex justify-center flex-wrap gap-6 items-center">
            <span className="font-bold text-slate-800 opacity-50 uppercase tracking-[0.2em]">CyberEDT Security Infrastructure</span>
            <div className="w-1 h-1 rounded-full bg-slate-800" />
            <button
              onClick={() => setCurrentView('privacy')}
              className="hover:text-blue-400 transition-colors uppercase tracking-widest"
            >
              Privacy Protocol
            </button>
            <div className="w-1 h-1 rounded-full bg-slate-800" />
            <button
              onClick={() => setCurrentView('terms')}
              className="hover:text-blue-400 transition-colors uppercase tracking-widest"
            >
              Terms of Engagement
            </button>
          </div>
          <div className="opacity-40">© 2024 Cognitive Defense Systems. All rights reserved.</div>
        </footer>
      </div>
    </div >
  )

  const renderTermsOfUse = () => (
    <div className="min-h-screen bg-[#0a0a0b] text-slate-200 relative overflow-x-hidden">
      {/* BACKGROUND EFFECT */}
      <div className="fixed inset-0 z-0 opacity-20">
        <LiquidEther
          colors={['#5227FF', '#FF9FFC', '#B19EEF']}
          mouseForce={10}
          cursorSize={50}
          autoDemo={true}
          autoSpeed={0.3}
          autoIntensity={1.5}
        />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <button
            onClick={() => setCurrentView('main')}
            className="mb-8 flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Tool
          </button>

          <TermsOfUse />
        </div>

        <footer className="mt-auto pt-12 pb-4 text-slate-500 text-xs font-mono text-center space-y-2 pointer-events-auto">
          <div>© 2024 CyberEDT. All rights reserved</div>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setCurrentView('privacy')}
              className="hover:text-slate-400 transition-colors"
            >
              Privacy Policy
            </button>
            <span>|</span>
            <button
              onClick={() => setCurrentView('terms')}
              className="hover:text-slate-400 transition-colors"
            >
              Terms of Use
            </button>
          </div>
        </footer>
      </div>
    </div>
  )

  const renderToolInfo = () => (
    <div className="min-h-screen bg-[#0a0a0b] text-slate-200 relative overflow-x-hidden selection:bg-blue-500/30">
      {/* BACKGROUND EFFECT */}
      <div className="fixed inset-0 z-0 opacity-15">
        <LiquidEther
          colors={['#5227FF', '#FF9FFC', '#B19EEF']}
          mouseForce={15}
          cursorSize={80}
          autoDemo={true}
          autoSpeed={0.2}
          autoIntensity={1.2}
        />
      </div>

      {/* NAVBAR */}
      <nav className="relative z-20 w-full border-b border-slate-800/50 bg-[#0a0a0b]/80 backdrop-blur-md">
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex justify-between items-center text-[13px] font-medium tracking-wide">
          <div
            className="text-white font-black text-xl cursor-pointer"
            onClick={() => setCurrentView('main')}
          >
            PsyWall
          </div>
          <div className="flex gap-8 items-center">
            <button onClick={() => setCurrentView('main')} className="text-slate-500 hover:text-white transition-colors">Analyze</button>
            <button onClick={() => setCurrentView('tool-info')} className="text-white">Tool Info</button>
            <button
              onClick={() => setCurrentView('documentation')}
              className="text-slate-500 hover:text-white transition-colors"
            >
              Documentation
            </button>
            <span className="text-slate-700">|</span>
            <span className="text-slate-500 font-mono text-[11px]">v0.1.0</span>
          </div>
        </div>
      </nav>

      <div className="relative z-10">
        <ToolInfo />
      </div>

      <footer className="relative z-10 py-12 border-t border-slate-800/30">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col items-center gap-4 text-[11px] font-mono text-slate-600">
          <div>© 2024 CyberEDT</div>
          <div className="flex gap-4">
            <button onClick={() => setCurrentView('privacy')} className="hover:text-slate-400 transition-colors">Privacy</button>
            <span className="text-slate-800">|</span>
            <button onClick={() => setCurrentView('terms')} className="hover:text-slate-400 transition-colors">Terms</button>
          </div>
        </div>
      </footer>
    </div>
  )

  const renderDocumentation = () => (
    <div className="min-h-screen bg-[#0a0a0b] text-slate-200 relative overflow-x-hidden selection:bg-blue-500/30">
      {/* BACKGROUND EFFECT */}
      <div className="fixed inset-0 z-0 opacity-10">
        <LiquidEther
          colors={['#5227FF', '#FF9FFC', '#B19EEF']}
          mouseForce={10}
          cursorSize={60}
          autoDemo={true}
          autoSpeed={0.15}
          autoIntensity={1.0}
        />
      </div>

      {/* NAVBAR */}
      <nav className="relative z-20 w-full border-b border-slate-800/50 bg-[#0a0a0b]/80 backdrop-blur-md">
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex justify-between items-center text-[13px] font-medium tracking-wide">
          <div
            className="text-white font-black text-xl cursor-pointer"
            onClick={() => setCurrentView('main')}
          >
            PsyWall
          </div>
          <div className="flex gap-8 items-center">
            <button onClick={() => setCurrentView('main')} className="text-slate-500 hover:text-white transition-colors">Analyze</button>
            <button onClick={() => setCurrentView('tool-info')} className="text-slate-500 hover:text-white transition-colors">Tool Info</button>
            <button onClick={() => setCurrentView('documentation')} className="text-white">Documentation</button>
            <span className="text-slate-700">|</span>
            <span className="text-slate-500 font-mono text-[11px]">v0.1.0</span>
          </div>
        </div>
      </nav>

      <div className="relative z-10 pt-12">
        <div className="max-w-[1200px] mx-auto px-6 mb-8 text-center md:text-left">
          <h2 className="text-[10px] uppercase font-black tracking-[0.4em] text-blue-500/80 mb-2">Technical Resources</h2>
          <h1 className="text-4xl font-black text-white">PsyWall Documentation</h1>
        </div>
        <Documentation />
      </div>

      <footer className="relative z-10 py-12 border-t border-slate-800/30">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col items-center gap-4 text-[11px] font-mono text-slate-600">
          <div>© 2024 CyberEDT</div>
          <div className="flex gap-4">
            <button onClick={() => setCurrentView('privacy')} className="hover:text-slate-400 transition-colors">Privacy</button>
            <span className="text-slate-800">|</span>
            <button onClick={() => setCurrentView('terms')} className="hover:text-slate-400 transition-colors">Terms</button>
          </div>
        </div>
      </footer>
    </div>
  )

  const renderPrivacyPolicy = () => (
    <div className="min-h-screen bg-[#0a0a0b] text-slate-200 relative overflow-x-hidden">
      {/* BACKGROUND EFFECT */}
      <div className="fixed inset-0 z-0 opacity-20">
        <LiquidEther
          colors={['#5227FF', '#FF9FFC', '#B19EEF']}
          mouseForce={10}
          cursorSize={50}
          autoDemo={true}
          autoSpeed={0.3}
          autoIntensity={1.5}
        />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <button
            onClick={() => setCurrentView('main')}
            className="mb-8 flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Tool
          </button>

          <PrivacyPolicy />
        </div>

        <footer className="mt-auto pt-12 pb-4 text-slate-500 text-xs font-mono text-center space-y-2 pointer-events-auto">
          <div>© 2024 CyberEDT. All rights reserved</div>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setCurrentView('privacy')}
              className="hover:text-slate-400 transition-colors"
            >
              Privacy Policy
            </button>
            <span>|</span>
            <button
              onClick={() => setCurrentView('terms')}
              className="hover:text-slate-400 transition-colors"
            >
              Terms of Use
            </button>
          </div>
        </footer>
      </div>
    </div>
  )

  return (
    <AnimatePresence mode="wait">
      {currentView === 'main' && renderMainApp()}
      {currentView === 'tool-info' && renderToolInfo()}
      {currentView === 'documentation' && renderDocumentation()}
      {currentView === 'terms' && renderTermsOfUse()}
      {currentView === 'privacy' && renderPrivacyPolicy()}
    </AnimatePresence>
  )
}

export default App


