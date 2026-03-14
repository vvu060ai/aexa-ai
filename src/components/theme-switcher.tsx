"use client";

import { AnimatedThemeToggler } from "./ui/animated-theme-toggler";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-8 h-8" />; 
  }

  return (
    <AnimatedThemeToggler 
      className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 dark:focus:ring-offset-black text-accent-primary"
    />
  );
}
