import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

const FeedContext = createContext();

const initialThreats = [];

export const FeedProvider = ({ children }) => {
  const [threats, setThreats] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    // 1. Fetch initial feed data
    const fetchFeed = async () => {
      const { data, error } = await supabase
        .from('reports')
        .select(`
          id,
          report_type,
          description,
          status,
          created_at,
          user_id,
          scan_id,
          user_profiles(username)
        `)
        .order('created_at', { ascending: false })
        .limit(50);
        
      if (!error && data) {
        // Map to match frontend component structure
        const formatted = data.map(r => ({
          id: r.id,
          type: r.report_type === 'danger' ? 'danger' : 'warning',
          label: r.description,
          channel: 'Scanner',
          contact: r.user_profiles?.username || 'Anonymous',
          timestamp: new Date(r.created_at).getTime(),
          risk: 0, // Fallback for UI if not stored
          tactics: 0,
          status: r.status,
          scan_id: r.scan_id
        }));
        setThreats(formatted);
      }
    };

    fetchFeed();

    // 2. Setup Realtime Subscription
    const channel = supabase.channel('public:reports')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'reports' },
        async (payload) => {
          const r = payload.new;
          
          // Micro-fetch to get the reporter's alias
          let reporterName = 'Unknown Agent';
          if (r.user_id) {
            const { data } = await supabase.from('user_profiles').select('username').eq('id', r.user_id).single();
            if (data?.username) {
              reporterName = data.username;
            }
          }

          const newThreat = {
            id: r.id,
            type: r.report_type === 'danger' ? 'danger' : 'warning',
            label: r.description,
            channel: 'Scanner',
            contact: reporterName,
            timestamp: new Date(r.created_at).getTime(),
            risk: 0,
            tactics: 0,
            status: r.status,
            scan_id: r.scan_id
          };
          setThreats(prev => [newThreat, ...prev].slice(0, 50));
        }
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'reports' },
        (payload) => {
          const r = payload.new;
          setThreats(prev => prev.map(t => t.id === r.id ? { ...t, status: r.status } : t));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const reportThreat = async (threat) => {
    if (!user) return;
    
    // Insert into Supabase
    const { data, error } = await supabase
      .from('reports')
      .insert([
        {
          user_id: user.id,
          report_type: threat.type || 'danger',
          description: threat.label || 'Community Reported Threat',
          status: 'pending',
          scan_id: threat.scan_id || null
        }
      ]);
      
    if (error) {
      console.error("Error reporting threat:", error);
    }
  };

  const updateThreatStatus = async (id, status) => {
    if (!user) return;
    const { error } = await supabase.from('reports').update({ status }).eq('id', id);
    if (error) {
      console.error("Error updating threat status:", error);
    } else {
      setThreats(prev => prev.map(t => t.id === id ? { ...t, status } : t));
    }
  };

  return (
    <FeedContext.Provider value={{ threats, reportThreat, updateThreatStatus }}>
      {children}
    </FeedContext.Provider>
  );
};

export const useFeed = () => useContext(FeedContext);
