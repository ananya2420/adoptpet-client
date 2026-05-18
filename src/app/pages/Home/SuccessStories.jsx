"use client";

import React, { useState } from 'react';
import { Card, Button } from '@heroui/react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SuccessStories = () => {

  const stories = [
    {
      id: 1,
      petImg: "/assets/dog2.png",
      altText: "Happy adopted dog",
      hasQuote: false,
      quoteText: "Adopting our dog changed our daily life in the best way possible.",
      description: "The process was smooth and transparent. Our dog adapted quickly and became part of the family."
    },
    {
      id: 2,
      petImg: "/assets/dog3.png",
      altText: "Featured adoption story",
      hasQuote: true,
      quoteText: "Bringing our companion home completely shifted our world.",
      description: "The adoption process was seamless and well-guided. Watching them grow happy every day is rewarding."
    },
    {
      id: 3,
      petImg: "/assets/dog4.png",
      altText: "Rescue success story",
      hasQuote: false,
      quoteText: "We never expected to bond this quickly with a rescue.",
      description: "The support team made everything stress-free and easy from start to finish."
    },
    {
      id: 4,
      petImg: "/assets/dog5.png",
      altText: "Happy family adoption",
      hasQuote: false,
      quoteText: "Our home feels complete now.",
      description: "The guidance we received made the experience smooth and reassuring."
    },
    {
      id: 5,
      petImg: "/assets/dog6.png",
      altText: "Another rescue story",
      hasQuote: false,
      quoteText: "Seeing them thrive is the best reward.",
      description: "From first meeting to home arrival, everything was simple and well supported."
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleCount = 4;

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? stories.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === stories.length - 1 ? 0 : prev + 1
    );
  };

  // ✅ THIS is the key fix: EVERYTHING rotates equally (no special card)
  const visibleStories = Array.from({ length: visibleCount }, (_, i) => {
    return stories[(currentIndex + i) % stories.length];
  });

  return (
    <section className="bg-white text-gray-900 py-16 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto w-full">

      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-extrabold sm:text-4xl">
          Success Stories
        </h2>

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
            className="bg-green-700 text-white hover:bg-green-800 min-w-10 h-10"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full">

        {visibleStories.map((story) => {

          if (story.hasQuote) {
            return (
              <div
                key={story.id}
                className="md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-green-600 rounded-[2rem] p-4 text-white shadow-sm"
              >
                <div className="relative w-full h-64 min-h-[240px]">
                  <Image
                    src={story.petImg}
                    alt={story.altText}
                    fill
                    className="object-cover rounded-2xl"
                  />
                </div>

                <div className="flex flex-col justify-center p-4">
                  <p className="text-lg font-semibold italic mb-2">
                    {story.quoteText}
                  </p>
                  <p className="text-sm opacity-90">
                    {story.description}
                  </p>
                </div>
              </div>
            );
          }

          return (
            <Card
              key={story.id}
              className="md:col-span-3 h-64 border-none shadow-none rounded-[2rem] overflow-hidden"
            >
              <div className="relative w-full h-full">
                <Image
                  src={story.petImg}
                  alt={story.altText}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="absolute bottom-0 p-3 bg-black/40 text-white text-xs">
                {story.description}
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default SuccessStories;