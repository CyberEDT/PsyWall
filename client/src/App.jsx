import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import TermsOfUse from './components/TermsOfUse';
import PrivacyPolicy from './components/PrivacyPolicy';
import ToolInfo from './components/ToolInfo';
import Documentation from './components/Documentation';
import LandingPage from './components/sections/LandingPage';
import StorageConsent from './components/StorageConsent';

import DashboardLayout from './components/layout/DashboardLayout';
import Overview from './components/dashboard/Overview';
import ThreatScanner from './components/dashboard/ThreatScanner';
import ManipulationDetection from './components/dashboard/ManipulationDetection';
import Reports from './components/dashboard/Reports';
import AwarenessCenter from './components/dashboard/AwarenessCenter';
import Settings from './components/dashboard/Settings';

import { NotificationProvider } from './context/NotificationContext';
import { FeedProvider } from './context/FeedContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/layout/ProtectedRoute';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

import './App.css';

const BASE_URL = 'https://psywall.cyberedt.com';

const ROUTE_META = {
  landing: {
    title: 'PsyWall (MIDS): A Cognitive Firewall for Human-Centric Security',
    description: 'PsyWall detects psychological manipulation, phishing, and social engineering in real-time using AI-driven cognitive analysis.',
    path: '/',
  },
  login: {
    title: 'Login – PsyWall',
    description: 'Sign in to PsyWall to access your cognitive security dashboard and threat analysis tools.',
    path: '/login',
  },
  register: {
    title: 'Register – PsyWall',
    description: 'Create a PsyWall account and start protecting yourself from psychological manipulation and phishing attacks.',
    path: '/register',
  },
  dashboard: {
    title: 'Dashboard Overview – PsyWall',
    description: 'Your cognitive security overview: real-time threat scores, active defenses, and recent manipulation attempts.',
    path: '/dashboard',
  },
  scanner: {
    title: 'Threat Scanner – PsyWall',
    description: 'Paste any message and PsyWall will deconstruct its psychological footprint and flag manipulation tactics.',
    path: '/scanner',
  },
  manipulation: {
    title: 'Manipulation Detection – PsyWall',
    description: 'A breakdown of every psychological tactic PsyWall has flagged across your scanned messages.',
    path: '/manipulation',
  },
  reports: {
    title: 'Reports – PsyWall',
    description: 'Every analyzed message, archived, explained, and available for review in one place.',
    path: '/reports',
  },
  awareness: {
    title: 'Awareness Center – PsyWall',
    description: 'Train your cognitive defenses against social engineering and manipulation with PsyWall\'s Awareness Center.',
    path: '/awareness',
  },
  settings: {
    title: 'Settings – PsyWall',
    description: 'Customize PsyWall to match your privacy preferences, notification settings, and workflow.',
    path: '/settings',
  },
  'tool-info': {
    title: 'About the Tool – PsyWall',
    description: 'Learn how PsyWall\'s MIDS engine works: the cognitive models, detection architecture, and data pipeline behind human-centric security.',
    path: '/tool-info',
  },
  documentation: {
    title: 'Technical Documentation – PsyWall',
    description: 'Full technical documentation for PsyWall: API reference, integration guides, and system architecture.',
    path: '/documentation',
  },
  terms: {
    title: 'Terms of Use – PsyWall',
    description: 'Read the PsyWall Terms of Use before accessing or integrating with our cognitive security platform.',
    path: '/terms',
  },
  privacy: {
    title: 'Privacy Policy – PsyWall',
    description: 'Understand how PsyWall collects, stores, and protects your data in compliance with privacy regulations.',
    path: '/privacy',
  },
};

function setMetaTag(name, content, isProperty = false) {
  const attr = isProperty ? 'property' : 'name';
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(path) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', `${BASE_URL}${path}`);
}

function TitleUpdater() {
  const location = useLocation();
  useEffect(() => {
    const segment = location.pathname.split('/')[1] || 'landing';
    const meta = ROUTE_META[segment] || ROUTE_META.landing;

    // Title
    document.title = meta.title;

    // Meta description
    setMetaTag('description', meta.description);

    // Canonical
    setCanonical(meta.path);

    // OG tags
    setMetaTag('og:title', meta.title, true);
    setMetaTag('og:description', meta.description, true);
    setMetaTag('og:url', `${BASE_URL}${meta.path}`, true);

    // Twitter tags
    setMetaTag('twitter:title', meta.title);
    setMetaTag('twitter:description', meta.description);
    setMetaTag('twitter:url', `${BASE_URL}${meta.path}`);
  }, [location]);
  return null;
}

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <FeedProvider>
          <Router>
            <TitleUpdater />
            <StorageConsent />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout title="Cognitive Security Overview" subtitle="Welcome back — your defenses are calm and active."><Overview /></DashboardLayout></ProtectedRoute>} />
              <Route path="/scanner" element={<ProtectedRoute><DashboardLayout title="Threat Scanner" subtitle="Paste a message — PsyWall will deconstruct its psychological footprint."><ThreatScanner /></DashboardLayout></ProtectedRoute>} />
              <Route path="/manipulation" element={<ProtectedRoute><DashboardLayout title="Manipulation Detection" subtitle="A breakdown of every psychological tactic PsyWall has flagged."><ManipulationDetection /></DashboardLayout></ProtectedRoute>} />
              <Route path="/reports" element={<ProtectedRoute><DashboardLayout title="Reports" subtitle="Every analyzed message, archived and explainable."><Reports /></DashboardLayout></ProtectedRoute>} />
              <Route path="/awareness" element={<ProtectedRoute><DashboardLayout title="Awareness Center" subtitle="Train your team's cognition — the most important firewall."><AwarenessCenter /></DashboardLayout></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><DashboardLayout title="Settings" subtitle="Tune PsyWall to your privacy, attention, and workflow."><Settings /></DashboardLayout></ProtectedRoute>} />
            
            <Route path="/tool-info" element={<ToolInfo />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/terms" element={<TermsOfUse />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            
            <Route path="*" element={<LandingPage />} />
          </Routes>
        </Router>
      </FeedProvider>
    </NotificationProvider>
  </AuthProvider>
  );
}

export default App;
