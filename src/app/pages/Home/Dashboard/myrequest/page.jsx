"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { HiOutlineClipboardList } from "react-icons/hi";
import { FiEye } from "react-icons/fi";

const MyRequestsPanel = () => {
  const router = useRouter();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🛠️ Dynamic Database Fetching
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch("/api/petAdoption");
        if (res.ok) {
          const data = await res.json();
          setRequests(data);
        } else {
          console.error("Failed to load adoption requests.", res.status);
        }
      } catch (error) {
        console.error("Error fetching adoption requests:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  // 🛠️ Dynamic Counters calculation
  const totalRequests = requests.length;
  const pendingRequests = requests.filter(r => r.status?.toLowerCase() === "pending").length;
  const approvedRequests = requests.filter(r => r.status?.toLowerCase() === "approved").length;
  const rejectedRequests = requests.filter(r => r.status?.toLowerCase() === "rejected").length;

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto flex items-center justify-center py-20 text-slate-400 text-sm">
        Loading requests...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fadeIn">
      
      {/* Header Section */}
      <div>
        <span className="text-sm font-medium text-emerald-500 uppercase tracking-wider">
          My Dashboard
        </span>
        <h1 className="text-3xl text-black font-bold tracking-tight text-slate-100 mt-1">
          My Adoption Requests
        </h1>
        <p className="text-slate-400 mt-2 text-sm">
          Track the full status of all your pet adoption submissions here.
        </p>
      </div>

      {/* 🛠️ Dashboard Metric Counter Cards Grid (Matches Picture 1 & 2) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#0f172a] border border-slate-800 p-5 rounded-2xl text-center shadow-md">
          <div className="text-2xl font-bold text-white">{totalRequests}</div>
          <div className="text-xs text-slate-400 mt-1">Total</div>
        </div>
        <div className="bg-[#0f172a] border border-slate-800 p-5 rounded-2xl text-center shadow-md">
          <div className="text-2xl font-bold text-amber-500">{pendingRequests}</div>
          <div className="text-xs text-slate-400 mt-1">Pending</div>
        </div>
        <div className="bg-[#0f172a] border border-slate-800 p-5 rounded-2xl text-center shadow-md">
          <div className="text-2xl font-bold text-emerald-500">{approvedRequests}</div>
          <div className="text-xs text-slate-400 mt-1">Approved</div>
        </div>
        <div className="bg-[#0f172a] border border-slate-800 p-5 rounded-2xl text-center shadow-md">
          <div className="text-2xl font-bold text-rose-500">{rejectedRequests}</div>
          <div className="text-xs text-slate-400 mt-1">Rejected</div>
        </div>
      </div>

      {/* Conditional Content Rendering Block */}
      {requests.length === 0 ? (
        
        /* 🛠️ Unaltered Empty State Box when no requests exist */
        <div className="border border-slate-800 bg-[#090d16]/50 rounded-2xl p-12 flex flex-col items-center justify-center text-center space-y-5 shadow-xl backdrop-blur-sm">
          <div className="p-4 bg-slate-800/50 rounded-2xl text-slate-500 border border-slate-700/50">
            <HiOutlineClipboardList className="text-5xl text-slate-400" />
          </div>
          <div className="space-y-2 max-w-sm">
            <h3 className="text-lg font-semibold text-slate-200">
              Currently, there are no adoption requests to display.
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Take a moment to explore our wide selection of available animals and create your first inquiry.
            </p>
          </div>
          <button 
            onClick={() => router.push("/pets")} 
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm rounded-xl transition shadow-lg shadow-emerald-600/20 active:scale-95"
          >
            Start Pet Search
          </button>
        </div>

      ) : (

        /* 🛠️ Data Table View rendered once entries are present */
        <div className="overflow-x-auto bg-[#090d16]/40 border border-slate-800 rounded-2xl shadow-xl backdrop-blur-sm">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-[#0f172a]/80 text-slate-300 font-semibold text-xs uppercase tracking-wider">
                <th className="p-4">Pet Name</th>
                <th className="p-4">Request Date</th>
                <th className="p-4">Pickup Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 text-slate-200">
              {requests.map((item, index) => (
                <tr key={item.id || index} className="hover:bg-slate-800/20 transition duration-150">
                  <td className="p-4 font-semibold text-slate-100">{item.petName}</td>
                  <td className="p-4 text-slate-400">{item.requestDate || "N/A"}</td>
                  <td className="p-4 text-slate-400">{item.pickupDate}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border capitalize ${
                      item.status?.toLowerCase() === "approved" 
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                        : item.status?.toLowerCase() === "rejected" 
                        ? "bg-rose-500/10 text-rose-400 border-rose-500/20" 
                        : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                    }`}>
                      ● {item.status}
                    </span>
                  </td>
                  <td className="p-4 flex items-center justify-center gap-2">
                    <button 
                      onClick={() => router.push(`/pets`)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-medium transition border border-slate-700/60"
                    >
                      <FiEye /> View
                    </button>
                    {item.status?.toLowerCase() === "pending" && (
                      <button className="px-3 py-1.5 bg-rose-950/40 hover:bg-rose-900 text-rose-400 hover:text-white rounded-xl text-xs font-medium transition border border-rose-900/50">
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};

export default MyRequestsPanel;