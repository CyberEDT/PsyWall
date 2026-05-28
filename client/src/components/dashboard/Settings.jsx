import React, { useState } from 'react';
import { 
  ShieldAlert, Lock, Webhook, Users, 
  Key, Save, RefreshCw, Sliders, Database, EyeOff, Zap, CheckCircle2, Copy 
} from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('detection');
  const [isSaving, setIsSaving] = useState(false);
  
  // High-fidelity mock state for interactive feel
  const [config, setConfig] = useState({
    // Detection
    cognitiveAi: true,
    sensitivityScore: 75,
    onDeviceFallback: false,
    autoQuarantine: true,
    // Privacy
    zeroKnowledge: true,
    dataRetention: '30',
    shareTelemetry: false,
    // API
    webhookEnabled: true,
    webhookUrl: 'https://siem.internal.corp/api/psywall',
    apiKeyVisible: false,
    // Workspace
    orgName: 'CyberEDT SecOps',
    teamSize: '50-200'
  });

  const updateConfig = (key, value) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 800);
  };

  const Toggle = ({ enabled, onChange }) => (
    <button 
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${enabled ? 'bg-indigo-600' : 'bg-gray-200'}`}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  );

  const tabs = [
    { id: 'detection', label: 'Detection Engine', icon: ShieldAlert },
    { id: 'privacy', label: 'Privacy & Compliance', icon: Lock },
    { id: 'api', label: 'API & Integrations', icon: Webhook },
    { id: 'workspace', label: 'Workspace', icon: Users },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
      
      {/* Left Sidebar: Vertical Navigation */}
      <div className="w-full lg:w-64 shrink-0">
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4 px-3">Configuration</h2>
        <nav className="space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  isActive 
                    ? 'bg-indigo-50 text-indigo-700 border-l-4 border-indigo-600' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-indigo-600' : 'text-gray-400'} />
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* System Status Mini-Card */}
        <div className="mt-8 bg-emerald-50 border border-emerald-100 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 size={16} className="text-emerald-600" />
            <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider">System Status</h4>
          </div>
          <p className="text-xs text-emerald-600 leading-relaxed">
            All AI nodes operational. Rulesets synced 4 mins ago.
          </p>
        </div>
      </div>

      {/* Right Content Area */}
      <div className="flex-1">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-full min-h-[600px]">
          
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {tabs.find(t => t.id === activeTab)?.label}
              </h1>
              <p className="text-sm text-gray-500 mt-1">Manage core settings and platform behavior.</p>
            </div>
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
            >
              {isSaving ? <RefreshCw size={16} className="animate-spin" /> : <Save size={16} />}
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>

          {/* Content Panels */}
          <div className="p-8 flex-1 overflow-y-auto">
            
            {/* Detection Tab */}
            {activeTab === 'detection' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <section>
                  <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-4">
                    <Zap size={16} className="text-indigo-500" /> Core AI Settings
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <div>
                        <p className="text-sm font-bold text-gray-900">Cognitive AI Engine (v3.2)</p>
                        <p className="text-xs text-gray-500 mt-1">Utilize deep-context cloud models for psychological analysis.</p>
                      </div>
                      <Toggle enabled={config.cognitiveAi} onChange={() => updateConfig('cognitiveAi', !config.cognitiveAi)} />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <div>
                        <p className="text-sm font-bold text-gray-900">On-Device Fallback (Air-gapped)</p>
                        <p className="text-xs text-gray-500 mt-1">Process via local WebAssembly when network is isolated.</p>
                      </div>
                      <Toggle enabled={config.onDeviceFallback} onChange={() => updateConfig('onDeviceFallback', !config.onDeviceFallback)} />
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-4">
                    <Sliders size={16} className="text-indigo-500" /> Threat Sensitivity Threshold
                  </h3>
                  <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
                    <div className="flex justify-between items-end mb-4">
                      <div>
                        <p className="text-sm font-bold text-gray-900">Minimum Risk Score</p>
                        <p className="text-xs text-gray-500 mt-1">Scores above this threshold will trigger SOC alerts.</p>
                      </div>
                      <span className="text-2xl font-black text-indigo-600">{config.sensitivityScore}</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" max="100" 
                      value={config.sensitivityScore}
                      onChange={(e) => updateConfig('sensitivityScore', e.target.value)}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                    <div className="flex justify-between text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-wider">
                      <span>Lenient (0)</span>
                      <span>Strict (100)</span>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* Privacy Tab */}
            {activeTab === 'privacy' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <section>
                  <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-4">
                    <EyeOff size={16} className="text-indigo-500" /> Data Protection
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <div>
                        <p className="text-sm font-bold text-gray-900">Zero-Knowledge Mode</p>
                        <p className="text-xs text-gray-500 mt-1">Encrypt analyzed payloads with a local client key before storage.</p>
                      </div>
                      <Toggle enabled={config.zeroKnowledge} onChange={() => updateConfig('zeroKnowledge', !config.zeroKnowledge)} />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <div>
                        <p className="text-sm font-bold text-gray-900">Global Threat Telemetry</p>
                        <p className="text-xs text-gray-500 mt-1">Share anonymized vector metrics to improve the global defense grid.</p>
                      </div>
                      <Toggle enabled={config.shareTelemetry} onChange={() => updateConfig('shareTelemetry', !config.shareTelemetry)} />
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-4">
                    <Database size={16} className="text-indigo-500" /> Retention Policy
                  </h3>
                  <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
                    <label className="block text-sm font-bold text-gray-900 mb-2">Automated Purge Cycle</label>
                    <select 
                      value={config.dataRetention}
                      onChange={(e) => updateConfig('dataRetention', e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5"
                    >
                      <option value="7">7 Days (Strict Compliance)</option>
                      <option value="14">14 Days (Standard)</option>
                      <option value="30">30 Days (Extended)</option>
                      <option value="90">90 Days (Audit Logging)</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-3 flex items-start gap-2">
                      <ShieldAlert size={14} className="text-orange-500 shrink-0 mt-0.5" />
                      Data purged under this policy cannot be recovered. Ensure this aligns with your regional regulatory requirements.
                    </p>
                  </div>
                </section>
              </div>
            )}

            {/* API Tab */}
            {activeTab === 'api' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <section>
                  <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-4">
                    <Webhook size={16} className="text-indigo-500" /> SIEM / Slack Integration
                  </h3>
                  <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm font-bold text-gray-900">External Webhook Alerts</p>
                        <p className="text-xs text-gray-500 mt-1">Push JSON payloads to external systems on high-risk detections.</p>
                      </div>
                      <Toggle enabled={config.webhookEnabled} onChange={() => updateConfig('webhookEnabled', !config.webhookEnabled)} />
                    </div>
                    {config.webhookEnabled && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Target URL</label>
                        <input 
                          type="url" 
                          value={config.webhookUrl}
                          onChange={(e) => updateConfig('webhookUrl', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" 
                        />
                      </div>
                    )}
                  </div>
                </section>

                <section>
                  <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-4">
                    <Key size={16} className="text-indigo-500" /> REST API Keys
                  </h3>
                  <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
                    <p className="text-xs text-gray-500 mb-4">Use this token to authenticate programmatic scans via the PsyWall API.</p>
                    <div className="flex gap-2">
                      <input 
                        type={config.apiKeyVisible ? "text" : "password"} 
                        readOnly 
                        value="psy_live_8f92a4bc03e149d7bf5a2b1f" 
                        className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 font-mono" 
                      />
                      <button 
                        onClick={() => updateConfig('apiKeyVisible', !config.apiKeyVisible)}
                        className="p-2 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-lg text-gray-600 transition-colors"
                      >
                        <EyeOff size={18} />
                      </button>
                      <button className="p-2 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg text-indigo-600 transition-colors">
                        <Copy size={18} />
                      </button>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* Workspace Tab */}
            {activeTab === 'workspace' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <section>
                  <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-4">
                    <Users size={16} className="text-indigo-500" /> Organization Profile
                  </h3>
                  <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Organization Name</label>
                      <input 
                        type="text" 
                        value={config.orgName}
                        onChange={(e) => updateConfig('orgName', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Deployment Scale</label>
                      <select 
                        value={config.teamSize}
                        onChange={(e) => updateConfig('teamSize', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                      >
                        <option value="1-50">1-50 Endpoints</option>
                        <option value="50-200">50-200 Endpoints</option>
                        <option value="200-1000">200-1000 Endpoints</option>
                        <option value="1000+">1000+ Endpoints</option>
                      </select>
                    </div>
                  </div>
                </section>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
