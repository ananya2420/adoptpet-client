import Image from "next/image"
import { FiExternalLink, FiMapPin } from "react-icons/fi";
import { TbVaccineBottle } from "react-icons/tb";
import { GiHealthNormal } from "react-icons/gi";
import { SiAnimalplanet } from "react-icons/si";
import { FaLocationDot } from "react-icons/fa6";
import { Button } from "@heroui/react";
import Link from "next/link";

const PetCard = ({pet}) => {
  const {imageUrl, age, petName,vaccinationStatus,healthStatus,species,location} = pet

  const { _id } = pet;
  const testImage = "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500";

  return (
    <div className="border">
      <h3>{petName}</h3>
      <Image 
      className=""
        alt={petName}
        src={testImage} // Change this back to imageUrl later
        height={400}
        width={400}
        priority // Tells Next.js to load this image instantly
      />

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

        {/* Added View Details and Adjust buttons immediately below */}
        <div className="flex justify-between items-center gap-2 mt-4 pt-2 border-t">
           <Link href={`/pets/${_id}`}><Button variant="ghost" className={'mt-1 text-green-600'}> <FiExternalLink/> View Details</Button></Link>
          <button className="px-4 py-2 text-sm font-medium bg-green-600 text-white rounded hover:bg-green-500 transition">
            Adjust immediately
          </button>
        </div>
      </div>
     
      </div>
  )
}

export default PetCard