import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId) => {
    try {
      const { data, error } = await supabase.from('user_profiles').select('*').eq('id', userId).single();
      if (!error && data) {
        setProfile(data);
      } else {
        setProfile(null);
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      setProfile(null);
    }
  };

  useEffect(() => {
    let expiryTimeout;

    const enforceExpiry = (session) => {
      if (session?.user?.last_sign_in_at) {
        const lastSignIn = new Date(session.user.last_sign_in_at).getTime();
        const now = new Date().getTime();
        const hours24 = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
        const timeElapsed = now - lastSignIn;
        
        if (timeElapsed >= hours24) {
          supabase.auth.signOut();
          return null;
        } else {
          // Schedule forced logout exactly at the 24-hour mark
          const timeLeft = hours24 - timeElapsed;
          if (expiryTimeout) clearTimeout(expiryTimeout);
          expiryTimeout = setTimeout(() => {
            supabase.auth.signOut();
          }, timeLeft);
        }
      }
      return session;
    };

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      const validSession = enforceExpiry(session);
      setSession(validSession);
      setUser(validSession?.user ?? null);
      if (validSession?.user) {
        fetchProfile(validSession.user.id).finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const validSession = enforceExpiry(session);
      setSession(validSession);
      setUser(validSession?.user ?? null);
      if (validSession?.user) {
        setLoading(true);
        fetchProfile(validSession.user.id).finally(() => setLoading(false));
      } else {
        setProfile(null);
        setLoading(false);
        if (expiryTimeout) clearTimeout(expiryTimeout);
      }
    });

    return () => {
      subscription.unsubscribe();
      if (expiryTimeout) clearTimeout(expiryTimeout);
    };
  }, []);

  const signUp = async (email, password, username) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: username,
        },
      },
    });
    if (error) throw error;
    return data;
  };

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) throw error;
    return data;
  };
  
  const signInWithGithub = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
    });
    if (error) throw error;
    return data;
  };

  const value = {
    session,
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    signInWithGoogle,
    signInWithGithub
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
