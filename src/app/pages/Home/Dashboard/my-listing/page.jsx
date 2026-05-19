"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiEye, FiEdit2, FiUsers, FiTrash2, FiPlus, FiX, FiCheckCircle } from "react-icons/fi";

const MyListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal & Toast State Control Framework
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  // State for Custom Delete Confirmation Modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [petToDelete, setPetToDelete] = useState(null);

  // 🌟 GLOBAL TRACKER: Tracks if ANY card on the entire dashboard has been approved or rejected
  const [isGlobalActionFinalized, setIsGlobalActionFinalized] = useState(false);

  // Fetch pet datasets uploaded by users
  useEffect(() => {
    const fetchMyPets = async () => {
      try {
        const res = await fetch("http://localhost:5000/pet");
        const data = await res.json();
        setListings(data);
        
        // If your database already has an approved/rejected pet, lock buttons on load
        const hasExistingFinalizedAction = data.some(
          (pet) => pet.requestStatus === "Approved" || pet.requestStatus === "Rejected"
        );
        if (hasExistingFinalizedAction) {
          setIsGlobalActionFinalized(true);
        }
      } catch (error) {
        console.error("Error retrieving pet listings data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyPets();
  }, []);

  // Compute metric panels dynamically based on pet availability conditions
  const totalListings = listings.length;
  const availableCount = listings.filter((p) => p.healthStatus !== "Adopted").length; 
  const adoptedCount = listings.filter((p) => p.healthStatus === "Adopted").length;

  // Trigger temporary floating system notifications 
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 4000);
  };

  // Triggers the custom confirmation modal instead of standard confirm browser popups
  const openDeleteConfirmation = (pet) => {
    setPetToDelete(pet);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteAction = async () => {
    if (!petToDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/pet/${petToDelete._id}`, { method: "DELETE" });
      if (res.ok) {
        // String conversion normalization ensures React captures state updates accurately
        setListings(listings.filter((item) => String(item._id) !== String(petToDelete._id)));
        showToast("Pet listing deleted successfully.");
      }
    } catch (err) {
      console.error("Failed to delete record:", err);
    } finally {
      setIsDeleteModalOpen(false);
      setPetToDelete(null);
    }
  };

  // Process operational modifications on sub-requests status
  const handleUpdateRequestStatus = (petId, status) => {
    const updatedListings = listings.map((pet) => {
      if (pet._id === petId) {
        return { 
          ...pet, 
          requestStatus: status,
          healthStatus: status === "Approved" ? "Adopted" : pet.healthStatus 
        };
      }
      return pet;
    });

    setListings(updatedListings);

    // Sync active modal selection image attributes
    const updatedCurrentPet = updatedListings.find(p => p._id === petId);
    setSelectedPet(updatedCurrentPet);
    
    // 🌟 TURN ON THE GLOBAL LOCK: Disables buttons across all cards now
    setIsGlobalActionFinalized(true);

    setIsModalOpen(false);
    showToast(`🎉 Request has been successfully ${status.toLowerCase()}!`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-gray-800 flex items-center justify-center font-medium">
        Loading Dashboard Panel Summary...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 p-6 md:p-10 font-sans relative">
      
      {/* 🛠️ FIXED TOAST COMPONENT: Replaced custom animation class with default Tailwind behaviors */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-gray-900 text-white px-5 py-3.5 rounded-xl shadow-2xl border border-gray-800 transition-all duration-300 transform translate-y-0 opacity-100 scale-100">
          <FiCheckCircle className="text-green-400 text-lg shrink-0" />
          <div className="text-sm font-semibold text-white">{toastMessage}</div>
        </div>
      )}

      {/* Dashboard Heading & Add Button Framework Container */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <span className="text-xs font-bold text-green-600 uppercase tracking-wider bg-green-50 px-2.5 py-1 rounded-md border border-green-200">
            📊 My Dashboard
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-2 text-gray-900">
            My <span className="text-green-600">Listings</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1">Manage your pet listings and adoption requests.</p>
        </div>

        <Link href="/pages/Home/Dashboard/add-panel">
          <button className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-4 py-2.5 rounded-xl transition duration-200 text-sm shadow-md shadow-green-600/20">
            <FiPlus className="stroke-[3]" /> Add New Pet
          </button>
        </Link>
      </div>

      {/* Aggregate Statistics Overview Panels Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 text-center shadow-sm">
          <p className="text-3xl md:text-4xl font-black text-green-600">{totalListings}</p>
          <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mt-1">Total Listings</p>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 text-center shadow-sm">
          <p className="text-3xl md:text-4xl font-black text-green-600">{availableCount}</p>
          <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mt-1">Available</p>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 text-center shadow-sm">
          <p className="text-3xl md:text-4xl font-black text-rose-600">{adoptedCount}</p>
          <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mt-1">Adopted</p>
        </div>
      </div>

      {/* Core Pet Grid Component Display Framework */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((pet) => {
          const isAdopted = pet.healthStatus === "Adopted";
          const currentStatus = pet.requestStatus || "Pending";

          return (
            <div key={pet._id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden flex flex-col justify-between group shadow-md hover:shadow-lg hover:border-green-300 transition duration-300">
              
              {/* Image Frame Wrapper Context */}
              <div className="relative aspect-[16/10] w-full bg-gray-100 overflow-hidden">
                <Image
                  src={pet.imageUrl || "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500"}
                  alt={pet.petName}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-103"
                  sizes="(max-w-md) 100vw, 33vw"
                />
                <span className={`absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-lg border ${
                  isAdopted 
                    ? "bg-rose-50 text-rose-600 border-rose-200" 
                    : "bg-green-50 text-green-600 border-green-200"
                }`}>
                  {isAdopted ? "Adopted" : "Available"}
                </span>
              </div>

              {/* Data Content Block Wrapper */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start gap-2 mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 tracking-tight">{pet.petName}</h2>
                    <p className="text-xs text-gray-500 mt-0.5 font-medium">
                      {pet.species} • {pet.breed || "Mixed"}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-lg font-black text-green-600">
                      {Number(pet.adoptionFee) === 0 || !pet.adoptionFee ? "Free" : `$${pet.adoptionFee}`}
                    </p>
                    <p className={`text-[10px] font-bold uppercase mt-0.5 tracking-wider px-1.5 py-0.5 rounded ${
                      currentStatus === "Approved" ? "text-green-600 bg-green-50" : 
                      currentStatus === "Rejected" ? "text-rose-600 bg-rose-50" : "text-amber-600 bg-amber-50"
                    }`}>
                      {currentStatus}
                    </p>
                  </div>
                </div>

                {/* Operations Controls */}
                <div className="grid grid-cols-2 gap-2 mt-2 pt-3 border-t border-gray-100">
                  <Link href={`/pets/${pet._id}`} className="w-full">
                    <button className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-gray-50 hover:bg-green-50 text-gray-700 font-semibold rounded-xl text-xs border border-gray-200 transition">
                      <FiEye className="text-sm text-green-600" /> View
                    </button>
                  </Link>

                  {/* 🛠️ LINK ROUTE SWITCHED HERE TO DISPLAY THE FULL DETAILS PAGE */}
                  <Link href={`/pages/Home/Dashboard/edit-panel/${pet._id}`} className="w-full">
  <button className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-gray-50 hover:bg-green-50 text-gray-700 font-semibold rounded-xl text-xs border border-gray-200 transition">
    <FiEdit2 className="text-sm text-green-600" /> Edit
  </button>
</Link>

                  <button 
                    onClick={() => {
                      setSelectedPet(pet); 
                      setIsModalOpen(true);
                    }}
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-gray-50 hover:bg-green-50 text-gray-700 font-semibold rounded-xl text-xs border border-gray-200 transition"
                  >
                    <FiUsers className="text-sm text-green-600" /> Requests
                  </button>

                  <button
                    onClick={() => openDeleteConfirmation(pet)}
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-rose-50 hover:bg-rose-100 text-rose-600 font-semibold rounded-xl text-xs border border-rose-100 transition"
                  >
                    <FiTrash2 className="text-sm" /> Delete
                  </button>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Dynamic Request Info Modal Popover Layout */}
      {isModalOpen && selectedPet && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-200">
          <div className="bg-[#121824] text-white w-full max-w-md rounded-2xl p-6 shadow-2xl relative border border-gray-800">
            
            {/* Header Area */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2 text-gray-200 font-medium">
                <FiUsers className="text-green-400" />
                <span>Adoption Requests for {selectedPet.petName}</span>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white p-1 rounded-lg bg-gray-800/50 transition"
              >
                <FiX size={16} />
              </button>
            </div>

            {/* Applicant Profile Card Section */}
            <div className="bg-[#1a2333] border border-gray-800 rounded-xl p-5 mb-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-base text-white">Cruz Contreras</h4>
                  <p className="text-xs text-gray-400 mt-0.5">cruz@gmail.com</p>
                </div>
                
                {/* Dynamically Render Status Badge Pill */}
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  (selectedPet.requestStatus || "Pending") === "Approved" ? "bg-green-500/20 text-green-400 border border-green-500/30" :
                  (selectedPet.requestStatus || "Pending") === "Rejected" ? "bg-rose-500/20 text-rose-400 border border-rose-500/30" :
                  "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                }`}>
                  ● {selectedPet.requestStatus || "Pending"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-gray-400 bg-[#121824]/50 p-3 rounded-lg border border-gray-800/50">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-gray-500">Pickup Date</p>
                  <p className="font-medium text-gray-300 mt-0.5">May 23, 2026</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-gray-500">Requested On</p>
                  <p className="font-medium text-gray-300 mt-0.5">May 16, 2026</p>
                </div>
              </div>

              <div className="italic text-sm text-gray-300 bg-[#121824] px-4 py-3 rounded-xl border border-gray-800/80">
                I want to pet this {selectedPet.petName}
              </div>
            </div>

            {/* 🌟 GLOBAL LOCK VALIDATION */}
            {!isGlobalActionFinalized ? (
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleUpdateRequestStatus(selectedPet._id, "Approved")}
                  className="flex items-center justify-center gap-1.5 py-2.5 bg-green-600 hover:bg-green-500 text-white text-xs font-bold rounded-xl transition shadow-lg shadow-green-600/10 active:scale-98"
                >
                  ✓ Approve
                </button>
                <button
                  onClick={() => handleUpdateRequestStatus(selectedPet._id, "Rejected")}
                  className="flex items-center justify-center gap-1.5 py-2.5 bg-rose-600/10 hover:bg-rose-600 text-rose-500 hover:text-white border border-rose-500/20 text-xs font-bold rounded-xl transition active:scale-98"
                >
                  ✕ Reject
                </button>
              </div>
            ) : (
              <div className="text-center text-xs font-medium py-3 px-4 bg-gray-900/80 border border-dashed border-gray-800 rounded-xl text-gray-400 tracking-wide">
                🔒 A request action on the dashboard has already been finalized. This modal selection is locked.
              </div>
            )}

          </div>
        </div>
      )}

      {/* Custom Image-Accurate Delete Confirmation Modal Component */}
      {isDeleteModalOpen && petToDelete && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-200">
          <div className="bg-[#121824] text-white w-full max-w-sm rounded-2xl shadow-2xl relative border border-gray-800 overflow-hidden">
            
            {/* Modal Body Info Container */}
            <div className="p-5 pb-4">
              <div className="flex justify-between items-start gap-4">
                <div className="flex items-start gap-2.5">
                  <span className="text-rose-500 text-lg mt-0.5">⚠️</span>
                  <div>
                    <h3 className="text-sm font-bold text-gray-100 tracking-wide">Delete Pet Listing</h3>
                    <p className="text-xs text-gray-400 mt-2 leading-relaxed font-normal">
                      Are you sure you want to permanently delete <span className="font-bold text-gray-200">{" "}{petToDelete.petName}'s</span> listing? This cannot be undone.
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => { setIsDeleteModalOpen(false); setPetToDelete(null); }}
                  className="text-gray-500 hover:text-white transition mt-0.5"
                >
                  <FiX size={14} />
                </button>
              </div>
            </div>

            {/* Modal Actions Footer Divider Container */}
            <div className="border-t border-gray-800/80 p-3 bg-[#161d2b]/30 flex justify-end items-center gap-2">
              <button
                onClick={() => { setIsDeleteModalOpen(false); setPetToDelete(null); }}
                className="px-3.5 py-1.5 rounded-lg bg-gray-800/60 hover:bg-gray-800 text-gray-300 hover:text-white font-semibold text-xs border border-gray-700/60 transition"
              >
                Keep Listing
              </button>
              <button
                onClick={confirmDeleteAction}
                className="px-3.5 py-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900 border border-rose-900/40 hover:border-rose-800 text-rose-400 hover:text-rose-300 font-bold text-xs transition"
              >
                Delete Permanently
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Empty State UI Fallback */}
      {listings.length === 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-12 text-center text-gray-500 max-w-md mx-auto mt-10">
          <p className="text-lg font-semibold text-gray-900 mb-1">No Listings Found</p>
          <p className="text-sm text-gray-500 mb-6">You have not posted any pets for adoption yet.</p>
          <Link href="/pages/Home/Dashboard/add-panel">
            <button className="bg-green-600 hover:bg-green-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition">
              Create First Listing
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyListings;