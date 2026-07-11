import React from "react";

export default function Services() {
  const services = [
    {
      title: "General Consultation",
      desc: "Comprehensive medical check-ups, diagnostics, and customized treatment pathways.",
      icon: "🩺",
    },
    {
      title: "Cardiology Care",
      desc: "Advanced screening, ECG monitoring, and long-term cardiac wellness management.",
      icon: "❤️",
    },
    {
      title: "Pediatric Care",
      desc: "Attentive, gentle care focusing on growth tracking and routine child immunizations.",
      icon: "👶",
    },
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 mb-12">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Our Medical Services
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Providing reliable, specialist primary care to ensure you stay
          healthy.
        </p>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition border border-gray-100 group"
          >
            <span className="text-4xl block mb-4 group-hover:scale-110 transition duration-300">
              {item.icon}
            </span>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {item.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
