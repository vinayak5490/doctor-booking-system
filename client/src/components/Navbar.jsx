import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-blue-600 flex items-center gap-2">
              🩺 DocBook
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#about"
              className="text-gray-600 hover:text-blue-600 transition"
            >
              About
            </a>
            <a
              href="#services"
              className="text-gray-600 hover:text-blue-600 transition"
            >
              Services
            </a>
            <a
              href="#why-us"
              className="text-gray-600 hover:text-blue-600 transition"
            >
              Why Choose Us
            </a>
            <a
              href="#timings"
              className="text-gray-600 hover:text-blue-600 transition"
            >
              Timings
            </a>
            <button
              className="text-sm font-medium text-gray-600 hover:text-blue-600 transition"
              onClick={() => navigate("/appointment-lookup")}
            >
              Manage Appointment
            </button>

            <button
              className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700 transition shadow-sm"
              onClick={() => navigate("/book-appointment")}
            >
              Book Appointment
            </button>
          </div>
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white border-b px-4 pt-2 pb-4 space-y-2">
          <a href="#about" className="block text-gray-600 py-2">
            About
          </a>
          <a href="#services" className="block text-gray-600 py-2">
            Services
          </a>
          <a href="#why-us" className="block text-gray-600 py-2">
            Why Choose Us
          </a>
          <a href="#timings" className="block text-gray-600 py-2">
            Timings
          </a>
          <button
            className="w-full text-left text-gray-600 py-2"
            onClick={() => {
              navigate("/appointment-lookup");
              setIsOpen(false);
            }}
          >
            Manage Appointment
          </button>
          <button
            className="w-full bg-blue-600 text-white px-5 py-2 rounded-xl font-medium"
            onClick={() => navigate("/book-appointment")}
          >
            Book Appointment
          </button>
        </div>
      )}
    </nav>
  );
}
