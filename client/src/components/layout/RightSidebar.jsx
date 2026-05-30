import React, { useState, useEffect, useMemo } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import { ShieldCheck, AlertTriangle, Info, Clock, CheckCircle, ShieldAlert, X, Search, Filter } from 'lucide-react';
import { useFeed } from '../../context/FeedContext';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { AnimatePresence, motion } from 'framer-motion';

const defaultRadarData = [
  { subject: 'Urgency', value: 0 },
  { subject: 'Fear', value: 0 },
  { subject: 'Authority', value: 0 },
  { subject: 'Emotional', value: 0 },
  { subject: 'Financial', value: 0 },
  { subject: 'Scarcity', value: 0 },
];

const formatTimeAgo = (timestamp) => {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return `${Math.max(0, seconds)}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
};

export default function RightSidebar() {
  const { threats, updateThreatStatus } = useFeed();
  const { profile } = useAuth();
  
  const [radarData, setRadarData] = useState(defaultRadarData);
  const [selectedThreat, setSelectedThreat] = useState(null);
  const [investigationData, setInvestigationData] = useState(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [filterType, setFilterType] = useState('all');

  // Filter logic
  const filteredThreats = useMemo(() => {
    return threats.filter(t => filterType === 'all' || t.type === filterType);
  }, [threats, filterType]);

  useEffect(() => {
    if (selectedThreat?.scan_id) {
      setIsLoadingDetails(true);
      supabase.from('scans').select('*').eq('id', selectedThreat.scan_id).single()
        .then(({ data }) => {
           setInvestigationData(data);
           setIsLoadingDetails(false);
        });
    } else {
      setInvestigationData(null);
    }
  }, [selectedThreat]);

  useEffect(() => {
    const fetchScans = async () => {
      const { data } = await supabase.from('scans').select('payload').order('created_at', { ascending: false }).limit(50);
      if (data && data.length > 0) {
        const counts = { 'Urgency': 0, 'Fear': 0, 'Authority': 0, 'Emotional': 0, 'Financial': 0, 'Scarcity': 0 };
        let total = 0;
        data.forEach(scan => {
          if (scan.payload?.detections) {
             scan.payload.detections.forEach(d => {
                const label = d.displayLabel || '';
                if (label.includes('Urgency')) counts.Urgency++;
                else if (label.includes('Authority')) counts.Authority++;
                else if (label.includes('Fear')) counts.Fear++;
                else if (label.includes('Emotion')) counts.Emotional++;
                else if (label.includes('Scarcity')) counts.Scarcity++;
                else counts.Financial++;
                total++;
             });
          }
        });
        if (total > 0) {
           setRadarData(Object.keys(counts).map(key => ({ subject: key, value: Math.round((counts[key] / total) * 100) })));
        }
      }
    };
    fetchScans();
  }, []);

  return (
    <div className="w-[320px] bg-white border-l border-gray-200 flex flex-col h-screen sticky top-0 shrink-0 shadow-[-4px_0_15px_rgba(0,0,0,0.02)]">
       <div className="p-5 border-b border-gray-100 shrink-0 flex items-center justify-between">
         <div>
           <h3 className="text-sm font-bold text-gray-900">Contextual Intelligence</h3>
           <p className="text-[10px] text-indigo-500 font-bold uppercase tracking-widest mt-1">PsyWall Radar Active</p>
         </div>
       </div>
       
       <div className="flex-1 overflow-y-auto overflow-x-hidden p-5 flex flex-col gap-6">
         
         {/* Live Threat Feed */}
         <div className="flex flex-col">
           <div className="flex items-center justify-between mb-4">
             <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>
               <h3 className="text-sm font-bold text-gray-900">Live Threat Feed</h3>
             </div>
             <select 
               value={filterType} 
               onChange={e => setFilterType(e.target.value)}
               className="text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-gray-50 border border-gray-200 rounded px-2 py-1 outline-none focus:border-indigo-500 transition-colors cursor-pointer"
             >
               <option value="all">All Alerts</option>
               <option value="danger">Critical</option>
               <option value="warning">Warnings</option>
             </select>
           </div>

           <div className="space-y-2">
             <AnimatePresence>
               {filteredThreats.map((threat) => (
                 <motion.div 
                   key={threat.id} 
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, scale: 0.95 }}
                   className={`flex items-center gap-3 py-2.5 px-3 -mx-3 rounded-xl transition-colors border ${
                     threat.type === 'danger' ? 'bg-red-50/50 border-red-100' :
                     'bg-transparent border-transparent hover:bg-gray-50'
                   }`}
                 >
                   <span className={`w-2 h-2 rounded-full shrink-0 ${
                     threat.type === 'danger' ? 'bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]' :
                     threat.type === 'warning' ? 'bg-yellow-500' : 'bg-green-500'
                   }`}></span>
                   <div className="flex-1 min-w-0">
                     <p className={`text-xs font-bold truncate ${threat.type === 'danger' ? 'text-red-900' : 'text-gray-800'}`}>
                       {threat.type === 'danger' && '⚠ '}{threat.label}
                     </p>
                     <div className="flex items-center gap-2 mt-1">
                       <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wide uppercase ${
                         threat.type === 'danger' ? 'bg-red-100 text-red-700' :
                         threat.status === 'dismissed' ? 'bg-gray-100 text-gray-500' : 
                         threat.status === 'investigating' ? 'bg-yellow-100 text-yellow-700' : 'bg-indigo-50 text-indigo-600'
                       }`}>
                         {threat.status === 'dismissed' ? 'Dismissed' : threat.status === 'investigating' ? 'Investigating' : (threat.category || threat.channel)}
                       </span>
                       <span className="text-[10px] text-gray-400 font-medium truncate">{threat.contact}</span>
                     </div>
                   </div>
                   <div className="flex flex-col items-end justify-center gap-1 shrink-0">
                     <span className="text-[9px] text-gray-400 font-bold">{formatTimeAgo(threat.timestamp)}</span>
                     {profile?.role === 'admin' && threat.status !== 'dismissed' && (
                       <div className="flex gap-1 mt-1">
                         {threat.status === 'pending' && (
                           <button onClick={() => setSelectedThreat(threat)} className="p-1 text-indigo-500 hover:bg-indigo-50 rounded bg-white border border-gray-200 hover:border-indigo-200 transition-colors shadow-sm" title="Investigate">
                             <Search size={10} />
                           </button>
                         )}
                         <button onClick={() => updateThreatStatus(threat.id, 'dismissed')} className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded bg-white border border-gray-200 hover:border-red-200 transition-colors shadow-sm" title="Dismiss">
                           <X size={10} />
                         </button>
                       </div>
                     )}
                   </div>
                 </motion.div>
               ))}
               {filteredThreats.length === 0 && (
                 <div className="text-center py-8">
                   <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">No active alerts</p>
                 </div>
               )}
             </AnimatePresence>
           </div>
         </div>

         {/* Psychological Radar */}
         <div className="mt-4 pt-6 border-t border-gray-100">
           <h3 className="text-sm font-bold text-gray-900 mb-2">Threat Psychology Map</h3>
           <p className="text-[10px] text-gray-500 mb-4 leading-relaxed">Realtime mapping of manipulation tactics used across the network.</p>
           <div className="h-48 w-full flex items-center justify-center bg-gray-50 rounded-xl border border-gray-100">
             <ResponsiveContainer width="100%" height="100%">
               <RadarChart cx="50%" cy="50%" outerRadius="65%" data={radarData}>
                 <PolarGrid stroke="#E5E7EB" />
                 <PolarAngleAxis dataKey="subject" tick={{ fill: '#6B7280', fontSize: 9, fontWeight: 600 }} />
                 <Radar name="Influence" dataKey="value" stroke="#8B5CF6" strokeWidth={1.5} fill="#8B5CF6" fillOpacity={0.2} />
               </RadarChart>
             </ResponsiveContainer>
           </div>
         </div>

       </div>

       {/* Investigation Modal */}
       <AnimatePresence>
         {selectedThreat && (
           <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
               onClick={() => setSelectedThreat(null)}
             />
             <motion.div 
               initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
               className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[85vh]"
             >
               <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                 <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                     <Search size={16} className="text-indigo-600" />
                   </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-900 leading-tight">
                        Investigation: {selectedThreat.label.length > 60 ? selectedThreat.label.substring(0, 60) + '...' : selectedThreat.label}
                      </h3>
                      <p className="text-xs text-gray-500">Reported by {selectedThreat.contact}</p>
                    </div>
                 </div>
                 <button onClick={() => setSelectedThreat(null)} className="text-gray-400 hover:text-gray-600 p-1"><X size={20} /></button>
               </div>
 
               <div className="flex-1 overflow-y-auto p-6 space-y-6">
                 {!selectedThreat.scan_id ? (
                   <div className="text-center py-12 text-gray-500">
                     <Info className="mx-auto mb-2 text-gray-300" size={32} />
                     <p>No raw scan data linked to this report.</p>
                   </div>
                 ) : isLoadingDetails ? (
                   <div className="flex items-center justify-center py-12">
                     <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                   </div>
                 ) : investigationData ? (
                   <>
                     {/* Raw Message */}
                     <div>
                       <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Intercepted Payload</h4>
                       <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 font-mono text-sm text-gray-800 whitespace-pre-wrap">
                         {investigationData.original_message || 'No payload recorded.'}
                       </div>
                     </div>
 
                     {/* AI Analysis */}
                     <div className="grid grid-cols-2 gap-4">
                       <div className="bg-red-50 border border-red-100 rounded-xl p-4">
                         <div className="text-xs font-bold text-red-400 uppercase tracking-wider mb-1">Risk Score</div>
                         <div className="text-3xl font-black text-red-600">{investigationData.risk_score}</div>
                       </div>
                       <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
                         <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">Threat Type</div>
                         <div className="text-lg font-bold text-indigo-900">{investigationData.threat_type}</div>
                       </div>
                     </div>
 
                     {/* Tactics */}
                     {investigationData.ai_analysis?.detections?.length > 0 && (
                       <div>
                         <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Identified Tactics</h4>
                         <div className="space-y-2">
                           {investigationData.ai_analysis.detections.map((det, idx) => (
                             <div key={idx} className="flex justify-between items-center bg-white border border-gray-200 p-3 rounded-lg">
                               <span className="text-sm font-bold text-gray-800">{det.displayLabel}</span>
                               <span className="text-xs font-mono font-bold text-red-500">{det.confidence}% Conf.</span>
                             </div>
                           ))}
                         </div>
                       </div>
                     )}
                   </>
                 ) : (
                    <div className="text-center py-12 text-red-500 bg-red-50 rounded-xl border border-red-100">
                      <AlertTriangle className="mx-auto mb-2 text-red-400" size={32} />
                      <p className="font-bold">Database Record Unavailable</p>
                      <p className="text-xs text-red-400 mt-1">The raw payload could not be fetched from the Central Database.</p>
                      <div className="mt-6 text-left p-4 bg-white rounded border border-red-100 mx-4">
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">Available Intelligence Context:</p>
                        <p className="text-sm font-mono text-gray-800 font-bold mb-1">{selectedThreat.label}</p>
                        <p className="text-xs text-gray-500">Reported via: {selectedThreat.channel}</p>
                        <p className="text-xs text-gray-500">Target Type: {selectedThreat.type}</p>
                      </div>
                    </div>
                  )}
               </div>
 
               {/* Actions */}
               <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 shrink-0">
                 <button 
                   onClick={() => { updateThreatStatus(selectedThreat.id, 'dismissed'); setSelectedThreat(null); }}
                   className="px-4 py-2 text-sm font-bold text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                 >
                   Dismiss Threat
                 </button>
                 <button 
                   onClick={() => { updateThreatStatus(selectedThreat.id, 'investigating'); setSelectedThreat(null); }}
                   className="px-4 py-2 text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm transition-colors"
                 >
                   Mark as Investigating
                 </button>
               </div>
             </motion.div>
           </div>
         )}
       </AnimatePresence>
    </div>
  );
}
