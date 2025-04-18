"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ThemeToggle } from "./themetoggle";
import { useThemeStore } from "@/store/theme";

const Header = () => {
  const { darkmode, toggle } = useThemeStore((state) => state);

  return (
    <header className="py-8">
      <div className="container px-4 flex items-center justify-between">
        <Link href="/homepage">
          <Image
            src={darkmode ? "/LogoDark.png" : "/Logo.png"}
            alt="MetaBlog Logo"
            width={158}
            height={36}
          />
        </Link>

        <ul className="flex gap-[40px] text-sm font-medium text-gray-600">
          <li className="hover:text-black">
            <Link href="/homepage">Home</Link>
          </li>
          <li className="hover:text-black">
            <Link href="/write-blog">Write a Blog</Link>
          </li>
          <li className="hover:text-black">
            <Link href="/my-blogs">My Blogs</Link>
          </li>
          <li className="hover:text-black">
            <Link href="/contact">Contact</Link>
          </li>
        </ul>

        <div className="flex items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-40 py-2 px-4 border border-gray-100 bg-[#F4F4F5] rounded-lg text-sm focus:outline-none focus:border-gray-400"
            />
            <i className="bi bi-search absolute right-3 top-1/2 transform -translate-y-1/2 text-[#52525B] text-base"></i>
          </div>

          <ThemeToggle />

          <button className="ml-[36px]">
            <Link
              href="/sign-in"
              className="px-4 py-2 text-sm font-normal text-white bg-[#141624] rounded-[5px] hover:opacity-90 inline-block"
            >
              Sign in
            </Link>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
