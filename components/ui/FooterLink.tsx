"use client";

import Link from "next/link";
import { useThemeStore } from "@/store/theme";

interface Props {
  href: string;
  children: React.ReactNode;
}

export default function FooterLink({ href, children }: Props) {
  const { darkmode } = useThemeStore((state) => state);

  return (
    <Link
      href={href}
      className={`${
        darkmode
          ? "text-[#86878e] hover:text-white"
          : "text-gray-600 hover:text-black"
      } transition-colors`}
    >
      {children}
    </Link>
  );
}
