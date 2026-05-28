import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, X } from 'lucide-react';

export default function StorageConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if consent has been given or declined
    const hasConsent = localStorage.getItem('psywall_storage_consent');
    const declined = sessionStorage.getItem('psywall_storage_consent_declined');
    
    if (!hasConsent && !declined) {
      // Delay showing the banner slightly for better UX
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAllow = () => {
    localStorage.setItem('psywall_storage_consent', 'true');
    setShow(false);
  };

  const handleDecline = () => {
    sessionStorage.setItem('psywall_storage_consent_declined', 'true');
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg px-4"
        >
          <div className="bg-slate-900 text-slate-200 p-5 rounded-2xl shadow-2xl border border-slate-700 flex flex-col gap-4">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0 border border-indigo-500/30">
                <Database size={20} className="text-indigo-400" />
              </div>
              <div className="flex-1 pr-4">
                <h3 className="text-white font-bold mb-1">Local Storage Permission</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  We use your browser's local storage to save your progress in the Awareness Center course. Do you allow us to store this data on your device?
                </p>
              </div>
              <button onClick={handleDecline} className="text-slate-500 hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>
            
            <div className="flex gap-3 justify-end mt-2">
              <button 
                onClick={handleDecline}
                className="px-4 py-2 text-sm font-bold text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              >
                Decline
              </button>
              <button 
                onClick={handleAllow}
                className="px-5 py-2 text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors shadow-lg shadow-indigo-900/50"
              >
                Allow Storage
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
