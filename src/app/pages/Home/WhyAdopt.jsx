"use client";

import React from 'react';
import { Card } from '@heroui/react';
import Image from 'next/image';

const WhyAdopt = () => {
  
  const adoptionReasons = [
    {
      imgSrc: "/assets/adopt1.png",
      altText: "Creating an unbreakable bond",
      description: "Experience the incomparable joy of building an unbreakable bond with a companion who loves you unconditionally."
    },
    {
      imgSrc: "/assets/adopt2.png",
      altText: "Providing safety and nourishment",
      description: "Provide an innocent shelter animal with a secure home, balanced nutrition, and the second chance they deserve."
    },
    {
      imgSrc: "/assets/adopt3.png",
      altText: "Completing your family dynamic",
      description: "Complete your household's story by introducing a loyal family member who brings laughter and life into every room."
    }
  ];

  return (
    <section className="bg-white text-gray-900 py-20 px-6 sm:px-12 md:px-20 flex flex-col items-center">
      <div className="max-w-6xl w-full mb-12 text-left">
        {/* Main Section Title */}
        <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
          Why Adopt
        </h2>
      </div>

      {/* Cards Layout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        {adoptionReasons.map((reason, index) => (
          <Card 
            key={index}
        
            className="bg-[#fff4f1] border-none shadow-none rounded-[2rem] overflow-hidden transition-all duration-300 hover:shadow-lg"
          >
            {/* Added CardBody for official HeroUI layout and accessibility safety */}
            <div className="p-8 flex flex-col items-center justify-between text-center gap-6">
              
              {/* Image Container */}
              <div className="relative w-full aspect-[4/3] flex items-center justify-center">
                <Image
                  src={reason.imgSrc}
                  alt={reason.altText}
                  width={280} // Scaled properly for card dimensions
                  height={210}
                  className="object-contain rounded-2xl"
                  priority={index === 0}
                />
              </div>

              {/* Paraphrased Description */}
              <p className="text-gray-700 text-base md:text-lg font-medium leading-relaxed px-2">
                {reason.description}
              </p>
              
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default WhyAdopt;