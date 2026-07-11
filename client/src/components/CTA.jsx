import React from "react";
import { useNavigate } from "react-router-dom";

export default function CTA() {
    const navigate = useNavigate();
  return (
    <section className="py-16 bg-blue-600 text-white text-center">
      <div className="max-w-4xl mx-auto px-4 space-y-6">
        <h2 className="text-3xl sm:text-4xl font-bold">
          Ready to Prioritize Your Wellness?
        </h2>
        <p className="text-blue-100 max-w-lg mx-auto text-sm sm:text-base">
          Book an online session or clinic visit slot instantly today and clear
          up your medical doubts.
        </p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-bold shadow-md hover:bg-blue-50 transition"
        onClick={() => navigate('/book-appointment')}>
          Book Appointment Now
        </button>
      </div>
    </section>
  );
}
