import { motion } from 'framer-motion'
import { Shield, ArrowLeft } from 'lucide-react'

const today = new Date().toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})

export default function PrivacyPolicy() {
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
          🛡️ PSYWALL PRIVACY
        </motion.h1>
        <div className="text-slate-400 space-y-1">
          <p className="text-sm">PsyWall – A Product of PsyWall Team</p>
          <p className="text-sm">Last Updated: {today}</p>
        </div>
      </header>

      <div className="space-y-8 text-slate-300">
        <section className="bg-slate-900/40 border border-slate-800/50 rounded-2xl p-6 backdrop-blur-2xl">
          <h2 className="text-2xl font-bold text-white mb-4">1. Overview</h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>PsyWall Team respects user privacy. This policy explains how PsyWall collects, processes, and protects information.</p>
          </div>
        </section>

        <section className="bg-slate-900/40 border border-slate-800/50 rounded-2xl p-6 backdrop-blur-2xl">
          <h2 className="text-2xl font-bold text-white mb-4">2. Information Collected</h2>
          <div className="space-y-4 text-sm leading-relaxed">
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-2">A. User-Submitted Content</h3>
              <ul className="list-disc list-inside space-y-1 ml-4 text-slate-400">
                <li>Text entered for analysis</li>
                <li>URLs</li>
                <li>Uploaded content (if enabled)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">B. Technical Data</h3>
              <ul className="list-disc list-inside space-y-1 ml-4 text-slate-400">
                <li>IP address</li>
                <li>Device/browser metadata</li>
                <li>Session logs</li>
                <li>Usage metrics</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-emerald-400 mb-2">C. Account Information (If Applicable)</h3>
              <ul className="list-disc list-inside space-y-1 ml-4 text-slate-400">
                <li>Name</li>
                <li>Email</li>
                <li>Organization</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-slate-900/40 border border-slate-800/50 rounded-2xl p-6 backdrop-blur-2xl">
          <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Data</h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>We use information to:</p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-slate-400">
              <li>Provide manipulation detection analysis</li>
              <li>Improve detection accuracy</li>
              <li>Enhance cybersecurity protections</li>
              <li>Prevent abuse and malicious use</li>
              <li>Conduct anonymized research on manipulation patterns</li>
            </ul>
            <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
              <p className="font-semibold text-green-400">We do NOT sell personal data.</p>
              <p className="font-semibold text-green-400">We do NOT provide raw user submissions to advertisers.</p>
            </div>
          </div>
        </section>

        <section className="bg-slate-900/40 border border-slate-800/50 rounded-2xl p-6 backdrop-blur-2xl">
          <h2 className="text-2xl font-bold text-white mb-4">4. AI Processing & Automation</h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>Submitted content may be processed by automated systems including:</p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-slate-400">
              <li>Machine learning models</li>
              <li>Behavioral classification engines</li>
              <li>Pattern recognition frameworks</li>
            </ul>
            <p className="mt-4">Processing is primarily automated. Human review may occur only for:</p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-slate-400">
              <li>Security investigations</li>
              <li>Abuse prevention</li>
              <li>System debugging</li>
            </ul>
          </div>
        </section>

        <section className="bg-slate-900/40 border border-slate-800/50 rounded-2xl p-6 backdrop-blur-2xl">
          <h2 className="text-2xl font-bold text-white mb-4">5. Data Retention</h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <ul className="list-disc list-inside space-y-1 ml-4 text-slate-400">
              <li>Temporary storage may occur for processing</li>
              <li>Logs retained for security monitoring</li>
              <li>Account data retained until deletion request</li>
              <li>Users may request deletion of account data where legally applicable</li>
            </ul>
          </div>
        </section>

        <section className="bg-slate-900/40 border border-slate-800/50 rounded-2xl p-6 backdrop-blur-2xl">
          <h2 className="text-2xl font-bold text-white mb-4">6. Data Security Measures</h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>PsyWall Team implements:</p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-slate-400">
              <li>HTTPS/TLS encryption</li>
              <li>Secure cloud hosting</li>
              <li>Access controls</li>
              <li>Log monitoring</li>
              <li>Abuse detection mechanisms</li>
            </ul>
            <p className="mt-4 text-yellow-400 font-semibold">No digital system is completely immune from risk.</p>
          </div>
        </section>

        <section className="bg-slate-900/40 border border-slate-800/50 rounded-2xl p-6 backdrop-blur-2xl">
          <h2 className="text-2xl font-bold text-white mb-4">7. Third-Party Services</h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>We may use:</p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-slate-400">
              <li>Cloud hosting providers</li>
              <li>Security analytics services</li>
              <li>Infrastructure monitoring tools</li>
            </ul>
            <p className="mt-4 text-blue-400">Third parties operate under contractual confidentiality obligations.</p>
          </div>
        </section>

        <section className="bg-slate-900/40 border border-slate-800/50 rounded-2xl p-6 backdrop-blur-2xl">
          <h2 className="text-2xl font-bold text-white mb-4">8. User Rights (Where Applicable)</h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>Users may have rights to:</p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-slate-400">
              <li>Access data</li>
              <li>Correct data</li>
              <li>Delete data</li>
              <li>Object to processing</li>
              <li>Withdraw consent</li>
            </ul>
            <p className="mt-4 text-slate-400">Requests must be submitted through official CyberEDT channels.</p>
          </div>
        </section>

        <section className="bg-slate-900/40 border border-slate-800/50 rounded-2xl p-6 backdrop-blur-2xl">
          <h2 className="text-2xl font-bold text-white mb-4">9. Children's Privacy</h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p className="font-semibold text-red-400">The Service is not intended for children under 13.</p>
            <p>We do not knowingly collect data from minors.</p>
          </div>
        </section>

        <section className="bg-slate-900/40 border border-slate-800/50 rounded-2xl p-6 backdrop-blur-2xl">
          <h2 className="text-2xl font-bold text-white mb-4">10. International Data Transfers</h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>Data may be processed in jurisdictions where CyberEDT or its service providers operate.</p>
          </div>
        </section>

        <section className="bg-slate-900/40 border border-slate-800/50 rounded-2xl p-6 backdrop-blur-2xl">
          <h2 className="text-2xl font-bold text-white mb-4">11. Policy Updates</h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>CyberEDT may update this Privacy Policy periodically.</p>
            <p className="font-semibold text-yellow-400">Continued use constitutes acceptance of changes.</p>
          </div>
        </section>
      </div>
    </motion.div>
  )
}
