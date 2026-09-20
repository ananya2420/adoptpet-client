"use client";

import React, { useState } from "react";
import { Card, Button } from "@heroui/react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Heart, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PetCareTips = () => {
  const tips = [
    {
      id: 1,
      category: "Pet Care Tips",
      imgSrc: "/assets/adopt1.png",
      altText: "Puppy eating healthy food from a bowl",
      title: "Essential Nutritional Guidelines For Puppies",
      description:
        "Experience the incomparable joy of building an unbreakable bond with a companion who loves you unconditionally through optimal early nutrition.",
      author: "Dr. Clara Evans",
    },
    {
      id: 2,
      category: "Success Stories",
      imgSrc: "/assets/adopt2.png",
      altText: "Cat expressing emotions with subtle body language",
      title: "Decoding Cat Behavior Indicators",
      description:
        "Provide an innocent shelter animal with a secure home, balanced nutrition, and learn to decode their unique non-verbal communication cues.",
      author: "Marcus Vance",
    },
    {
      id: 3,
      category: "Pet Care Tips",
      imgSrc: "/assets/adopt3.png",
      altText: "Dog on a leash walking gracefully in a city park",
      title: "Acclimatizing Shelter Dogs to Urban Living",
      description:
        "Complete your household's story by smoothly transitioning your newly adopted rescue dog into busy urban environments and routines.",
      author: "Elena Rostov",
    },
    {
      id: 4,
      category: "Health & Wellness",
      imgSrc: "/assets/adopt1.png",
      altText: "Veterinarian examining a kitten",
      title: "Preventative Healthcare Routines for Pets",
      description:
        "Stay ahead of chronic pet health issues with regular checkups, timely vaccination schedules, and daily wellness assessments.",
      author: "Dr. Clara Evans",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [wishlist, setWishlist] = useState([]);

  // Responsive dynamic slice limit calculation logic
  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? tips.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) =>
      prevIndex === tips.length - 1 ? 0 : prevIndex + 1
    );
  };

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  // Cyclic slide indexing logic for continuous loop sliding
  const visibleTips = Array.from({ length: 3 }, (_, i) => {
    return tips[(currentIndex + i) % tips.length];
  });

  return (
    <section 
      aria-labelledby="pet-care-heading"
      className="bg-slate-50/50 text-slate-900 py-12 px-4 sm:px-8 md:px-12 lg:px-16 max-w-7xl mx-auto w-full rounded-3xl my-8"
    >
      {/* Header Block with Accessible Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 md:mb-12">
        <div className="space-y-2 max-w-xl">
          <span className="text-emerald-600 font-semibold text-xs sm:text-sm tracking-wider uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            Expert Advice
          </span>
          <h2 
            id="pet-care-heading" 
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900"
          >
            Pet Care Tips & Guides
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Discover practical guides and inspiring stories to help keep your furry companions happy and healthy.
          </p>
        </div>

        {/* Carousel Action Triggers */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <Button
            isIconOnly
            radius="full"
            variant="bordered"
            onClick={handlePrev}
            aria-label="Previous pet care tip"
            className="bg-white border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900 min-w-10 h-10 shadow-xs transition-all focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <Button
            isIconOnly
            radius="full"
            onClick={handleNext}
            aria-label="Next pet care tip"
            className="bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95 min-w-10 h-10 shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Grid Layout Container */}
      <div className="relative w-full overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: direction > 0 ? 30 : -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -30 : 30 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full"
          >
            {visibleTips.map((item, index) => {
              const isFavorited = wishlist.includes(item.id);

              return (
                <Card
                  key={`${item.id}-${index}`}
                  className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between group"
                >
                  <div className="p-4 sm:p-5 flex flex-col h-full">
                    {/* Media Container with Overlay */}
                    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100">
                      <Image
                        src={item.imgSrc}
                        alt={item.altText}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

                      {/* Wishlist Button */}
                      <div className="absolute top-3 right-3 z-10">
                        <Button
                          isIconOnly
                          radius="full"
                          onClick={() => toggleWishlist(item.id)}
                          aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
                          className="bg-white/90 backdrop-blur-md hover:bg-white text-slate-700 min-w-9 h-9 shadow-md transition-all active:scale-90 focus-visible:ring-2 focus-visible:ring-rose-500"
                        >
                          <Heart
                            className={`w-4 h-4 transition-colors duration-200 ${
                              isFavorited
                                ? "fill-rose-500 text-rose-500"
                                : "text-slate-600 hover:text-rose-500"
                            }`}
                          />
                        </Button>
                      </div>
                    </div>

                    {/* Metadata Content */}
                    <div className="pt-5 flex flex-col flex-grow">
                      <div className="mb-2">
                        <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-100">
                          {item.category}
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2.5 leading-snug line-clamp-2 group-hover:text-emerald-600 transition-colors duration-200 cursor-pointer">
                        {item.title}
                      </h3>

                      <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                        {item.description}
                      </p>

                      {/* Author Info */}
                      <div className="pt-3 border-t border-slate-100 flex items-center gap-2 mt-auto">
                        <div className="p-1 rounded-full bg-slate-100 text-slate-500">
                          <User className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs font-semibold text-slate-700">
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