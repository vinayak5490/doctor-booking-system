import React from "react";

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
        <div className="h-96 bg-gray-100 rounded-2xl overflow-hidden flex items-center justify-center text-gray-400 shadow-inner">
          [Doctor Portrait]
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Meet Dr. Alexandra Sterling
          </h2>
          <p className="text-blue-600 font-medium">
            Senior Cardiologist & General Physician (MD, FACC)
          </p>
          <p className="text-gray-600 leading-relaxed">
            With over 14 years of clinical experience, Dr. Sterling specializes
            in compassionate patient care, preventative medicine, and
            comprehensive health management plans tailored specifically to your
            lifestyle needs.
          </p>
          <div className="grid grid-cols-2 gap-6 pt-4">
            <div className="border-l-4 border-blue-600 pl-4">
              <h4 className="text-2xl font-bold text-gray-900">15k+</h4>
              <p className="text-sm text-gray-500">Happy Patients</p>
            </div>
            <div className="border-l-4 border-blue-600 pl-4">
              <h4 className="text-2xl font-bold text-gray-900">99.2%</h4>
              <p className="text-sm text-gray-500">Success Rate</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
