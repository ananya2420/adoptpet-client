"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { IoMdGrid } from "react-icons/io";
import { FiPlusCircle } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

import AddPetPanel from "./add-panel/page";
import MyListing from "./my-listing/page";
import MyRequestsPanel from "./myrequest/page";

const DashboardPage = () => {
  //const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("my-request");

 {/* useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);*/}

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
    <div className="flex min-h-screen bg-white text-gray-900">
      
    
      <aside className="w-64 border-r border-gray-200 bg-gray-50 flex flex-col fixed h-full left-0 top-0 pt-24 z-40">
        
        <div className="px-6 mb-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
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
                    ? "bg-green-600 text-white shadow-md shadow-green-600/20"
                    : "text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>

     
      <main className="flex-1 ml-64 p-8 pt-28 min-h-screen bg-white">
        
       
        {activeTab === "my-request" && <MyRequestsPanel />}
        
        
        {activeTab === "add-pet" && <AddPetPanel />}
        
        {activeTab === "my-listings" && <MyListing />}

      </main>

    </div>
  );
};

export default DashboardPage;