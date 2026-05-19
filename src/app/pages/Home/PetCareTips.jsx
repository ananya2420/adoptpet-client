"use client";

import React, { useState } from 'react';
import { Card, Button } from '@heroui/react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

  // ✅ state for sliding window index
  const [currentIndex, setCurrentIndex] = useState(0);
  // ✅ state tracking active direction for animation transitions
  const [direction, setDirection] = useState(0); 
  // ✅ wishlist tracking state array
  const [wishlist, setWishlist] = useState([]);

  const visibleCount = 3;

  // ✅ arrow navigation actions
  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) =>
      prev === 0 ? tips.length - visibleCount : prev - 1
    );
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) =>
      prev >= tips.length - visibleCount ? 0 : prev + 1
    );
  };

  // ✅ Toggle items inside wishlist tracker array
  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // ✅ sliding window view slice mapping calculation
  const visibleTips = tips.slice(currentIndex, currentIndex + visibleCount);

  return (
    <section className="bg-white text-gray-900 py-16 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto w-full overflow-hidden">

      {/* Header Layout Block */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Pet Care Tips
        </h2>

        {/* Navigation Actions Trigger Frame */}
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

      {/* Slide View Container Grid Framework Wrapper */}
      <div className="relative w-full min-h-[540px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div 
            key={currentIndex}
            initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full absolute top-0 left-0"
          >
            {visibleTips.map((item) => {
              const isFavorited = wishlist.includes(item.id);
              
              return (
                <Card
                  key={item.id}
                  className="bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md relative group"
                >
                  <div className="p-4 flex flex-col gap-5">

                    {/* Cover Asset Media Frame wrapper */}
                    <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden">
                      <Image
                        src={item.imgSrc}
                        alt={item.altText}
                        fill
                        className="object-cover"
                      />

                      {/* Interactive Floating Wishlist Heart Feature Button */}
                      <div className="absolute top-4 right-4 z-10">
                        <Button
                          isIconOnly
                          radius="full"
                          onClick={() => toggleWishlist(item.id)}
                          className="bg-white/80 backdrop-blur-xs hover:bg-white text-gray-600 min-w-10 h-10 shadow-xs transition-transform duration-150 active:scale-90"
                        >
                          <Heart 
                            className={`w-5 h-5 transition-colors duration-200 ${
                              isFavorited ? "fill-rose-500 text-rose-500" : "text-gray-600"
                            }`} 
                          />
                        </Button>
                      </div>
                    </div>

                    {/* Metadata Content Descriptions Block */}
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
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PetCareTips;