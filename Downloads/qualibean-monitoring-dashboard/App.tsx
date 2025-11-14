import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Analytics from './components/Analytics';
import Logs from './components/Logs';
import Users from './components/Users';
import Settings from './components/Settings';
import { UserRole, View } from './types';

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<UserRole>('admin');
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard userRole={userRole} />;
      case 'analytics':
        return <Analytics />;
      case 'logs':
        return <Logs userRole={userRole} />;
      case 'users':
        return <Users />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard userRole={userRole} />;
    }
  };

  return (
    <div className="flex h-screen bg-background font-sans text-text-primary">
      <Sidebar
        currentView={currentView}
        setView={setCurrentView}
        userRole={userRole}
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          userRole={userRole}
          setUserRole={setUserRole}
          setSidebarOpen={setSidebarOpen}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-4 sm:p-6 lg:p-8">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default App;
