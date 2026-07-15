import React, { useState } from "react";

export default function Settings() {
  // Centralized System Configuration State Tree
  const [settings, setSettings] = useState({
    clinicName: "DocBook Executive Clinics",
    supportEmail: "ops@docbook.com",
    slotDuration: "15",
    maxBufferDays: "30",
    enableReminders: true,
    autoApproveInsurance: false,
    systemStatus: "Operational",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const saveConfiguration = (e) => {
    e.preventDefault();
    setIsSaving(true);

    // Simulate standard high-availability edge persistence delay
    setTimeout(() => {
      setIsSaving(false);
      setSuccessMsg(
        "System properties synced to database cluster successfully. ✓",
      );
      setTimeout(() => setSuccessMsg(""), 4000);
    }, 900);
  };

  return (
    <div className="space-y-6 max-w-4xl animate-fadeIn">
      {/* Title Header Section */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            System Settings
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Configure system rules, dispatch frameworks, buffer policies, and
            live clinic variables.
          </p>
        </div>

        {successMsg && (
          <div className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm">
            {successMsg}
          </div>
        )}
      </div>

      <form onSubmit={saveConfiguration} className="space-y-6">
        {/* Module 1: Core Institutional Parameters */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-900 tracking-wide uppercase border-b border-slate-100 pb-2">
            Institutional Parameters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Clinic Display Identity Name
              </label>
              <input
                type="text"
                name="clinicName"
                required
                value={settings.clinicName}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 outline-none focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                System Operations Gateway Email
              </label>
              <input
                type="email"
                name="supportEmail"
                required
                value={settings.supportEmail}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-mono text-slate-800 outline-none focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition"
              />
            </div>
          </div>
        </div>

        {/* Module 2: Scheduling Rules & Allocation Windows */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-900 tracking-wide uppercase border-b border-slate-100 pb-2">
            Scheduling & Allocation Rules
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Granular Consultation Slot Size
              </label>
              <select
                name="slotDuration"
                value={settings.slotDuration}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 font-medium outline-none focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition"
              >
                <option value="10">10 Minutes per slot</option>
                <option value="15">15 Minutes per slot</option>
                <option value="20">20 Minutes per slot</option>
                <option value="30">30 Minutes per slot</option>
              </select>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Determines the temporal layout division blocks inside the live
                engine calendar matrix.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Maximum Rolling Booking Window
              </label>
              <select
                name="maxBufferDays"
                value={settings.maxBufferDays}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 font-medium outline-none focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition"
              >
                <option value="15">15 Days in Advance</option>
                <option value="30">30 Days in Advance</option>
                <option value="60">60 Days in Advance</option>
                <option value="90">90 Days in Advance</option>
              </select>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Controls the maximum chronological cutoff timestamp boundary
                allowed for patient self-scheduling.
              </p>
            </div>
          </div>
        </div>

        {/* Module 3: Automated Communications & Framework Switches */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-900 tracking-wide uppercase border-b border-slate-100 pb-2">
            Automation Switches & Notifications
          </h2>
          <div className="divide-y divide-slate-100">
            {/* Toggle Row 1 */}
            <div className="flex items-center justify-between py-3.5">
              <div className="pr-4">
                <h4 className="text-sm font-bold text-slate-900">
                  Automated Patient Triggers
                </h4>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                  Dispatches direct SMS and email notifications 24 hours prior
                  to appointment check-in windows.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle("enableReminders")}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  settings.enableReminders ? "bg-blue-600" : "bg-slate-200"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    settings.enableReminders ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Toggle Row 2 */}
            <div className="flex items-center justify-between py-3.5">
              <div className="pr-4">
                <h4 className="text-sm font-bold text-slate-900">
                  Instant Insurance Verification Engine
                </h4>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                  Bypasses manual administrative auditing to instantly flag
                  panel checkmarks clean.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle("autoApproveInsurance")}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  settings.autoApproveInsurance ? "bg-blue-600" : "bg-slate-200"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    settings.autoApproveInsurance
                      ? "translate-x-5"
                      : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Global Action Engine Controls */}
        <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-200/60 flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs text-slate-500 font-semibold tracking-wide">
              Global Platform State:{" "}
              <span className="text-slate-700 font-black">
                {settings.systemStatus}
              </span>
            </span>
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className={`w-full sm:w-auto font-bold px-6 py-2.5 rounded-xl text-sm transition shadow-md ${
              isSaving
                ? "bg-slate-400 text-slate-100 cursor-not-allowed"
                : "bg-slate-900 text-white hover:bg-slate-800 shadow-slate-200"
            }`}
          >
            {isSaving ? "Syncing Clusters..." : "Commit Global Configurations"}
          </button>
        </div>
      </form>
    </div>
  );
}
