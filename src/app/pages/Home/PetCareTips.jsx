"use client";

import React, { useState } from 'react';
import { Card, Button } from '@heroui/react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PetCareTips = () => {
  const tips = [
    {
      id: 1,
      category: "Pet Care Tips",
      imgSrc: "/assets/adopt1.png",
      altText: "Creating an unbreakable bond",
      title: "Essential Nutritional Guidelines For Puppies",
      description: "Experience the incomparable joy of building an unbreakable bond with a companion who loves you unconditionally.",
      author: "Dr. Clara Evans"
    },
    {
      id: 2,
      category: "Success Stories",
      imgSrc: "/assets/adopt2.png",
      altText: "Providing safety and nourishment",
      title: "Decoding Cat Behavior Indicators",
      description: "Provide an innocent shelter animal with a secure home, balanced nutrition, and the second chance they deserve.",
      author: "Marcus Vance"
    },
    {
      id: 3,
      category: "Pet Care Tips",
      imgSrc: "/assets/adopt3.png",
      altText: "Completing your family dynamic",
      title: "Acclimatizing Shelter Dogs to Urban Living",
      description: "Complete your household's story by introducing a loyal family member who brings laughter and life into every room.",
      author: "Elena Rostov"
    }
  ];

  // ✅ added state
  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleCount = 3;

  // ✅ arrow logic
  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? tips.length - visibleCount : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev >= tips.length - visibleCount ? 0 : prev + 1
    );
  };

  // ✅ sliding window
  const visibleTips = tips.slice(currentIndex, currentIndex + visibleCount);

  return (
    <section className="bg-white text-gray-900 py-16 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto w-full">

      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Pet Care Tips
        </h2>

        {/* Navigation Arrows */}
        <div className="flex gap-2">
          <Button
            isIconOnly
            radius="full"
            variant="bordered"
            onClick={handlePrev}
            className="border-gray-200 text-gray-600 hover:bg-gray-50 min-w-10 h-10"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <Button
            isIconOnly
            radius="full"
            onClick={handleNext}
            className="bg-green-500 text-white hover:bg-green-500 min-w-10 h-10 shadow-sm"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Grid Layout (UNCHANGED visually) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        {visibleTips.map((item) => (
          <Card
            key={item.id}
            className="bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <div className="p-4 flex flex-col gap-5">

              <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden">
                <Image
                  src={item.imgSrc}
                  alt={item.altText}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="px-3 pb-4 flex flex-col flex-grow">

                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2 block">
                  {item.category}
                </span>

                <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight line-clamp-2 hover:text-[#f0623e] transition-colors duration-200 cursor-pointer">
                  {item.title}
                </h3>

                <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                  {item.description}
                </p>

                <div className="mt-auto pt-2 border-t border-gray-100/80">
                  <span className="text-xs font-semibold text-green-500">
                    {item.author}
                  </span>
                </div>

              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default PetCareTips;