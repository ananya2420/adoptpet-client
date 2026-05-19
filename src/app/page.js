import Image from "next/image";
import Banner from "./pages/Home/Banner";
import WhyChooseUs from "./pages/Home/WhyChooseUs";

import SuccessStories from "./pages/Home/SuccessStories";
import PetCareTips from "./pages/Home/PetCareTips";
import FeaturedPets from "./pages/Home/FeaturedPets";
import WhyAdopt from "./pages/Home/WhyAdopt";


export default function Home() {
  return (
    <div>
     <Banner />
     <FeaturedPets />
     <WhyAdopt />
     <WhyChooseUs />
     <SuccessStories />
     <PetCareTips />
    </div>
  );
}
