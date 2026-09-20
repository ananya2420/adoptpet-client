"use client";

import React, { useState } from "react";
import { Card, Button } from "@heroui/react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote, HeartHandshake } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SuccessStories = () => {
  const stories = [
    {
      id: 1,
      petImg: "/assets/dog2.png",
      altText: "Golden retriever smiling after successful adoption",
      hasQuote: true,
      quoteText: "Bringing our companion home completely shifted our world.",
      description:
        "The adoption process was seamless and well-guided. Watching them grow happy every day is immensely rewarding.",
      family: "The Miller Family",
    },
    {
      id: 2,
      petImg: "/assets/dog3.png",
      altText: "Happy adopted dog sitting peacefully",
      hasQuote: false,
      quoteText: "Adopting our dog changed our daily life in the best way possible.",
      description: "The process was smooth and transparent. Our dog adapted quickly and became family.",
      family: "Sarah & David",
    },
    {
      id: 3,
      petImg: "/assets/dog4.png",
      altText: "Rescue dog enjoying garden playing",
      hasQuote: false,
      quoteText: "We never expected to bond this quickly with a rescue.",
      description: "The support team made everything stress-free and easy from start to finish.",
      family: "The Rostovs",
    },
    {
      id: 4,
      petImg: "/assets/dog5.png",
      altText: "Happy family posing with newly adopted puppy",
      hasQuote: false,
      quoteText: "Our home feels complete now.",
      description: "The guidance we received made the experience smooth and reassuring.",
      family: "Emily Chen",
    },
    {
      id: 5,
      petImg: "/assets/dog6.png",
      altText: "Thriving rescue dog resting happily indoors",
      hasQuote: false,
      quoteText: "Seeing them thrive is the best reward.",
      description: "From first meeting to home arrival, everything was simple and well supported.",
      family: "Marcus & Alex",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Desktop view limits to 3 cards fitting perfectly into a 12-col grid (6 + 3 + 3)
  const visibleCount = 3;

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? stories.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === stories.length - 1 ? 0 : prev + 1));
  };

  // Continuous loop calculation for visible items
  const visibleStories = Array.from({ length: visibleCount }, (_, i) => {
    return stories[(currentIndex + i) % stories.length];
  });

  return (
    <section 
      aria-labelledby="success-stories-heading"
      className="bg-slate-50/50 text-slate-900 py-12 px-4 sm:px-8 md:px-12 lg:px-16 max-w-7xl mx-auto w-full rounded-3xl my-8"
    >
      {/* Header Layout Block */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 md:mb-10">
        <div className="space-y-2 max-w-xl">
          <span className="inline-flex items-center gap-1.5 text-emerald-700 font-semibold text-xs sm:text-sm tracking-wider uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            <HeartHandshake className="w-3.5 h-3.5 text-emerald-600" />
            Heartwarming Journeys
          </span>
          <h2
            id="success-stories-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900"
          >
            Adoption Success Stories
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Real stories from loving families who gave rescue pets a second chance at happiness.
          </p>
        </div>

        {/* Carousel Action Triggers */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <Button
            isIconOnly
            radius="full"
            variant="bordered"
            onClick={handlePrev}
            aria-label="Previous adoption success story"
            className="bg-white border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900 min-w-10 h-10 shadow-xs transition-all focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <Button
            isIconOnly
            radius="full"
            onClick={handleNext}
            aria-label="Next adoption success story"
            className="bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95 min-w-10 h-10 shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Dynamic Animated Grid */}
      <div className="relative w-full overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: direction > 0 ? 30 : -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -30 : 30 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full"
          >
            {visibleStories.map((story, index) => {
              // Featured Highlight Card (Spans 6 columns on desktop)
              if (story.hasQuote) {
                return (
                  <div
                    key={`${story.id}-${index}`}
                    className="md:col-span-12 lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-emerald-700 rounded-3xl p-4 sm:p-5 text-white shadow-md hover:shadow-lg transition-all duration-300 relative group overflow-hidden"
                  >
                    <div className="relative w-full min-h-[220px] sm:min-h-[260px] rounded-2xl overflow-hidden bg-emerald-800">
                      <Image
                        src={story.petImg}
                        alt={story.altText}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="flex flex-col justify-between p-2 sm:p-3">
                      <div>
                        <Quote className="w-8 h-8 text-emerald-300/60 mb-2" />
                        <p className="text-base sm:text-lg font-bold leading-snug mb-3 text-emerald-50">
                          &ldquo;{story.quoteText}&rdquo;
                        </p>
                        <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed line-clamp-3">
                          {story.description}
                        </p>
                      </div>
                      <div className="pt-4 border-t border-emerald-600/60 mt-4">
                        <span className="text-xs font-semibold text-emerald-200 tracking-wide">
                          Adopted by {story.family}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }

              // Secondary Story Card (Spans 3 columns on desktop)
              return (
                <Card
                  key={`${story.id}-${index}`}
                  className="md:col-span-6 lg:col-span-3 h-[280px] sm:h-[300px] border border-slate-200/80 shadow-xs hover:shadow-xl rounded-3xl overflow-hidden relative group transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative w-full h-full bg-slate-100">
                    <Image
                      src={story.petImg}
                      alt={story.altText}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent transition-opacity duration-300" />
                  </div>

                  {/* Accessible Floating Content Box */}
                  <div className="absolute bottom-0 inset-x-0 p-4 text-white flex flex-col justify-end">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 mb-1">
                      {story.family}
                    </span>
                    <p className="text-xs sm:text-sm font-medium leading-normal line-clamp-3 text-slate-100">
                      {story.description}
                    </p>
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

export default SuccessStories;