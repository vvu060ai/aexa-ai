"use client"

import { useRef, useState, useCallback, ReactNode } from "react"
import { cn } from "@/lib/utils"

interface GlowCardProps {
  children: ReactNode
  className?: string
  glowColor?: 'blue' | 'purple' | 'green' | 'red' | 'orange' | 'teal'
  size?: 'sm' | 'md' | 'lg'
  width?: string | number
  height?: string | number
  customSize?: boolean
  borderOnly?: boolean
}

const glowHueMap: Record<string, number> = {
  blue: 220, purple: 280, green: 120, red: 0, orange: 30, teal: 174,
}

const sizeMap = {
  sm: 'w-48 h-64',
  md: 'w-64 h-80',
  lg: 'w-80 h-96',
}

const GlowCard = ({
  children,
  className = '',
  glowColor = 'teal',
  size = 'md',
  customSize = false,
  borderOnly = false,
}: GlowCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0, active: false })

  // Falls back to glowColorMap hue only when a non-teal color is explicitly requested.
  // Default ("teal") defers to --glow-hue so light/dark mode auto-switches.
  const hue = glowColor === 'teal' ? 'var(--glow-hue, 174)' : String(glowHueMap[glowColor] ?? 174)

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top, active: true })
  }, [])

  const onMouseLeave = useCallback(() => {
    setMouse(m => ({ ...m, active: false }))
  }, [])

  if (borderOnly) {
    return (
      <div
        ref={cardRef}
        className={cn("relative w-full h-full rounded-2xl", className)}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        {/*
          Border-only glow overlay:
          - Absolutely positioned, extends 1.5px outside the wrapper (inset: -1.5px)
          - padding: 1.5px creates the "border strip" geometry
          - mask XOR: first layer covers content-box (interior), second covers border-box (everything)
            XOR = show only where exactly ONE layer applies = the 1.5px border strip
          - radial-gradient follows cursor, visible only in that strip
        */}
        <div
          aria-hidden
          className="pointer-events-none absolute rounded-[inherit] transition-opacity duration-300"
          style={{
            inset: '-1.5px',
            padding: '1.5px',
            opacity: mouse.active ? 1 : 0,
            background: `radial-gradient(
              280px circle at ${mouse.x}px ${mouse.y}px,
              hsl(${hue} 100% 55% / 0.9),
              hsl(${hue} 80% 45% / 0.4) 40%,
              transparent 70%
            )`,
            WebkitMask:
              'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />
        {children}
      </div>
    )
  }

  // Full card mode
  return (
    <div
      ref={cardRef}
      className={cn(
        !customSize && sizeMap[size],
        !customSize && 'aspect-[3/4]',
        'relative rounded-2xl shadow-[0_1rem_2rem_-1rem_black] p-4 backdrop-blur-[5px]',
        className,
      )}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Background spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
        style={{
          opacity: mouse.active ? 1 : 0,
          background: `radial-gradient(
            200px circle at ${mouse.x}px ${mouse.y}px,
            hsl(${hue} 100% 55% / 0.12),
            transparent 70%
          )`,
        }}
      />
      {/* Border spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute rounded-[inherit] transition-opacity duration-300"
        style={{
          inset: '-1.5px',
          padding: '1.5px',
          opacity: mouse.active ? 1 : 0,
          background: `radial-gradient(
            280px circle at ${mouse.x}px ${mouse.y}px,
            hsl(${hue} 100% 55% / 0.9),
            transparent 70%
          )`,
          WebkitMask:
            'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      {children}
    </div>
  )
}

export { GlowCard }
