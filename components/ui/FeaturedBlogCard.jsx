"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { useThemeStore } from "@/store/theme";

export default function FeaturedBlogCard({ blog }) {
  const { darkmode } = useThemeStore();
  const [categoryName, setCategoryName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");

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
    <div className="debug-container">
      <p>Debug Info:</p>
      <p>Raw Category ID: {blog?.category}</p>
      <p>Processed Category Name: {categoryName}</p>
      <p>Raw Author ID: {blog?.author}</p>
      <p>Processed Author Email: {authorEmail}</p>
      <p>Blog Title: {blog?.title}</p>
    </div>
  );
}
