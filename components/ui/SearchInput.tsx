"use client";

import { useThemeStore } from "@/store/theme";

export default function SearchInput() {
  const { darkmode } = useThemeStore((state) => state);

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search"
        className={`w-40 py-2 px-4 rounded-lg text-sm focus:outline-none transition-colors duration-200 ${
          darkmode
            ? "bg-[#242535] text-[#72737e] border border-[#2f3040] placeholder-[#72737e]"
            : "bg-[#F4F4F5] text-black border border-gray-100 placeholder-gray-400 focus:border-gray-400"
        }`}
      />
      <i
        className={`bi bi-search absolute right-3 top-1/2 transform -translate-y-1/2 text-base transition-colors duration-200 ${
          darkmode ? "text-[#72737e]" : "text-[#52525B]"
        }`}
      ></i>
    </div>
  );
}
