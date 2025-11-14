import React from 'react';
import { UserRole } from '../types';

interface HeaderProps {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  setSidebarOpen: (isOpen: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ userRole, setUserRole, setSidebarOpen }) => {
  return (
    <header className="bg-surface shadow-md p-4 flex justify-between items-center flex-shrink-0 z-10">
      <div className="flex items-center">
        <button
          className="md:hidden text-text-primary mr-4"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
        <h2 className="text-xl font-semibold text-text-primary hidden sm:block">
          {userRole === 'admin' ? 'Admin Dashboard' : 'Viewer Dashboard'}
        </h2>
      </div>
      <div className="sm:hidden text-lg font-bold text-primary">QualiBean</div>
      <div className="flex items-center space-x-4">
        <div className="relative">
            <select
                value={userRole}
                onChange={(e) => setUserRole(e.target.value as UserRole)}
                className="appearance-none bg-background border border-gray-300 rounded-md py-2 pl-3 pr-8 text-sm font-medium text-text-secondary hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            >
                <option value="admin">Switch to Admin</option>
                <option value="viewer">Switch to Viewer</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-text-primary">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
        </div>
        <div className="relative">
          <svg className="w-6 h-6 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-secondary ring-2 ring-white"></span>
        </div>
        <div className="flex items-center">
            <img className="h-10 w-10 rounded-full object-cover" src="https://scontent.fmnl9-3.fna.fbcdn.net/v/t39.30808-6/574345864_4243312579259482_1490303787631180057_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFHfGtU3DlJLrOlED4JdLGQjxHgbYu9wXuPEeBti73Be1nHHI69d-mMAxr1BmrEOSE5EY9Zk7L-XoSXoifo-Tnf&_nc_ohc=fhskCIXVZzgQ7kNvwG-mtUx&_nc_oc=AdkmXpJ-VXHybxFzGSHfxQp62yrhwGtPMPeo56cVJVIloc9FURUECrRmHK1ixD3-PpY&_nc_zt=23&_nc_ht=scontent.fmnl9-3.fna&_nc_gid=WlhcL5pD5CHHsFjbr0UuWg&oh=00_AfiPrfXMskzG-LF_gXsb7LgMCCwT6JZIEPW4ojHrIGwyqg&oe=691D625F" alt="User Avatar" />
            <div className="ml-3 hidden md:block">
                <p className="text-sm font-medium text-text-primary">{userRole === 'admin' ? 'Admin User' : 'Standard Viewer'}</p>
                <p className="text-xs text-text-secondary">{userRole}@qualibean.com</p>
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
