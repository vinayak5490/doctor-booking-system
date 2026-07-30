import React, { useState, useEffect, useCallback } from 'react'

export default function Appointments() {
  const [appointmentsList, setAppointmentsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("All");

  // Fetch appointments from the Express API
  const fetchAppointments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      //Build query parameters based on state
      const params = new URLSearchParams();
      if (selectedStatusFilter !== "All") {
        params.append("status", selectedStatusFilter);
      }
      if (searchTerm.trim() !== "") {
        params.append("search", searchTerm.trim());
      }

      const response = await fetch(`/api/appointments?${params.toString()}`);
      const results = await response.json();

      if (!response.ok) {
        throw new Error(results.message || "Failed to fetch appointments");
      }

      //Backend returns records inside 'result.date' array based on controller logic
      setAppointmentsList(results.date || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, selectedStatusFilter]);

  // Refresh when filters or search change
  useEffect(() => {
    //Debounce search slightly to avoid hitting the API on every keystroke
    const timer = setTimeout(() => {
      fetchAppointments();
    }, 300);

    return () => clearTimeout(timer);
  }, [fetchAppointments]);

  //Handle updating status via API
  const handleStatusUpdate = async (mongoId, newStatus) => {
    try {
      const response = await fetch(`/api/appointments/${mongoId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Failed to update status");
        return;
      }

      //optimistically/logically sync state with response data
      setAppointmentsList((prev) =>
        prev.map((apt) =>
          apt._id == mongoId ? { ...apt, status: newStatus } : apt,
        ),
      );
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const filterTabs = ["All", "Pending", "Confirmed", "Completed", "Cancelled"];
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Title Header Section */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Appointments Ledger
        </h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Review, approve, fulfill, or terminate registered clinical
          consultation entries.
        </p>
      </div>

      {/* Control Actions & Utility Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between gap-4">
        {/* Sub-search Element */}
        <div className="relative flex-1 max-w-xs">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 text-sm">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search name, phone, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-800 outline-none focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition"
          />
        </div>

        {/* Dynamic Filtering Navigation Tabs */}
        <div className="flex flex-wrap gap-1.5">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedStatusFilter(tab)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedStatusFilter === tab
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-200/70"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Core Ledger Records Data Table Container */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-4 px-6">ID Reference</th>
                <th className="py-4 px-4">Patient Profile</th>
                <th className="py-4 px-4">Schedule Date/Time</th>
                <th className="py-4 px-4">Status Label</th>
                <th className="py-4 px-6 text-right">Operational Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
              {loading ? (
                <tr>
                  <td
                    colSpan="5"
                    className="py-12 text-center text-sm text-slate-400 font-medium"
                  >
                    Loading appointments...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td
                    colSpan="5"
                    className="py-12 text-center text-sm text-red-500 font-medium"
                  >
                    {error}
                  </td>
                </tr>
              ) : appointmentsList.length > 0 ? (
                appointmentsList.map((row) => (
                  <tr key={row._id} className="hover:bg-slate-50/40 transition">
                    {/* Unique Identifier column */}
                    <td className="py-4 px-6 font-mono text-xs font-bold text-slate-400">
                      {row.bookingId || row._id}
                    </td>

                    {/* Patient identity profiles column */}
                    <td className="py-4 px-4">
                      <div className="font-bold text-slate-900">
                        {row.patientName}
                      </div>
                      <div className="text-xs text-slate-400 font-medium">
                        {row.phone}
                      </div>
                    </td>

                    {/* Date Metrics configurations */}
                    <td className="py-4 px-4">
                      <div className="font-semibold text-slate-700">
                        {row.date
                          ? new Date(row.date).toLocaleDateString()
                          : "-"}
                      </div>
                      <div className="text-xs text-slate-400">
                        {row.slot || row.time}
                      </div>
                    </td>

                    {/* Dynamic colored status blocks */}
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center text-xs font-bold px-2.5 py-1 rounded-full border ${
                          row.status === "Confirmed"
                            ? "bg-green-50 text-green-700 border-green-100"
                            : row.status === "Pending"
                              ? "bg-yellow-50 text-yellow-700 border-yellow-100"
                              : row.status === "Completed"
                                ? "bg-blue-50 text-blue-700 border-blue-100"
                                : "bg-red-50 text-red-700 border-red-100"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>

                    {/* Inline state modifications dropdown triggers */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <select
                          value={row.status}
                          onChange={(e) =>
                            handleStatusUpdate(row._id, e.target.value)
                          }
                          className="bg-slate-50 border border-slate-200 text-xs font-bold rounded-lg px-2 py-1 text-slate-700 outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="py-12 text-center text-sm text-slate-400 font-medium"
                  >
                    No records found matching the active filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
