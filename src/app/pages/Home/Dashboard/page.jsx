"use client";

import React, { useState } from "react";
import { IoMdGrid } from "react-icons/io";
import { FiPlusCircle } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";



import AddPetPanel from "./add-panel/page";
import MyListing from "./my-listing/page";
import MyRequestsPanel from "./myrequest/page";

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState("my-request");

  const menuItems = [
    {
      id: "my-request",
      label: "My Request",
      icon: <IoMdGrid className="text-lg" />,
    },
    {
      id: "add-pet",
      label: "+Add pets",
      icon: <FiPlusCircle className="text-lg" />,
    },
    {
      id: "my-listings",
      label: "My Listings",
      icon: <FaHeart className="text-lg text-green-500" />, 
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#0f172a] text-white">
      
      {/* 1. LEFT SIDEBAR */}
      <aside className="w-64 border-r border-slate-800 bg-[#090d16] flex flex-col fixed h-full left-0 top-0 pt-24 z-40">
        
        <div className="px-6 mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
          Menu
        </div>

        <nav className="flex-1 px-4 space-y-1.5">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-green-500 text-white shadow-md shadow-green-500/20"
                    : "text-gray-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* 2. RIGHT CONTENT AREA */}
      <main className="flex-1 ml-64 p-8 pt-28 min-h-screen bg-[#0f172a]">
        
        {/* CONDITIONAL RENDERING SELECTOR */}
        {activeTab === "my-request" && <MyRequestsPanel />}
        
        {activeTab === "add-pet" && <AddPetPanel />}
        
        {activeTab === "my-listings" && <MyListing />}

      </main>

    </div>
  );
};

export default DashboardPage;