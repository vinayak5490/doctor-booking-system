import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function DoctorProfile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview"); // tabs: overview, reviews, location
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  // State for profile data
  const [doctor, setDoctor] = useState({
    name: "Dr. Arjun Mehta",
    title: "MBBS, MD • General Physician",
    experience: "15+ Years Experience",
    rating: "4.9 (420+ Reviews)",
    fee: "₹700",
    languages: "English, Hindi, Punjabi",
    availability: "Mon-Sat (10:00 AM - 08:00 PM)",
    about:
      "Dr. Arjun Mehta is a highly compassionate and dedicated General Physician based in Mumbai. With over 15 years of experience in internal medicine, he specializes in chronic disease management, lifestyle disorders, preventative healthcare, and infectious illnesses.",
    specialties: [
      "Preventative Medicine",
      "Chronic Care Management (Diabetes, Hypertension)",
      "Infectious Diseases Management",
      "Lifestyle & Nutrition Counseling",
    ],
    reviews: [
      {
        id: 1,
        patient: "Aarav S.",
        rating: 5,
        date: "July 10, 2026",
        comment:
          "Excellent experience. Dr. Mehta listened patiently to my concerns and did not rush through the checkup.",
      },
      {
        id: 2,
        patient: "Priya R.",
        rating: 5,
        date: "June 28, 2026",
        comment:
          "Highly professional! The treatment plan he laid out for my mother's diabetes has worked wonderfully.",
      },
    ],
    clinic: {
      name: "DocBook Family Health Clinic",
      address: "Suite 402, Sunset Avenue, Bandra West, Mumbai, MH - 400050",
      landmark: "Opposite Metro Station Exit 2",
    },
  });

  // State for new review form
  const [newReview, setNewReview] = useState({
    patient: "",
    rating: 5,
    comment: "",
  });

  // 1. Fetch live doctor profile from API on mount
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/doctor/profile", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        if (data.doctor) setDoctor(data.doctor);
      }
    } catch (err) {
      console.warn("Using local fallback data due to fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // 2. Save edited profile updates to backend
  const handleSaveProfile = async () => {
    try {
      const res = await fetch("/api/doctor/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(doctor),
      });

      if (res.ok) {
        toast.success("Profile updated successfully!");
        setIsEditing(false);
      } else {
        toast.error("Failed to save changes.");
      }
    } catch (err) {
      toast.error(`Error saving: ${err.message}`);
    }
  };

  // 3. Add a new review locally & submit to backend
  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!newReview.patient || !newReview.comment) {
      toast.error("Please fill in all review fields");
      return;
    }

    const reviewObj = {
      id: Date.now(),
      patient: newReview.patient,
      rating: Number(newReview.rating),
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      comment: newReview.comment,
    };

    setDoctor((prev) => ({
      ...prev,
      reviews: [reviewObj, ...prev.reviews],
    }));

    setNewReview({ patient: "", rating: 5, comment: "" });
    toast.success("Review added!");

    // Optional: Sync review with backend
    try {
      await fetch("/api/doctor/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(reviewObj),
      });
    } catch (err) {
      console.error("Review sync error:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500 font-medium">
        Loading Doctor Profile...
      </div>
    );
  }

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
                {isEditing ? (
                  <input
                    type="text"
                    value={doctor.name}
                    onChange={(e) =>
                      setDoctor({ ...doctor, name: e.target.value })
                    }
                    className="text-2xl font-bold border rounded px-2 py-1 text-gray-900 w-full mb-1"
                  />
                ) : (
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                    {doctor.name}
                  </h1>
                )}

                {isEditing ? (
                  <input
                    type="text"
                    value={doctor.title}
                    onChange={(e) =>
                      setDoctor({ ...doctor, title: e.target.value })
                    }
                    className="text-sm border rounded px-2 py-1 text-blue-600 w-full"
                  />
                ) : (
                  <p className="text-blue-600 font-medium text-sm">
                    {doctor.title}
                  </p>
                )}
              </div>

              <div className="flex gap-2 justify-center sm:justify-end">
                {isEditing ? (
                  <button
                    onClick={handleSaveProfile}
                    className="bg-emerald-600 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-emerald-700 transition shadow-md"
                  >
                    💾 Save Changes
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-gray-100 text-gray-700 font-semibold px-4 py-2.5 rounded-xl hover:bg-gray-200 transition"
                  >
                    ✏️ Edit Profile
                  </button>
                )}
                <button
                  onClick={() => navigate("/admin/appointments")}
                  className="bg-blue-600 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-700 transition shadow-md whitespace-nowrap"
                >
                  Appointments
                </button>
              </div>
            </div>

            <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-1 text-sm text-gray-500 pt-2 border-t border-gray-100">
              <span>💼 {doctor.experience}</span>
              <span>⭐ {doctor.rating}</span>
              <span>
                💵 Fee:{" "}
                {isEditing ? (
                  <input
                    type="text"
                    value={doctor.fee}
                    onChange={(e) =>
                      setDoctor({ ...doctor, fee: e.target.value })
                    }
                    className="w-20 border rounded px-1 text-xs font-semibold text-gray-900"
                  />
                ) : (
                  <span className="font-semibold text-gray-900">
                    {doctor.fee}
                  </span>
                )}
              </span>
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
                {isEditing ? (
                  <textarea
                    rows={4}
                    value={doctor.about}
                    onChange={(e) =>
                      setDoctor({ ...doctor, about: e.target.value })
                    }
                    className="w-full border rounded-xl p-3 text-sm text-gray-700 focus:outline-blue-500"
                  />
                ) : (
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    {doctor.about}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-bold text-gray-900">
                  Core Specialties
                </h3>
                <ul className="grid sm:grid-cols-2 gap-2 text-sm text-gray-600">
                  {doctor.specialties.map((spec, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="text-blue-500 text-base">✓</span> {spec}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t text-sm text-gray-600 space-y-2">
                <div>
                  🗣️{" "}
                  <span className="font-semibold text-gray-900">
                    Languages Spoken:
                  </span>{" "}
                  {isEditing ? (
                    <input
                      type="text"
                      value={doctor.languages}
                      onChange={(e) =>
                        setDoctor({ ...doctor, languages: e.target.value })
                      }
                      className="border rounded px-2 py-0.5 text-xs w-64"
                    />
                  ) : (
                    doctor.languages
                  )}
                </div>
                <div>
                  🕒{" "}
                  <span className="font-semibold text-gray-900">
                    Clinic Timings:
                  </span>{" "}
                  {isEditing ? (
                    <input
                      type="text"
                      value={doctor.availability}
                      onChange={(e) =>
                        setDoctor({ ...doctor, availability: e.target.value })
                      }
                      className="border rounded px-2 py-0.5 text-xs w-64"
                    />
                  ) : (
                    doctor.availability
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-6 animate-fadeIn">
              <h3 className="text-lg font-bold text-gray-900">
                Patient Feedback
              </h3>

              {/* Add New Review Form */}
              <form
                onSubmit={handleAddReview}
                className="p-4 bg-gray-50 border rounded-xl space-y-3"
              >
                <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Add Patient Review
                </h4>
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Patient Name"
                    value={newReview.patient}
                    onChange={(e) =>
                      setNewReview({ ...newReview, patient: e.target.value })
                    }
                    className="flex-1 border text-sm rounded-lg p-2 bg-white"
                  />
                  <select
                    value={newReview.rating}
                    onChange={(e) =>
                      setNewReview({ ...newReview, rating: e.target.value })
                    }
                    className="border text-sm rounded-lg p-2 bg-white"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5/5)</option>
                    <option value={4}>⭐⭐⭐⭐ (4/5)</option>
                    <option value={3}>⭐⭐⭐ (3/5)</option>
                  </select>
                </div>
                <textarea
                  rows={2}
                  placeholder="Patient feedback or comment..."
                  value={newReview.comment}
                  onChange={(e) =>
                    setNewReview({ ...newReview, comment: e.target.value })
                  }
                  className="w-full border text-sm rounded-lg p-2 bg-white"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Submit Review
                </button>
              </form>

              {/* Reviews List */}
              <div className="divide-y divide-gray-100">
                {doctor.reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="py-4 first:pt-0 last:pb-0 space-y-1"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm text-gray-900">
                        {rev.patient}
                      </span>
                      <span className="text-xs text-gray-400">{rev.date}</span>
                    </div>
                    <div className="text-amber-400 text-xs">
                      {"★".repeat(rev.rating)}
                    </div>
                    <p className="text-sm text-gray-600 italic">
                      "{rev.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "location" && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="text-lg font-bold text-gray-900">
                Clinic Location Details
              </h3>
              <div className="p-4 bg-gray-50 border rounded-xl space-y-2 max-w-xl">
                <h4 className="font-bold text-gray-900">
                  {doctor.clinic.name}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {doctor.clinic.address}
                </p>
                <div className="text-xs font-medium text-blue-600 pt-1">
                  📍 Landmark: {doctor.clinic.landmark}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
