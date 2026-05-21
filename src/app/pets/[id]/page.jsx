import AdoptionForm from "@/app/components/AdoptionForm";
import { DeleteAlert } from "@/app/components/DeleteAlert";
import { EditModal } from "@/app/components/EditModal";
import Image from "next/image";
import Link from "next/link";
import { FaLocationDot } from "react-icons/fa6";
import { FiArrowLeft, FiMapPin } from "react-icons/fi";
import { GiHealthNormal } from "react-icons/gi";
import { SiAnimalplanet } from "react-icons/si";
import { TbVaccineBottle } from "react-icons/tb";


const PetDetailsPage = async ({ params }) => {
  const { id } = await params;

  
  const res = await fetch(`http://localhost:5000/pet/${id}`);
  const pet = await res.json();

  const { imageUrl, age, petName, vaccinationStatus, healthStatus, species, location, description, status } = pet;

  // Ensure Image `src` is never an empty string — fall back to a bundled asset.
  const imageSrc = imageUrl || "/assets/dog1.png";
  const imageAlt = petName ? `${petName} photo` : "Pet image";

  // Check if this pet asset has already been marked as adopted in the database
  const isAdopted = status === "adopted";

  return (
    <div className="w-full min-h-screen bg-white text-gray-800 py-8 px-4 md:px-12">
   <div className="flex justify-end items-center gap-2 w-full">
  <EditModal pet={pet}/>
  <DeleteAlert pet={pet}/>
</div>
      <div className="max-w-7xl mx-auto">
        
  
        <div className="mb-6">
          <Link href="/pets" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-green-600 transition">
            ← Back to All Pets
          </Link>
        </div>

   
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start bg-white">
          
       
          <div className="lg:col-span-7 space-y-6 bg-white">
            
            {/* Top Aspect Cover Image wrapper frame */}
            <div className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm">
                <Image 
                  alt={imageAlt} 
                  src={imageSrc} 
                fill
                sizes="(max-w-7xl) 100vw, 60vw"
                className="object-cover"
                priority 
              />
              {/* Dynamic Badge Display Indicator */}
              {isAdopted ? (
                <span className="absolute top-4 right-4 bg-red-500 text-white font-bold text-xs px-3 py-1.5 rounded-full shadow-sm">
                  Adopted
                </span>
              ) : (
                <span className="absolute top-4 right-4 bg-emerald-500 text-white font-bold text-xs px-3 py-1.5 rounded-full shadow-sm">
                  Available
                </span>
              )}
            </div>

        
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">{petName}</h1>
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span className="px-3 py-1 text-xs font-bold bg-gray-100 text-gray-600 rounded-full capitalize">{species}</span>
                <span className="px-3 py-1 text-xs font-bold bg-gray-100 text-gray-600 rounded-full">{age}</span>
              </div>
            </div>

           
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col p-4 bg-gray-50 border border-gray-200/60 rounded-2xl">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                  <SiAnimalplanet className="text-blue-500 text-sm" /> Species
                </span>
                <span className="text-base font-bold text-gray-800 mt-1">{species}</span>
              </div>

              <div className="flex flex-col p-4 bg-gray-50 border border-gray-200/60 rounded-2xl">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                  <TbVaccineBottle className="text-green-600 text-base" /> Vaccination
                </span>
                <span className="text-base font-bold text-gray-800 mt-1">{vaccinationStatus}</span>
              </div>

              <div className="flex flex-col p-4 bg-gray-50 border border-gray-200/60 rounded-2xl">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                  <GiHealthNormal className="text-red-500 text-sm" /> Health Status
                </span>
                <span className="text-base font-bold text-gray-800 mt-1">{healthStatus}</span>
              </div>

              <div className="flex flex-col p-4 bg-gray-50 border border-gray-200/60 rounded-2xl">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                  <FaLocationDot className="text-amber-500 text-sm" /> Location
                </span>
                <span className="text-base font-bold text-gray-800 mt-1">{location}</span>
              </div>
            </div>

           
            <div className="pt-4 border-t border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 text-base leading-relaxed whitespace-pre-line">{description}</p>
            </div>

          </div>

        
          <aside className="lg:col-span-5 lg:sticky lg:top-8 bg-white">
            {isAdopted ? (
              /* Success confirmation panel matching your video walkthrough screen styling */
              <div className="border border-gray-200 rounded-3xl p-8 shadow-xs flex flex-col items-center justify-center text-center space-y-4 bg-white min-h-[300px]">
                <div className="w-12 h-12 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-red-500">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                    {petName} has been adopted!
                  </h2>
                  <p className="text-sm text-gray-500 mt-2 max-w-sm leading-relaxed">
                    This pet has successfully found their forever home. Browse other available pets below.
                  </p>
                </div>
                <Link 
                  href="/pets" 
                  className="px-5 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-xl shadow-sm transition-all duration-150 active:scale-98"
                >
                  Browse Available Pets
                </Link>
              </div>
            ) : (
              <AdoptionForm petName={petName} />
            )}
          </aside>

        </div>
      </div>
    </div>
  );
};

export default PetDetailsPage;