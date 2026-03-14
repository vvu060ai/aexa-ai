"use client";

import Link from "next/link";
import { ThemeSwitcher } from "./theme-switcher";
import { useEffect, useState } from "react";
import { LayoutGrid, FolderRoot, MessageSquare } from "lucide-react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      // Background change logic
      setIsScrolled(window.scrollY > 40);

      // Active section tracking
      const sections = ["services", "portfolio", "contact"];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Adjust threshold as needed
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (current) {
        setActiveSection(current);
      } else if (window.scrollY < 100) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getLinkStyles = (id: string) => {
    const isActive = activeSection === id;
    const baseClasses = "flex items-center gap-2 text-[9px] sm:text-xs font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] transition-all whitespace-nowrap";
    
    if (isActive) {
      return `${baseClasses} text-accent-primary drop-shadow-[0_0_8px_var(--glow-color)] scale-110`;
    }

    return `${baseClasses} ${isScrolled ? 'text-background/70 hover:text-background' : 'text-white/70 hover:text-white'}`;
  };

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
          <div className="w-9 h-9 rounded-xl bg-accent-primary flex items-center justify-center group-hover:bg-accent-warm group-hover:scale-110 transition-all duration-300 shadow-lg shadow-accent-primary/20">
            <span className="text-black font-black text-xl">A</span>
          </div>
          <span className={`font-black text-xl tracking-tighter transition-all duration-300 hidden sm:block ${isScrolled ? 'text-background' : 'text-white'}`}>
            Aexa AI
          </span>
        </Link>

        <nav className="flex items-center gap-4 sm:gap-10 mx-2 sm:mx-4">
          <Link href="#services" className={getLinkStyles("services")}>
            <LayoutGrid className="w-3.5 h-3.5 hidden lg:block" />
            Services
          </Link>
          <Link href="#portfolio" className={getLinkStyles("portfolio")}>
            <FolderRoot className="w-3.5 h-3.5 hidden lg:block" />
            Portfolio
          </Link>
          <Link href="#contact" className={getLinkStyles("contact")}>
            <MessageSquare className="w-3.5 h-3.5 hidden lg:block" />
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
