import React, { useState } from "react";

export default function Patients() {
  // Global Mock Patient Database Registry State
  const [patientsList] = useState([
    {
      id: "PAT-0041",
      name: "John Doe",
      age: 34,
      gender: "Male",
      phone: "9876543210",
      email: "johndoe@email.com",
      totalVisits: 8,
      lastVisit: "2026-07-16",
    },
    {
      id: "PAT-0042",
      name: "Rahul Sharma",
      age: 29,
      gender: "Male",
      phone: "9123456789",
      email: "rahul.s@email.com",
      totalVisits: 3,
      lastVisit: "2026-07-16",
    },
    {
      id: "PAT-0043",
      name: "Priya Rao",
      age: 42,
      gender: "Female",
      phone: "9812345670",
      email: "priya.rao@email.com",
      totalVisits: 14,
      lastVisit: "2026-07-17",
    },
    {
      id: "PAT-0044",
      name: "Amit Verma",
      age: 56,
      gender: "Male",
      phone: "9711223344",
      email: "amit.v@email.com",
      totalVisits: 21,
      lastVisit: "2026-07-14",
    },
    {
      id: "PAT-0045",
      name: "Sneha Patel",
      age: 23,
      gender: "Female",
      phone: "9655443322",
      email: "sneha.p@email.com",
      totalVisits: 1,
      lastVisit: "2026-07-13",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  // Process pipelines for filtering active grid outputs
  const filteredPatients = patientsList.filter((patient) => {
    return (
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm)
    );
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Title Header Section */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Patient Registry
        </h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Access historical consultation tracking files, profile metrics, and
          direct client touchpoints.
        </p>
      </div>

      {/* Utility Search & Subactions Hub bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
        <div className="relative flex-1 max-w-xs">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 text-sm">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search registry name, ID, phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-800 outline-none focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition"
          />
        </div>

        <div className="text-xs font-bold text-slate-400 bg-slate-50 border border-slate-200/60 px-3 py-1.5 rounded-xl">
          Total Registered:{" "}
          <span className="text-slate-700 font-black">
            {patientsList.length}
          </span>
        </div>
      </div>

      {/* Core Registry Main Grid List Container */}
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
              {filteredPatients.length > 0 ? (
                filteredPatients.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/40 transition">
                    {/* Unique Identifier Column */}
                    <td className="py-4 px-6 font-mono text-xs font-bold text-slate-400">
                      {row.id}
                    </td>

                    {/* Patient core demographic column */}
                    <td className="py-4 px-4">
                      <div className="font-bold text-slate-900">{row.name}</div>
                      <div className="text-xs text-slate-400 font-semibold">
                        {row.age} Yrs old • {row.gender}
                      </div>
                    </td>

                    {/* Contact communication parameters */}
                    <td className="py-4 px-4">
                      <div className="font-medium text-slate-800">
                        {row.phone}
                      </div>
                      <div className="text-xs text-slate-400 font-mono">
                        {row.email}
                      </div>
                    </td>

                    {/* Frequency Counter metrics */}
                    <td className="py-4 px-4 text-center">
                      <span className="inline-block bg-blue-50 text-blue-700 border border-blue-100 text-xs font-black px-2.5 py-0.5 rounded-md">
                        {row.totalVisits}
                      </span>
                    </td>

                    {/* Chronological timestamp audit fields */}
                    <td className="py-4 px-6 text-right font-semibold text-slate-700">
                      {row.lastVisit}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="py-12 text-center text-sm text-slate-400 font-medium"
                  >
                    No patient records match your active query parameter.
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

