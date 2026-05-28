import React, { createContext, useContext, useState, useEffect } from 'react';

const NotificationContext = createContext();

const initialNotifications = [
  { id: 'n1', type: 'alert', title: 'High Risk Message Detected', message: 'A recent SMS was flagged with 94% urgency score.', time: '5m ago', read: false, iconName: 'AlertTriangle', color: 'text-red-500', bg: 'bg-red-50' },
  { id: 'n2', type: 'system', title: 'System Updated', message: 'PsyWall core heuristics have been updated to v0.1.0-alpha.', time: '2h ago', read: false, iconName: 'ShieldCheck', color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { id: 'n3', type: 'message', title: 'Curriculum Reminder', message: 'You have unfinished modules in the Awareness Center.', time: '1d ago', read: true, iconName: 'MessageSquare', color: 'text-gray-500', bg: 'bg-gray-100' }
];

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(() => {
    const hasConsent = localStorage.getItem('psywall_storage_consent') === 'true';
    if (hasConsent) {
      const saved = localStorage.getItem('psywall_notifications');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          return Array.isArray(parsed) ? parsed : initialNotifications;
        } catch (_e) {
          return initialNotifications;
        }
      }
    }
    return initialNotifications;
  });

  useEffect(() => {
    const hasConsent = localStorage.getItem('psywall_storage_consent') === 'true';
    if (hasConsent) {
      localStorage.setItem('psywall_notifications', JSON.stringify(notifications));
    }
  }, [notifications]);

  const addNotification = (notif) => {
    setNotifications(prev => [{ ...notif, id: Date.now().toString(), time: 'Just now', read: false }, ...prev]);
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const dismissNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, addNotification, markAllRead, dismissNotification, clearAll }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
