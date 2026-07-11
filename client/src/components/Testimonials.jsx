import React from "react";

export default function Testimonials() {
  const reviews = [
    {
      name: "Sarah Jenkins",
      role: "Patient",
      comment:
        "Dr. Sterling took the time to completely listen to my issues. The scheduling app was incredibly seamless!",
    },
    {
      name: "Marcus Vance",
      role: "Patient",
      comment:
        "Extremely clean clinic environment and zero wait times. Highly recommended primary consultation choice.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 mb-12">
        <h2 className="text-3xl font-bold text-gray-900">
          What Our Patients Say
        </h2>
      </div>
      <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-8">
        {reviews.map((rev, idx) => (
          <div
            key={idx}
            className="bg-gray-50 p-8 rounded-2xl relative border border-gray-100"
          >
            <p className="text-gray-600 italic mb-6">"{rev.comment}"</p>
            <div>
              <h4 className="font-bold text-gray-900">{rev.name}</h4>
              <p className="text-xs text-blue-600">{rev.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
