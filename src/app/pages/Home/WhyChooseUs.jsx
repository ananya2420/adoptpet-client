"use client";

import React from 'react';
import { Card, Chip } from '@heroui/react';
import { Heart, Users, ShieldCheck, Award } from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    {
      icon: <Heart className="w-6 h-6 text-pink-600" />,
      bgIcon: "bg-pink-50 border-pink-100",
      title: "Rescue & Rehome",
      description: "Every adoption provides a vulnerable animal with a fresh start, making you the ultimate hero of their journey."
    },
    {
      icon: <Users className="w-6 h-6 text-blue-600" />,
      bgIcon: "bg-blue-50 border-blue-100",
      title: "A Growing Family",
      description: "Engage with a massive network of passionate pet owners eager to trade advice, milestones, and encouragement."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
      bgIcon: "bg-emerald-50 border-emerald-100",
      title: "Vetted & Protected",
      description: "Rest easy knowing every animal undergoes rigorous medical screenings and background checks prior to listing."
    },
    {
      icon: <Award className="w-6 h-6 text-amber-600" />,
      bgIcon: "bg-amber-50 border-amber-100",
      title: "Ongoing Guidance",
      description: "Receive professional mentorship spanning veterinary insights, behavioral training, and wellness tips forever."
    }
  ];

  return (
    <section className="bg-white text-gray-900 py-20 px-6 sm:px-12 md:px-20 min-h-screen flex flex-col justify-center items-center">
      <div className="max-w-6xl w-full text-center mb-16 flex flex-col items-center">
        {/* Chip badge adapted for light background */}
        <Chip 
          variant="flat" 
          color="danger" 
          size="sm"
          className="bg-pink-50 text-green-600 border border-pink-100 mb-4 tracking-wider uppercase font-semibold"
        >
          Our Mission
        </Chip>
        
        {/* Main Heading */}
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-gray-900">
          Your Trustworthy{" "}
          <span className="bg-gradient-to-r from-green-600 via-green-600 to-green-600 bg-clip-text text-transparent">
            Adoption Partner
          </span>
        </h2>
        
        {/* Subtitle */}
        <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto font-normal leading-relaxed">
          We bridge the gap between eager pet parents and animals in need through a seamless, secure, and deeply fulfilling experience.
        </p>
      </div>

      {/* HeroUI Cards Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl w-full">
        {features.map((feature, index) => (
          <Card 
            key={index} 
          
            className="bg-gray-50/50 border border-gray-200/60 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <div className="p-8 flex flex-col items-center text-center">
              {/* Icon Container */}
              <div className={`p-4 rounded-xl border ${feature.bgIcon} mb-6 flex items-center justify-center shadow-sm`}>
                {feature.icon}
              </div>
              
              {/* Card Title */}
              <h3 className="text-xl font-bold mb-3 tracking-wide text-gray-800">
                {feature.title}
              </h3>
              
              {/* Card Description */}
              <p className="text-gray-600 text-sm leading-relaxed font-normal">
                {feature.description}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;