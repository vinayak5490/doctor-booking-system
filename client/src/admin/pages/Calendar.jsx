import React, { useState } from "react";

export default function Calendar() {
  // Focus timeframe state - Hardcoded to July 2026 to align with mock datasets
  const [currentYear] = useState(2026);
  const [currentMonth] = useState(6); // 0-indexed: 6 is July
  const [selectedDateStr, setSelectedDateStr] = useState("2026-07-16");

  // Mock global multi-day appointment dataset
  const appointmentsDb = {
    "2026-07-12": [
      {
        id: "APT-1001",
        name: "John Doe",
        time: "10:30 AM",
        status: "Confirmed",
      },
    ],
    "2026-07-16": [
      {
        id: "APT-1021",
        name: "John Doe",
        time: "10:30 AM",
        status: "Confirmed",
      },
      {
        id: "APT-1022",
        name: "Rahul Sharma",
        time: "11:00 AM",
        status: "Pending",
      },
    ],
    "2026-07-17": [
      {
        id: "APT-1023",
        name: "Priya Rao",
        time: "12:30 PM",
        status: "Confirmed",
      },
    ],
    "2026-07-18": [
      {
        id: "APT-1024",
        name: "Amit Verma",
        time: "04:30 PM",
        status: "Completed",
      },
    ],
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysOfWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  // Helper logic to programmatically compile standard Gregorian calendar matrices
  const getDaysInMonth = (year, month) =>
    new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => {
    // Adjusting so 0 represents Monday, 6 represents Sunday
    let day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
  };

  const totalDays = getDaysInMonth(currentYear, currentMonth);
  const blankInitialSlots = getFirstDayOfMonth(currentYear, currentMonth);

  // Compile individual calendar square cells array
  const calendarCells = [];
  for (let i = 0; i < blankInitialSlots; i++) {
    calendarCells.push(null);
  }
  for (let day = 1; day <= totalDays; day++) {
    calendarCells.push(day);
  }

  // Active contextual schedule extractor
  const activeDayAppointments = appointmentsDb[selectedDateStr] || [];

  const handleDateClick = (day) => {
    if (!day) return;
    const formattedDate = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    setSelectedDateStr(formattedDate);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Title Header Section */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Calendar Scheduler
        </h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Track clinical availability blocks and localized appointment clusters
          chronologically.
        </p>
      </div>

      {/* Main Grid Layout Partition */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Side: The Interactive Monthly Matrix grid panel (2/3 Width) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">
              {monthNames[currentMonth]} {currentYear}
            </h2>
            <div className="text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
              UTC Time Matrix
            </div>
          </div>

          {/* Core Calendar Rendering Grid */}
          <div>
            {/* Weekday headers layout row */}
            <div className="grid grid-cols-7 gap-1 text-center mb-2">
              {daysOfWeek.map((day) => (
                <div
                  key={day}
                  className="text-xs font-bold text-slate-400 py-1 uppercase tracking-wider"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Individual calendar matrix block square units */}
            <div className="grid grid-cols-7 gap-2">
              {calendarCells.map((day, index) => {
                if (day === null)
                  return (
                    <div
                      key={`empty-${index}`}
                      className="bg-transparent aspect-square"
                    />
                  );

                const tileDateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                const hasAppointments = !!appointmentsDb[tileDateStr];
                const isSelected = selectedDateStr === tileDateStr;

                return (
                  <button
                    key={`day-${day}`}
                    onClick={() => handleDateClick(day)}
                    className={`aspect-square rounded-xl text-sm font-bold flex flex-col items-center justify-between p-2 border transition relative ${
                      isSelected
                        ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-100"
                        : "bg-slate-50 text-slate-700 border-slate-200/60 hover:bg-slate-200/50"
                    }`}
                  >
                    <span>{day}</span>
                    {hasAppointments && (
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isSelected ? "bg-white" : "bg-blue-600"
                        }`}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Contextual Focus Schedule Output Box (1/3 Width) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4 flex flex-col self-stretch">
          <div>
            <h3 className="font-bold text-slate-900 text-base">
              Agenda Overview
            </h3>
            <p className="text-xs text-slate-400">
              Sessions queued for{" "}
              <span className="font-semibold text-slate-600 font-mono">
                {selectedDateStr}
              </span>
            </p>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto max-h-[320px] pr-1">
            {activeDayAppointments.length > 0 ? (
              activeDayAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className="bg-slate-50 border border-slate-100 rounded-xl p-3 space-y-2"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-bold text-blue-600 block">
                        {apt.time}
                      </span>
                      <span className="text-sm font-bold text-slate-800">
                        {apt.name}
                      </span>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        apt.status === "Confirmed"
                          ? "bg-green-100 text-green-700"
                          : apt.status === "Completed"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {apt.status}
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 font-semibold">
                    Ref: {apt.id}
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 text-slate-400">
                <span className="text-2xl mb-1">🍃</span>
                <p className="text-xs font-medium">
                  No consultations registered on this date calendar slot.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
