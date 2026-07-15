import React, { useState } from "react";

export default function AdminDoctorProfile() {
  // Central core profile form configuration state
  const [profileData, setProfileData] = useState({
    name: "Dr. Arjun Mehta",
    qualification: "MBBS, MD - General Medicine",
    fee: "700",
    experience: "15",
    languages: "English, Hindi",
    clinicAddress: "DocBook Executive Clinics, Sector 62, Noida, UP - 201301",
    about:
      "Senior General Physician specializing in chronic disease care, comprehensive preventive medicine diagnostics, and targeted lifestyle modifications tracking metrics.",
    workingDays: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    startTime: "10:00",
    endTime: "20:00",
  });

  const [saveStatus, setSaveStatus] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDayToggle = (day) => {
    setProfileData((prev) => {
      const activeDays = prev.workingDays.includes(day)
        ? prev.workingDays.filter((d) => d !== day)
        : [...prev.workingDays, day];
      return { ...prev, workingDays: activeDays };
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSaveStatus("Saving changes...");

    // Simulate API persistence framework hook
    setTimeout(() => {
      setSaveStatus("Profile configuration updated successfully! ✓");
      setTimeout(() => setSaveStatus(""), 3000);
    }, 800);
  };

  const daysOptions = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div className="space-y-6 max-w-4xl animate-fadeIn">
      {/* Title Header Section */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Doctor Profile Studio
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Modify structural information broadcasted across live consumer
            client portals.
          </p>
        </div>

        {saveStatus && (
          <div
            className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
              saveStatus.includes("successfully")
                ? "bg-green-50 text-green-700 border-green-200"
                : "bg-blue-50 text-blue-700 border-blue-200 animate-pulse"
            }`}
          >
            {saveStatus}
          </div>
        )}
      </div>

      <form
        onSubmit={handleFormSubmit}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
      >
        {/* Left Column: Visual Identity & Fee Metrics (1/3 Width) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6 text-center">
          <div className="space-y-3">
            <div className="w-24 h-24 bg-blue-100 border-2 border-blue-200 text-4xl rounded-2xl mx-auto flex items-center justify-center shadow-inner">
              👨‍⚕️
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">
                {profileData.name}
              </h3>
              <p className="text-xs font-bold text-slate-400 font-mono mt-0.5">
                {profileData.qualification}
              </p>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4 space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Consultation Fee (₹)
              </label>
              <input
                type="number"
                name="fee"
                required
                value={profileData.fee}
                onChange={handleInputChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold text-blue-600 outline-none focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Experience Years
              </label>
              <input
                type="number"
                name="experience"
                required
                value={profileData.experience}
                onChange={handleInputChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 outline-none focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Bio Data & Core Shift Parameters (2/3 Width) */}
        <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-5">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
            Credentials & Practice Rules
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Physician Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={profileData.name}
                onChange={handleInputChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 outline-none focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Spoken Languages
              </label>
              <input
                type="text"
                name="languages"
                required
                value={profileData.languages}
                onChange={handleInputChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 outline-none focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition"
                placeholder="e.g. English, Hindi"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 tracking-wider uppercase mb-1">
              Professional Biography
            </label>
            <textarea
              name="about"
              rows="3"
              required
              value={profileData.about}
              onChange={handleInputChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-800 outline-none focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 tracking-wider uppercase mb-1">
              Physical Clinic Address
            </label>
            <input
              type="text"
              name="clinicAddress"
              required
              value={profileData.clinicAddress}
              onChange={handleInputChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 outline-none focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition"
            />
          </div>

          {/* Operational Shift Tracking Fields */}
          <div className="space-y-3 pt-2">
            <label className="block text-xs font-semibold text-slate-500 tracking-wider uppercase">
              Weekly Operational Days
            </label>
            <div className="flex flex-wrap gap-1.5">
              {daysOptions.map((day) => {
                const isSelected = profileData.workingDays.includes(day);
                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => handleDayToggle(day)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                      isSelected
                        ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                        : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {day.substring(0, 3)}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-500 tracking-wider uppercase mb-1">
                Shift Commences
              </label>
              <input
                type="time"
                name="startTime"
                required
                value={profileData.startTime}
                onChange={handleInputChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 outline-none focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 tracking-wider uppercase mb-1">
                Shift Terminates
              </label>
              <input
                type="time"
                name="endTime"
                required
                value={profileData.endTime}
                onChange={handleInputChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 outline-none focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <button
              type="submit"
              className="w-full sm:w-auto bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-blue-700 shadow-md shadow-blue-100 transition text-sm"
            >
              Save Profile Configurations
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
