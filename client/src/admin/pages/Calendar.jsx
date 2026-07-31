import React, { useState, useEffect, useCallback } from "react";

export default function Calendar() {
  const today = new Date();
  
  // Dynamic Month & Year Navigation State
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth()); // 0-indexed
  const [selectedDateStr, setSelectedDateStr] = useState(
    today.toISOString().split("T")[0]
  );

  // Dynamic Data & API States
  const [appointmentsDb, setAppointmentsDb] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysOfWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  // Helper logic to programmatically compile standard Gregorian calendar matrices
  const getDaysInMonth = (year, month) =>
    new Date(year, month + 1, 0).getDate();

  const getFirstDayOfMonth = (year, month) => {
    // 0 represents Monday, 6 represents Sunday
    let day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
  };

  // Fetch appointments for the selected month/year window from Express API
  const fetchMonthAppointments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch appointments for the active month view
      const response = await fetch(
        `/api/appointments?year=${currentYear}&month=${currentMonth + 1}`
      );
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch calendar entries");
      }

      // Format response array into a date-keyed dictionary map: { "YYYY-MM-DD": [apt1, apt2] }
      const rawList = result.data || result.date || [];
      const mappedDb = rawList.reduce((acc, item) => {
        const formattedKey = new Date(item.date).toISOString().split("T")[0];
        if (!acc[formattedKey]) {
          acc[formattedKey] = [];
        }
        acc[formattedKey].push({
          id: item._id,
          bookingId: item.bookingId || item._id,
          name: item.patientName,
          phone: item.phone,
          time: item.slot || item.time,
          status: item.status,
        });
        return acc;
      }, {});

      setAppointmentsDb(mappedDb);
    } catch (err) {
      setError(err.message);
    }finally{
      setLoading(false);
    }
  }, [currentYear, currentMonth]);

  useEffect(() => {
    fetchMonthAppointments();
  }, [fetchMonthAppointments]);

  // Month navigation handlers
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const handleTodayReset = () => {
    const now = new Date();
    setCurrentYear(now.getFullYear());
    setCurrentMonth(now.getMonth());
    setSelectedDateStr(now.toISOString().split("T")[0]);
  };

  // Handle live status updates directly from the agenda panel
  const handleStatusUpdate = async (mongoId, newStatus) => {
    try {
      const response = await fetch(`/api/appointments/${mongoId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Failed to update appointment status");
        return;
      }

      // Optimistically update local state dictionary
      setAppointmentsDb((prevDb) => {
        const updatedDateList = (prevDb[selectedDateStr] || []).map((apt) =>
          apt.id === mongoId ? { ...apt, status: newStatus } : apt
        );
        return { ...prevDb, [selectedDateStr]: updatedDateList };
      });
    } catch (err) {
      alert(`Error updating status: ${err.message}`);
    }
  };

  // Compile calendar grid matrix
  const totalDays = getDaysInMonth(currentYear, currentMonth);
  const blankInitialSlots = getFirstDayOfMonth(currentYear, currentMonth);

  const calendarCells = [];
  for (let i = 0; i < blankInitialSlots; i++) {
    calendarCells.push(null);
  }
  for (let day = 1; day <= totalDays; day++) {
    calendarCells.push(day);
  }

  const activeDayAppointments = appointmentsDb[selectedDateStr] || [];
  const todayStr = today.toISOString().split("T")[0];

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
        {/* Left Side: Interactive Monthly Matrix grid panel (2/3 Width) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
          {/* Calendar Month Header & Navigation */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold text-slate-900">
                {monthNames[currentMonth]} {currentYear}
              </h2>
              <button
                onClick={handleTodayReset}
                className="text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg transition"
              >
                Today
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrevMonth}
                className="p-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 transition"
                aria-label="Previous Month"
              >
                ◀
              </button>
              <button
                onClick={handleNextMonth}
                className="p-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 transition"
                aria-label="Next Month"
              >
                ▶
              </button>
            </div>
          </div>

          {/* Core Calendar Matrix Grid */}
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

            {loading ? (
              <div className="py-20 text-center text-sm text-slate-400 font-medium">
                Loading schedule...
              </div>
            ) : error ? (
              <div className="py-20 text-center text-sm text-red-500 font-medium">
                {error}
              </div>
            ) : (
              /* Individual calendar matrix block square units */
              <div className="grid grid-cols-7 gap-2">
                {calendarCells.map((day, index) => {
                  if (day === null)
                    return (
                      <div
                        key={`empty-${index}`}
                        className="bg-transparent aspect-square"
                      />
                    );

                  const tileDateStr = `${currentYear}-${String(
                    currentMonth + 1
                  ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

                  const dayAppointments = appointmentsDb[tileDateStr] || [];
                  const hasAppointments = dayAppointments.length > 0;
                  const isSelected = selectedDateStr === tileDateStr;
                  const isToday = todayStr === tileDateStr;

                  return (
                    <button
                      key={`day-${day}`}
                      onClick={() => setSelectedDateStr(tileDateStr)}
                      className={`aspect-square rounded-xl text-sm font-bold flex flex-col items-center justify-between p-2 border transition relative ${
                        isSelected
                          ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-100"
                          : isToday
                          ? "bg-blue-50 text-blue-700 border-blue-300"
                          : "bg-slate-50 text-slate-700 border-slate-200/60 hover:bg-slate-200/50"
                      }`}
                    >
                      <span className="flex items-center justify-between w-full">
                        <span>{day}</span>
                        {hasAppointments && (
                          <span
                            className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                              isSelected
                                ? "bg-white text-blue-600"
                                : "bg-blue-600 text-white"
                            }`}
                          >
                            {dayAppointments.length}
                          </span>
                        )}
                      </span>

                      {/* Small visual dot marker */}
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
            )}
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

          <div className="flex-1 space-y-3 overflow-y-auto max-h-[380px] pr-1">
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
                      {apt.phone && (
                        <div className="text-xs text-slate-400">
                          {apt.phone}
                        </div>
                      )}
                    </div>

                    {/* Interactive status selector */}
                    <select
                      value={apt.status}
                      onChange={(e) =>
                        handleStatusUpdate(apt.id, e.target.value)
                      }
                      className={`text-[11px] font-bold px-2 py-1 rounded-lg border outline-none cursor-pointer transition ${
                        apt.status === "Confirmed"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : apt.status === "Completed"
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : apt.status === "Cancelled"
                          ? "bg-red-50 text-red-700 border-red-200"
                          : "bg-yellow-50 text-yellow-700 border-yellow-200"
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 font-semibold">
                    Ref: {apt.bookingId}
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