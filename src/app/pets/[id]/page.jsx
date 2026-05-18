import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { FaLocationDot } from "react-icons/fa6";
import { FiExternalLink, FiMapPin } from "react-icons/fi";
import { GiHealthNormal } from "react-icons/gi";
import { SiAnimalplanet } from "react-icons/si";
import { TbVaccineBottle } from "react-icons/tb";

const PetDetailsPage = async ({ params }) => {
  const { id } = await params;

  const res=await fetch(`http://localhost:5000/pet/${id}`)
  
  const pet=await res.json()

 const {imageUrl, age, petName,vaccinationStatus,healthStatus,species,location,description} = pet

  

 console.log(pet)
  return (
    <div className="max-w-7xl mx-auto">
    <Image alt={petName} src={imageUrl} height={500} width={800}  />
    
     <div className="p-2">
            <div className="flex items-center gap-1">
              
             <FiMapPin /><span>{age}</span>
            </div>
            <div>
                <h2 className="text-xl font-bold">{petName}</h2>
            </div>
            <div>
              <TbVaccineBottle /> {vaccinationStatus}
            </div>
    
            <div className="flex gap-2 items-center">
                <GiHealthNormal /> {healthStatus}
            </div>
    
            <div>
             <SiAnimalplanet /> {species}
            </div>
    
            <div>
             <FaLocationDot /> {location}
            </div>
            
             <p>{description}</p>
             
            {/* Added View Details and Adjust buttons immediately below */}
            <div className="flex justify-between items-center gap-2 mt-4 pt-2 border-t">
               {/* Corrected: changed _id to pet._id */}
               <Link href={`/pets/${pet._id}`}><Button variant="ghost" className={'mt-1 text-green-600'}> <FiExternalLink/> View Details</Button></Link>
              <button className="px-4 py-2 text-sm font-medium bg-green-600 text-white rounded hover:bg-green-500 transition">
                Adjust immediately
              </button>

             
            </div>
            
          </div>
  
    </div>
  );
};

export default PetDetailsPage;

