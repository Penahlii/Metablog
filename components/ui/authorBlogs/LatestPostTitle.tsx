"use client";

import React from "react";
import { useThemeStore } from "@/store/theme";

const LatestPostTitle = () => {
  const { darkmode } = useThemeStore((state) => state);

  return (
    <div className="container px-4 mb-6">
      <h2
        className={`text-xl font-semibold ${
          darkmode ? "text-white" : "text-[#181a2a]"
        }`}
      >
        Latest Post
      </h2>
    </div>
  );
};

export default LatestPostTitle;
