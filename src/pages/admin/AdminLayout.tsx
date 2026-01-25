// layouts/AdminLayout.tsx
import { useState } from "react";
import { Video, Upload, Settings, Users, Home, LogOut, Menu, X, User, ImageIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

 const navItems = [
  { icon: Home, label: "Dashboard", path: "/admin" },
  { icon: ImageIcon, label: "Gallery", path: "/admin/gallery-management" }, // Add this
  { icon: Video, label: "Videos", path: "/admin/video-management" },
  { icon: Upload, label: "Upload Video", path: "/admin/upload-videos" },
  { icon: Upload, label: "Upload Image", path: "/admin/upload-image" }, // Add this
  { icon: Users, label: "Upload Profile", path: "/admin/upload-marriage-profile" },
  { icon: Settings, label: "Settings", path: "/admin/settings" },
];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-950 to-black">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-linear-to-r from-amber-900/30 to-amber-700/30 text-amber-300"
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-linear-to-b from-gray-900 to-black border-r border-amber-900/30
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
      `}>
        {/* Logo */}
        <div className="p-6 border-b border-amber-900/30">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-linear-to-r from-amber-600 to-amber-700">
              <Video className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white"> Smurna Bhawan</h1>
              <p className="text-xs text-gray-400 "> CHURCH & PRAYER CENTER</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                ${isActive(item.path)
                  ? 'bg-linear-to-r from-amber-600 to-amber-700 text-white shadow-lg shadow-amber-500/20'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }
              `}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* User Profile */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-amber-900/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-linear-to-r from-amber-600 to-amber-700 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white font-medium truncate">Admin User</div>
              <div className="text-xs text-gray-400">Administrator</div>
            </div>
            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="md:pl-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-linear-to-r from-gray-900/95 to-black/95 backdrop-blur-md border-b border-amber-900/30">
          <div className="h-20 px-4 py-4 md:px-6 flex items-center justify-between">
            <div className="hidden  flex-col md:flex">
              <h2 className="text-xl font-bold text-white">
                {navItems.find(item => isActive(item.path))?.label || "Dashboard"}
              </h2>
              <p className="text-sm text-gray-400">Manage your church's content</p>
            </div>
            
            <div className="flex items-center gap-4">
              {/* <button className="relative p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button> */}
              
              <div className="hidden md:flex items-center gap-3">
                <div className="text-right">
                  <div className="text-white font-medium">Welcome back, Admin</div>
                  <div className="text-xs text-gray-400">Last login: Today</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-linear-to-r from-amber-600 to-amber-700 flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="min-h-[calc(100vh-80px)]">
          {children}
        </main>

        {/* Footer */}
        <footer className="px-4 py-6 md:px-6 border-t border-amber-900/30">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
            <div>
              © 2024 Church Content Management System. All rights reserved.
            </div>
            <div className="flex gap-4 mt-2 md:mt-0">
              <a href="#" className="hover:text-amber-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-amber-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-amber-400 transition-colors">Help Center</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;