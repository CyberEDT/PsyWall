import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, ShieldCheck, X, AlertTriangle, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotifications } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const iconMap = {
  AlertTriangle,
  ShieldCheck,
  MessageSquare
};

const TopNavbar = ({ title, subtitle }) => {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { notifications, unreadCount, markAllRead, dismissNotification, clearAll } = useNotifications();
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setIsNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
      {/* Page Title Area */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 leading-tight">{title}</h2>
        {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
      </div>

      {/* Right Controls Area */}
      <div className="flex items-center gap-6">
        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search threats, reports, tactics..." 
            className="w-64 pl-9 pr-12 py-1.5 text-sm bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-gray-400 text-gray-700"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 text-[10px] font-sans font-semibold text-gray-500 bg-white border border-gray-200 rounded shadow-sm">⌘K</kbd>
          </div>
        </div>

        <div className="w-px h-6 bg-gray-200" />

        {/* Status Badge */}
        <div className="hidden md:flex items-center gap-1.5 bg-green-50 border border-green-200 px-3 py-1 rounded-full">
          <ShieldCheck size={14} className="text-green-600" />
          <span className="text-xs font-semibold text-green-700">Protected</span>
        </div>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="relative p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 border border-white rounded-full"></span>
            )}
          </button>
          
          <AnimatePresence>
            {isNotifOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }} 
                animate={{ opacity: 1, y: 0, scale: 1 }} 
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-gray-100 overflow-hidden z-50"
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="text-sm font-bold text-gray-900">Notifications</h3>
                  <div className="flex gap-3">
                    {unreadCount > 0 && (
                      <button onClick={markAllRead} className="text-xs font-semibold text-indigo-600 hover:text-indigo-700">
                        Mark read
                      </button>
                    )}
                    {notifications.length > 0 && (
                      <button onClick={clearAll} className="text-xs font-semibold text-gray-500 hover:text-red-600">
                        Clear all
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="max-h-[320px] overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="px-4 py-8 text-center text-gray-500 text-sm">
                      <Bell className="mx-auto mb-2 text-gray-300" size={24} />
                      No notifications yet
                    </div>
                  ) : (
                    notifications.map(notif => {
                      const Icon = iconMap[notif.iconName] || Bell;
                      return (
                        <div key={notif.id} className={`flex gap-3 p-4 border-b border-gray-50 transition-colors ${notif.read ? 'bg-white hover:bg-gray-50' : 'bg-indigo-50/30 hover:bg-indigo-50/50'}`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${notif.bg}`}>
                            <Icon size={14} className={notif.color} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-0.5">
                              <p className={`text-sm font-bold truncate ${notif.read ? 'text-gray-700' : 'text-gray-900'}`}>{notif.title}</p>
                              <span className="text-[10px] font-semibold text-gray-400 whitespace-nowrap ml-2">{notif.time}</span>
                            </div>
                            <p className="text-xs text-gray-500 leading-snug line-clamp-2">{notif.message}</p>
                          </div>
                          <button 
                            onClick={(e) => { e.stopPropagation(); dismissNotification(notif.id); }}
                            className="text-gray-400 hover:text-gray-600 self-start p-1"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      )
                    })
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User Actions */}
        <div className="relative flex items-center pl-4 border-l border-gray-200" ref={profileRef}>
          <div 
            className="cursor-pointer"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            {profile?.role === 'admin' ? (
              <div className="flex items-center gap-2.5 bg-red-50 border border-red-200 px-3 py-1 rounded-full shadow-sm hover:bg-red-100 transition-colors">
                <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center shadow-inner">
                  <ShieldCheck size={12} className="text-white" />
                </div>
                <div className="flex flex-col text-left justify-center">
                  <span className="text-[9px] font-black text-red-600 uppercase tracking-widest leading-none mb-0.5">Superuser</span>
                  <span className="text-xs font-bold text-gray-900 leading-none">{profile?.username || 'Agent'}</span>
                </div>
              </div>
            ) : (
              <button className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm font-bold shadow-sm hover:ring-2 hover:ring-indigo-500/30 hover:ring-offset-1 transition-all">
                {profile?.username?.charAt(0)?.toUpperCase() || user?.user_metadata?.username?.charAt(0)?.toUpperCase() || 'A'}
              </button>
            )}
          </div>

          <AnimatePresence>
            {isProfileOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }} 
                animate={{ opacity: 1, y: 0, scale: 1 }} 
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-3 w-72 bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 overflow-hidden z-50 p-1"
              >
                <div className="p-4 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-inner ${profile?.role === 'admin' ? 'bg-red-500' : 'bg-indigo-500'}`}>
                      {profile?.username?.charAt(0)?.toUpperCase() || user?.user_metadata?.username?.charAt(0)?.toUpperCase() || 'A'}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-bold text-white leading-tight truncate">{profile?.username || user?.user_metadata?.username || 'Unknown Agent'}</h3>
                      <p className="text-xs text-slate-400 mt-0.5 truncate">{user?.email}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-slate-800/50 flex flex-col gap-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Network Role</span>
                      <span className={`font-bold capitalize ${profile?.role === 'admin' ? 'text-red-400' : 'text-indigo-400'}`}>
                        {profile?.role || 'User'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Clearance Level</span>
                      <span className={`font-bold ${profile?.role === 'admin' ? 'text-red-400' : 'text-indigo-400'}`}>
                        {profile?.role === 'admin' ? 'Level 5 (Sigma)' : 'Level 1 (Standard)'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-2">
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center justify-between px-3 py-2 text-sm font-bold text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    Terminate Session
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
