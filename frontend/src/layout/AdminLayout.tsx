import { useState, type ReactNode } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  FolderTree, 
  Users, 
  ShoppingCart, 
  Settings,
  Book, 
} from 'lucide-react';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminNavbar from '../components/admin/AdminNavbar';
import { Outlet } from 'react-router-dom';

interface AdminLayoutProps {
  children: ReactNode;
}
const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeItem, setActiveItem] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const menuItems = [
    { id: 'categories', label: 'Categories', icon: FolderTree },
    { id: 'books', label: 'Books', icon: Book },
    // { id: 'products', label: 'Products', icon: Package },
    // { id: 'users', label: 'Users', icon: Users },
    // { id: 'orders', label: 'Orders', icon: ShoppingCart },
    // { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    // { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      
     <AdminSidebar menuItems={menuItems} activeItem={activeItem} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setActiveItem={setActiveItem} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <AdminNavbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setDarkMode={setDarkMode} darkMode={darkMode} setProfileOpen={setProfileOpen} profileOpen={profileOpen} />       

        {/* Main Content - Outlet Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;