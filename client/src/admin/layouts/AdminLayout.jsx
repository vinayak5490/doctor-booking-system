import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function AdminLayout() {
  return (
    <div className="flex h-screen w-screen bg-slate-100 font-sans overflow-hidde">
      {/* Structural Sidebar Panel */}
      <Sidebar />

      {/* Main Structural Right Workspace Content Loop */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Global Dashboard Sticky Action Bar */}
        <Header />

        {/* Dynamic Inner Outlet Wrapper Box */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
