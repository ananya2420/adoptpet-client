import React from "react";
import Link from "next/link";
import PetCard from "@/app/components/PetCard"; // Adjust this path to match your file structure
import { FiArrowRight } from "react-icons/fi";

const FeaturedPets = async () => {
  let pets = [];
  
  try {
    // Fetch data directly from your backend server
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/pet`, {
      next: { revalidate: 60 } // Automatically checks for new pets every 60 seconds
    });
    
    if (res.ok) {
      pets = await res.json();
    }
  } catch (error) {
    console.error("Error fetching featured pets:", error);
  }

  // 🛠️ Limit the array to display exactly 6 featured pets on the landing page
  const featuredPets = pets.slice(0, 6);

  return (
    <section className="w-full bg-white py-16 px-4 md:px-12 border-t border-gray-100">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Section Header Text Layout */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold text-green-600 uppercase tracking-widest">
              Meet Our Friends
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
              Featured Pets Available for Adoption
            </h2>
            <p className="text-gray-500 max-w-xl text-sm md:text-base leading-relaxed">
              These beautiful companions are looking for a safe home and loving family. Start your journey by exploring their profiles today.
            </p>
          </div>

          {/* Navigation link bypass targeting your master search list screen */}
          <Link 
            href="/pets" 
            className="inline-flex items-center gap-1.5 text-sm font-bold text-green-600 hover:text-green-500 transition-colors group shrink-0"
          >
            See All Pets 
            <FiArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 🛠️ Dynamic Grid System executing your PetCard mapping sequence */}
        {featuredPets.length === 0 ? (
          <div className="text-center py-12 text-sm text-gray-400">
            No featured pets are currently listed. Check back later! 🐾
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredPets.map((pet) => (
              <PetCard key={pet._id || pet.id} pet={pet} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default FeaturedPets;