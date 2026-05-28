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

function TitleUpdater() {
  const location = useLocation();
  useEffect(() => {
    const path = location.pathname.split('/')[1] || 'landing';
    const titles = {
      landing: 'PsyWall | Cognitive Firewall',
      login: 'Login',
      register: 'Register',
      dashboard: 'Dashboard Overview',
      scanner: 'Threat Scanner',
      manipulation: 'Manipulation Detection',
      reports: 'Reports',
      awareness: 'Awareness Center',
      settings: 'Settings',
      'tool-info': 'About the Tool',
      documentation: 'Technical Documentation',
      terms: 'Terms of Use',
      privacy: 'Privacy Policy'
    };
    document.title = titles[path] || 'Cognitive Security';
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
