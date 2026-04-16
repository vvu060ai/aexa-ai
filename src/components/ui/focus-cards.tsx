"use client";
import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: any;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "rounded-3xl relative overflow-hidden h-[500px] w-full transition-all duration-500 ease-out border border-accent-primary/40 bg-background group shadow-[0_0_20px_var(--glow-color)] md:border-border md:shadow-none",
        hovered !== null && hovered !== index && "md:blur-[2px] md:scale-[0.98] md:opacity-50"
      )}
    >
      {/* Background Image + Overlay — desktop only */}
      <div className="hidden md:block absolute inset-0">
        <Image
          src={card.src}
          alt={card.title}
          fill
          sizes="50vw"
          loading="lazy"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent transition-opacity duration-500",
            hovered === index ? "opacity-90" : "opacity-70"
          )}
        />
      </div>

      {/* Badge — top-left */}
      {card.badge && (
        <div className="absolute top-6 left-6 z-10">
          <span className="px-3 py-1 rounded-full bg-accent-primary/70 text-black text-xs font-bold uppercase tracking-widest border border-accent-primary/30 backdrop-blur-md">
            {card.badge}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end">
        <div className="relative z-10">
          {/* Title & Icon */}
          <div className="flex items-center gap-3 mb-3">
            {card.icon && <div className="text-accent-primary">{card.icon}</div>}
            <h3 className="text-2xl font-bold text-accent-primary sm:text-white leading-tight">
              {card.title}
            </h3>
          </div>

          {/* Description — always visible on mobile, reveal on hover on desktop */}
          <p className={cn(
            "text-black dark:text-white sm:text-white sm:bg-black/50 p-2 rounded-lg leading-relaxed text-sm font-semibold transition-all duration-500",
            hovered === index
              ? "opacity-100 max-h-40 mb-6"
              : "opacity-100 max-h-40 mb-6 md:opacity-0 md:max-h-0 md:overflow-hidden md:mb-0"
          )}>
            {card.description}
          </p>

          {/* Always-visible action */}
          {card.action && (
            <button className="mb-0 w-full cursor-pointer!">{card.action}</button>
          )}

          {/* Footer / Stats — always visible on mobile, reveal on hover on desktop */}
          <div className={cn(
            "transition-all duration-500",
            hovered === index
              ? "opacity-100 translate-y-0"
              : "opacity-100 translate-y-0 md:opacity-0 md:translate-y-4"
          )}>
            {card.footer && <div className="pt-4 border-t border-white/10">{card.footer}</div>}
          </div>
        </div>
      </div>
    </div>
  )
);

Card.displayName = "Card";

type CardType = {
  title: string;
  src: string;
  description?: string;
  badge?: string;
  icon?: React.ReactNode;
  footer?: React.ReactNode;
  action?: React.ReactNode;
};

export function FocusCards({ cards }: { cards: CardType[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto w-full">
      {cards.map((card, index) => (
        <Card
          key={card.title}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
}
