"use client";

import { useState, useMemo } from "react";
import PetCard from "./PetCard"; 

// 📋 STEP 1: Define the master data array completely OUTSIDE the component function
const INITIAL_PETS = [
  { _id: "1", petName: "Blizzard", species: "Dog", breed: "Siberian Husky", age: "2 years old", location: "Dhaka, Bangladesh", fee: 6000, imageUrl: "", vaccinationStatus: "Fully Vaccinated", healthStatus: "Excellent" },
  { _id: "2", petName: "Duke", species: "Dog", breed: "Rottweiler", age: "4 years old", location: "Dhaka, Bangladesh", fee: 5000, imageUrl: "", vaccinationStatus: "Fully Vaccinated", healthStatus: "Healthy" },
  { _id: "3", petName: "Bunny", species: "Rabbit", breed: "Holland Lop", age: "1 year old", location: "New York", fee: 2000, imageUrl: "", vaccinationStatus: "Not Vaccinated", healthStatus: "Healthy" },
  { _id: "4", petName: "Shelly", species: "Turtle", breed: "Red-Eared Slider", age: "5 years old", location: "Khulna, Bangladesh", fee: 150, imageUrl: "", vaccinationStatus: "N/A", healthStatus: "Healthy" },
  { _id: "5", petName: "Nibbles", species: "Hamster", breed: "Syrian Hamster", age: "1 year old", location: "Dhaka, Bangladesh", fee: 100, imageUrl: "", vaccinationStatus: "N/A", healthStatus: "Healthy" },
  { _id: "6", petName: "Buddy", species: "Cat", breed: "Persian", age: "1 year old", location: "Chittagong, Bangladesh", fee: 4500, imageUrl: "", vaccinationStatus: "Fully Vaccinated", healthStatus: "Healthy" },
  { _id: "7", petName: "Max", species: "Cat", breed: "Siamese", age: "3 years old", location: "Dhaka, Bangladesh", fee: 4000, imageUrl: "", vaccinationStatus: "Partially Vaccinated", healthStatus: "Excellent" },
  { _id: "8", petName: "Billa", species: "Cat", breed: "Local Cat", age: "2 years old", location: "Dhaka, Bangladesh", fee: 300, imageUrl: "", vaccinationStatus: "Fully Vaccinated", healthStatus: "Healthy" }
];

export default function AllPetsPage({ petsData }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState("All Species");
  const [sortOrder, setSortOrder] = useState("Default");

  // STEP 2: The logic engine can now safely read INITIAL_PETS globally
  const filteredPets = useMemo(() => {
    const source = (petsData && petsData.length) ? petsData : INITIAL_PETS;
    const q = searchQuery.trim().toLowerCase();
    return source.filter((pet) => {
      // Search by name, breed, species or location (case-insensitive)
      const matchesSearch =
        q === "" ||
        (pet.petName && pet.petName.toLowerCase().includes(q)) ||
        (pet.breed && pet.breed.toLowerCase().includes(q)) ||
        (pet.species && pet.species.toLowerCase().includes(q)) ||
        (pet.location && pet.location.toLowerCase().includes(q));

      // Filter by species logic ("All Species" shows everything)
      const matchesSpecies =
        selectedSpecies === "All Species" ||
        (pet.species && pet.species.toLowerCase() === selectedSpecies.toLowerCase());

      return matchesSearch && matchesSpecies;
    }).sort((a, b) => {
      if (sortOrder === "low-to-high") return a.fee - b.fee;
      if (sortOrder === "high-to-low") return b.fee - a.fee;
      return 0;
    });
  }, [searchQuery, selectedSpecies, sortOrder, petsData]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div>
          <span className="text-xs bg-red-50 text-red-600 px-2.5 py-1 rounded-full font-semibold border border-red-100">
            All Available Pets
          </span>
          <h1 className="text-4xl font-black mt-3 tracking-tight text-gray-900">
            Browse <span className="text-teal-600">All Pets</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1 font-medium">
            Showing {filteredPets.length} matching {filteredPets.length === 1 ? "pet" : "pets"}
          </p>
        </div>

        {/* Filters Panel */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Search Box */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-500 font-bold tracking-wide">Search by name</label>
            <input
              type="text"
              placeholder="Type any pet name to look up..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-50 border border-gray-200 text-sm rounded-xl px-4 py-2.5 outline-none focus:border-teal-500 text-gray-900 placeholder-gray-400 focus:bg-white transition-all duration-200"
            />
          </div>

          {/* Species Dropdown */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-500 font-bold tracking-wide">Filter by species</label>
            <select
              value={selectedSpecies}
              onChange={(e) => setSelectedSpecies(e.target.value)}
              className="bg-gray-50 border border-gray-200 text-sm rounded-xl px-4 py-2.5 outline-none focus:border-teal-500 text-gray-900 focus:bg-white transition-all duration-200 cursor-pointer"
            >
              <option value="All Species">All Species</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Rabbit">Rabbit</option>
              <option value="Turtle">Turtle</option>
              <option value="Hamster">Hamster</option>
              <option value="Bird">Bird</option>
            </select>
          </div>

          {/* Sorting Box */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-500 font-bold tracking-wide">Sort by adoption fee</label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="bg-gray-50 border border-gray-200 text-sm rounded-xl px-4 py-2.5 outline-none focus:border-teal-500 text-gray-900 focus:bg-white transition-all duration-200 cursor-pointer"
            >
              <option value="Default">Default Order</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Cards Grid Grid Layout */}
        {filteredPets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {filteredPets.map((pet) => (
              <PetCard key={pet._id} pet={pet} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200 shadow-sm">
            <p className="text-gray-500 font-bold text-lg">No matching pets found.</p>
            <p className="text-sm text-gray-400 mt-1">Try changing your search keywords!</p>
          </div>
        )}

      </div>
    </div>
  );
}