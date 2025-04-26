"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { useThemeStore } from "@/store/theme";

interface BlogDetailProps {
  id: string;
}

export default function BlogDetail({ id }: BlogDetailProps) {
  const { darkmode } = useThemeStore();
  const [blog, setBlog] = useState<any>(null);
  const [categoryName, setCategoryName] = useState("Uncategorized");
  const [authorEmail, setAuthorEmail] = useState("Unknown Author");

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const blogRes = await fetch(`/api/blogs/${id}`);
        if (!blogRes.ok) throw new Error("Failed to fetch blog");
        const blogData = await blogRes.json();
        setBlog(blogData);

        if (blogData?.category) {
          const categoryRes = await fetch(
            `/api/categories/${blogData.category}`
          );
          if (categoryRes.ok) {
            const categoryData = await categoryRes.json();
            setCategoryName(categoryData.name || "Uncategorized");
          }
        }

        if (blogData?.author) {
          const authorRes = await fetch(`/api/authors/${blogData.author}`);
          if (authorRes.ok) {
            const authorData = await authorRes.json();
            setAuthorEmail(authorData.email || "Unknown Author");
          }
        }
      } catch (error) {
        console.error("Error fetching blog details:", error);
      }
    };

    if (id) {
      fetchBlogDetails();
    }
  }, [id]);

  if (!blog) {
    return <div className="p-8 text-center text-gray-500">Loading blog...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-4xl mx-auto p-6"
    >
      {/* Category Badge */}
      <div className="mb-5">
        <span className="bg-[#4b6bfb] text-white px-4 py-2 text-base rounded-lg font-semibold">
          {categoryName}
        </span>
      </div>

      {/* Title */}
      <h1
        className={`text-3xl font-bold mb-4 leading-tight ${
          darkmode ? "text-white" : "text-[#181a2a]"
        }`}
      >
        {blog.title}
      </h1>

      {/* Author and Date */}
      <div className="flex items-center gap-3 mb-6 text-sm text-[#696a75]">
        <Link
          href={`/author-blogs/?author=${blog.author}`}
          className={`hover:underline ${darkmode && "hover:text-white"}`}
        >
          {authorEmail}
        </Link>
        <span>•</span>
        <time>{format(new Date(blog.created_at), "MMMM dd, yyyy")}</time>
      </div>

      {/* Thumbnail Image */}
      {blog.thumbnail && (
        <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-8 border border-gray-200">
          <img
            src={blog.thumbnail}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Body */}
      <div
        className={`prose prose-lg max-w-4xl ${
          darkmode ? "prose-invert text-white" : ""
        }`}
        dangerouslySetInnerHTML={{ __html: blog.body }}
      />
    </motion.div>
  );
}
