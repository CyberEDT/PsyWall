import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ShieldCheck, AlertTriangle, Clock, CheckCircle, ShieldAlert } from 'lucide-react';
import { useFeed } from '../../context/FeedContext';

const aiRecs = [
  { icon: ShieldCheck, title: 'Verify the sender identity', desc: 'Contact the institution through a number from their official website — not the message.' },
  { icon: AlertTriangle, title: 'Avoid clicking unknown links', desc: 'Hover to inspect; the domain looks like a typosquat of the legitimate brand.' },
  { icon: CheckCircle, title: 'Use official support channels', desc: 'Banks never request credentials over SMS or email. Call the number on your card.' },
  { icon: Clock, title: 'Slow down before reacting', desc: 'Urgency is the #1 tactic. Wait 5 minutes before any action requested under pressure.' },
  { icon: ShieldAlert, title: 'Rotate exposed credentials', desc: 'If you clicked, change the password and enable 2FA from a trusted device.' },
];

export default function Overview() {
  const { threats } = useFeed();

  // Compute trendData dynamically from live threats
  const trendData = useMemo(() => {
     const now = new Date();
     const hours = Array.from({length: 24}, (_, i) => {
       const d = new Date(now);
       d.setHours(d.getHours() - (23 - i));
       return { hour: d.getHours().toString().padStart(2, '0') + ':00', detections: 0, _time: d.getTime() };
     });
     
     threats.forEach(t => {
       const tDate = new Date(t.timestamp);
       const diff = now.getTime() - tDate.getTime();
       if (diff < 24 * 60 * 60 * 1000) {
         const bucket = hours.find(h => new Date(h._time).getHours() === tDate.getHours());
         if (bucket) bucket.detections++;
       }
     });
     return hours;
  }, [threats]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        
        {/* Cognitive Threat Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-gray-900">Cognitive Threat Activity</h3>
              <p className="text-xs text-gray-500 mt-0.5">Detections over the last 24 hours</p>
            </div>
            <div className="px-2.5 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-100">
              +24.6% vs. yesterday
            </div>
          </div>
          
          <div className="h-64 w-full mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorDetections" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9CA3AF' }} dy={10} minTickGap={30} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9CA3AF' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  labelStyle={{ fontWeight: 'bold', color: '#374151', marginBottom: '4px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="detections" 
                  stroke="#6366F1" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorDetections)" 
                  activeDot={{ r: 4, fill: '#6366F1', stroke: 'white', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Defensive Recommendations */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="mb-6">
            <h3 className="text-base font-bold text-gray-900">AI Defensive Recommendations</h3>
            <p className="text-xs text-gray-500 mt-0.5">Personalized, context-aware countermeasures.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aiRecs.map((rec, idx) => {
              const Icon = rec.icon;
              return (
                <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={16} className="text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{rec.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{rec.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
