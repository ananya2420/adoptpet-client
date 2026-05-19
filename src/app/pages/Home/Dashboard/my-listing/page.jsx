"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiEye, FiEdit2, FiUsers, FiTrash2, FiPlus } from "react-icons/fi";

const MyListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch pet datasets uploaded by users
  useEffect(() => {
    const fetchMyPets = async () => {
      try {
        const res = await fetch("http://localhost:5000/pet");
        const data = await res.json();
        setListings(data);
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

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to permanently delete this pet listing?")) return;

    try {
      const res = await fetch(`http://localhost:5000/pet/${id}`, { method: "DELETE" });
      if (res.ok) {
        setListings(listings.filter((item) => item._id !== id));
        alert("Pet listing deleted successfully.");
      }
    } catch (err) {
      console.error("Failed to delete record:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-gray-800 flex items-center justify-center font-medium">
        Loading Dashboard Panel Summary...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 p-6 md:p-10 font-sans">
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

        {/* Updated path to point to your specific folder layout link */}
        <Link href="/pages/Home/Dashboard/add-panel">
          <button className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-4 py-2.5 rounded-xl transition duration-200 text-sm shadow-md shadow-green-600/20">
            <FiPlus className="stroke-[3]" /> Add New Pet
          </button>
        </Link>
      </div>

      {/* Aggregate Statistics Overview Panels Layout - Green color themes applied */}
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
                {/* Status Badges Overlay Module */}
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
                    {/* All prices set to render in bold green */}
                    <p className="text-lg font-black text-green-600">
                      {Number(pet.adoptionFee) === 0 || !pet.adoptionFee ? "Free" : `$${pet.adoptionFee}`}
                    </p>
                    <p className="text-[10px] text-gray-400 font-medium">0 requests</p>
                  </div>
                </div>

                {/* Dashboard Operations Controls Button Interface - Styled with Green Icons */}
                <div className="grid grid-cols-2 gap-2 mt-2 pt-3 border-t border-gray-100">
                  <Link href={`/pets/${pet._id}`} className="w-full">
                    <button className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-gray-50 hover:bg-green-50 text-gray-700 font-semibold rounded-xl text-xs border border-gray-200 transition">
                      <FiEye className="text-sm text-green-600" /> View
                    </button>
                  </Link>

                  <Link href={`/edit-pet/${pet._id}`} className="w-full">
                    <button className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-gray-50 hover:bg-green-50 text-gray-700 font-semibold rounded-xl text-xs border border-gray-200 transition">
                      <FiEdit2 className="text-sm text-green-600" /> Edit
                    </button>
                  </Link>

                  <button 
                    onClick={() => alert(`Opening requests details modal panel context for pet: ${pet.petName}`)}
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-gray-50 hover:bg-green-50 text-gray-700 font-semibold rounded-xl text-xs border border-gray-200 transition"
                  >
                    <FiUsers className="text-sm text-green-600" /> Requests
                  </button>

                  <button
                    onClick={() => handleDelete(pet._id)}
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

      {/* Empty State UI fallback validation */}
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