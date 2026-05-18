import Image from "next/image"
import { FiMapPin } from "react-icons/fi";
import { TbVaccineBottle } from "react-icons/tb";
import { GiHealthNormal } from "react-icons/gi";

const PetCard = ({pet}) => {
  const {imageUrl, age, petName,vaccinationStatus,healthStatus} = pet

 
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
            {" "}
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
      </div>
     
      </div>
  )
}

export default PetCard