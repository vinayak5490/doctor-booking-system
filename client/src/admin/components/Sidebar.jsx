import React from 'react'
import { NavLink, useNavigate} from "react-router-dom";

export default function Sidebar() {
    const navigate = useNavigate();

    const menuItems = [
      { name: "Dashboard", path: "/admin/dashboard", icon: "📊" },
      { name: "Appointment", path: "/admin/appointments", icon: "📅" },
      { name: "Calendar", path: "/admin/calendar", icon: "📅" },
      { name: "patients", path: "/admin/patients", icon: "👥" },
      { name: "Doctor Profile", path: "/admin/profile", icon: "👨‍⚕️" },
      { name: "Settings", path: "/admin/settings", icon: "⚙️" },
    ];

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
    }
  return (
    <div className="w-64 bg-slate-900 text-slate-300 flex flex-col h-full shrink-0 border-r border-slate-800">
      {/* Branding Header Area */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800 gap-3">
        <span className="text-xl">🩺</span>
        <span className="font-bold text-lg text-white tracking-wide">
          DocBook Admin
        </span>
      </div>

      {/* Main Navigation stack links */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition group ${
                isActive
                  ? "bg-blue-600 text-white shadow-md shadow-blue-900/30"
                  : "hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            <span className="text-base group-hover:scale-110 transition-transform">
              {item.icon}
            </span>
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Administrative system exit trigger */}
      <div className="p-4 border-t border-slate-800">
        <button
        onClick={handleLogout}
        className='w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl text-red-400 hover:bg-red-950/30 hover:text-red-300 transition'
        >
          <span>🚪</span>
          Logout Session
        </button>
      </div>
    </div>
  );
}
