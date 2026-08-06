import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function DoctorProfile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  // State mapped directly to Doctor.js Mongoose Model schema
  const [doctor, setDoctor] = useState({
    name: "Dr. Arjun Mehta",
    qualification: "MBBS, MD (cardiology)",
    specialization: "Senior Cardiologist",
    experience: 12,
    consultationFee: 800,
    about:
      "Dr. Arjun Mehta is a highly compassionate and dedicated Specialist. He specializes in preventative care, chronic condition management, and specialized internal treatments.",
    specialties: [
      "Preventative Medicine",
      "Chronic Care Management",
      "Lifestyle Counseling",
    ],
    reviews: [],
  });

  // 1. Fetch live profile matching GET /api/doctor
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/doctor", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const result = await res.json();
      if (result.success && result.data) {
        setDoctor(result.data);
      }
    } catch (err) {
      console.error("Error fetching doctor profile:", err);
      toast.error("Failed to load doctor profile.");
    } finally {
      setLoading(false);
    }
  };

  // 2. Save updates matching PUT /api/doctor
  const handleSaveProfile = async () => {
    try {
      const res = await fetch("/api/doctor", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Include Auth token if your protectAdmin middleware checks Authorization header
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
        body: JSON.stringify(doctor),
      });

      const result = await res.json();

      if (result.success) {
        setDoctor(result.data);
        toast.success(result.message || "Profile updated successfully!");
        setIsEditing(false);
      } else {
        toast.error(result.message || "Failed to save changes.");
      }
    } catch (err) {
      toast.error(`Error saving: ${err.message}`);
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
        {/* Profile Header Card */}
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
                    value={doctor.name || ""}
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
                  <div className="flex gap-2 mt-1">
                    <input
                      type="text"
                      value={doctor.qualification || ""}
                      onChange={(e) =>
                        setDoctor({ ...doctor, qualification: e.target.value })
                      }
                      className="text-xs border rounded px-2 py-1 text-blue-600 w-1/2"
                      placeholder="Qualification"
                    />
                    <input
                      type="text"
                      value={doctor.specialization || ""}
                      onChange={(e) =>
                        setDoctor({ ...doctor, specialization: e.target.value })
                      }
                      className="text-xs border rounded px-2 py-1 text-blue-600 w-1/2"
                      placeholder="Specialization"
                    />
                  </div>
                ) : (
                  <p className="text-blue-600 font-medium text-sm">
                    {doctor.qualification} • {doctor.specialization}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-1 text-sm text-gray-500 pt-2 border-t border-gray-100">
              <span>
                💼 Experience:{" "}
                {isEditing ? (
                  <input
                    type="number"
                    value={doctor.experience || 0}
                    onChange={(e) =>
                      setDoctor({
                        ...doctor,
                        experience: Number(e.target.value),
                      })
                    }
                    className="w-16 border rounded px-1 text-xs font-semibold text-gray-900"
                  />
                ) : (
                  <strong className="text-gray-900">
                    {doctor.experience} Years
                  </strong>
                )}
              </span>
              <span>
                💵 Consultation Fee: ₹
                {isEditing ? (
                  <input
                    type="number"
                    value={doctor.consultationFee || 0}
                    onChange={(e) =>
                      setDoctor({
                        ...doctor,
                        consultationFee: Number(e.target.value),
                      })
                    }
                    className="w-20 border rounded px-1 text-xs font-semibold text-gray-900"
                  />
                ) : (
                  <strong className="text-gray-900">
                    {doctor.consultationFee}
                  </strong>
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Tab Switcher Bar */}
        <div className="flex border-b border-gray-200 bg-white px-4 rounded-xl shadow-sm border h-12 items-center">
          {["overview", "reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`h-full px-4 text-sm font-semibold capitalize transition border-b-2 -mb-0.5 ${
                activeTab === tab
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-500 border-transparent hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Section */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 min-h-[200px]">
          {activeTab === "overview" && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">About Doctor</h3>
              {isEditing ? (
                <textarea
                  rows={4}
                  value={doctor.about || ""}
                  onChange={(e) =>
                    setDoctor({ ...doctor, about: e.target.value })
                  }
                  className="w-full border rounded-xl p-3 text-sm text-gray-700 focus:outline-blue-500"
                />
              ) : (
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {doctor.about || "No details provided yet."}
                </p>
              )}
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="text-gray-500 text-sm italic">
              Patient reviews will be displayed here.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
