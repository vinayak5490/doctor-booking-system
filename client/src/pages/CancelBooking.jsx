import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function CancelAppointment() {
  const location = useLocation();
  const navigate = useNavigate();

  // Grab the appointment data passed from the lookup screen
  const appointment = location.state?.appointment;

  const [loading, setLoading] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const [reason, setReason] = useState("");

  const handleCancelSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Mock API call to delete/cancel the appointment
    setTimeout(() => {
      setIsCancelled(true);
      setLoading(false);
    }, 1000);
  };

  // Guard clause: If there is no appointment state, tell them to search first
  if (!appointment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 max-w-sm w-full text-center space-y-4">
          <div className="text-4xl">🔍</div>
          <h3 className="text-xl font-bold text-gray-900">
            No Appointment Selected
          </h3>
          <p className="text-sm text-gray-500">
            Please search for your appointment first to select one for
            cancellation.
          </p>
          <button
            onClick={() => navigate("/lookup-appointment")}
            className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-xl hover:bg-blue-700 transition"
          >
            Go to Appointment Lookup
          </button>
        </div>
      </div>
    );
  }

  // Success view after cancellation is confirmed
  if (isCancelled) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full text-center space-y-4 animate-fadeIn">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-500 text-2xl mx-auto">
            ✕
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Appointment Cancelled
          </h2>
          <p className="text-sm text-gray-500">
            Your appointment with{" "}
            <span className="font-semibold">{appointment.doctorName}</span> has
            been successfully cancelled. A confirmation message has been sent.
          </p>
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
            Cancel Appointment
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Are you sure you want to cancel this booking? This action cannot be
            undone.
          </p>
        </div>

        {/* Mini Appointment Summary Card */}
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Doctor:</span>
            <span className="font-semibold text-gray-900">
              {appointment.doctorName}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Patient:</span>
            <span className="font-medium text-gray-900">
              {appointment.patientName}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Date & Time:</span>
            <span className="font-medium text-blue-600">
              {appointment.date} at {appointment.time}
            </span>
          </div>
        </div>

        {/* Reason Form */}
        <form onSubmit={handleCancelSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
              Reason for Cancellation (Optional)
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm text-gray-700"
            >
              <option value="">Select a reason...</option>
              <option value="Scheduling Conflict">Scheduling conflict</option>
              <option value="Feeling Better">
                Change in health condition / Feeling better
              </option>
              <option value="Found alternative">
                Found another clinic / alternative
              </option>
              <option value="Personal Reasons">Personal emergency</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              disabled={loading}
              onClick={() => navigate(-1)} // Go back to the lookup dashboard safely
              className="py-2.5 text-sm font-semibold border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition"
            >
              Nevermind, Go Back
            </button>
            <button
              type="submit"
              disabled={loading}
              className="py-2.5 text-sm font-semibold text-white bg-red-600 rounded-xl hover:bg-red-700 transition disabled:opacity-50"
            >
              {loading ? "Cancelling..." : "Confirm Cancellation"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
