import React, { useState, useEffect, useCallback } from "react";

export default function Patients() {
  const [patientsList, setPatientsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search & Pagination States
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPatients, setTotalPatients] = useState(0);

  // Modal State for Registering a New Patient
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    gender: "Male",
    phone: "",
    email: "",
  });

  // Fetch Patients from Express API
  const fetchPatients = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        page: currentPage,
        limit: 10,
      });

      if (searchTerm.trim()) {
        params.append("search", searchTerm.trim());
      }

      const response = await fetch(`/api/patients?${params.toString()}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to load patient records");
      }

      // Adjust based on your Express backend response structure:
      // Expected structure: { data: [...], total: 45, totalPages: 5 }
      setPatientsList(result.data || result.patients || []);
      setTotalPatients(result.total || (result.data ? result.data.length : 0));
      setTotalPages(result.totalPages || 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, currentPage]);

  // Debounce API calls when searching
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPatients();
    }, 300);

    return () => clearTimeout(timer);
  }, [fetchPatients]);

  // Handle Form Submission for Creating a Patient
  const handleCreatePatient = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const response = await fetch("/api/patients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientName: newPatient.name,
          age: Number(newPatient.age),
          gender: newPatient.gender,
          phone: newPatient.phone,
          email: newPatient.email,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create patient");
      }

      // Close modal, reset form, and reload list
      setIsModalOpen(false);
      setNewPatient({
        name: "",
        age: "",
        gender: "Male",
        phone: "",
        email: "",
      });
      fetchPatients();
    } catch (err) {
      alert(`Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Title Header & Action Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Patient Registry
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Access historical consultation tracking files, profile metrics, and
            direct client touchpoints.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md shadow-blue-500/20 transition"
        >
          <span>+</span> Register New Patient
        </button>
      </div>

      {/* Utility Search & Summary Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-xs">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 text-sm">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search registry name, ID, phone..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-800 outline-none focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition"
          />
        </div>

        <div className="text-xs font-bold text-slate-400 bg-slate-50 border border-slate-200/60 px-3 py-1.5 rounded-xl">
          Total Registered:{" "}
          <span className="text-slate-700 font-black">{totalPatients}</span>
        </div>
      </div>

      {/* Main Registry Data Table Container */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-4 px-6">Patient ID</th>
                <th className="py-4 px-4">Basic Profile</th>
                <th className="py-4 px-4">Contact Gateway</th>
                <th className="py-4 px-4 text-center">Total Bookings</th>
                <th className="py-4 px-6 text-right">Preceding Session</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
              {loading ? (
                <tr>
                  <td
                    colSpan="5"
                    className="py-12 text-center text-sm text-slate-400 font-medium"
                  >
                    Loading patient registry records...
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
              ) : patientsList.length > 0 ? (
                patientsList.map((row) => (
                  <tr
                    key={row._id || row.id}
                    className="hover:bg-slate-50/40 transition"
                  >
                    {/* Unique Identifier Column */}
                    <td className="py-4 px-6 font-mono text-xs font-bold text-slate-400">
                      {row.patientId || row.id || row._id}
                    </td>

                    {/* Patient core demographic column */}
                    <td className="py-4 px-4">
                      <div className="font-bold text-slate-900">
                        {row.patientName || row.name}
                      </div>
                      <div className="text-xs text-slate-400 font-semibold">
                        {row.age ? `${row.age} Yrs old` : "N/A"} •{" "}
                        {row.gender || "Unspecified"}
                      </div>
                    </td>

                    {/* Contact communication parameters */}
                    <td className="py-4 px-4">
                      <div className="font-medium text-slate-800">
                        {row.phone || "—"}
                      </div>
                      <div className="text-xs text-slate-400 font-mono">
                        {row.email || "—"}
                      </div>
                    </td>

                    {/* Frequency Counter metrics */}
                    <td className="py-4 px-4 text-center">
                      <span className="inline-block bg-blue-50 text-blue-700 border border-blue-100 text-xs font-black px-2.5 py-0.5 rounded-md">
                        {row.totalVisits ?? row.visitCount ?? 0}
                      </span>
                    </td>

                    {/* Chronological timestamp audit fields */}
                    <td className="py-4 px-6 text-right font-semibold text-slate-700">
                      {row.lastVisit
                        ? new Date(row.lastVisit).toLocaleDateString()
                        : "No prior visits"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="py-12 text-center text-sm text-slate-400 font-medium"
                  >
                    No patient records match your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div className="px-6 py-3 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                className="px-3 py-1 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 disabled:opacity-40 transition"
              >
                Previous
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                className="px-3 py-1 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 disabled:opacity-40 transition"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal: Register New Patient */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full p-6 space-y-4 animate-scaleUp">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900">
                Register New Patient
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePatient} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={newPatient.name}
                  onChange={(e) =>
                    setNewPatient({ ...newPatient, name: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 outline-none focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition"
                  placeholder="e.g. Ananya Sharma"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Age *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    max="120"
                    value={newPatient.age}
                    onChange={(e) =>
                      setNewPatient({ ...newPatient, age: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 outline-none focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition"
                    placeholder="30"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Gender
                  </label>
                  <select
                    value={newPatient.gender}
                    onChange={(e) =>
                      setNewPatient({ ...newPatient, gender: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 outline-none focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={newPatient.phone}
                  onChange={(e) =>
                    setNewPatient({ ...newPatient, phone: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 outline-none focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition"
                  placeholder="9876543210"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={newPatient.email}
                  onChange={(e) =>
                    setNewPatient({ ...newPatient, email: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 outline-none focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition"
                  placeholder="patient@example.com"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-xl transition shadow-md shadow-blue-500/20"
                >
                  {isSubmitting ? "Registering..." : "Save Patient"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
