import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-4">
          <span className="text-xl font-bold text-white flex items-center gap-2">
            🩺 DocBook
          </span>
          <p className="text-sm">
            Modern healthcare appointment channels tailored seamlessly around
            busy everyday lifestyles.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#about" className="hover:text-white transition">
                About
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-white transition">
                Services
              </a>
            </li>
            <li>
              <a href="#timings" className="hover:text-white transition">
                Timings
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Contact Info</h4>
          <p className="text-sm">📍 123 Healthcare Blvd, Medical Suite 4B</p>
          <p className="text-sm">📞 +1 (555) 019-2834</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs mt-12 pt-6 border-t border-gray-800">
        &copy; {new Date().getFullYear()} DocBook. All rights reserved.
      </div>
    </footer>
  );
}
