import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Home } from './pages/Home'
import { Routes, Route } from 'react-router-dom';
import BookAppointment from './pages/BookAppointment';
import BookingSucess from './pages/BookingSucess'
import CancelBooking from "./pages/CancelBooking";
import AppointmentLookup from './pages/AppointmentLookup'
import DoctorProfile from './pages/DoctorProfile';
import RescheduleAppointment from './pages/RescheduleAppointment'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/book-appointment" element={<BookAppointment />} />

      <Route path="/booking-success" element={<BookingSucess />} />

      <Route path="/cancel-booking" element={<CancelBooking />} />

      <Route path='/appointment-lookup' element={<AppointmentLookup />} />

      <Route path='/doctor-profile' element={<DoctorProfile/>} />

      <Route path='/reshedule-appointment' element={<RescheduleAppointment />} />
      
    </Routes>
  );
}

export default App
