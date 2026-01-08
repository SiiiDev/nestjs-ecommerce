
import { 
  Settings, 
  Bell, 
  Search,
  Menu,
  X,
  ChevronDown,
  LogOut,
  User,
  Moon,
  Sun
} from 'lucide-react';

export const AdminNavbar = ({sidebarOpen, setSidebarOpen, setDarkMode, darkMode, setProfileOpen, profileOpen}) => {
  return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
          {/* Left Side */}
          <div className="flex items-center gap-4">
            {!sidebarOpen && (
              <button 
                onClick={() => setSidebarOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Menu size={20} />
              </button>
            )}

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-80 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {darkMode ? <Sun size={20} className="text-gray-600" /> : <Moon size={20} className="text-gray-600" />}
            </button>

            {/* Notifications */}
            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Divider */}
            <div className="w-px h-6 bg-gray-200"></div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center font-bold text-white text-sm">
                  JD
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-sm font-medium text-gray-700">John Doe</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
                <ChevronDown size={16} className="text-gray-400" />
              </button>

              {/* Dropdown Menu */}
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                  <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors text-left">
                    <User size={16} className="text-gray-600" />
                    <span className="text-sm text-gray-700">Profile</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors text-left">
                    <Settings size={16} className="text-gray-600" />
                    <span className="text-sm text-gray-700">Settings</span>
                  </button>
                  <div className="my-1 border-t border-gray-200"></div>
                  <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-red-50 transition-colors text-left">
                    <LogOut size={16} className="text-red-600" />
                    <span className="text-sm text-red-600">Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>
  )
}

export default AdminNavbar
