import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

export default function BookingSucess() {
  const { state }  = useLocation(); //state variable holds the custom, hidden data you passed from your previous page.
  const navigate = useNavigate();

  //Safety fallback metrics if state is missing
  const bookingDate = state?.date || "12 July 2026";
  const bookingTime = state?.time || "10:30 AM";
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-lg border border-gray-100 p-8 text-center space-y-6">
        {/* Success Icon */}
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mx-auto shadow-sm">
          ✓
        </div>

        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-gray-900">
            Appointment Confirmed
          </h2>
          <p className="text-sm text-green-600 font-medium">
            A confirmation email has been sent successfully.
          </p>
        </div>

        {/* Appointment Meta Grid */}
        <div className="bg-gray-50 rounded-2xl p-5 text-left text-sm space-y-3.5 border border-gray-100">
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-500">Booking ID:</span>
            <span className="font-mono font-bold text-blue-600">
              APT-93K82A
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Doctor:</span>
            <span className="font-semibold text-gray-900">Dr. Arjun Mehta</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Date:</span>
            <span className="font-medium text-gray-900">{bookingDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Time Slot:</span>
            <span className="font-medium text-gray-900">{bookingTime}</span>
          </div>
          <div className="flex justify-between pt-2 border-t items-start">
            <span className="text-gray-500">Clinic Location:</span>
            <span className="font-medium text-gray-900 text-right max-w-[180px]">
              Lajpat Nagar, New Delhi
            </span>
          </div>
        </div>

        {/* Cancellation Notice Alert */}
        <div className="bg-amber-50 text-amber-800 text-xs rounded-xl p-3 text-left leading-relaxed">
          <strong>Need to change plans?</strong> You can easily cancel or modify
          your reservation anytime from our lookup page using your secure
          Booking ID.
        </div>

        <button
          onClick={() => navigate("/")}
          className="w-full bg-gray-900 text-white font-medium py-3 rounded-xl hover:bg-gray-800 transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
