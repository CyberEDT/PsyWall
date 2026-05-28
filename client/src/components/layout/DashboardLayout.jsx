import React from 'react';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import RightSidebar from './RightSidebar';

const DashboardLayout = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex font-sans">
      <Sidebar />
      
      {/* Main Content Area - Constrained by left and right sidebars */}
      <div className="flex-1 ml-[220px] mr-[320px] flex flex-col min-h-screen overflow-hidden relative">
        <TopNavbar title={title} subtitle={subtitle} />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="w-full h-full max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Contextual Intelligence Sidebar */}
      <div className="fixed right-0 top-0 bottom-0 w-[320px] z-20">
        <RightSidebar />
      </div>
    </div>
  );
};

export default DashboardLayout;
