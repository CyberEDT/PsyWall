import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShieldAlert, BrainCircuit, FileText, GraduationCap, Settings, Bot, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile } = useAuth();
  const currentView = location.pathname.split('/')[1] || 'dashboard';

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'scanner', label: 'Threat Scanner', icon: ShieldAlert },
    { id: 'manipulation', label: 'Manipulation Det.', icon: BrainCircuit },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'awareness', label: 'Awareness Center', icon: GraduationCap },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-[220px] h-screen fixed left-0 top-0 bg-white border-r border-gray-200 flex flex-col z-20">
      {/* Logo Area */}
      <div className="h-16 flex items-center px-6 border-b border-gray-100 cursor-pointer" onClick={() => navigate('/')}>
        <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center mr-3 overflow-hidden shrink-0">
           <img src="/logo.jpg" alt="PsyWall" className="w-full h-full object-cover" />
        </div>
        <div>
          <h1 className="text-sm font-bold text-gray-900 leading-tight">PsyWall</h1>
          {profile?.role === 'admin' ? (
            <p className="text-[9px] font-bold text-red-500 uppercase tracking-wider flex items-center gap-1">
              <ShieldCheck size={9} className="text-red-500" />
              Clearance: Level 5
            </p>
          ) : (
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Cognitive Firewall</p>
          )}
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => navigate(`/${item.id}`)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive 
                  ? 'bg-indigo-50 text-indigo-600 font-medium' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <div className={`relative ${isActive ? 'text-indigo-600' : 'text-gray-400'}`}>
                {isActive && (
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-indigo-500 rounded-r-full" />
                )}
                <Icon size={18} />
              </div>
              <span>{item.label}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400" />
              )}
            </button>
          );
        })}
      </nav>

      {/* AI Co-Pilot Card */}
      <div className="p-4 mt-auto">
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-xl p-3 shadow-sm">
          <div className="flex items-center gap-2 mb-1.5">
            <Bot size={16} className="text-indigo-600" />
            <h3 className="text-xs font-bold text-indigo-900">AI Co-Pilot</h3>
          </div>
          <p className="text-[11px] text-gray-600 leading-relaxed mb-3">
            Get explanations and defensive tactics for any flagged message.
          </p>
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-2 text-xs font-semibold transition-colors shadow-sm">
            Open Assistant
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
