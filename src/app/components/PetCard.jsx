"use client"; 

import Image from "next/image"
import { FiExternalLink, FiMapPin } from "react-icons/fi";
import { TbVaccineBottle } from "react-icons/tb";
import { GiHealthNormal } from "react-icons/gi";
import { SiAnimalplanet } from "react-icons/si";
import { FaLocationDot } from "react-icons/fa6";
import { Button } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation"; 

// 🛠️ Added searchQuery to received parameters
const PetCard = ({ pet, searchQuery = "" }) => {
  const { imageUrl, age, petName, vaccinationStatus, healthStatus, species, location, _id } = pet;
  const testImage = "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500";
  
  const router = useRouter();
  const isAuthenticated = false; 

  const handleAdoptClick = () => {
    if (!isAuthenticated) {
      router.push(`/login?callbackUrl=${encodeURIComponent(`/pets/${_id}`)}`);
    } else {
      router.push(`/pets/${_id}`);
    }
  };

  // 🛠️ Check if this specific card matches the typed search value
  const isMatched = searchQuery && petName.toLowerCase().includes(searchQuery.toLowerCase());
  const isSearching = searchQuery.length > 0;

  return (
    <div 
      className={`bg-white border rounded-2xl overflow-hidden shadow-sm transition-all duration-300 flex flex-col h-full group
        ${isMatched 
          ? "border-teal-500 ring-4 ring-teal-500/20 scale-[1.02] z-10 shadow-md" 
          : isSearching 
            ? "border-gray-200 opacity-40 scale-[0.98]" // Softly fades out non-matching cards if you type
            : "border-gray-200 hover:shadow-md"
        }`}
    >
      <h3 className="hidden">{petName}</h3>
      
      {/* Image Container Frame */}
      <div className="relative w-full aspect-[4/3] bg-gray-50 overflow-hidden border-b border-gray-100">
        <Image 
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          alt={petName}
          src={imageUrl || testImage} 
          fill
          sizes="(max-w-7xl) 33vw, (max-w-md) 100vw"
          priority 
        />
      </div>

      {/* Content Inner Wrap */}
      <div className="p-5 flex flex-col flex-1 justify-between bg-white">
        
        <div className="space-y-3">
          {/* Header Title & Age block */}
          <div className="flex items-start justify-between gap-2">
            {/* 🛠️ Highlights the text background color if it matches your search query */}
            <h2 className={`text-xl font-bold text-gray-900 tracking-tight leading-snug rounded px-1 transition-colors ${isMatched ? "bg-teal-100 text-teal-900" : ""}`}>
              {petName}
            </h2>
            <div className="flex items-center gap-1 text-xs font-semibold bg-gray-50 text-gray-600 border border-gray-200 px-2 py-1 rounded-full shrink-0">
              <FiMapPin className="text-green-600" />
              <span>{age}</span>
            </div>
          </div>

          {/* Metadata Parameters Grid Layout */}
          <div className="grid grid-cols-2 gap-2.5 pt-1 text-xs font-medium text-gray-600">
            <div className="flex items-center gap-2 px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg">
              <TbVaccineBottle className="text-sm text-green-600 shrink-0" />
              <span className="truncate">{vaccinationStatus}</span>
            </div>

            <div className="flex items-center gap-2 px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg">
              <GiHealthNormal className="text-sm text-red-500 shrink-0" />
              <span className="truncate">{healthStatus}</span>
            </div>

            <div className="flex items-center gap-2 px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg">
              <SiAnimalplanet className="text-sm text-blue-500 shrink-0" />
              <span className="truncate capitalize">{species}</span>
            </div>

            <div className="flex items-center gap-2 px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg">
              <FaLocationDot className="text-sm text-amber-500 shrink-0" />
              <span className="truncate">{location}</span>
            </div>
          </div>
        </div>

        {/* Action Button Row Layout */}
        <div className="flex justify-between items-center gap-2 mt-5 pt-3 border-t border-gray-100">
          <Link href={`/pets/${_id}`} className="flex-1">
            <Button variant="ghost" className="w-full mt-0 text-green-600 border-green-200 hover:bg-green-50 rounded-xl font-semibold py-5 text-xs"> 
              <FiExternalLink/> View Details
            </Button>
          </Link>
          
          <button
            onClick={handleAdoptClick}
            className="flex-1 px-3 py-2.5 text-xs font-bold bg-green-600 hover:bg-green-500 text-white rounded-xl shadow-sm transition-all duration-150 active:scale-98 text-center truncate"
          >
            Adopt now
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default PetCard;