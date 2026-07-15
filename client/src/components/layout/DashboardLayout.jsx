import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import RightSidebar from './RightSidebar';

const DashboardLayout = ({ title, subtitle, children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex font-sans">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      {/* Main Content Area - Constrained by left and right sidebars on desktop */}
      <div className={`flex-1 w-full md:ml-[220px] ${isRightSidebarOpen ? 'xl:mr-[320px]' : 'xl:mr-[60px]'} flex flex-col min-h-screen overflow-hidden relative transition-all duration-300`}>
        <TopNavbar 
          title={title} 
          subtitle={subtitle} 
          onMenuClick={() => setIsSidebarOpen(true)} 
        />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="w-full h-full max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Contextual Intelligence Sidebar - Hidden on mobile/tablet */}
      <div className={`hidden xl:block fixed right-0 top-0 bottom-0 ${isRightSidebarOpen ? 'w-[320px]' : 'w-[60px]'} z-10 border-l border-gray-200 bg-white transition-all duration-300`}>
        <RightSidebar isOpen={isRightSidebarOpen} setIsOpen={setIsRightSidebarOpen} />
      </div>
    </div>
  );
};

export default DashboardLayout;
