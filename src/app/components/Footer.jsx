"use client";

import React from 'react';
import { Button, Input } from '@heroui/react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-green-600 text-stone-100 pt-16 pb-8 px-6 sm:px-12 md:px-20 w-full mt-auto">

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">

        {/* Brand */}
        <div className="md:col-span-4 flex flex-col gap-4">

          <Image
            src="/assets/logo.png"
            height={120}
            width={120}
            alt="logo"
          />

          <p className="text-stone-300 text-sm leading-relaxed font-light max-w-sm">
            Dedicated to creating happy beginnings by connecting compassionate families with animals looking for their forever homes.
          </p>

          {/* Social */}
          <div className="flex gap-3 mt-2">

            <Button isIconOnly radius="full" variant="flat"
              className="bg-[#2d6a4f] text-white hover:bg-[#40916c] min-w-9 h-9">
              <FaFacebook className="w-4 h-4" />
            </Button>

            <Button isIconOnly radius="full" variant="flat"
              className="bg-[#2d6a4f] text-white hover:bg-[#40916c] min-w-9 h-9">
              <FaInstagram className="w-4 h-4" />
            </Button>

            <Button isIconOnly radius="full" variant="flat"
              className="bg-[#2d6a4f] text-white hover:bg-[#40916c] min-w-9 h-9">
              <FaTwitter className="w-4 h-4" />
            </Button>

          </div>
        </div>

        {/* Explore */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <h4 className="text-sm font-bold uppercase tracking-wider text-white">
            Explore
          </h4>

          <ul className="flex flex-col gap-2 text-sm text-stone-300 font-light">
            <li className="hover:text-[#52b788] cursor-pointer">Find a Companion</li>
            <li className="hover:text-[#52b788] cursor-pointer">Success Stories</li>
            <li className="hover:text-[#52b788] cursor-pointer">Wellness Journal</li>
            <li className="hover:text-[#52b788] cursor-pointer">Support Our Shelters</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="md:col-span-3 flex flex-col gap-4">
          <h4 className="text-sm font-bold uppercase tracking-wider text-white">
            Contact Us
          </h4>

          <ul className="flex flex-col gap-3 text-sm text-stone-300 font-light">

            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#52b788] mt-0.5" />
              <span>742 Sanctuary Drive, Suite 100, Austin, TX 73301</span>
            </li>

            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-[#52b788]" />
              <span>+1 (512) 555-0192</span>
            </li>

            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-[#52b788]" />
              <span>hello@petnest-hq.com</span>
            </li>

          </ul>
        </div>

        {/* Newsletter */}
        <div className="md:col-span-3 flex flex-col gap-4">

          <h4 className="text-sm font-bold uppercase tracking-wider text-white">
            Stay Updated
          </h4>

          <p className="text-stone-300 text-sm font-light leading-relaxed">
            Join our mailing list to receive community updates, health tips, and adoption events.
          </p>

          <div className="flex flex-col sm:flex-row gap-2 mt-1">

            <Input
              type="email"
              placeholder="Your email address"
              size="sm"
              variant="flat"
              className="bg-[#2d6a4f] rounded-xl text-white placeholder-stone-400"
            />

            <Button className="bg-[#40916c] text-white hover:bg-[#52b788] px-5 rounded-xl">
              Join
            </Button>

          </div>
        </div>

      </div>

      {/* Divider */}
      <div className="border-t border-[#2d6a4f] opacity-60 my-6" />

      {/* Bottom */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-stone-400 font-light">

        <p>© {currentYear} PetNest Inc. All rights reserved.</p>

        <div className="flex gap-6">
          <span className="hover:text-stone-200 cursor-pointer">Privacy Framework</span>
          <span className="hover:text-stone-200 cursor-pointer">Terms of Engagement</span>
          <span className="hover:text-stone-200 cursor-pointer">Cookie Standards</span>
        </div>

      </div>

    </footer>
  );
};

export default Footer;