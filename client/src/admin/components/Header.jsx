import React, { useEffect, useState } from "react";

const defaultDoctorProfile = {
  name: "Dr. Arjun Mehta",
};

export default function Header() {
  const [doctor, setDoctor] = useState(defaultDoctorProfile);

  useEffect(() => {
    const loadDoctorProfile = async () => {
      try {
        const response = await fetch("/api/doctor", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const result = await response.json();

        if (result.success && result.data) {
          setDoctor({
            name: result.data.name || defaultDoctorProfile.name,
          });
        }
      } catch (error) {
        console.error("Unable to load doctor profile for header", error);
      }
    };

    loadDoctorProfile();
  }, []);

  const initials = doctor.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 shadow-sm z-10">
      {/* Administrative Global Core Search System */}
      <div className="w-full max-w-md hidden sm:block">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 text-sm">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search appointments, patients, logs..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-800 outline-none focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition"
          />
        </div>
      </div>

      {/* Profile & Notifications Action Tray */}
      <div className="flex items-center gap-4 ml-auto">
        {/* Quick System Notifications Trigger */}
        <button className="p-2 hover:bg-slate-50 rounded-xl relative text-lg border border-transparent hover:border-slate-200 transition">
          🔔
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white" />
        </button>

        {/* Separator Divider Line */}
        <div className="w-px h-6 bg-slate-200" />

        {/* Admin Operational Profile Frame */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden md:block">
            <div className="text-sm font-bold text-slate-900 leading-none">
              {doctor.name}
            </div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Chief Administrator
            </span>
          </div>
          <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center font-bold text-blue-600 border border-blue-200 shadow-inner">
            {initials}
          </div>
        </div>
      </div>
    </header>
  );
}
