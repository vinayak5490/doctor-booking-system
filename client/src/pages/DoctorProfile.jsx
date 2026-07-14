import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DoctorProfile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview"); // tabs: overview, reviews, location

  const doctor = {
    name: "Dr. Arjun Mehta",
    title: "MBBS, MD • General Physician",
    experience: "15+ Years Experience",
    rating: "4.9 (420+ Reviews)",
    fee: "₹700",
    languages: "English, Hindi, Punjabi",
    availability: "Mon-Sat (10:00 AM - 08:00 PM)",
    about: "Dr. Arjun Mehta is a highly compassionate and dedicated General Physician based in Mumbai. With over 15 years of experience in internal medicine, he specializes in chronic disease management, lifestyle disorders, preventative healthcare, and infectious illnesses.",
    specialties: [
      "Preventative Medicine",
      "Chronic Care Management (Diabetes, Hypertension)",
      "Infectious Diseases Management",
      "Lifestyle & Nutrition Counseling",
    ],
    reviews: [
      { id: 1, patient: "Aarav S.", rating: 5, date: "July 10, 2026", comment: "Excellent experience. Dr. Mehta listened patiently to my concerns and did not rush through the checkup." },
      { id: 2, patient: "Priya R.", rating: 5, date: "June 28, 2026", comment: "Highly professional! The treatment plan he laid out for my mother's diabetes has worked wonderfully." },
      { id: 3, patient: "Vikram K.", rating: 4, date: "June 15, 2026", comment: "Very knowledgeable doctor. The waiting area was a bit crowded, but the consultation itself was top-notch." },
    ],
    clinic: {
      name: "DocBook Family Health Clinic",
      address: "Suite 402, Sunset Avenue, Bandra West, Mumbai, MH - 400050",
      landmark: "Opposite Metro Station Exit 2",
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Profile Hero Header Card */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-5xl shrink-0 shadow-inner">
            👨‍⚕️
          </div>
          <div className="text-center sm:text-left space-y-2 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">{doctor.name}</h1>
                <p className="text-blue-600 font-medium text-sm">{doctor.title}</p>
              </div>
              <button
                onClick={() => navigate("/book-appointment")}
                className="bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-blue-700 transition shadow-md whitespace-nowrap"
              >
                Book Appointment
              </button>
            </div>
            
            <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-1 text-sm text-gray-500 pt-2 border-t border-gray-100">
              <span>💼 {doctor.experience}</span>
              <span>⭐ {doctor.rating}</span>
              <span>💵 Fee: <span className="font-semibold text-gray-900">{doctor.fee}</span></span>
            </div>
          </div>
        </div>

        {/* Tab Switcher Bar */}
        <div className="flex border-b border-gray-200 bg-white px-4 rounded-xl shadow-sm border h-12 items-center">
          {["overview", "reviews", "location"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`h-full px-4 text-sm font-semibold capitalize transition relative border-b-2 -mb-0.5 ${
                activeTab === tab
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-500 border-transparent hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Dynamic Interactive Tab Content Panel */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 min-h-[250px]">
          {activeTab === "overview" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-gray-900">About Me</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{doctor.about}</p>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-gray-900">Core Specialties</h3>
                <ul className="grid sm:grid-cols-2 gap-2 text-sm text-gray-600">
                  {doctor.specialties.map((spec, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="text-blue-500 text-base">✓</span> {spec}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-4 border-t text-sm text-gray-600 space-y-1.5">
                <div>🗣️ <span className="font-semibold text-gray-900">Languages Spoken:</span> {doctor.languages}</div>
                <div>🕒 <span className="font-semibold text-gray-900">Clinic Timings:</span> {doctor.availability}</div>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Patient Feedback</h3>
              <div className="divide-y divide-gray-100">
                {doctor.reviews.map((rev) => (
                  <div key={rev.id} className="py-4 first:pt-0 last:pb-0 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm text-gray-900">{rev.patient}</span>
                      <span className="text-xs text-gray-400">{rev.date}</span>
                    </div>
                    <div className="text-amber-400 text-xs">{"★".repeat(rev.rating)}</div>
                    <p className="text-sm text-gray-600 italic">"{rev.comment}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "location" && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="text-lg font-bold text-gray-900">Clinic Location Details</h3>
              <div className="p-4 bg-gray-50 border rounded-xl space-y-2 max-w-xl">
                <h4 className="font-bold text-gray-900">{doctor.clinic.name}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{doctor.clinic.address}</p>
                <div className="text-xs font-medium text-blue-600 pt-1">
                  📍 Landmark: {doctor.clinic.landmark}
                </div>
              </div>
              <div className="w-full h-40 bg-gray-100 rounded-xl border border-dashed border-gray-300 flex items-center justify-center text-sm text-gray-400 font-medium">
                🗺️ [Embedded Interactive Map Placeholder]
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}