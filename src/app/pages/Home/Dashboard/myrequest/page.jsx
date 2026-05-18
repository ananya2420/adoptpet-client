"use client";

import React from "react";
import { HiOutlineClipboardList } from "react-icons/hi";

const MyRequestsPanel = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fadeIn">
      
      {/* Header Section (Rephrased) */}
      <div>
        <span className="text-sm font-medium text-emerald-500 uppercase tracking-wider">
          My Dashboard
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-slate-100 mt-1">
          My Adoption Requests
        </h1>
        <p className="text-slate-400 mt-2 text-sm">
          Track the full status of all your pet adoption submissions here.
        </p>
      </div>

      {/* Empty State Box (Rephrased + Clean Green Button) */}
      <div className="border border-slate-800 bg-[#090d16]/50 rounded-2xl p-12 flex flex-col items-center justify-center text-center space-y-5 shadow-xl backdrop-blur-sm">
        
        {/* Clipboard Empty Icon */}
        <div className="p-4 bg-slate-800/50 rounded-2xl text-slate-500 border border-slate-700/50">
          <HiOutlineClipboardList className="text-5xl text-slate-400" />
        </div>

        {/* Message Details */}
        <div className="space-y-2 max-w-sm">
          <h3 className="text-lg font-semibold text-slate-200">
            Currently, there are no adoption requests to display.
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Take a moment to explore our wide selection of available animals and create your first inquiry.
          </p>
        </div>

        {/* Green Action Button */}
        <button className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm rounded-xl transition shadow-lg shadow-emerald-600/20 active:scale-95">
          Start Pet Search
        </button>

      </div>

    </div>
  );
};

export default MyRequestsPanel;