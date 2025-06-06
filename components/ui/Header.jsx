"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ThemeToggle } from "./themetoggle";
import { useThemeStore } from "@/store/theme";
import SignInButton from "./SignInButton";
import SearchInput from "./SearchInput";
import { useUser } from "@/hooks/useUser";
import LogoutButton from "./LogoutButton";

const Header = () => {
  const { darkmode } = useThemeStore((state) => state);
  const user = useUser();

  const navLinkClass = `hover:underline transition-colors duration-200 ${
    darkmode
      ? "text-white hover:text-gray-300"
      : "text-gray-600 hover:text-black"
  }`;

  return (
    <header className={`py-8 ${darkmode ? "bg-[#181a2a]" : ""}`}>
      <div className="container px-4 flex items-center justify-between">
        <Link href="/homepage">
          <Image
            src={darkmode ? "/LogoDark.png" : "/Logo.png"}
            alt="MetaBlog Logo"
            width={158}
            height={36}
          />
        </Link>

        <ul className="flex gap-[40px] text-sm font-medium">
          <li>
            <Link className={navLinkClass} href="/homepage">
              Home
            </Link>
          </li>
          <li>
            <Link className={navLinkClass} href="/write-blog">
              Write a Blog
            </Link>
          </li>
          <li>
            <Link
              className={navLinkClass}
              href={user ? `/author-blogs/?author=${user.id}` : "/author-blogs"}
            >
              My Blogs
            </Link>
          </li>
          <li>
            <a className={navLinkClass} href="#Footer">
              Contact
            </a>
          </li>
        </ul>

        <div className="flex items-center gap-4">
          <SearchInput />
          <ThemeToggle />
          {user ? <LogoutButton /> : <SignInButton />}
        </div>
      </div>
    </header>
  );
};

export default Header;
