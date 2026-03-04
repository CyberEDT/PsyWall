import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, AlertTriangle, CheckCircle, Info, Zap, Search, Activity, ArrowLeft } from 'lucide-react'
import LiquidEther from './components/LiquidEther'
import TermsOfUse from './components/TermsOfUse'
import PrivacyPolicy from './components/PrivacyPolicy'
import ToolInfo from './components/ToolInfo'
import Documentation from './components/Documentation'
import './App.css'
import logo from './assets/logo/logo.png'

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
        <div className="w-full max-w-4xl flex justify-center mb-12">
          {/* Logo only header as requested earlier */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="pointer-events-auto"
          >
            <img src={logo} alt="PsyWall Logo" className="h-16 w-auto" />
          </motion.div>
        </div>

        <main className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl pointer-events-auto">
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-600 mb-2 uppercase tracking-wider flex items-center gap-2">
              <Search size={14} />
              Input Content for Analysis
            </label>
            <textarea
              className="w-full h-48 bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none"
              placeholder="Paste text here to detect psychological manipulation..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={loading || !inputText}
            className={`w-full py-4 rounded-xl font-bold text-white transition-all shadow-lg flex items-center justify-center gap-2 ${loading || !inputText
              ? 'bg-slate-800 cursor-not-allowed opacity-50'
              : 'bg-black hover:bg-slate-900 active:scale-[0.98]'
              }`}
          >
            {loading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                  <Activity size={20} />
                </motion.div>
                ANALYZING...
              </>
            ) : (
              <>
                <Zap size={20} />
                RUN ANALYSIS
              </>
            )}
          </button>

          <AnimatePresence mode="wait">
            {result && !result.error && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-8 space-y-6"
              >
                {/* MANDATORY ALERT INTERFACE */}
                <div className={`p-6 rounded-2xl border-2 transition-colors ${result.alertPayload.score > 40
                  ? 'bg-red-500/10 border-red-500/40'
                  : result.alertPayload.score > 10
                    ? 'bg-yellow-500/10 border-yellow-500/40'
                    : 'bg-emerald-500/10 border-emerald-500/40'
                  }`}>
                  <h2 className="text-xl font-black mb-4 tracking-tight flex items-center gap-2">
                    {result.alertPayload.score > 40 ? (
                      <AlertTriangle className="text-red-500" />
                    ) : result.alertPayload.score > 10 ? (
                      <AlertTriangle className="text-yellow-500" />
                    ) : (
                      <CheckCircle className="text-emerald-500" />
                    )}
                    {result.alertPayload.title}
                  </h2>

                  {result.alertPayload.tactics ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-sm font-bold text-slate-300">
                        Manipulation Risk Score:
                        <span className={result.alertPayload.score > 40 ? 'text-red-500' : 'text-slate-100'}>
                          [{result.alertPayload.score}]
                        </span>
                      </div>

                      <div className="space-y-3">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Detected Tactics:</p>
                        {result.alertPayload.tactics.map((t, i) => (
                          <div key={i} className="pl-4 border-l-2 border-slate-700">
                            <div className="text-sm font-bold text-slate-200">
                              - {t.name} — <span className="text-blue-400">Confidence: [{t.confidence}%]</span>
                            </div>
                            <p className="text-xs text-slate-400 mt-1 italic">
                              Explanation: {t.explanation}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 p-4 bg-slate-950/80 rounded-xl border border-slate-800">
                        <p className="text-xs font-bold text-slate-500 mb-2 uppercase">Cognitive Impact Warning:</p>
                        <p className="text-sm text-slate-200 font-medium leading-relaxed">
                          "{result.alertPayload.impactWarning}"
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-slate-400 italic">
                      {result.alertPayload.message}
                    </p>
                  )}
                </div>
                {/* Risk Dashboard */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-950/60 border border-slate-800 p-5 rounded-2xl backdrop-blur-md">
                    <p className="text-[10px] text-slate-500 uppercase font-black tracking-tighter mb-1">Overall Manipulation Score</p>
                    <div className="flex items-end gap-3">
                      <span className={`text-5xl font-black leading-none ${result.riskLevel === 'CRITICAL' ? 'text-red-500' :
                        result.riskLevel === 'HIGH' ? 'text-orange-500' :
                          result.riskLevel === 'ELEVATED' ? 'text-yellow-500' : 'text-emerald-500'
                        }`}>
                        {Math.round(result.intensityScore * 100)}
                      </span>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-400">/ 100</span>
                        <span className={`text-[10px] font-black uppercase ${result.riskLevel === 'CRITICAL' ? 'text-red-500/80' :
                          result.riskLevel === 'HIGH' ? 'text-orange-500/80' :
                            result.riskLevel === 'ELEVATED' ? 'text-yellow-500/80' : 'text-emerald-400/80'
                          }`}>
                          {result.riskLevel} RISK
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-950/60 border border-slate-800 p-5 rounded-2xl space-y-3 backdrop-blur-md">
                    <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Scoring Transparency</p>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[10px] font-mono">
                        <span className="text-slate-400">Emotional Intensity (40%)</span>
                        <span className="text-blue-400">{result.riskAnalysis?.breakdown?.emotionalIntensity}%</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-mono">
                        <span className="text-slate-400">Confidence Aggregation (40%)</span>
                        <span className="text-purple-400">{result.riskAnalysis?.breakdown?.confidenceAggregation}%</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-mono">
                        <span className="text-slate-400">Persuasion Density (20%)</span>
                        <span className="text-emerald-400">{result.riskAnalysis?.breakdown?.densityFactor}%</span>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-slate-800/50">
                      <p className="text-[9px] text-slate-600 font-mono italic">
                        Method: {result.riskAnalysis?.formula}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Detections List */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Tactical Detection Breakdown</h3>
                  {result.detections?.length > 0 ? (
                    result.detections.map((det, idx) => (
                      <div key={idx} className="bg-slate-950/60 border border-slate-800/50 p-4 rounded-xl hover:border-slate-700 transition-colors backdrop-blur-md">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className={`text-sm font-bold ${det.isLowCertainty ? 'text-slate-500 italic' : 'text-slate-200'}`}>
                                {det.displayLabel}
                              </span>
                              {det.isAmbiguous && (
                                <span className="text-[9px] bg-yellow-500/10 text-yellow-500 px-1.5 py-0.5 rounded border border-yellow-500/20 animate-pulse">
                                  AMBIGUOUS
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-500 mt-1">{det.description}</p>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded text-[10px] font-mono whitespace-nowrap">
                              {det.count}x MATCHES
                            </span>
                            <span className={`text-[10px] font-mono ${det.confidencePercent < 40 ? 'text-slate-600' : 'text-slate-400'}`}>
                              CONFIDENCE: {det.confidencePercent}%
                            </span>
                          </div>
                        </div>
                        {det.advice && (
                          <div className="mb-3 p-2 bg-yellow-500/5 border-l-2 border-yellow-500/30 text-[10px] text-yellow-500/80 italic">
                            <Info size={10} className="inline mr-1" /> {det.advice}
                          </div>
                        )}
                        {/* Context Samples */}
                        <div className="mt-3 space-y-1.5">
                          {det.evidence.slice(0, 2).map((ev, i) => (
                            <div key={i} className="text-[11px] font-mono p-2 bg-slate-900/50 border-l-2 border-blue-500/50 text-slate-400 italic">
                              {ev.context}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center border border-dashed border-slate-800 rounded-xl text-slate-600 italic text-sm">
                      No malicious psychological patterns detected in this sample.
                    </div>
                  )}
                </div>

                <div className="p-3 bg-blue-500/5 border border-blue-500/10 rounded-lg">
                  <p className="text-[10px] text-blue-400/80 font-mono italic">
                    {result.summary}
                  </p>
                </div>
              </motion.div>
            )}

            {result?.error && (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm font-mono flex items-center gap-3"
              >
                <AlertTriangle size={18} />
                <span>DETECTOR ERROR: {result.error}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

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


