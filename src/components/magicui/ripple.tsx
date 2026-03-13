import React, { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

interface RippleProps extends ComponentPropsWithoutRef<"div"> {
  mainCircleSize?: number;
  mainCircleOpacity?: number;
  numCircles?: number;
}

export const Ripple = React.memo(function Ripple({
  mainCircleSize = 210,
  mainCircleOpacity = 0.2, // Default to 20%
  numCircles = 8,
  className,
  ...props
}: RippleProps) {
  return (
    <div
      className={cn(
        "pointer-events-none select-none absolute inset-0 overflow-hidden",
        className,
      )}
      {...props}
    >
      {Array.from({ length: numCircles }, (_, i) => {
        const size = mainCircleSize + i * 110;
        // Linear fade that actually keeps circles visible
        const opacity = Math.max(0.01, mainCircleOpacity - i * (mainCircleOpacity / numCircles));
        const animationDelay = `${i * 0.15}s`;

        return (
          <div
            key={i}
            className={cn(
              "absolute animate-ripple rounded-full border-2 bg-accent-primary/[0.02]",
            )}
            style={
              {
                width: `${size}px`,
                height: `${size}px`,
                opacity,
                animationDelay,
                borderStyle: "solid",
                borderColor: `var(--accent-primary)`,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%) scale(1)",
              } as React.CSSProperties
            }
          />
        );
      })}
    </div>
  );
});

Ripple.displayName = "Ripple";
