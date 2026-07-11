import React from "react";

export default function Timings() {
  const schedule = [
    { day: "Monday - Friday", time: "08:00 AM - 07:00 PM", status: "Open" },
    { day: "Saturday", time: "09:00 AM - 04:00 PM", status: "Open" },
    {
      day: "Sunday",
      time: "Emergency Calls Only",
      status: "Closed",
      closed: true,
    },
  ];

  return (
    <section id="timings" className="py-20 bg-gray-50">
      <div className="max-w-md mx-auto px-4 sm:px-6 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <div className="text-center space-y-2 mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Clinic Timings</h3>
          <p className="text-sm text-gray-500">
            Plan your clinic or digital checkup visits
          </p>
        </div>
        <div className="space-y-4">
          {schedule.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0"
            >
              <div>
                <p className="font-medium text-gray-900">{item.day}</p>
                <p className="text-sm text-gray-500">{item.time}</p>
              </div>
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full ${item.closed ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
