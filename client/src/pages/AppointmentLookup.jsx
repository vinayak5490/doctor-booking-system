import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function AppointmentLookup() {
    const navigate = useNavigate();
    // const [phoneNumber, setPhoneNumber] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [searchResult, setSearchResult] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setHasSearched(true);

        try {
            const response = await axios.get(
                `/api/appointments/search?query=${searchTerm}`
            );
            setSearchResult(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            setSearchResult(null);
            toast.error(
                error.response?.data?.message ||
                "Unable to search appointment."
            );
        } finally {
            setLoading(false);
        }
    };
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto space-y-6">
        {/* Search Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              Find Your Appointment
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Enter your registered mobile number to check details
            </p>
          </div>

          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                Phone Number
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="e.g., 9876543210"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Searching..." : "Retrieve Appointment"}
            </button>
          </form>
        </div>

        {/* Dynamic Results Card  */}
        {hasSearched && !loading && (
          <div className="animage-fadeIn">
            {searchResult ? (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                <div className="flex justify-between items-center border-b pb-3">
                  <div>
                    <span className="text-xs font-mono text-gray-400">
                      {searchResult.bookingId}
                    </span>
                    <h3 className="font-bold text-gray-950 text-lg">
                      {searchResult.doctorName}
                    </h3>
                  </div>
                  <span className="px-3 py-1 text-xs font-semibold text-green-700 bg-green-50 rounded-full">
                    {searchResult.status}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Patient:</span>
                    <span className="font-medium text-gray-900">
                      {searchResult.patientName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span className="font-medium text-gray-900">
                      {searchResult.date}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Time Slot:</span>
                    <span className="font-medium text-blue-600">
                      {searchResult.slot}
                    </span>
                  </div>
                </div>

                {/* Next steps buttons setup  */}
                <div className="grid grid-cols-2 gap-3 pt-2 border-t">
                  <button
                    onClick={() =>
                      navigate("/reshedule-appointment", {
                        state: { appointment: searchResult },
                      })
                    }
                    className="py-2 text-sm font-medium border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition"
                  >
                    Reschedule
                  </button>
                  <button
                    onClick={() =>
                      navigate("/cancel-appointment", {
                        state: { appointment: searchResult },
                      })
                    }
                    className="py-2 text-sm font-medium border border-transparent text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center text-gray-500 py-8">
                ⚠️ No upcoming appointments found for that number.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}