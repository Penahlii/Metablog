"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useThemeStore } from "@/store/theme";

interface BlogFormProps {
  id?: string;
}

interface Category {
  id: string;
  name: string;
}

export default function BlogForm({ id }: BlogFormProps) {
  const router = useRouter();
  const { darkmode } = useThemeStore();

  const [formData, setFormData] = useState({
    title: "",
    categoryId: "",
    thumbnail: "",
    body: "",
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data || []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (id) {
      const fetchBlog = async () => {
        try {
          const res = await fetch(`/api/blogs/${id}`);
          const data = await res.json();
          setFormData({
            title: data.title || "",
            categoryId: data.category || "",
            thumbnail: data.thumbnail || "",
            body: data.body || "",
          });
        } catch (error) {
          console.error("Failed to fetch blog:", error);
        }
      };

      fetchBlog();
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const payload = {
        title: formData.title,
        thumbnail: formData.thumbnail,
        body: formData.body,
        category: formData.categoryId,
      };

      const res = await fetch(id ? `/api/blogs/${id}` : "/api/blogs", {
        method: id ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push("/");
      } else {
        const errorData = await res.json();
        alert(errorData.error || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error submitting blog:", error);
      alert("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`w-[768px] mx-auto px-6 py-12 ${darkmode ? "bg-[#181a2a] text-white" : ""}`}
    >
      <h1 className="text-4xl font-bold text-center mb-12">
        {id ? "Edit your blog" : "Write a new blog"}
      </h1>

      <div className="flex flex-col gap-8">
        {/* Title */}
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Add title for blog"
          className={`border rounded-lg p-5 text-lg focus:outline-none focus:ring-2 ${
            darkmode
              ? "bg-[#141624] border-[#242535] text-white focus:ring-yellow-400"
              : "border-gray-300 text-black focus:ring-blue-500"
          }`}
        />

        {/* Category */}
        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          className={`border rounded-lg p-5 text-lg focus:outline-none focus:ring-2 ${
            darkmode
              ? "bg-[#141624] border-[#242535] text-white focus:ring-yellow-400"
              : "border-gray-300 text-black focus:ring-blue-500"
          }`}
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Thumbnail */}
        <input
          type="text"
          name="thumbnail"
          value={formData.thumbnail}
          onChange={handleChange}
          placeholder="Add thumbnail image URL"
          className={`border rounded-lg p-5 text-lg focus:outline-none focus:ring-2 ${
            darkmode
              ? "bg-[#141624] border-[#242535] text-white focus:ring-yellow-400"
              : "border-gray-300 text-black focus:ring-blue-500"
          }`}
        />

        {/* Body */}
        <textarea
          name="body"
          value={formData.body}
          onChange={handleChange}
          placeholder="Add blog body"
          rows={15}
          className={`border rounded-lg p-5 text-lg focus:outline-none focus:ring-2 resize-none ${
            darkmode
              ? "bg-[#141624] border-[#242535] text-white focus:ring-yellow-400"
              : "border-gray-300 text-black focus:ring-blue-500"
          }`}
        ></textarea>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`font-bold py-5 text-lg rounded-lg transition-all ${
            darkmode
              ? "bg-yellow-400 text-black hover:bg-yellow-500"
              : "bg-yellow-400 text-black hover:bg-yellow-500"
          }`}
        >
          {isSubmitting
            ? id
              ? "Updating..."
              : "Submitting..."
            : id
              ? "Update Blog"
              : "Submit Blog"}
        </button>
      </div>
    </div>
  );
}
