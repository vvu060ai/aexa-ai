"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const WobbleCard = ({
  children,
  containerClassName,
  className,
}: {
  children: React.ReactNode;
  containerClassName?: string;
  className?: string;
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = event;
    const { rect } = event.currentTarget.getBoundingClientRect() as any;
    const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width;
    const y = (clientY - top) / height;

    setMousePosition({ x, y });
  };

  return (
    <motion.section
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      animate={{
        transform: isHovering
          ? `translate3d(${mousePosition.x * 20}px, ${mousePosition.y * 20}px, 0) rotate3d(${-mousePosition.y}, ${mousePosition.x}, 0, 1deg)`
          : "translate3d(0px, 0px, 0px) rotate3d(0, 0, 0, 0deg)",
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 20,
      }}
      className={cn(
        "relative h-full w-full overflow-hidden rounded-2xl",
        containerClassName
      )}
    >
      <div
        className="relative h-full sm:mx-0 sm:rounded-2xl"
      >
        <motion.div
          style={{
            transform: isHovering
              ? `translate3d(${-mousePosition.x * 20}px, ${-mousePosition.y * 20}px, 0)`
              : "translate3d(0px, 0px, 0px)",
          }}
          className={cn("h-full px-4 py-20 sm:px-10", className)}
        >
          {children}
        </motion.div>
      </div>
    </motion.section>
  );
};
