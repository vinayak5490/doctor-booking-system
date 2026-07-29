import React from 'react'
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

export default function ProtectAdminRoute() {
  const { admin, loading } = useAuth();

  // 1. Show a loading screen while checking cookie validity on /api/auth/me
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900 text-white font-semibold">
        Verifying session...
      </div>
    );
  }

  //2. If no admin session exists, redirect to login
  if(!admin){
    return <Navigate to="/admin/login"  replace/>
  }
  return <Outlet />;
}
