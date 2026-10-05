import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, updateProfileSync } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const isAdminRoute = location.pathname.startsWith('/admin') || user?.role === 'admin';
  const isFullScreenRoute = location.pathname.startsWith('/family-tree');

  useEffect(() => {
    updateProfileSync();
  }, [updateProfileSync]);

  const handleMenuClick = () => {
    if (user?.role === 'admin') {
      navigate('/admin');
    } else {
      setSidebarOpen(!sidebarOpen);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
      <TopNav onMenuClick={handleMenuClick} />
      <div className="flex pt-16">
        {!isAdminRoute && <Sidebar isOpen={sidebarOpen} />}
        <main className={`flex-1 transition-all duration-300 ${!isAdminRoute ? (sidebarOpen ? 'ml-64' : 'ml-0') : 'ml-0'} ${isFullScreenRoute ? 'overflow-hidden h-[calc(100vh-4rem)]' : ''}`}>
          <div className={isFullScreenRoute ? "p-0 h-full" : "p-6"}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
