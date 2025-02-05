/** @format */

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Logo, MenuButton } from "./SideBar";
import { IoSearchOutline } from "react-icons/io5";
import { useSession } from "next-auth/react";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: session } = useSession();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full h-16 z-50 flex items-center justify-between px-4 md:px-6 transition-colors duration-300 ${
        scrolled ? "bg-[#030303]" : "bg-transparent"
      }`}
    >
      {/* Left Section: Logo */}
      <div className="flex items-center gap-4">
        <MenuButton />
        <Logo />
      </div>

      {/* Center Section: Search Bar */}
      <div className="hidden sm:flex flex-1 items-center justify-center">
        <div className="relative w-full max-w-lg rounded-lg">
          <input
            type="text"
            placeholder="Search song, Album, Artist, podcasts"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#333333] text-sm border border-white/15 text-white rounded-lg px-4 py-[0.625rem] pl-12 focus:outline-none"
          />
          <IoSearchOutline
            size={20}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>

      {/* Right Section: Icons and Profile */}
      <div className="flex items-center gap-4">
        {/* User Profile */}
        <Image
          src={session?.user?.image ?? "/person.png"}
          alt="User Profile"
          width={32}
          height={32}
          className="rounded-full cursor-pointer"
        />
      </div>
    </header>
  );
};

export default Header;
