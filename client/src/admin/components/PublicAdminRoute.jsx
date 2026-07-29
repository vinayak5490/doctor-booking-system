import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function PublicAdminRoute(){
    const { admin, loading } = useAuth();

    if (loading) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-slate-900 text-white font-semibold">
          Loading...
        </div>
      );
    }

    if(admin){
        return <Navigate to="/admin/dashboard" replace />
    }

    return <Outlet />
}