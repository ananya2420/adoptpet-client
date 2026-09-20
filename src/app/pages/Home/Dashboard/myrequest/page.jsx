"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { HiOutlineClipboardList } from "react-icons/hi";
import { FiEye, FiXCircle } from "react-icons/fi";

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
  const pendingRequests = requests.filter(
    (r) => r.status?.toLowerCase() === "pending"
  ).length;
  const approvedRequests = requests.filter(
    (r) => r.status?.toLowerCase() === "approved"
  ).length;
  const rejectedRequests = requests.filter(
    (r) => r.status?.toLowerCase() === "rejected"
  ).length;

  // 🛠️ Skeleton Loading State for Better UX Feedback
  if (loading) {
    return (
      <div className="max-w-5xl mx-auto space-y-6 animate-pulse p-4 sm:p-0">
        <div className="space-y-3">
          <div className="h-4 w-28 bg-slate-800 rounded-md"></div>
          <div className="h-8 w-64 bg-slate-800 rounded-lg"></div>
          <div className="h-4 w-96 bg-slate-800/60 rounded-md"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-[#0f172a] border border-slate-800/80 p-5 rounded-2xl h-24"
            ></div>
          ))}
        </div>
        <div className="bg-[#090d16]/40 border border-slate-800 h-64 rounded-2xl"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8 animate-fadeIn p-4 sm:p-0">
      {/* Header Section */}
      <div className="space-y-1.5">
        <span className="text-xs sm:text-sm font-semibold text-emerald-500 uppercase tracking-wider block">
          My Dashboard
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-black-100">
          My Adoption Requests
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm max-w-xl leading-relaxed">
          Track the full status of all your pet adoption submissions here.
        </p>
      </div>

      {/* 🛠️ Dashboard Metric Counter Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-[#0f172a] border border-slate-800 p-4 sm:p-5 rounded-2xl text-center shadow-sm hover:border-slate-700 transition duration-200">
          <div className="text-xl sm:text-2xl font-bold text-slate-100">
            {totalRequests}
          </div>
          <div className="text-xs font-medium text-slate-400 mt-1">Total</div>
        </div>
        <div className="bg-[#0f172a] border border-slate-800 p-4 sm:p-5 rounded-2xl text-center shadow-sm hover:border-slate-700 transition duration-200">
          <div className="text-xl sm:text-2xl font-bold text-amber-500">
            {pendingRequests}
          </div>
          <div className="text-xs font-medium text-slate-400 mt-1">Pending</div>
        </div>
        <div className="bg-[#0f172a] border border-slate-800 p-4 sm:p-5 rounded-2xl text-center shadow-sm hover:border-slate-700 transition duration-200">
          <div className="text-xl sm:text-2xl font-bold text-emerald-500">
            {approvedRequests}
          </div>
          <div className="text-xs font-medium text-slate-400 mt-1">Approved</div>
        </div>
        <div className="bg-[#0f172a] border border-slate-800 p-4 sm:p-5 rounded-2xl text-center shadow-sm hover:border-slate-700 transition duration-200">
          <div className="text-xl sm:text-2xl font-bold text-rose-500">
            {rejectedRequests}
          </div>
          <div className="text-xs font-medium text-slate-400 mt-1">Rejected</div>
        </div>
      </div>

      {/* Conditional Content Rendering Block */}
      {requests.length === 0 ? (
        /* 🛠️ Unaltered Empty State Box when no requests exist */
        <div className="border border-slate-800 bg-[#090d16]/50 rounded-2xl p-8 sm:p-12 flex flex-col items-center justify-center text-center space-y-5 shadow-xl backdrop-blur-sm">
          <div className="p-4 bg-slate-800/50 rounded-2xl text-slate-400 border border-slate-700/50">
            <HiOutlineClipboardList className="text-4xl sm:text-5xl" />
          </div>
          <div className="space-y-2 max-w-sm">
            <h3 className="text-base sm:text-lg font-semibold text-slate-200">
              Currently, there are no adoption requests to display.
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Take a moment to explore our wide selection of available animals and create your first inquiry.
            </p>
          </div>
          <button
            onClick={() => router.push("/pets")}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-medium text-sm rounded-xl transition-all shadow-lg shadow-emerald-600/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            Start Pet Search
          </button>
        </div>
      ) : (
        /* 🛠️ Data Table & Mobile Responsive View */
        <div className="bg-[#090d16]/40 border border-slate-800 rounded-2xl shadow-xl backdrop-blur-sm overflow-hidden">
          
          {/* Desktop Table View */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-[#0f172a]/80 text-slate-300 font-semibold text-xs uppercase tracking-wider">
                  <th scope="col" className="p-4">Pet Name</th>
                  <th scope="col" className="p-4">Request Date</th>
                  <th scope="col" className="p-4">Pickup Date</th>
                  <th scope="col" className="p-4">Status</th>
                  <th scope="col" className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 text-slate-200">
                {requests.map((item, index) => {
                  const statusLower = item.status?.toLowerCase();
                  return (
                    <tr
                      key={item.id || index}
                      className="hover:bg-slate-800/30 transition duration-150"
                    >
                      <td className="p-4 font-semibold text-slate-100">
                        {item.petName}
                      </td>
                      <td className="p-4 text-slate-400">
                        {item.requestDate || "N/A"}
                      </td>
                      <td className="p-4 text-slate-400">{item.pickupDate}</td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border capitalize ${
                            statusLower === "approved"
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                              : statusLower === "rejected"
                              ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                              : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                          }`}
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-current" />
                          {item.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => router.push(`/pets`)}
                            aria-label={`View details for ${item.petName}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 rounded-xl text-xs font-medium transition border border-slate-700/60 focus-visible:ring-2 focus-visible:ring-slate-500"
                          >
                            <FiEye className="text-slate-400" /> View
                          </button>
                          {statusLower === "pending" && (
                            <button
                              aria-label={`Cancel request for ${item.petName}`}
                              className="inline-flex items-center gap-1 px-3 py-1.5 bg-rose-950/40 hover:bg-rose-900 active:scale-95 text-rose-400 hover:text-white rounded-xl text-xs font-medium transition border border-rose-900/50 focus-visible:ring-2 focus-visible:ring-rose-500"
                            >
                              <FiXCircle className="text-xs" /> Cancel
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Layout (Better Responsiveness for Mobile Screens) */}
          <div className="sm:hidden divide-y divide-slate-800/60">
            {requests.map((item, index) => {
              const statusLower = item.status?.toLowerCase();
              return (
                <div key={item.id || index} className="p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-slate-100 text-base">
                        {item.petName}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Req Date: {item.requestDate || "N/A"}
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border capitalize ${
                        statusLower === "approved"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : statusLower === "rejected"
                          ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                          : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                      }`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {item.status}
                    </span>
                  </div>

                  <div className="text-xs text-slate-400">
                    <span className="text-slate-500">Pickup Date:</span>{" "}
                    {item.pickupDate}
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => router.push(`/pets`)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-medium transition border border-slate-700/60"
                    >
                      <FiEye /> View Details
                    </button>
                    {statusLower === "pending" && (
                      <button className="inline-flex items-center justify-center gap-1 px-3 py-2 bg-rose-950/40 hover:bg-rose-900 text-rose-400 hover:text-white rounded-xl text-xs font-medium transition border border-rose-900/50">
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}
    </div>
  );
};

export default MyRequestsPanel;