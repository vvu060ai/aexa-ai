"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

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
        "rounded-3xl relative overflow-hidden h-[500px] w-full transition-all duration-500 ease-out border border-border bg-background group",
        hovered !== null && hovered !== index && "blur-[2px] scale-[0.98] opacity-50"
      )}
    >
      {/* Background Image with Overlay */}
      <img
        src={card.src}
        alt={card.title}
        className="object-cover absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-110"
      />
      
      {/* Dynamic Overlay */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent transition-opacity duration-500",
          hovered === index ? "opacity-90" : "opacity-70"
        )}
      />

      {/* Content */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end">
        <div className="relative z-10">
          {/* Badge */}
          {card.badge && (
            <div className="mb-4">
              <span className="px-3 py-1 rounded-full bg-accent-primary/20 text-accent-primary text-[10px] font-bold uppercase tracking-widest border border-accent-primary/30 backdrop-blur-md">
                {card.badge}
              </span>
            </div>
          )}

          {/* Title & Icon */}
          <div className="flex items-center gap-3 mb-3">
             {card.icon && <div className="text-accent-primary">{card.icon}</div>}
             <h3 className="text-2xl font-bold text-white leading-tight">
              {card.title}
            </h3>
          </div>

          {/* Description - always visible but maybe slightly faded when not hovered? */}
          <p className={cn(
            "text-gray-300 leading-relaxed text-sm transition-all duration-500",
            hovered === index ? "opacity-100 max-h-40 mb-6" : "opacity-0 max-h-0 overflow-hidden"
          )}>
            {card.description}
          </p>

          {/* Always-visible action */}
          {card.action && (
            <div className="mb-4">{card.action}</div>
          )}

          {/* Footer / Stats */}
          <div className={cn(
            "transition-all duration-500",
            hovered === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
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
