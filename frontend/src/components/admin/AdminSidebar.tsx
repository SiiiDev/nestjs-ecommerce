import {X} from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminSidebar = ({sidebarOpen, setSidebarOpen, menuItems, activeItem, setActiveItem}) => {
  return (
     <aside 
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-gradient-to-b from-slate-900 to-slate-800 text-white transition-all duration-300 flex flex-col shadow-xl`}
      >
        {/* Logo Section */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-700">
          <div className={`flex items-center gap-3 ${!sidebarOpen && 'justify-center w-full'}`}>
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-sm">
              A
            </div>
            {sidebarOpen && (
              <div>
                <h2 className="font-bold text-lg">Admin</h2>
                <p className="text-xs text-gray-400">Dashboard</p>
              </div>
            )}
          </div>
          {sidebarOpen && (
            <button 
              onClick={() => setSidebarOpen(false)}
              className="p-1.5 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <X size={18} className="text-gray-400" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <Link to={item.label}
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                activeItem === item.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/30'
                  : 'hover:bg-slate-700/50'
              } ${!sidebarOpen && 'justify-center'}`}
            >
              <item.icon 
                size={20} 
                className={activeItem === item.id ? 'text-white' : 'text-gray-400 group-hover:text-white'}
              />
              {sidebarOpen && (
                <span className={`font-medium ${activeItem === item.id ? 'text-white' : 'text-gray-300'}`}>
                  {item.label}
                </span>
              )}
            </Link >
          ))}
        </nav>

        {/* User Profile Section */}
        <div className="p-4 border-t border-slate-700">
          <div className={`flex items-center gap-3 ${!sidebarOpen && 'justify-center'}`}>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center font-bold">
              JD
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">John Doe</p>
                <p className="text-xs text-gray-400 truncate">admin@store.com</p>
              </div>
            )}
          </div>
        </div>
      </aside>
  )
}

export default AdminSidebar
