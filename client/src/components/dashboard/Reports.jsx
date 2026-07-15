import React from 'react';
import { DownloadCloud, MoreHorizontal } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { ShieldAlert } from 'lucide-react';

const trendData = [
  { hour: '00:00', detections: 12 }, { hour: '01:00', detections: 8 },
  { hour: '02:00', detections: 5 }, { hour: '03:00', detections: 4 },
  { hour: '04:00', detections: 6 }, { hour: '05:00', detections: 9 },
  { hour: '06:00', detections: 14 }, { hour: '07:00', detections: 22 },
  { hour: '08:00', detections: 28 }, { hour: '09:00', detections: 35 },
  { hour: '10:00', detections: 31 }, { hour: '11:00', detections: 38 },
  { hour: '12:00', detections: 42 }, { hour: '13:00', detections: 45 },
  { hour: '14:00', detections: 39 }, { hour: '15:00', detections: 48 },
  { hour: '16:00', detections: 52 }, { hour: '17:00', detections: 58 },
  { hour: '18:00', detections: 61 }, { hour: '19:00', detections: 67 },
  { hour: '20:00', detections: 72 }, { hour: '21:00', detections: 68 },
  { hour: '22:00', detections: 75 }, { hour: '23:00', detections: 82 },
];

export default function Reports() {
  const [reports, setReports] = React.useState([]);
  const [isEphemeral, setIsEphemeral] = React.useState(true);

  React.useEffect(() => {
    const config = JSON.parse(localStorage.getItem('psywall_enterprise_config') || '{}');
    const ephemeral = config.ephemeralAnalysis !== undefined ? config.ephemeralAnalysis : true;
    setIsEphemeral(ephemeral);

    if (!ephemeral) {
      const savedReports = JSON.parse(localStorage.getItem('psywall_local_reports') || '[]');
      setReports(savedReports);
    }
  }, []);

  const getRiskColor = (risk) => {
    if (risk >= 80) return 'bg-red-500';
    if (risk >= 60) return 'bg-orange-500';
    if (risk >= 40) return 'bg-yellow-500';
    if (risk >= 20) return 'bg-indigo-500';
    return 'bg-green-500';
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Blocked': return <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-red-50 text-red-600 border border-red-200 uppercase tracking-wide">{status}</span>;
      case 'Quarantined': return <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-purple-50 text-purple-600 border border-purple-200 uppercase tracking-wide">{status}</span>;
      case 'Flagged': return <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-yellow-50 text-yellow-700 border border-yellow-200 uppercase tracking-wide">{status}</span>;
      case 'Safe': return <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-green-50 text-green-600 border border-green-200 uppercase tracking-wide">{status}</span>;
      default: return null;
    }
  };

  const getChannelPill = (channel) => {
    switch(channel) {
      case 'SMS': return <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-100 text-[10px] font-bold tracking-wide">{channel}</span>;
      case 'Email': return <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-600 border border-gray-200 text-[10px] font-bold tracking-wide">{channel}</span>;
      case 'DM': return <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-600 border border-purple-100 text-[10px] font-bold tracking-wide">{channel}</span>;
      default: return <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-600 text-[10px] font-bold tracking-wide">{channel}</span>;
    }
  };

  const exportJSON = () => {
    if (!reports.length) {
      alert("No reports to export. Run a scan first.");
      return;
    }
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(reports, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "psywall-threat-report.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const exportCSV = () => {
    if (!reports.length) {
      alert("No reports to export. Run a scan first.");
      return;
    }
    const headers = ["ID", "Subject", "Channel", "Risk", "Tactics", "Status", "Date"];
    const rows = reports.map(r => [
      r.id, 
      `"${(r.label || r.subject || '').replace(/"/g, '""')}"`, 
      r.channel || 'N/A', 
      r.risk || 0, 
      r.tactics || 0, 
      r.status || 'Flagged', 
      new Date(r.timestamp).toISOString()
    ]);
    
    const csvContent = headers.join(",") + "\n" + rows.map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
      
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", url);
    downloadAnchorNode.setAttribute("download", "psywall-threat-report.csv");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const exportPDF = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* Top Stats & Export */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Trend Card */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-base font-bold text-gray-900">Global Scam Trend</h3>
              <p className="text-xs text-gray-500 mt-0.5">Detections over the last 24 hours</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-black text-green-500">+24.6%</div>
              <div className="text-xs font-semibold text-gray-400">vs. yesterday</div>
            </div>
          </div>
          <div className="h-24 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorDetections2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area 
                  type="monotone" 
                  dataKey="detections" 
                  stroke="#6366F1" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorDetections2)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Export Panel */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-6">
            <DownloadCloud size={20} className="text-indigo-500" />
            <h3 className="text-base font-bold text-gray-900">Export</h3>
          </div>
          <p className="text-xs text-gray-500 mb-6">Download a signed PDF or CSV of detected threats.</p>
          
          <div className="grid grid-cols-2 gap-4">
            <button onClick={exportPDF} className="flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors">
              <span className="text-sm font-bold text-gray-700">PDF</span>
              <span className="text-gray-400 font-serif">↓</span>
            </button>
            <button onClick={exportCSV} className="flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors">
              <span className="text-sm font-bold text-gray-700">CSV</span>
              <span className="text-gray-400 font-serif">↓</span>
            </button>
            <button onClick={exportJSON} className="flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors">
              <span className="text-sm font-bold text-gray-700">JSON</span>
              <span className="text-gray-400 font-serif">↓</span>
            </button>
            <button className="flex items-center justify-between px-4 py-3 bg-indigo-50 hover:bg-indigo-100 rounded-lg border border-indigo-200 transition-colors group">
              <span className="text-sm font-bold text-indigo-700">API</span>
              <span className="text-indigo-400 font-serif group-hover:translate-y-0.5 transition-transform">↓</span>
            </button>
          </div>
        </div>

      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-base font-bold text-gray-900">Recent Reports</h3>
          <span className="text-xs font-medium text-gray-400">Showing {reports.length} reports</span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="py-3 px-6 text-[11px] font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100">ID</th>
                <th className="py-3 px-6 text-[11px] font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100">Subject</th>
                <th className="py-3 px-6 text-[11px] font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100">Channel</th>
                <th className="py-3 px-6 text-[11px] font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100 w-48">Risk</th>
                <th className="py-3 px-6 text-[11px] font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100 text-center">Tactics</th>
                <th className="py-3 px-6 text-[11px] font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100">Status</th>
                <th className="py-3 px-6 text-[11px] font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100">Date</th>
                <th className="py-3 px-4 border-b border-gray-100"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isEphemeral ? (
                <tr>
                  <td colSpan="8" className="py-16 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <ShieldAlert size={32} className="mb-3 text-indigo-300" />
                      <p className="text-sm font-bold text-gray-700 mb-1">Strict Ephemeral Mode is Active</p>
                      <p className="text-xs">No scan payloads are being written to local storage. Disable this in Configuration to keep history.</p>
                    </div>
                  </td>
                </tr>
              ) : reports.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-16 text-center text-sm font-medium text-gray-400">
                    No recent reports found. Run a scan in the Threat Scanner to generate a report.
                  </td>
                </tr>
              ) : (
                reports.map((row, index) => {
                  const seqId = row.id;
                  const formattedDate = new Date(row.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                  return (
                  <tr key={row.id} className="hover:bg-gray-50/80 transition-colors group">
                    <td className="py-4 px-6 text-xs font-mono text-gray-400">{seqId}</td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-800 cursor-pointer hover:text-indigo-600 transition-colors">
                    {row.label || row.subject}
                  </td>
                  <td className="py-4 px-6">
                    {getChannelPill(row.channel)}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${getRiskColor(row.risk || 0)}`} style={{ width: `${row.risk || 0}%` }} />
                      </div>
                      <span className="text-sm font-bold text-gray-700 w-6 text-right">{row.risk || 0}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-600 text-center">{row.tactics || 0}</td>
                  <td className="py-4 px-6">
                    {getStatusBadge(row.status || 'Flagged')}
                  </td>
                  <td className="py-4 px-6 text-xs text-gray-400">Today · {formattedDate}</td>
                  <td className="py-4 px-4 text-right">
                    <button className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
