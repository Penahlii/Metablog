"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useThemeStore } from "@/store/theme";

export default function Footer() {
  const { darkmode } = useThemeStore((state) => state);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <footer className="bg-[#f6f6f7] text-gray-700 text-sm border-t border-gray-200">
      <div className="container px-4 py-12 flex flex-col md:flex-row justify-between gap-8">
        {/* Left Section: About */}
        <div className="max-w-md">
          <h3 className="font-semibold mb-3">About</h3>
          <p className="mb-3 leading-relaxed text-gray-600 text-left max-w-xs">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam.
          </p>
          <p className="mb-1 text-left">
            <strong>Email:</strong> penahliibrahim58@gmail.com
          </p>
          <p className="text-left">
            <strong>Phone:</strong> +994 55 216 59 85
          </p>
        </div>

        {/* Right Section: Quick Links and Categories */}
        <div className="grid grid-cols-2 gap-8 self-start text-left">
          <div className="relative -ml-10">
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link className="hover:text-black" href="/homepage">
                  Home
                </Link>
              </li>
              <li>
                <Link className="hover:text-black" href="/write-blog">
                  Write a Blog
                </Link>
              </li>
              <li>
                <Link className="hover:text-black" href="/my-blogs">
                  My Blogs
                </Link>
              </li>
              <li>
                <Link className="hover:text-black" href="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Category</h3>
            <ul className="space-y-2">
              {categories.length > 0 ? (
                categories.map((category) => (
                  <li key={category.id}>
                    <Link
                      className="hover:text-black"
                      href={`/homepage/?category=${category.id}`}
                    >
                      {category.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-gray-400">Loading...</li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="container px-4 py-6 flex flex-col md:flex-row items-center justify-between text-gray-500 text-xs border-t border-gray-200">
        <div className="flex items-center gap-2 mb-2 md:mb-0">
          <Image
            src={darkmode ? "/BLogoDark.png" : "/BLogo.png"}
            alt="MetaBlog Logo"
            width={40}
            height={40}
          />
          <div>
            <Image
              src={darkmode ? "/MetaBlogDark.png" : "/MetaBlog.png"}
              alt="MetaBlog Logo"
              width={90}
              height={90}
              className="pb-1"
            />
            <p className="text-xs text-gray-600">
              &copy; Penahli 2025. All Rights Reserved.
            </p>
          </div>
        </div>
        <div className="space-x-4 text-right w-full md:w-auto">
          <Link className="hover:text-black" href="/terms">
            Terms of Use
          </Link>
          <Link className="hover:text-black" href="/privacy">
            Privacy Policy
          </Link>
          <Link className="hover:text-black" href="/cookies">
            Cookie Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
