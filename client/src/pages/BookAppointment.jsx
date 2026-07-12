import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BookAppointment() {
  const navigate = useNavigate();

  const today = new Date().toISOString().split("T")[0];
  // Step-by-step active state tracking
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    age: "",
    gender: "Male",
    symptoms: "",
  });

  const availableSlots = [
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    navigate("/booking-success", {
      state: { date: selectedDate, time: selectedSlot, ...formData },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
        {/* Left Side: Doctor Quick Profile Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl">
              👨‍⚕️
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900">
                Dr. Arjun Mehta
              </h3>
              <p className="text-xs text-gray-500">
                MBBS, MD • General Physician
              </p>
            </div>
          </div>
          <div className="border-t pt-4 space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>⭐ Rating:</span>
              <span className="font-semibold text-gray-900">
                4.9 (15 Yrs Exp)
              </span>
            </div>
            <div className="flex justify-between">
              <span>💵 Consultation:</span>
              <span className="font-semibold text-blue-600">₹700</span>
            </div>
            <div className="flex justify-between">
              <span>🗣️ Languages:</span>
              <span className="font-medium text-gray-900">English, Hindi</span>
            </div>
            <div className="flex justify-between">
              <span>📅 Schedule:</span>
              <span className="font-medium text-gray-900">
                Mon-Sat (10AM - 8PM)
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Dynamic Booking Funnel */}
        <div className="md:col-span-2 space-y-6">
          {/* Step 1 & 2: Pick Date & Time */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Choose Appointment Date
              </label>
              <input
                type="date"
                min={today}
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setSelectedSlot("");
                }}
                className="w-full max-w-xs border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* RESTORED: Slot Grid Selection */}
            {selectedDate && (
              <div className="animate-fadeIn">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Available Slots
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {availableSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-2.5 px-4 rounded-xl text-sm font-medium border transition ${
                        selectedSlot === slot
                          ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                          : "bg-white text-gray-700 border-gray-200 hover:border-blue-400"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Step 3: Conditional Patient Info Form */}
          {selectedDate && selectedSlot && (
            <form
              onSubmit={handleBookingSubmit}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4 animate-slideUp"
            >
              <h3 className="text-lg font-bold text-gray-900 border-b pb-2">
                Patient Information
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                    Full Name
                  </label>
                  <input
                    required
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                    Phone Number
                  </label>
                  <input
                    required
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2"
                    placeholder="9876543210"
                    required
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                    Email Address
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                    Age
                  </label>
                  <input
                    required
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2"
                    placeholder="32"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                  Gender
                </label>
                <div className="flex gap-6 mt-1">
                  {["Male", "Female", "Other"].map((g) => (
                    <label
                      key={g}
                      className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="gender"
                        value={g}
                        checked={formData.gender === g}
                        onChange={handleInputChange}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      {g}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                  Brief Symptoms
                </label>
                <textarea
                  rows="3"
                  name="symptoms"
                  value={formData.symptoms}
                  onChange={handleInputChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2"
                  placeholder="Headache, mild fever since yesterday..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 shadow-md transition mt-4"
              >
                Confirm & Book Appointment
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
