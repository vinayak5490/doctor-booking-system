import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import { Home } from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import BookAppointment from "./pages/BookAppointment";
import BookingSucess from "./pages/BookingSucess";
import CancelBooking from "./pages/CancelBooking";
import AppointmentLookup from "./pages/AppointmentLookup";
import DoctorProfile from "./pages/DoctorProfile";
import RescheduleAppointment from "./pages/RescheduleAppointment";

// Admin Views & Layout Layouts
import AdminLayout from "./admin/layouts/AdminLayout";
import Login from "./admin/pages/Login";
import Dashboard from "./admin/pages/Dashboard";
import Appointments from "./admin/pages/Appointments";
import Calendar from "./admin/pages/Calendar";
import Patients from "./admin/pages/Patients";
import AdminDoctorProfile from "./admin/pages/AdminDoctorProfile";
import Settings from "./admin/pages/Settings";

//react-toaster
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster 
      position="top-right"
      reverseOrder={false}
       />
      <Routes>
        {/* Patient Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/doctor-profile" element={<DoctorProfile />} />
        <Route path="/book-appointment" element={<BookAppointment />} />
        <Route path="/booking-success" element={<BookingSucess />} />
        <Route path="/appointment-lookup" element={<AppointmentLookup />} />
        <Route path="/cancel-booking" element={<CancelBooking />} />
        <Route
          path="/reschedule-appointment"
          element={<RescheduleAppointment />}
        />

        {/* Admin Routes - Bound with Shared Admin Layout */}
        <Route path="/admin/login" element={<Login />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="patients" element={<Patients />} />
          <Route path="profile" element={<AdminDoctorProfile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
