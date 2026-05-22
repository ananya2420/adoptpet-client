"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // 🛠️ Added for smooth SPA routing redirects
import { FiHeart, FiCheckCircle } from "react-icons/fi";

const AdoptionForm = ({ petName: initialPetName }) => {
  const router = useRouter(); // 🛠️ Initialized router instance
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // 🛠️ Added loading track flag
  const [submitError, setSubmitError] = useState("");

  const [typedPetName, setTypedPetName] = useState(initialPetName || "");
  const [typedUserName, setTypedUserName] = useState("");
  const [typedUserEmail, setTypedUserEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    
    // 🛠️ Generates formatted current system timestamp matching your mockup ("May 16, 2026")
    const formattedRequestDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    // 🛠️ Formats user selected pickup target date string cleanly to standard format ("May 20, 2026")
    const rawPickupDate = formData.get("pickupDate");
    const formattedPickupDate = rawPickupDate 
      ? new Date(rawPickupDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "";

    // Application Payload Config Struct
    const applicationPayload = {
      petName: typedPetName,
      userName: typedUserName,
      userEmail: typedUserEmail,
      requestDate: formattedRequestDate, // 🛠️ Added request date string injection
      pickupDate: formattedPickupDate,   // 🛠️ Passed the cleaner form date layout
      message: formData.get("message"),
      status: "pending",                 // 👈 Explicit pending flag matching your screenshot requirements
    };

    try {
      setSubmitError("");
      const response = await fetch("/api/petAdoption", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(applicationPayload),
      });

      if (response.ok) {
        console.log("Processing Request Payload Success:", applicationPayload);
        setShowToast(true);
        setIsSubmitted(true);

        setTimeout(() => {
          setShowToast(false);
        }, 4000);
      } else {
        const errorBody = await response.text();
        console.error("Server responded with an error status code.", response.status, errorBody);
        setSubmitError("Unable to submit your request right now. Please try again in a moment.");
      }
    } catch (error) {
      console.error("Network error submitting adoption form data pipeline:", error);
      setSubmitError("A network error occurred while submitting your request. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-full">
      {showToast && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-emerald-950/95 border border-emerald-800 text-emerald-200 px-5 py-3.5 rounded-2xl shadow-xl animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-emerald-950 font-bold">
            ✓
          </div>
          <div className="text-black sm:text-sm font-medium">
            Adoption request submitted! The owner will review it soon. 🐾
          </div>
          <button 
            onClick={() => setShowToast(false)} 
            className="ml-2 text-emerald-400 hover:text-white text-xs font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {submitError && (
        <div className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {submitError}
        </div>
      )}

      {!isSubmitted ? (
        <aside className="w-full bg-white border border-gray-200 rounded-3xl shadow-sm p-6 lg:p-7">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <FiHeart className="text-green-600 fill-green-600 text-lg" /> Request to Adopt {typedPetName || "Buddy"}
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Fill out this form and the owner will review your request.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">Pet Name</label>
              <input
                type="text"
                required
                value={typedPetName}
                onChange={(e) => setTypedPetName(e.target.value)}
                placeholder="Enter the pet's name..."
                className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-800 font-medium placeholder-gray-400 focus:border-green-500 transition-colors duration-150 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">Your Name</label>
              <input
                type="text"
                required
                value={typedUserName}
                onChange={(e) => setTypedUserName(e.target.value)}
                placeholder="Enter your full name..."
                className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-800 font-medium placeholder-gray-400 focus:border-green-500 transition-colors duration-150 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">Your Email</label>
              <input
                type="email"
                required
                value={typedUserEmail}
                onChange={(e) => setTypedUserEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-800 font-medium placeholder-gray-400 focus:border-green-500 transition-colors duration-150 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">Preferred Pickup Date</label>
              <input
                type="date"
                required
                name="pickupDate"
                className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-800 font-medium focus:border-green-500 transition-colors duration-150 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5">Message to Owner</label>
              <textarea
                rows={4}
                required
                name="message"
                placeholder={`Tell the owner why you'd be a great match for ${typedPetName || "this pet"}...`}
                className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-800 font-medium placeholder-gray-400 focus:border-green-500 transition-colors duration-150 outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-3.5 px-6 text-sm font-bold bg-green-600 hover:bg-green-500 text-white rounded-xl shadow-sm transition-all duration-200 text-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting Request..." : `Adopt ${typedPetName || "Buddy"} 🐾`}
            </button>
          </form>
        </aside>
      ) : (
        <aside className="w-full bg-white border border-gray-200 rounded-3xl shadow-sm p-8 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-300">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-50 text-green-500 mb-5 border border-green-100">
            <FiCheckCircle className="text-3xl stroke-[2.5]" />
          </div>

          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Request Submitted!</h2>
          <p className="text-sm text-gray-500 max-w-sm mt-3 leading-relaxed">
            Your adoption request for <span className="font-bold text-gray-800">{typedPetName}</span> has been successfully sent to the owner. You can track its status under your personal dashboard area.
          </p>

          <button 
            onClick={() => router.push("/pages/Home/Dashboard")} // 🛠️ Changed to router push execution configuration layout
            className="mt-8 px-6 py-3 text-xs font-bold uppercase tracking-wider bg-gray-900 hover:bg-gray-800 text-white rounded-xl shadow-md transition-all active:scale-98"
          >
            View My Requests
          </button>
        </aside>
      )}
    </div>
  );
};

export default AdoptionForm;