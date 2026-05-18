"use client";

import Image from 'next/image'
import React from 'react'

const Banner = () => {
  return (
    <section
      className="relative w-full min-h-[90vh] flex items-center bg-cover bg-center px-6 md:px-16 overflow-hidden"
    >
      {/* BACKGROUND IMAGE */}
      <Image
        src="/assets/banner.jpg"
        fill
        alt="banner"
        className="object-cover -z-10"
        priority
      />

      <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
        
        {/* LEFT SIDE */}
        <div className="flex-1 text-left">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white">
            Meet your perfect{" "}
            <span className="text-green-800">Pet Match</span>{" "}
            Companion
          </h1>

          <p className="mt-5 text-gray-200 max-w-lg">
            Open your heart and home to a pet in need. Explore hundreds of dogs, cats, birds, rabbits, and more waiting for their forever homes.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="px-6 py-3 rounded-full bg-green-700 text-white font-medium hover:bg-green-700 transition">
              Adopt Now
            </button>

            <button className="px-6 py-3 rounded-full border border-white text-white hover:bg-white hover:text-black transition">
              Add a Pet Listing
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 flex justify-center md:justify-end">
          <div className="relative w-[280px] h-[320px] md:w-[380px] md:h-[420px] flex items-center justify-center">
            <Image
              src="/assets/dog1.png"
              alt="profile"
              width={320}
              height={320}
              className="rounded-full object-contain"
            />
          </div>
        </div>

      </div>
    </section>
  )
}

export default Banner