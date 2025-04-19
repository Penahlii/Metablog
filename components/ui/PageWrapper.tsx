"use client";

import { useThemeStore } from "@/store/theme";

export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { darkmode, toggle } = useThemeStore((state) => state);
  return (
    <div className={`min-h-screen flex flex-col ${darkmode && "bg-[#181a2a]"}`}>
      {children}
    </div>
  );
}
