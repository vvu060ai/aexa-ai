"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useTheme } from 'next-themes';
import { pageContent } from '@/data/pageContent';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { DottedSurface } from '@/components/ui/dotted-surface';
import { GenerativeArtScene } from '@/components/ui/anomalous-matter-hero';
import { MorphingText } from '@/components/ui/liquid-text';

export const HeroSection = React.memo(() => {
  const { hero } = pageContent;
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative w-full overflow-hidden border-b border-border bg-background transition-colors duration-500">
      <DottedSurface />


      {/* 3D orb — desktop right side only */}
      <div className="hidden lg:block absolute right-0 top-0 w-1/2 h-full z-10 pointer-events-none">
        <GenerativeArtScene accentColor={mounted && resolvedTheme === 'light' ? "#f5a315" : "#00E0C6"} />
      </div>

      <div className="container mx-auto px-4 py-20 lg:py-32 relative z-20">
        <div className="max-w-xl lg:max-w-xl flex flex-col gap-6">
          <h1 className="hero-headline text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
            <span className="block">{hero.headlineParts[0]}</span>
            <MorphingText
              texts={["on Autopilot.", "to Scale.", "24/7.", "smarter."]}
              className="h-[1.15em] text-5xl lg:text-7xl text-accent-primary tracking-tight"
            />
          </h1>
          <p className="hero-subheadline text-lg lg:text-xl text-foreground-muted leading-relaxed max-w-lg">
            {hero.subheadline}
          </p>

          <div className="hero-buttons flex flex-col sm:flex-row gap-4 mt-8">
            <Link
              href={hero.buttons.primary.link}
              className="group relative inline-flex h-14 items-center justify-center rounded-lg bg-accent-primary text-white font-bold px-8 border border-transparent transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] shadow-[0_0_15px_var(--glow-color)] hover:shadow-[0_0_40px_var(--glow-color)] overflow-hidden text-lg"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
              <span className="relative z-10">{hero.buttons.primary.text}</span>
            </Link>
            <Link href={hero.buttons.secondary.link} className="z-20">
              <ShimmerButton
                shimmerColor={mounted && resolvedTheme === 'light' ? "#f5a315" : "#00E0C6"}
                background={mounted && resolvedTheme === 'light' ? "#1a1a1a" : "#050505"}
                className="h-14 px-8 font-bold text-lg text-white shadow-[0_0_15px_var(--glow-color)] transition-all duration-300 hover:scale-[1.02]"
                borderRadius="12px"
                shimmerSize="0.1em"
                shimmerDuration="2s"
              >
                {hero.buttons.secondary.text}
              </ShimmerButton>
            </Link>
          </div>

          <div className="hero-trust flex flex-wrap items-center gap-y-3 gap-x-6 mt-8 text-sm font-medium text-foreground-muted">
            {hero.trustBadges.map((badge, idx) => (
              <div key={idx} className="flex items-center gap-2">
                {badge.icon === 'Clock' && <Clock className="w-4 h-4 text-accent-primary" />}
                {badge.icon === 'ShieldCheck' && <ShieldCheck className="w-4 h-4 text-accent-primary" />}
                {badge.icon === 'CheckCircle2' && <CheckCircle2 className="w-4 h-4 text-accent-primary" />}
                <span>{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-accent-primary to-transparent opacity-50 border-glow z-20"></div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";
