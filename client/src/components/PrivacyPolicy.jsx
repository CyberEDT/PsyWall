import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const today = new Date().toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center backdrop-blur-sm border border-white/20 overflow-hidden shrink-0 shadow-lg">
               <img src="/logo.jpg" alt="PsyWall" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest">Legal Document</p>
              <p className="text-sm font-semibold text-slate-300">PsyWall Team</p>
            </div>
          </div>
          
          <h1 className="text-4xl font-black tracking-tight mb-2 relative z-10">Privacy Policy</h1>
          <p className="text-slate-400 font-medium relative z-10">Last Updated: {today}</p>
        </div>

        {/* Content */}
        <div className="px-10 py-12 text-slate-700 leading-relaxed space-y-10">
          
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-md bg-indigo-100 text-indigo-700 text-xs font-black">1</span>
              Overview
            </h2>
            <div className="space-y-4 pl-9">
              <p>PsyWall Team respects user privacy. This policy explains how PsyWall collects, processes, and protects information.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-md bg-indigo-100 text-indigo-700 text-xs font-black">2</span>
              Information Collected
            </h2>
            <div className="space-y-4 pl-9">
              <h3 className="font-bold text-slate-900 mt-2">A. User-Submitted Content</h3>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li>Text entered for analysis</li>
                <li>URLs</li>
                <li>Uploaded content (if enabled)</li>
              </ul>
              
              <h3 className="font-bold text-slate-900 mt-6">B. Technical Data</h3>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li>IP address</li>
                <li>Device/browser metadata</li>
                <li>Session logs</li>
                <li>Usage metrics</li>
              </ul>
              
              <h3 className="font-bold text-slate-900 mt-6">C. Account Information (If Applicable)</h3>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li>Name</li>
                <li>Email</li>
                <li>Organization</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-md bg-indigo-100 text-indigo-700 text-xs font-black">3</span>
              How We Use Data
            </h2>
            <div className="space-y-4 pl-9">
              <p>We use information to:</p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li>Provide manipulation detection analysis</li>
                <li>Improve detection accuracy</li>
                <li>Enhance cybersecurity protections</li>
                <li>Prevent abuse and malicious use</li>
                <li>Conduct anonymized research on manipulation patterns</li>
              </ul>
              <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-xl text-sm font-semibold mt-6 space-y-2">
                <p>We do NOT sell personal data.</p>
                <p>We do NOT provide raw user submissions to advertisers.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-md bg-indigo-100 text-indigo-700 text-xs font-black">4</span>
              AI & Automation Processing
            </h2>
            <div className="space-y-4 pl-9">
              <p>Submitted content may be processed by automated systems including:</p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li>Machine learning models</li>
                <li>Behavioral classification engines</li>
                <li>Pattern recognition frameworks</li>
              </ul>
              <p>Processing is primarily automated. Human review may occur only for security investigations, abuse prevention, or system debugging.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-md bg-indigo-100 text-indigo-700 text-xs font-black">5</span>
              Data Retention & Security
            </h2>
            <div className="space-y-4 pl-9">
              <ul className="list-disc pl-5 space-y-1 text-slate-600 mb-6">
                <li>Temporary storage may occur for processing</li>
                <li>Logs retained for security monitoring</li>
                <li>Account data retained until deletion request</li>
              </ul>
              <p className="font-bold text-slate-900">Security Measures Implemented:</p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li>HTTPS/TLS encryption</li>
                <li>Secure cloud hosting</li>
                <li>Access controls & Log monitoring</li>
              </ul>
              <p className="text-sm italic text-slate-500 mt-2">No digital system is completely immune from risk.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-md bg-indigo-100 text-indigo-700 text-xs font-black">6</span>
              Third-Party Services
            </h2>
            <div className="space-y-4 pl-9">
              <p>We may use cloud hosting providers, security analytics services, and infrastructure monitoring tools. Third parties operate under contractual confidentiality obligations.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-md bg-indigo-100 text-indigo-700 text-xs font-black">7</span>
              User Rights (Where Applicable)
            </h2>
            <div className="space-y-4 pl-9">
              <p>Users may have rights to access, correct, delete, or object to processing of their data. Requests must be submitted through official channels.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-md bg-indigo-100 text-indigo-700 text-xs font-black">8</span>
              Children's Privacy
            </h2>
            <div className="space-y-4 pl-9">
              <p className="font-bold text-slate-900">The Service is not intended for children under 13.</p>
              <p>We do not knowingly collect data from minors.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-md bg-indigo-100 text-indigo-700 text-xs font-black">9</span>
              Policy Updates
            </h2>
            <div className="space-y-4 pl-9">
              <p>PsyWall Team may update this Privacy Policy periodically. Continued use constitutes acceptance of changes.</p>
            </div>
          </section>

        </div>
      </motion.div>
    </div>
  )
}
