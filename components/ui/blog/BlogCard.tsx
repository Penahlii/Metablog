"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/blogs/${blog.id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to delete the blog");
      }

      router.refresh();
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div className="group relative w-full">
      <div
        onClick={() => router.push(`/blogs/${blog.id}`)}
        className={`cursor-pointer max-w-[420px] mx-auto w-full transition-transform duration-300 ease-in-out group-hover:scale-[1.02]`}
      >
        <div
          className={`rounded-xl overflow-hidden shadow-md border transition-colors duration-300 ${
            darkmode
              ? "bg-[#181a2a] border-white/10"
              : "bg-white border-gray-200"
          }`}
        >
          <div className="p-3">
            <div
              className={`relative aspect-[4/3] overflow-hidden rounded-xl border ${
                darkmode ? "border-white/10" : "border-gray-200"
              }`}
            >
              <img
                src={
                  blog.thumbnail ||
                  "https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg"
                }
                alt={blog.title}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </div>

          <div className="p-4">
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
              {showFullTitle ? blog.title : truncateText(blog.title, 30)}
            </h2>

            <div className="flex items-center gap-4 text-sm">
              <Link
                href={`/author-blogs/?author=${blog.author}`}
                className={`transition-colors ${
                  darkmode
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-500 hover:text-black"
                }`}
                onClick={(e) => e.stopPropagation()}
                onMouseEnter={() => setShowFullEmail(true)}
                onMouseLeave={() => setShowFullEmail(false)}
              >
                {showFullEmail ? authorEmail : truncateText(authorEmail, 30)}
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
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/edit-blog/${blog.id}`);
            }}
            className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
              <path
                fillRule="evenodd"
                d="M2 15a1 1 0 001 1h12a1 1 0 100-2H4a1 1 0 00-1 1z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
            className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600"
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
        </div>
      )}
    </div>
  );
}
