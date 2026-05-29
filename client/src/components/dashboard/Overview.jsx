import React, { useMemo, useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ShieldCheck, AlertTriangle, Clock, CheckCircle, ShieldAlert, Database, Globe, AlertCircle, RefreshCw, Activity } from 'lucide-react';
import { useFeed } from '../../context/FeedContext';

const aiRecs = [
  { icon: ShieldCheck, title: 'Verify the sender identity', desc: 'Contact the institution through a number from their official website — not the message.' },
  { icon: AlertTriangle, title: 'Avoid clicking unknown links', desc: 'Hover to inspect; the domain looks like a typosquat of the legitimate brand.' },
  { icon: CheckCircle, title: 'Use official support channels', desc: 'Banks never request credentials over SMS or email. Call the number on your card.' },
  { icon: Clock, title: 'Slow down before reacting', desc: 'Urgency is the #1 tactic. Wait 5 minutes before any action requested under pressure.' },
  { icon: ShieldAlert, title: 'Rotate exposed credentials', desc: 'If you clicked, change the password and enable 2FA from a trusted device.' },
];

const CATEGORY_COLORS = {
  malware: { bg: 'bg-red-50', border: 'border-red-100', badge: 'bg-red-100 text-red-700', dot: 'bg-red-500', label: 'Malware' },
  phishing: { bg: 'bg-orange-50', border: 'border-orange-100', badge: 'bg-orange-100 text-orange-700', dot: 'bg-orange-500', label: 'Phishing' },
};

export default function Overview() {
  const { threats } = useFeed();

  // CyberEDT DB state
  const [dbStats, setDbStats] = useState(null);
  const [dbFeed, setDbFeed] = useState([]);
  const [dbLoading, setDbLoading] = useState(true);
  const [dbError, setDbError] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState(null);

  const fetchThreatData = async () => {
    setDbLoading(true);
    setDbError(false);
    try {
      const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const [statsRes, feedRes] = await Promise.all([
        fetch(`${API_BASE}/api/threat-feed/stats`),
        fetch(`${API_BASE}/api/threat-feed?limit=12`),
      ]);
      const stats = await statsRes.json();
      const feed  = await feedRes.json();
      if (stats.status === 'success') setDbStats(stats);
      if (feed.status === 'success')  setDbFeed(feed.threats || []);
      setLastRefreshed(new Date());
    } catch {
      setDbError(true);
    } finally {
      setDbLoading(false);
    }
  };

  useEffect(() => { fetchThreatData(); }, []);

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

  const formatUrl = (url) => {
    try {
      const u = new URL(url);
      return u.hostname + (u.pathname.length > 20 ? u.pathname.substring(0, 18) + '…' : u.pathname);
    } catch {
      return url.length > 40 ? url.substring(0, 38) + '…' : url;
    }
  };

  const timeAgo = (dateStr) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    const hrs  = Math.floor(mins / 60);
    const days = Math.floor(hrs / 24);
    if (days > 0)  return `${days}d ago`;
    if (hrs > 0)   return `${hrs}h ago`;
    if (mins > 0)  return `${mins}m ago`;
    return 'just now';
  };

  return (
    <div className="space-y-6">

      {/* ── CyberEDT DB Stats Row ─────────────────────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Database size={14} className="text-indigo-600" />
            <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">CyberEDT Central Threat Intelligence Database</span>
          </div>
          <button
            onClick={fetchThreatData}
            disabled={dbLoading}
            className="flex items-center gap-1.5 text-xs text-indigo-600 hover:text-indigo-800 font-bold disabled:opacity-50"
          >
            <RefreshCw size={12} className={dbLoading ? 'animate-spin' : ''} />
            {lastRefreshed ? `Updated ${timeAgo(lastRefreshed)}` : 'Refresh'}
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Malicious URLs', value: dbStats?.maliciousUrls, icon: Globe, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-100' },
            { label: 'Phishing URLs',  value: dbStats?.phishingUrls,  icon: AlertCircle, color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-100' },
            { label: 'Scam Messages', value: dbStats?.scamMessages,   icon: AlertTriangle, color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-100' },
            { label: 'Total IOCs',    value: dbStats?.totalThreats,   icon: Database, color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100' },
          ].map(({ label, value, icon: Icon, color, bg, border }) => (
            <div key={label} className={`${bg} ${border} border rounded-xl p-4`}>
              <div className={`w-8 h-8 rounded-lg bg-white border ${border} flex items-center justify-center mb-2`}>
                <Icon size={16} className={color} />
              </div>
              <p className="text-xl font-black text-gray-900 leading-none">
                {dbLoading ? '—' : dbError ? '!' : (value?.toLocaleString() ?? '—')}
              </p>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Live Threat Feed from DB ──────────────────────────────────────────── */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2">
              <Activity size={14} className="text-red-500" />
              <h3 className="text-sm font-bold text-gray-900">Live CyberEDT Threat Feed</h3>
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">Real-time IOCs from malicious_urls + phishing_urls tables</p>
          </div>
          <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-1 rounded-full uppercase tracking-wider">Neon DB</span>
        </div>

        {dbLoading && (
          <div className="flex items-center justify-center py-12 gap-3 text-gray-400">
            <RefreshCw size={16} className="animate-spin" />
            <span className="text-sm">Loading threat intelligence...</span>
          </div>
        )}

        {dbError && !dbLoading && (
          <div className="flex items-center justify-center py-12 gap-3 text-gray-400">
            <AlertCircle size={16} className="text-red-400" />
            <span className="text-sm">Could not connect to threat database. Ensure the server is running.</span>
          </div>
        )}

        {!dbLoading && !dbError && (
          <div className="divide-y divide-gray-50">
            {dbFeed.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-8">No threats in feed.</p>
            )}
            {dbFeed.map((threat, idx) => {
              const cat = CATEGORY_COLORS[threat.category] || CATEGORY_COLORS.malware;
              return (
                <div key={threat.id + '-' + idx} className={`flex items-center gap-4 px-5 py-3 hover:${cat.bg} transition-colors`}>
                  <span className={`w-2 h-2 rounded-full ${cat.dot} shrink-0`}></span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-mono text-gray-800 truncate">{formatUrl(threat.url)}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{threat.threat_type || 'Unknown'} · {threat.source}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${cat.badge}`}>{cat.label}</span>
                    <span className="text-[10px] text-gray-400">{timeAgo(threat.created_at)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Cognitive Threat Activity ─────────────────────────────────────────── */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-gray-900">Cognitive Threat Activity</h3>
            <p className="text-xs text-gray-500 mt-0.5">Your scan detections over the last 24 hours</p>
          </div>
          <div className="px-2.5 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-100">
            Live
          </div>
        </div>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorDetections" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#6366F1" stopOpacity={0.3}/>
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

      {/* ── AI Defensive Recommendations ─────────────────────────────────────── */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="mb-4">
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
  );
}
