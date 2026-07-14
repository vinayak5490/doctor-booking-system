import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function RescheduleAppointment() {
  const location = useLocation();
  const navigate = useNavigate();

  // Extracting the state passed from the Lookup Dashboard
  const appointment = location.state?.appointment;

  const today = new Date().toISOString().split("T")[0];
  const [newDate, setNewDate] = useState(appointment?.date || today);
  const [newSlot, setNewSlot] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRescheduled, setIsRescheduled] = useState(false);

  const availableSlots = [
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
  ];

  const handleRescheduleSubmit = (e) => {
    e.preventDefault();
    if (!newSlot) return;

    setLoading(true);

    // Mock API patching sequence
    setTimeout(() => {
      setIsRescheduled(true);
      setLoading(false);
    }, 1000);
  };

  // Guard Clause: Redirection handler if page is accessed directly without state
  if (!appointment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 max-w-sm w-full text-center space-y-4">
          <div className="text-4xl">🔍</div>
          <h3 className="text-xl font-bold text-gray-900">
            No Appointment Selected
          </h3>
          <p className="text-sm text-gray-500">
            Please locate your original appointment profile via lookup before
            attempting a schedule change.
          </p>
          <button
            onClick={() => navigate("/appointment-lookup")}
            className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-xl hover:bg-blue-700 transition"
          >
            Go to Appointment Lookup
          </button>
        </div>
      </div>
    );
  }

  // Confirmation Success View Panel
  if (isRescheduled) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full text-center space-y-4 animate-fadeIn">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 text-2xl mx-auto">
            📅
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Rescheduled Successfully
          </h2>
          <p className="text-sm text-gray-500">
            Your appointment with{" "}
            <span className="font-semibold">{appointment.doctorName}</span> has
            been changed.
          </p>

          <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100/50 text-sm space-y-1 max-w-xs mx-auto">
            <div className="text-gray-500 text-xs uppercase font-semibold">
              Your New Window
            </div>
            <div className="font-bold text-gray-900">{newDate}</div>
            <div className="font-semibold text-blue-600">{newSlot}</div>
          </div>

          <div className="pt-4">
            <button
              onClick={() => navigate("/")}
              className="w-full bg-gray-900 text-white font-semibold py-2.5 rounded-xl hover:bg-gray-800 transition"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Reschedule Appointment
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Pick a new date and time session below for your consultation.
          </p>
        </div>

        {/* Current Active Schedule Warning Badge */}
        <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 space-y-1 text-sm">
          <span className="text-xs font-bold text-amber-800 uppercase tracking-wide">
            Current Booking:
          </span>
          <p className="text-gray-700 font-medium">
            {appointment.doctorName} — {appointment.date} at{" "}
            <span className="text-amber-900 font-semibold">
              {appointment.time}
            </span>
          </p>
        </div>

        {/* Reschedule Input Interactive Funnel Form */}
        <form onSubmit={handleRescheduleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Choose New Date
            </label>
            <input
              type="date"
              min={today}
              value={newDate}
              onChange={(e) => {
                setNewDate(e.target.value);
                setNewSlot("");
              }}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          {newDate && (
            <div className="animate-fadeIn">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Available Sessions
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {availableSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setNewSlot(slot)}
                    className={`py-2 px-3 rounded-xl text-sm font-medium border transition ${
                      newSlot === slot
                        ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                        : slot === appointment.time &&
                            newDate === appointment.date
                          ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through"
                          : "bg-white text-gray-700 border-gray-200 hover:border-blue-400"
                    }`}
                    disabled={
                      slot === appointment.time && newDate === appointment.date
                    }
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 pt-2 border-t">
            <button
              type="button"
              disabled={loading}
              onClick={() => navigate(-1)}
              className="py-2.5 text-sm font-semibold border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition"
            >
              Cancel Change
            </button>
            <button
              type="submit"
              disabled={loading || !newSlot}
              className="py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition disabled:opacity-40"
            >
              {loading ? "Updating..." : "Confirm Shift"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
