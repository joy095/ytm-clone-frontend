/** @format */
"use client";

import { memo } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineBars3 } from "react-icons/hi2";
import {
  MdExplore,
  MdLibraryMusic,
  MdOutlineExplore,
  MdOutlineLibraryMusic,
} from "react-icons/md";
import { useSession, signIn } from "next-auth/react";
import { TfiPlus } from "react-icons/tfi";
import { IoMdHome, IoMdPlayCircle } from "react-icons/io";
import { VscHome } from "react-icons/vsc";

const navigationLinks = [
  {
    id: 1,
    name: "Home",
    link: "/",
    icon: VscHome,
    activeIcon: IoMdHome,
  },
  {
    id: 2,
    name: "Explore",
    link: "/explore",
    icon: MdOutlineExplore,
    activeIcon: MdExplore,
  },
  {
    id: 3,
    name: "Library",
    link: "/library",
    icon: MdOutlineLibraryMusic,
    activeIcon: MdLibraryMusic,
  },
] as const;

export const MenuButton = memo(() => (
  <button
    className="hover:bg-secondary h-9 w-9 flex items-center justify-center rounded-full transition-colors duration-200"
    aria-label="Toggle menu"
  >
    <HiOutlineBars3 size={26} color="white" />
  </button>
));

MenuButton.displayName = "MenuButton";

export const Logo = memo(() => (
  <Link href="/" aria-label="Go to home page">
    <Image src="/logo_dark.svg" alt="logo" width={71} height={71} priority />
  </Link>
));

Logo.displayName = "Logo";

const Divider = memo(({ className = "" }: { className?: string }) => (
  <div
    className={`border-t border-default my-6 mx-4 ${className}`}
    role="separator"
  />
));

Divider.displayName = "Divider";

const SideBar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  const isActive = (href: string) => pathname === href;

  return (
    <aside className="flex flex-col border-r border-secondary w-[15rem] h-[100vh]">
      {/* Header Section */}
      <header className="h-16 flex items-center gap-3 pl-4">
        {/* <MenuButton />
        <Logo /> */}
      </header>

      {/* Navigation Links */}
      <div className="pt-2 px-2">
        {navigationLinks.map((link) => {
          const active = isActive(link.link);
          const Icon = active && link.activeIcon ? link.activeIcon : link.icon;

          return (
            <Link
              href={link.link}
              key={link.id}
              className={`flex gap-5 items-center px-5 font-medium rounded-lg h-12 transition-colors duration-200 ${
                active ? "bg-default" : "hover:bg-secondary"
              }`}
              aria-current={active ? "page" : undefined}
            >
              <Icon size={23} />
              {link.name}
            </Link>
          );
        })}
      </div>

      <Divider />

      {/* User Section */}
      {!session ? (
        <div className="px-6">
          <button
            onClick={() => signIn()}
            className="bg-default text-white px-4 py-2 rounded-3xl w-full text-sm hover:bg-secondary transition-colors duration-200"
          >
            Sign In
          </button>

          <p className="text-xs text-[#909090] mt-2">
            Sign in to create & share playlists, get personalized
            recommendations, and more.
          </p>
        </div>
      ) : (
        <>
          <div className="px-6">
            <button className="bg-default text-white px-4 py-2 rounded-3xl w-full text-sm flex gap-3 items-center justify-center hover:bg-secondary transition-colors duration-200">
              <TfiPlus size={20} />
              New Playlist
            </button>
          </div>

          <div className="px-2 mt-4">
            <div className="px-4 py-2 flex justify-between rounded-lg hover:bg-secondary transition-colors duration-200">
              <Link
                className="flex flex-col justify-center w-full font-medium"
                href="/liked"
              >
                <span className="text-sm">Liked Music</span>
                <span className="text-xs">Auto Playlist</span>
              </Link>

              <button className="h-full my-auto">
                <IoMdPlayCircle size={26} />
              </button>
            </div>
          </div>
        </>
      )}
    </aside>
  );
};

export default memo(SideBar);
