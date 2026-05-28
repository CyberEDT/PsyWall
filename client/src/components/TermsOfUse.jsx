import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, Shield } from 'lucide-react'

const today = new Date().toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})

export default function TermsOfUse() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6 font-sans">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-900 px-10 py-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-30"></div>
          
          <Link to="/" className="inline-flex items-center gap-2 text-slate-300 font-semibold mb-8 hover:text-white transition-colors relative z-10">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          
          <div className="relative z-10 flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/20">
               <Shield size={20} className="text-indigo-400" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest">Legal Document</p>
              <p className="text-sm font-semibold text-slate-300">PsyWall Team</p>
            </div>
          </div>
          
          <h1 className="text-4xl font-black tracking-tight mb-2 relative z-10">Terms of Use</h1>
          <p className="text-slate-400 font-medium relative z-10">Last Updated: {today}</p>
        </div>

        {/* Content */}
        <div className="px-10 py-12 text-slate-700 leading-relaxed space-y-10">
          
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-md bg-indigo-100 text-indigo-700 text-xs font-black">1</span>
              Introduction
            </h2>
            <div className="space-y-4 pl-9">
              <p>PsyWall ("Service") is a digital content analysis tool operated and owned by PsyWall Team ("Company", "we", "us", "our").</p>
              <p>By accessing or using the Service, you agree to these Terms of Use. If you do not agree, you must discontinue use immediately.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-md bg-indigo-100 text-indigo-700 text-xs font-black">2</span>
              Nature of the Service
            </h2>
            <div className="space-y-4 pl-9">
              <p>PsyWall is a behavioral and psychological manipulation detection system designed to analyze digital content for patterns including:</p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li>Artificial urgency</li>
                <li>Scarcity triggers</li>
                <li>Emotional exploitation</li>
                <li>Authority bias activation</li>
                <li>Social proof manipulation</li>
                <li>Fear-based persuasion</li>
                <li>Cognitive bias exploitation</li>
              </ul>
              <p>The Service provides analytical insights only. It does not:</p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li>Determine legality</li>
                <li>Provide psychological diagnosis</li>
                <li>Confirm intent</li>
                <li>Offer legal or financial advice</li>
                <li>Replace professional consultation</li>
              </ul>
              <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl text-sm font-semibold mt-6">
                All outputs are probabilistic assessments generated through automated systems.
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-md bg-indigo-100 text-indigo-700 text-xs font-black">3</span>
              AI & Automation Disclosure
            </h2>
            <div className="space-y-4 pl-9">
              <p>The Service uses algorithmic pattern detection, natural language processing models, machine learning systems, and behavioral analysis frameworks.</p>
              <p>Outputs are generated automatically and may contain inaccuracies, false positives, or incomplete interpretations.</p>
              <p className="font-bold text-slate-900">PsyWall Team does not guarantee 100% detection accuracy.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-md bg-indigo-100 text-indigo-700 text-xs font-black">4</span>
              User Responsibilities
            </h2>
            <div className="space-y-4 pl-9">
              <p>You agree not to:</p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li>Use the Service for harassment or defamation</li>
                <li>Use analysis results to target individuals or organizations</li>
                <li>Submit illegal or malicious content</li>
                <li>Attempt reverse engineering or system probing</li>
                <li>Interfere with platform security</li>
              </ul>
              <p className="font-bold text-slate-900 mt-4">You are solely responsible for your decisions based on the output.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-md bg-indigo-100 text-indigo-700 text-xs font-black">5</span>
              Intellectual Property
            </h2>
            <div className="space-y-4 pl-9">
              <p>All intellectual property rights related to PsyWall algorithms, risk scoring systems, psychological detection frameworks, interface design, and branding belong exclusively to PsyWall Team.</p>
              <p className="font-bold text-slate-900">Unauthorized reproduction, distribution, or modification is prohibited.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-md bg-indigo-100 text-indigo-700 text-xs font-black">6</span>
              Limitation of Liability
            </h2>
            <div className="space-y-4 pl-9">
              <p>To the fullest extent permitted by law, PsyWall Team shall not be liable for financial losses, business losses, reputational harm, emotional distress, misinterpretation of analysis, or third-party misuse.</p>
              <p className="font-bold text-slate-900">The Service is provided "AS IS" and "AS AVAILABLE."</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-md bg-indigo-100 text-indigo-700 text-xs font-black">7</span>
              Service Availability & Termination
            </h2>
            <div className="space-y-4 pl-9">
              <p>PsyWall Team reserves right to modify features, suspend access, update detection models, restrict users, or introduce paid tiers without prior notice.</p>
              <p>We may suspend or terminate access if Terms are violated, security risks are detected, or legal compliance requires action.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-md bg-indigo-100 text-indigo-700 text-xs font-black">8</span>
              Governing Law
            </h2>
            <div className="space-y-4 pl-9">
              <p>These Terms shall be governed by the laws applicable to PsyWall Team's registered jurisdiction.</p>
            </div>
          </section>

        </div>
      </motion.div>
    </div>
  )
}
