import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({email: "", password: ""});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
        if(error) setError("");
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        //Mock Authentication flow (ready for real API hook up later)
        setTimeout(() => {
            if(credentials.email === "admin@docbook.com" && credentials.password === "admin123"){
                localStorage.setItem("adminToken", "mock-jwt-string");
                navigate("/admmin/dashboard");
            }else{
                setError("Invalid administrative email or security password");
            }
            setLoading(false);
        }, 800);
    };
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-slate-200">
        {/* portal branding header  */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-3xl mx-auto shadow-md shadow-blue-200">
            🩺
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight pt-2">
            DocBook Control Center
          </h2>
          <p className="text-sm text-slate-500">
            Please authenticate to manage operational assets
          </p>
        </div>

        {/* Dynamic Alert Banner  */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2 animate-shake">
            ⚠️ <span>{error}</span>
          </div>
        )}

        {/* Login Funnel Form  */}
        <form onSubmit={handleLoginSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
              Admin Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              value={credentials.email}
              onChange={handleInputChange}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-900 bg-slate-50 outline-none focus:bg-white focus:ring-2 focus:ring-blue-600 transition"
              placeholder="admin@docbook.com"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-semibol text-slate-600 uppercase tracking-wider">
                Security Password
              </label>
              <a
                href="#forgot"
                className="text-xs font-semibold text-blue-600 hover:text-blue-700"
              >
                Recover Credentials
              </a>
            </div>

            <input
              type="password"
              name="password"
              required
              value={credentials.password}
              onChange={handleInputChange}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-900 bg-slate-50 outline-none focus:bg-white focus:ring-2 focus:ring-blue-600 transition"
              placeholder="......."
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-100 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                    Establishing Session...
                  </svg>
                </>
              ) : (
                "Access Dashboard"
              )}
            </button>
          </div>
        </form>

        {/* Back-door helper text for your initial sandbox testing */}
        <div className='bg-slate-50 border border-dashed border-slate-200 rounded-xl p-3 text-center text-xs text-slate-400'>
            Demo: <span className='font-semibold text-slate-600'>admin@docbook.com</span> / <span className='font-semibold text-slate-600'>admin123</span>
        </div>
      </div>
    </div>
  );
}
