import React from "react";
import StatsCard from "../components/StatsCard";

export default function Dashboard() {
  // Analytical system aggregates
  const stats = [
    {
      title: "Today's Appointments",
      count: "18",
      icon: "🕒",
      colorClass: "bg-blue-50 text-blue-600 border border-blue-100",
    },
    {
      title: "Upcoming Bookings",
      count: "42",
      icon: "📅",
      colorClass: "bg-yellow-50 text-yellow-600 border border-yellow-100",
    },
    {
      title: "Completed Sessions",
      count: "76",
      icon: "✅",
      colorClass: "bg-green-50 text-green-600 border border-green-100",
    },
    {
      title: "Cancelled Requests",
      count: "5",
      icon: "❌",
      colorClass: "bg-red-50 text-red-600 border border-red-100",
    },
  ];

  // Daily running tracking pipeline
  const todaysSchedule = [
    { time: "10:00 AM", patient: "John Doe", status: "In-Progress" },
    { time: "11:00 AM", patient: "Rahul Sharma", status: "Waiting" },
    { time: "12:30 PM", patient: "Priya Rao", status: "Scheduled" },
  ];

  // Global logging ledger records
  const recentAppointments = [
    {
      id: "APT-9082",
      patient: "Amit Verma",
      date: "14 July 2026",
      time: "04:30 PM",
      status: "Completed",
    },
    {
      id: "APT-9081",
      patient: "Sneha Patel",
      date: "14 July 2026",
      time: "02:00 PM",
      status: "Completed",
    },
    {
      id: "APT-9080",
      patient: "Rohan Das",
      date: "13 July 2026",
      time: "11:30 AM",
      status: "Cancelled",
    },
    {
      id: "APT-9079",
      patient: "Ananya Iyer",
      date: "13 July 2026",
      time: "10:00 AM",
      status: "Completed",
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Structural Header Title Blocks */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          System Overview
        </h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Real-time metrics monitoring clinician availability and operational
          output.
        </p>
      </div>

      {/* 4-Column Metric Grid Layer */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((card, idx) => (
          <StatsCard key={idx} {...card} />
        ))}
      </div>

      {/* Modern Two-Column Layout Panel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Today's Timeline Queue (1/3 Width) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <div>
            <h3 className="font-bold text-slate-900 text-base">
              Today's Queue
            </h3>
            <p className="text-xs text-slate-400">
              Chronological list of active operational sessions.
            </p>
          </div>

          <div className="space-y-3 relative before:absolute before:inset-y-1 before:left-3 before:w-0.5 before:bg-slate-100">
            {todaysSchedule.map((slot, index) => (
              <div
                key={index}
                className="flex items-start gap-4 relative pl-1 group"
              >
                <div className="w-6 h-6 bg-white border-2 border-blue-600 rounded-full flex items-center justify-center shrink-0 z-10 group-hover:scale-110 transition-transform">
                  <div className="w-2 h-2 bg-blue-600 rounded-full" />
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex-1 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-blue-600 block">
                      {slot.time}
                    </span>
                    <span className="text-sm font-bold text-slate-800">
                      {slot.patient}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                      slot.status === "In-Progress"
                        ? "bg-blue-100 text-blue-700"
                        : slot.status === "Waiting"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {slot.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Historical Ledger Logs (2/3 Width) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4 overflow-hidden flex flex-col">
          <div>
            <h3 className="font-bold text-slate-900 text-base">
              Recent Ledger Logs
            </h3>
            <p className="text-xs text-slate-400">
              Audit logs tracking preceding clinical appointments.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <th className="pb-3 pl-2">ID</th>
                  <th className="pb-3">Patient</th>
                  <th className="pb-3">Date/Time</th>
                  <th className="pb-3 pr-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
                {recentAppointments.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/50 transition">
                    <td className="py-3.5 pl-2 font-mono text-xs font-bold text-slate-400">
                      {row.id}
                    </td>
                    <td className="py-3.5 font-bold text-slate-800">
                      {row.patient}
                    </td>
                    <td className="py-3.5">
                      <span className="font-medium text-slate-700 block">
                        {row.date}
                      </span>
                      <span className="text-xs text-slate-400">{row.time}</span>
                    </td>
                    <td className="py-3.5 pr-2 text-right">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                          row.status === "Completed"
                            ? "bg-green-50 text-green-700 border border-green-100"
                            : "bg-red-50 text-red-700 border border-red-100"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
