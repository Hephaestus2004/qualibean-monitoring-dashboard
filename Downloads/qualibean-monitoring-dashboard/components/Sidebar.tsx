import React from 'react';
import { UserRole, View } from '../types';

interface SidebarProps {
  currentView: View;
  setView: (view: View) => void;
  userRole: UserRole;
  isSidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
  <li
    onClick={onClick}
    className={`flex items-center p-3 my-1 rounded-lg cursor-pointer transition-colors duration-200 ${
      isActive
        ? 'bg-primary text-white shadow-lg'
        : 'text-text-secondary hover:bg-gray-200 hover:text-text-primary'
    }`}
  >
    {icon}
    <span className="ml-3 font-medium">{label}</span>
  </li>
);

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, userRole, isSidebarOpen, setSidebarOpen }) => {
  const navItems = [
    { view: 'dashboard', label: 'Dashboard', icon: <DashboardIcon />, adminOnly: false },
    { view: 'analytics', label: 'Analytics', icon: <AnalyticsIcon />, adminOnly: false },
    { view: 'logs', label: 'Logs', icon: <LogsIcon />, adminOnly: false },
    { view: 'users', label: 'Users', icon: <UsersIcon />, adminOnly: true },
    { view: 'settings', label: 'Settings', icon: <SettingsIcon />, adminOnly: true },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden transition-opacity ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      <aside className={`w-64 bg-surface flex-shrink-0 p-4 shadow-lg fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <CoffeeBeanIcon />
              <h1 className="text-2xl font-bold ml-2 text-text-primary">QualiBean</h1>
            </div>
            <button className="md:hidden text-text-secondary" onClick={() => setSidebarOpen(false)} aria-label="Close sidebar">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
        </div>
        <nav>
          <ul>
            {navItems.map((item) => {
              if (item.adminOnly && userRole !== 'admin') {
                return null;
              }
              return (
                <NavItem
                  key={item.view}
                  label={item.label}
                  // FIX: Changed JSX.Element to React.ReactNode to fix "Cannot find namespace 'JSX'" error.
                  icon={item.icon as React.ReactNode}
                  isActive={currentView === item.view}
                  // FIX: Explicitly typed navItems to ensure item.view is of type View.
                  onClick={() => setView(item.view as View)}
                />
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
};

// SVG Icons
const CoffeeBeanIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 512 512" fill="currentColor">
        <path d="M416 128c-17.7 0-32 14.3-32 32s14.3 32 32 32c52.4 0 97.4 34.3 111.3 82.3-3.3-2.8-6.7-5.5-10.2-8.1-34.9-25.7-81.3-40.1-131-40.1-9.9 0-19.6.9-29.1 2.5-16.1 2.7-32.5 1-47.5-6.1-41.1-19.4-69.5-60.6-69.5-107.5 0-35.3 14.3-67.3 37.5-90.5C292.7 32.7 260.6 24 224 24 126.9 24 48 102.9 48 200c0 92.2 69.3 168.9 160 175.4V448h-32c-17.7 0-32 14.3-32 32s14.3 32 32 32h160c17.7 0 32-14.3 32-32s-14.3-32-32-32h-32v-72.6c80.6-12.1 140.9-74.4 156.4-153.9C456.3 151.6 437.4 128 416 128zM128 200c0-53 43-96 96-96s96 43 96 96-43 96-96 96-96-43-96-96z"/>
    </svg>
);
const DashboardIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
);
const AnalyticsIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
);
const LogsIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
);
const UsersIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197m0 0A5.975 5.975 0 0112 13a5.975 5.975 0 013 5.197M15 21a6 6 0 00-9-5.197" /></svg>
);
const SettingsIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.096 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
);

export default Sidebar;
