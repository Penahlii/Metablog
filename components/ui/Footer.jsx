"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useThemeStore } from "@/store/theme";
import FooterLink from "./FooterLink";

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
    <footer
      className={`${darkmode ? "bg-[#141624] border-[#242535]" : "bg-[#f6f6f7] border-gray-200"} text-gray-700 text-sm border-t`}
    >
      <div className="container px-4 py-12 flex flex-col md:flex-row justify-between gap-8">
        {/* Left Section: About */}
        <div className="max-w-md">
          <h3 className={`font-semibold mb-3 ${darkmode ? "text-white" : ""}`}>
            About
          </h3>
          <p
            className={`mb-3 leading-relaxed text-left max-w-xs ${darkmode ? "text-[#86878e]" : "text-gray-600"}`}
          >
            MetaBlog is a platform where ideas come to life. We empower writers
            to share insights, tell stories, and connect with readers around the
            world—one blog at a time.
          </p>
          <p className={`mb-1 text-left ${darkmode ? "text-[#86878e]" : ""}`}>
            <strong className={darkmode ? "text-white" : ""}>Email:</strong>{" "}
            penahliibrahim58@gmail.com
          </p>

          <p className={`mb-1 text-left ${darkmode ? "text-[#86878e]" : ""}`}>
            <strong className={darkmode ? "text-white" : ""}>Phone:</strong>{" "}
            +994 55 216 59 85
          </p>
        </div>

        {/* Right Section: Quick Links and Categories */}
        <div className="grid grid-cols-2 gap-8 self-start text-left">
          <div className="relative -ml-10">
            <h3
              className={`font-semibold mb-3 ${darkmode ? "text-white" : ""}`}
            >
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <FooterLink href="/homepage">Home</FooterLink>
              </li>
              <li>
                <FooterLink href="/write-blog">Write a Blog</FooterLink>
              </li>
              <li>
                <FooterLink href="/my-blogs">My Blogs</FooterLink>
              </li>
              <li>
                <FooterLink href="/contact">Contact</FooterLink>
              </li>
            </ul>
          </div>

          <div>
            <h3
              className={`font-semibold mb-3 ${darkmode ? "text-white" : ""}`}
            >
              Category
            </h3>
            <ul className="space-y-2">
              {categories.length > 0 ? (
                categories.map((category) => (
                  <li key={category.id}>
                    <FooterLink href={`/homepage/?category=${category.id}`}>
                      {category.name}
                    </FooterLink>
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
      <div
        className={`${darkmode ? "border-[#242535]" : "border-gray-200"} container px-4 py-6 flex flex-col md:flex-row items-center justify-between text-gray-500 text-xs border-t`}
      >
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
            <p className={`mb-1 text-left ${darkmode ? "text-[#86878e]" : ""}`}>
              &copy; Penahli 2025. All Rights Reserved.
            </p>
          </div>
        </div>
        <div className="space-x-4 text-right w-full md:w-auto">
          <FooterLink href="/terms">Terms of Use</FooterLink>
          <FooterLink href="/privacy">Privacy Policy</FooterLink>
          <FooterLink href="/cookies">Cookie Policy</FooterLink>
        </div>
      </div>
    </footer>
  );
}
