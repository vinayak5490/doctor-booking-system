import React, { useEffect, useState } from "react";
import doctorImage from "../assets/images/doctor.jpg";

const defaultDoctorProfile = {
  name: "Dr. Arjun Mehta",
  qualification: "MBBS, MD - General Medicine",
  specialization: "General Physician",
  experience: 12,
  consultationFee: 700,
  about:
    "Dr. Arjun Mehta is a compassionate physician focused on preventive care, accurate diagnosis, and personalized wellness planning.",
  languages: ["English", "Hindi"],
};

export default function About() {
  const [doctor, setDoctor] = useState(defaultDoctorProfile);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDoctorProfile = async () => {
      try {
        const response = await fetch("/api/doctor", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const result = await response.json();

        if (result.success && result.data) {
          setDoctor({
            ...defaultDoctorProfile,
            ...result.data,
            languages: Array.isArray(result.data.languages)
              ? result.data.languages
              : [result.data.languages || defaultDoctorProfile.languages[0]],
          });
        }
      } catch (error) {
        console.error("Unable to load doctor profile for About section", error);
      } finally {
        setLoading(false);
      }
    };

    loadDoctorProfile();
  }, []);

  const languagesText = Array.isArray(doctor.languages)
    ? doctor.languages.join(", ")
    : doctor.languages;

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <img
            src={doctorImage}
            alt="doctorimage"
            className="h-96 bg-gray-100 rounded-2xl overflow-hidden flex items-center justify-center text-gray-400 shadow-inner"
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Meet {doctor.name}
          </h2>
          <p className="text-blue-600 font-medium">
            {doctor.qualification}
            {doctor.specialization ? ` • ${doctor.specialization}` : ""}
          </p>
          <p className="text-gray-600 leading-relaxed">
            {loading ? "Loading your doctor profile..." : doctor.about}
          </p>
          <div className="grid grid-cols-2 gap-6 pt-4">
            <div className="border-l-4 border-blue-600 pl-4">
              <h4 className="text-2xl font-bold text-gray-900">
                {doctor.experience}+ yrs
              </h4>
              <p className="text-sm text-gray-500">Clinical Experience</p>
            </div>
            <div className="border-l-4 border-blue-600 pl-4">
              <h4 className="text-2xl font-bold text-gray-900">
                ₹{doctor.consultationFee}
              </h4>
              <p className="text-sm text-gray-500">Consultation Fee</p>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            Languages:{" "}
            <span className="text-gray-700 font-medium">{languagesText}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
