import React, { useState, useEffect, useCallback } from "react";
import StatsCard from "../components/StatsCard";

export default function Dashboard() {
  const [statsData, setStatsData] = useState({
    todaysCount: 0,
    upcomingCount: 0,
    completedCount: 0,
    cancelledCount: 0,
  });

  const [todaysSchedule, setTodaysSchedule] = useState([]);
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Dashboard Metrics & Lists from Express API
  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Execute queries concurrently
      const [statsRes, queueRes, recentRes] = await Promise.all([
        fetch("/api/appointments/stats"),
        fetch("/api/appointments/today"),
        fetch("/api/appointments?limit=5"),
      ]);

      // Check if responses are ok
      if (!statsRes.ok || !queueRes.ok || !recentRes.ok) {
        throw new Error("Failed to load dashboard metrics");
      }

      const statsJson = await statsRes.json();
      const queueJson = await queueRes.json();
      const recentJson = await recentRes.json();

      setStatsData(statsJson.data || statsJson);
      setTodaysSchedule(queueJson.data || queueJson);
      setRecentAppointments(recentJson.data || recentJson);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Dynamic 4-Column Metric Grid Mapping
  const stats = [
    {
      title: "Today's Appointments",
      count: String(statsData.todaysCount ?? 0),
      icon: "🕒",
      colorClass: "bg-blue-50 text-blue-600 border border-blue-100",
    },
    {
      title: "Upcoming Bookings",
      count: String(statsData.upcomingCount ?? 0),
      icon: "📅",
      colorClass: "bg-yellow-50 text-yellow-600 border border-yellow-100",
    },
    {
      title: "Completed Sessions",
      count: String(statsData.completedCount ?? 0),
      icon: "✅",
      colorClass: "bg-green-50 text-green-600 border border-green-100",
    },
    {
      title: "Cancelled Requests",
      count: String(statsData.cancelledCount ?? 0),
      icon: "❌",
      colorClass: "bg-red-50 text-red-600 border border-red-100",
    },
  ];

  if (loading) {
    return (
      <div className="py-20 text-center text-sm font-medium text-slate-400">
        Loading system overview metrics...
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center text-sm font-medium text-red-500">
        Error loading overview: {error}
      </div>
    );
  }

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
            {todaysSchedule.length > 0 ? (
              todaysSchedule.map((slot, index) => (
                <div
                  key={slot._id || index}
                  className="flex items-start gap-4 relative pl-1 group"
                >
                  <div className="w-6 h-6 bg-white border-2 border-blue-600 rounded-full flex items-center justify-center shrink-0 z-10 group-hover:scale-110 transition-transform">
                    <div className="w-2 h-2 bg-blue-600 rounded-full" />
                  </div>
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex-1 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-blue-600 block">
                        {slot.slot || slot.time}
                      </span>
                      <span className="text-sm font-bold text-slate-800">
                        {slot.patientName || slot.patient}
                      </span>
                    </div>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                        slot.status === "In-Progress"
                          ? "bg-blue-100 text-blue-700"
                          : slot.status === "Waiting" ||
                              slot.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {slot.status || "Scheduled"}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 py-6 text-center">
                No active appointments queued for today.
              </p>
            )}
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
                {recentAppointments.length > 0 ? (
                  recentAppointments.map((row) => (
                    <tr
                      key={row._id || row.id}
                      className="hover:bg-slate-50/50 transition"
                    >
                      <td className="py-3.5 pl-2 font-mono text-xs font-bold text-slate-400">
                        {row.bookingId || row._id || row.id}
                      </td>
                      <td className="py-3.5 font-bold text-slate-800">
                        {row.patientName || row.patient}
                      </td>
                      <td className="py-3.5">
                        <span className="font-medium text-slate-700 block">
                          {row.date
                            ? new Date(row.date).toLocaleDateString()
                            : "N/A"}
                        </span>
                        <span className="text-xs text-slate-400">
                          {row.slot || row.time}
                        </span>
                      </td>
                      <td className="py-3.5 pr-2 text-right">
                        <span
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                            row.status === "Completed"
                              ? "bg-green-50 text-green-700 border border-green-100"
                              : row.status === "Cancelled"
                                ? "bg-red-50 text-red-700 border border-red-100"
                                : "bg-yellow-50 text-yellow-700 border border-yellow-100"
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="py-8 text-center text-xs text-slate-400 font-medium"
                    >
                      No recent appointment logs recorded.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
