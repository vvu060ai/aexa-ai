"use client";

import Link from "next/link";
import { ThemeSwitcher } from "./theme-switcher";
import { useEffect, useState } from "react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ease-in-out ${isScrolled
        ? "top-6 w-[95%] max-w-4xl opacity-100"
        : "top-0 w-full opacity-100"
        }`}
    >
      <div className={`backdrop-blur-xl border transition-all duration-500 flex items-center justify-between px-4 sm:px-10 py-3 sm:py-4 ${isScrolled
        ? "rounded-full bg-foreground text-background shadow-[0_8px_32px_rgba(0,0,0,0.3)] border-white/10 scale-100"
        : "rounded-none bg-black/20 text-white border-transparent scale-100 sm:border-b border-white/5"
        }`}>
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-9 h-9 rounded-xl bg-accent-primary flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-accent-primary/20">
            <span className="text-white font-black text-xl">A</span>
          </div>
          <span className={`font-black text-xl tracking-tighter transition-all duration-300 hidden sm:block ${isScrolled ? 'text-background' : 'text-white'}`}>
            Aexa AI
          </span>
        </Link>

        <nav className="flex items-center gap-4 sm:gap-10 overflow-x-auto no-scrollbar mx-2 sm:mx-4">
          <Link href="#services" className={`text-[9px] sm:text-xs font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] transition-all whitespace-nowrap ${isScrolled ? 'text-background/70 hover:text-background' : 'text-white/70 hover:text-white'}`}>
            Services
          </Link>
          <Link href="#portfolio" className={`text-[9px] sm:text-xs font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] transition-all whitespace-nowrap ${isScrolled ? 'text-background/70 hover:text-background' : 'text-white/70 hover:text-white'}`}>
            Portfolio
          </Link>
          <Link href="#contact" className="text-[9px] sm:text-xs font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-accent-primary hover:text-accent-primary/80 transition-colors whitespace-nowrap">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-4 shrink-0">
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
