"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { useThemeStore } from "@/store/theme";
import { useRouter } from "next/navigation";

type BlogCardProps = {
  blog: any;
  canDelete?: boolean;
};

const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength
    ? text.substring(0, maxLength - 3) + "..."
    : text;
};

export default function BlogCard({ blog, canDelete = false }: BlogCardProps) {
  const { darkmode } = useThemeStore();
  const [categoryName, setCategoryName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [showFullTitle, setShowFullTitle] = useState(false);
  const [showFullEmail, setShowFullEmail] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const [categoryRes, authorRes] = await Promise.all([
          fetch(`/api/categories/${blog.category}`),
          fetch(`/api/authors/${blog.author}`),
        ]);

        const [categoryData, authorData] = await Promise.all([
          categoryRes.json(),
          authorRes.json(),
        ]);

        setCategoryName(categoryData.name || "Uncategorized");
        setAuthorEmail(authorData.email || "Unknown Author");
      } catch (err) {
        console.error("Failed to fetch category or author:", err);
      }
    };

    fetchDetails();
  }, [blog]);

  return (
    <div className="group relative w-[360px]">
      <div
        onClick={() => router.push(`/blog/${blog.id}`)}
        className={`cursor-pointer`}
      >
        <div
          className={`rounded-xl overflow-hidden shadow-md border transition-colors duration-300 ${
            darkmode
              ? "bg-[#181a2a] border-white/10"
              : "bg-white border-gray-200"
          }`}
        >
          <div className="p-4 pt-5">
            <div
              className={`relative aspect-[4/3] overflow-hidden rounded-xl border ${
                darkmode ? "border-white/10" : "border-gray-200"
              }`}
            >
              <Image
                src={blog.thumbnail}
                alt={blog.title}
                fill
                className="object-cover rounded-xl"
              />
            </div>
          </div>

          <div className="p-5">
            <div className="mb-3">
              <span
                className={`px-3 py-1 text-sm rounded-md font-medium ${
                  darkmode
                    ? "bg-[#1b1e35] text-[#3c53bc]"
                    : "bg-[#f6f7ff] text-[#8097fd]"
                }`}
              >
                {categoryName}
              </span>
            </div>

            <h2
              className={`text-xl font-semibold mb-3 leading-snug ${
                darkmode ? "text-white" : "text-gray-900"
              }`}
              onMouseEnter={() => setShowFullTitle(true)}
              onMouseLeave={() => setShowFullTitle(false)}
            >
              {showFullTitle ? blog.title : truncateText(blog.title, 60)}
            </h2>

            <div className="flex items-center gap-4 text-sm">
              <Link
                href={`/author/${blog.author}`}
                className={`transition-colors ${
                  darkmode
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-500 hover:text-black"
                }`}
                onClick={(e) => e.stopPropagation()}
                onMouseEnter={() => setShowFullEmail(true)}
                onMouseLeave={() => setShowFullEmail(false)}
              >
                {showFullEmail ? authorEmail : truncateText(authorEmail, 20)}
              </Link>
              <span className={darkmode ? "text-gray-500" : "text-gray-400"}>
                •
              </span>
              <time className={darkmode ? "text-gray-500" : "text-gray-400"}>
                {format(new Date(blog.created_at), "MMMM dd, yyyy")}
              </time>
            </div>
          </div>
        </div>
      </div>

      {canDelete && (
        <button
          onClick={(e) => {
            e.preventDefault();
            console.log("Delete blog:", blog.id);
          }}
          className={`absolute top-4 right-4 p-2 rounded-full bg-red-500 text-white opacity-0 
            group-hover:opacity-100 transition-opacity hover:bg-red-600`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
