"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoMdHome } from "react-icons/io";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const { data: session } = authClient.useSession();

  // Load saved theme OR system theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
  }
  )

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

  // FIXED: Explicit handler function clears up any syntax highlighter/linter underlines
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  return (
    <nav className="flex justify-between items-center p-5 bg-white dark:bg-gray-900 dark:text-white transition-colors duration-300">

      {/* Left - Include: Logo + Website Name */}
      <Link href="/" className="flex items-center gap-2">
        <Image src="/assets/logo.png" height={40} width={40} alt="logo" />
        <span className="font-bold text-xl tracking-tight">AdoptPet</span>
      </Link>

      {/* Center - Routes Control */}
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
        
        {/* Made permanently visible alongside Home and All Pets */}
        <li>
          <Link href="/pages/Home/Dashboard" className="flex items-center gap-1">
            📋 My Requests
          </Link>
        </li>
        <li>
          <Link href="pages/Home/Dashboard" className="flex items-center gap-1">
            ➕ Add Pet
          </Link>
        </li>
      </ul>

      {/* Right Container */}
      <div className="flex items-center gap-4">

        {/* Theme Toggle */}
        <button
          onClick={toggleDarkMode}
          className="px-3 py-1 border rounded hover:scale-105 transition"
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>

        {/* Auth Condition Container */}
        {session ? (
          /* Profile menu wrapper nested within the right flex container */
          <div className="relative group flex flex-col items-center">

            {/* Profile Trigger Button */}
            <button className="flex items-center gap-2 px-3 py-2 rounded-full border hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              {/* Avatar */}
              <Image
                src={session.user?.image || "/assets/me.jpg"}
                alt="profile"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="font-medium">
                {session.user?.name ? session.user.name.split(" ")[0] : "User"}
              </span>
              <span className="text-sm">⌄</span>
            </button>

            {/* Dropdown Box - Hover interaction layer */}
            <div className="absolute right-0 top-full w-64 bg-white  shadow-xl rounded-xl border border-gray-100 dark:border-gray-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 mt-2 block">
              
              {/* Invisible padding area that keeps the mouse hover active */}
              <div className="absolute -top-3 left-0 right-0 h-3 bg-transparent" />

              {/* User Info */}
              <div className="p-4 border-b border-white-100 border-white-800">
                <p className="font-semibold text-green-900 :text-green truncate">
                  {session.user?.name || "Mr Ananya Chakraborty Gourab"}
                </p>
                <p className="text-sm text-green-500 truncate">
                  {session.user?.email || "aborty174@gmail.com"}
                </p>
              </div>

              {/* Menu Actions */}
              <div className="flex flex-col">
                <Link
                  href="/pages/Home/Dashboard"
                  className="flex items-center gap-2 px-4 py-3 text-green-700 text-green-200 hover:bg-green-100 hover:bg-green-800 w-full text-left transition"
                >
                  📊 Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full text-left flex items-center gap-2 px-4 py-3 text-red-700 text-red-200 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 transition"
                >
                  🚪 Logout
                </button>
              </div>

            </div>
          </div>
        ) : (
          /* Programmatic button-based navigation to eliminate the login click freeze issue */
          <button 
            onClick={() => router.push("/login")}
            className="px-4 py-2 rounded-full bg-green-600 hover:bg-green-700 text-white font-medium transition cursor-pointer"
          >
            Sign In
          </button>
        )}

      </div>
    </nav>
  );
};

export default Navbar;