import React from "react";
// 1. Import the image correctly from your assets folder
import heroIllustration from "../assets/images/hospital-service-concept-flat-illustration.png";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-indigo-50 py-20 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
            Your Health, Our Priority
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
            Your Journey to Better <span className="text-blue-600">Health</span>{" "}
            Starts Here
          </h1>
          <p className="text-lg text-gray-600 max-w-md">
            Access world-class medical expertise and personalized healthcare
            standard safely from your home or clinic visits.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 shadow-md hover:shadow-lg transition">
              Book Appointment
            </button>
            <button className="bg-white text-gray-700 border border-gray-300 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition">
              Explore Services
            </button>
          </div>
        </div>

        <div className="relative flex justify-center">
          <div className="w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-blue-600/10 absolute -z-10 blur-3xl"></div>
          {/* 2. Remove the rigid gray placeholder styles so your beautiful illustration fits perfectly */}
          <div className="w-full max-w-md object-contain">
            <img
              src={heroIllustration}
              alt="Doctor consulting patient illustration"
              className="w-full h-auto drop-shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
