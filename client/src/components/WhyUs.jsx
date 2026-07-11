import React from "react";

export default function WhyUs() {
  const points = [
    {
      label: "Certified Specialists",
      text: "All doctors hold certifications with extensive modern clinical experience.",
    },
    {
      label: "Modern Infrastructure",
      text: "Equipped with the latest medical diagnostics and advanced laboratory assets.",
    },
    {
      label: "Emergency Support",
      text: "Get immediate support desk routing for critical health developments.",
    },
  ];

  return (
    <section id="why-us" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Why Choose Our Clinic?
          </h2>
          <p className="text-gray-600">
            We place patient care and frictionless communication at the core of
            our operations.
          </p>
          <div className="space-y-4">
            {points.map((pt, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full text-blue-600 flex items-center justify-center font-bold text-sm">
                  ✓
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{pt.label}</h4>
                  <p className="text-gray-600 text-sm">{pt.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="h-80 bg-gradient-to-br from-indigo-50 to-blue-100 rounded-2xl flex items-center justify-center text-gray-400">
          [Clinic Feature Visual]
        </div>
      </div>
    </section>
  );
}
