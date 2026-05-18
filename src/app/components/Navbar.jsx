"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoMdHome } from "react-icons/io";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Load saved theme OR system theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
    } else {
      setDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }, []);

  // Apply theme
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <nav className="flex justify-between items-center p-5 bg-white dark:bg-gray-900 dark:text-white transition-colors duration-300">

      {/* Left */}
      <div>
        <Image src="/assets/logo.png" height={120} width={120} alt="logo" />
      </div>

      {/* Center */}
      <ul className="flex gap-6 items-center">
        <li>
          <Link href="/" className="flex items-center gap-1">
            <IoMdHome /> Home
          </Link>
        </li>
        <li>
          <Link href="/pets" className="flex items-center gap-1">
            <CiSearch /> All Pets
          </Link>
        </li>
      </ul>

      {/* Right */}
      <div className="flex items-center gap-4">

        {/* Theme Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-3 py-1 border rounded hover:scale-105 transition"
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>

        <Link href="/profile">Profile</Link>
        <Link href="/login">Login</Link>
        <Link href="/signUp">Sign Up</Link>

      </div>

      {/* Profile Dropdown Container */}
      <div className="relative group flex flex-col items-center">

        {/* Profile Button */}
        <button className="flex items-center gap-2 px-3 py-2 rounded-full border hover:bg-gray-100 dark:hover:bg-gray-800 transition">
          
          {/* Avatar */}
          <Image
            src="/assets/me.jpg"
            alt="profile"
            width={32}
            height={32}
            className="rounded-full"
          />

          <span className="font-medium">Mr</span>

          <span className="text-sm">⌄</span>
        </button>

        {/* Dropdown Box */}
        <div className="absolute left-1/2 -translate-x-1/2 top-full w-64 bg-white dark:bg-gray-900 shadow-lg rounded-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 mt-1">
          
          {/* Invisible padding area that keeps the mouse hover active */}
          <div className="absolute -top-3 left-0 right-0 h-3 bg-transparent" />

          {/* User Info */}
          <div className="p-4 border-b dark:border-gray-700">
            <p className="font-semibold">Mr Ananya Chakraborty Gourab</p>
            <p className="text-sm text-gray-500">aborty174@gmail.com</p>
          </div>

          {/* Menu */}
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 w-full"
          >
            📊 Dashboard
          </Link>

          <button
            className="w-full text-left flex items-center gap-2 px-4 py-3 hover:bg-yellow-400 hover:text-black transition"
          >
            🚪 Logout
          </button>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;