"use client";

import React from "react";
import { Card } from "@heroui/react";
import Image from "next/image";
import { Heart, ShieldCheck, Home } from "lucide-react";

const WhyAdopt = () => {
  const adoptionReasons = [
    {
      id: 1,
      title: "Unbreakable Bond",
      imgSrc: "/assets/adopt1.png",
      altText: "Rescue pet showing affection to its owner",
      icon: Heart,
      badgeColor: "bg-rose-50 text-rose-600 border-rose-100",
      description:
        "Experience the incomparable joy of building an unbreakable bond with a loyal companion who offers unconditional love every day.",
    },
    {
      id: 2,
      title: "A Second Chance",
      imgSrc: "/assets/adopt2.png",
      altText: "Shelter dog resting safely in a warm environment",
      icon: ShieldCheck,
      badgeColor: "bg-emerald-50 text-emerald-600 border-emerald-100",
      description:
        "Provide a deserving shelter animal with a secure home, proper nourishment, and the bright second chance at life they truly deserve.",
    },
    {
      id: 3,
      title: "Complete Your Family",
      imgSrc: "/assets/adopt3.png",
      altText: "Family playing happily with an adopted dog indoors",
      icon: Home,
      badgeColor: "bg-amber-50 text-amber-600 border-amber-100",
      description:
        "Complete your household's story by welcoming a devoted family member who brings warmth, laughter, and energy into every corner.",
    },
  ];

  return (
    <section
      aria-labelledby="why-adopt-heading"
      className="bg-slate-50/60 text-slate-900 py-16 sm:py-20 px-4 sm:px-8 md:px-12 lg:px-16 max-w-7xl mx-auto w-full rounded-3xl my-8"
    >
      {/* Header Layout Block */}
      <div className="max-w-2xl mb-12 sm:mb-16 space-y-3">
        <span className="inline-flex items-center gap-1.5 text-emerald-700 font-semibold text-xs sm:text-sm tracking-wider uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
          Make A Difference
        </span>
        <h2
          id="why-adopt-heading"
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900"
        >
          Why Choose Adoption?
        </h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Opening your heart and home to a rescue animal transforms both your life and theirs in profound ways.
        </p>
      </div>

      {/* Cards Layout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full">
        {adoptionReasons.map((reason, index) => {
          const IconComponent = reason.icon;

          return (
            <Card
              key={reason.id}
              className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col group"
            >
              {/* Media Container */}
              <div className="relative w-full aspect-[4/3] bg-slate-100 overflow-hidden">
                <Image
                  src={reason.imgSrc}
                  alt={reason.altText}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent" />

                {/* Top Floating Badge with Icon */}
                <div className="absolute top-4 left-4 z-10">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border shadow-xs backdrop-blur-md ${reason.badgeColor}`}
                  >
                    <IconComponent className="w-3.5 h-3.5" />
                    Reason 0{index + 1}
                  </span>
                </div>
              </div>

              {/* Card Body Container */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight group-hover:text-emerald-600 transition-colors duration-200">
                    {reason.title}
                  </h3>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default WhyAdopt;