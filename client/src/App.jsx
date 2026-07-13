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

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/book-appointment" element={<BookAppointment />} />

      <Route path="/booking-success" element={<BookingSucess />} />

      <Route path="/cancel-booking" element={<CancelBooking />} />
    </Routes>
  );
}

export default App
