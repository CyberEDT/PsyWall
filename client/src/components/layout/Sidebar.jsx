import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShieldAlert, BrainCircuit, FileText, GraduationCap, Settings, Bot, ShieldCheck, X, Map } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ isOpen, setIsOpen }) => {
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
    { id: 'roadmap', label: 'Roadmap', icon: Map },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className={`w-[220px] h-screen fixed left-0 top-0 bg-white border-r border-gray-200 flex flex-col z-30 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
      {/* Logo Area */}
      <div className="h-16 flex items-center justify-between px-4 md:px-6 border-b border-gray-100">
        <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
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
        
        {/* Mobile Close Button */}
        <button 
          onClick={() => setIsOpen && setIsOpen(false)}
          className="md:hidden p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <X size={18} />
        </button>
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
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-xl p-3 shadow-sm mb-4">
          <div className="flex items-center gap-2 mb-1.5">
            <Bot size={16} className="text-indigo-600" />
            <h3 className="text-xs font-bold text-indigo-900">AI Co-Pilot</h3>
          </div>
          <p className="text-[11px] text-gray-600 leading-relaxed mb-3">
            Get explanations and defensive tactics for any flagged message.
          </p>
          <button disabled className="w-full bg-indigo-100 text-indigo-400 cursor-not-allowed rounded-lg py-2 text-xs font-bold uppercase tracking-wider transition-colors shadow-sm">
            Coming Soon
          </button>
        </div>

        {/* CyberEDT Reference */}
        <div className="flex flex-col items-center justify-center pt-3 border-t border-gray-100">
          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Powered by</p>
          <a href="https://www.cyberedt.com" target="_blank" rel="noopener noreferrer" className="hover:scale-105 hover:opacity-80 transition-all">
            <img src="/cyberedt-wordmark.jpg" alt="CyberEDT" className="h-8 object-contain" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
