import Image from "next/image";
import Banner from "./pages/Home/Banner";
import WhyChooseUs from "./pages/Home/WhyChooseUs";
import WhyAdopt from "./pages/Home/WhyAdopt";
import SuccessStories from "./pages/Home/SuccessStories";
import PetCareTips from "./pages/Home/PetCareTips";
//import WhyAdopt from "./pages/Home/WhyAdopt";
//import WhyChooseUs from "./pages/Home/WhyChooseUs";

export default function Home() {
  return (
    <div>
     <Banner />
     
     <WhyAdopt />
     <WhyChooseUs />
     <SuccessStories />
     <PetCareTips />
    </div>
  );
}
