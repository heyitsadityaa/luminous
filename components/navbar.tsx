"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ModeToggle } from "./mode-toggle";

const Navbar = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <nav className="h-4">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-background">
        {/* Left side - Logo */}
        <div className="flex-1">
          {theme === "dark" ? (
            <Image
              src="/logo-dark.svg"
              alt="Logo Dark"
              width={150}
              height={150}
              loading="eager"
            />
          ) : (
            <Image
              src="/logo-light.svg"
              alt="Logo Light"
              width={150}
              height={150}
              loading="eager"
            />
          )}
        </div>

        {/* Right side - Theme Toggle */}
        <ModeToggle variant="outline" className="rounded-lg" />
      </div>
    </nav>
  );
};

export default Navbar;
