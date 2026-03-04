import { motion } from 'framer-motion'
import { Shield, ArrowLeft } from 'lucide-react'

const today = new Date().toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})

export default function TermsOfUse() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <header className="text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-4xl font-black bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4 flex items-center justify-center gap-3"
        >
          🛡️ PSYWALL TERMS
        </motion.h1>
        <div className="text-slate-400 space-y-1">
          <p className="text-sm">Last Updated: {today}</p>
          <p className="text-sm">Operated by: PsyWall Team</p>
        </div>
      </header>

      <div className="space-y-8 text-slate-300">
        <section className="bg-slate-900/40 border border-slate-800/50 rounded-2xl p-6 backdrop-blur-2xl">
          <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>PsyWall ("Service") is a digital content analysis tool operated and owned by PsyWall Team ("Company", "we", "us", "our").</p>
            <p>By accessing or using the Service, you agree to these Terms of Use. If you do not agree, you must discontinue use immediately.</p>
          </div>
        </section>

        <section className="bg-slate-900/40 border border-slate-800/50 rounded-2xl p-6 backdrop-blur-2xl">
          <h2 className="text-2xl font-bold text-white mb-4">2. Nature of the Service</h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>PsyWall is a behavioral and psychological manipulation detection system designed to analyze digital content for patterns including:</p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-slate-400">
              <li>Artificial urgency</li>
              <li>Scarcity triggers</li>
              <li>Emotional exploitation</li>
              <li>Authority bias activation</li>
              <li>Social proof manipulation</li>
              <li>Fear-based persuasion</li>
              <li>Cognitive bias exploitation</li>
            </ul>
            <p className="mt-4">The Service provides analytical insights only.</p>
            <p>It does not:</p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-slate-400">
              <li>Determine legality</li>
              <li>Provide psychological diagnosis</li>
              <li>Confirm intent</li>
              <li>Offer legal or financial advice</li>
              <li>Replace professional consultation</li>
            </ul>
            <p className="mt-4 font-semibold text-blue-400">All outputs are probabilistic assessments generated through automated systems.</p>
          </div>
        </section>

        <section className="bg-slate-900/40 border border-slate-800/50 rounded-2xl p-6 backdrop-blur-2xl">
          <h2 className="text-2xl font-bold text-white mb-4">3. AI & Automation Disclosure</h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>The Service uses:</p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-slate-400">
              <li>Algorithmic pattern detection</li>
              <li>Natural language processing models</li>
              <li>Machine learning systems</li>
              <li>Behavioral analysis frameworks</li>
            </ul>
            <p className="mt-4">Outputs are generated automatically and may contain inaccuracies, false positives, or incomplete interpretations.</p>
            <p className="font-semibold text-yellow-400">PsyWall Team does not guarantee 100% detection accuracy.</p>
          </div>
        </section>

        <section className="bg-slate-900/40 border border-slate-800/50 rounded-2xl p-6 backdrop-blur-2xl">
          <h2 className="text-2xl font-bold text-white mb-4">4. User Responsibilities</h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>You agree not to:</p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-slate-400">
              <li>Use the Service for harassment or defamation</li>
              <li>Use analysis results to target individuals or organizations</li>
              <li>Submit illegal or malicious content</li>
              <li>Attempt reverse engineering or system probing</li>
              <li>Interfere with platform security</li>
            </ul>
            <p className="mt-4 font-semibold text-red-400">You are solely responsible for your decisions based on the output.</p>
          </div>
        </section>

        <section className="bg-slate-900/40 border border-slate-800/50 rounded-2xl p-6 backdrop-blur-2xl">
          <h2 className="text-2xl font-bold text-white mb-4">5. Intellectual Property</h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>All intellectual property rights related to:</p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-slate-400">
              <li>PsyWall algorithms</li>
              <li>Risk scoring systems</li>
              <li>Psychological detection frameworks</li>
              <li>Interface design</li>
              <li>Branding</li>
            </ul>
            <p className="mt-4 font-semibold text-purple-400">Belong exclusively to PsyWall Team.</p>
            <p className="font-semibold text-purple-400">Unauthorized reproduction, distribution, or modification is prohibited.</p>
          </div>
        </section>

        <section className="bg-slate-900/40 border border-slate-800/50 rounded-2xl p-6 backdrop-blur-2xl">
          <h2 className="text-2xl font-bold text-white mb-4">6. Limitation of Liability</h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>To the fullest extent permitted by law, PsyWall Team shall not be liable for:</p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-slate-400">
              <li>Financial losses</li>
              <li>Business losses</li>
              <li>Reputational harm</li>
              <li>Emotional distress</li>
              <li>Misinterpretation of analysis</li>
              <li>Third-party misuse</li>
            </ul>
            <p className="mt-4 font-mono text-xs text-slate-500">The Service is provided "AS IS" and "AS AVAILABLE."</p>
          </div>
        </section>

        <section className="bg-slate-900/40 border border-slate-800/50 rounded-2xl p-6 backdrop-blur-2xl">
          <h2 className="text-2xl font-bold text-white mb-4">7. Service Availability</h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>PsyWall Team reserves right to:</p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-slate-400">
              <li>Modify features</li>
              <li>Suspend access</li>
              <li>Update detection models</li>
              <li>Restrict users</li>
              <li>Introduce paid tiers</li>
            </ul>
            <p className="mt-4 text-slate-400">Without prior notice.</p>
          </div>
        </section>

        <section className="bg-slate-900/40 border border-slate-800/50 rounded-2xl p-6 backdrop-blur-2xl">
          <h2 className="text-2xl font-bold text-white mb-4">8. Termination</h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>We may suspend or terminate access if:</p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-slate-400">
              <li>Terms are violated</li>
              <li>Security risks are detected</li>
              <li>Legal compliance requires action</li>
            </ul>
          </div>
        </section>

        <section className="bg-slate-900/40 border border-slate-800/50 rounded-2xl p-6 backdrop-blur-2xl">
          <h2 className="text-2xl font-bold text-white mb-4">9. Governing Law</h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>These Terms shall be governed by the laws applicable to PsyWall Team's registered jurisdiction.</p>
          </div>
        </section>
      </div>
    </motion.div>
  )
}
