"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useTheme } from 'next-themes';
import { pageContent } from '@/data/pageContent';
import { ShimmerButton } from '@/components/ui/shimmer-button';

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[450px] lg:h-[700px] flex items-center justify-center rounded-3xl bg-black animate-pulse border border-white/10 z-10 relative">
      <div className="flex flex-col items-center gap-4 opacity-50">
        <div className="w-12 h-12 border-4 border-accent-primary border-t-transparent rounded-full animate-spin"></div>
        <span className="text-accent-primary font-medium tracking-widest text-sm uppercase">Loading Engine</span>
      </div>
    </div>
  ),
});

export const HeroSection = React.memo(() => {
  const { hero } = pageContent;
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const radialGradient = mounted && resolvedTheme === 'light'
    ? 'bg-[radial-gradient(circle_at_80%_50%,rgba(255,190,0,0.35)_0%,rgba(255,190,0,0)_70%)]'
    : 'bg-[radial-gradient(circle_at_80%_50%,rgba(0,224,198,0.35)_0%,rgba(0,0,0,0)_60%)]';

  return (
    <section className="relative w-full overflow-hidden border-b border-border bg-black text-white transition-colors duration-500">
      <div className="absolute inset-0 w-full h-full bg-[var(--hero-orb-color)] pointer-events-none"></div>

      <div className="container mx-auto px-4 py-20 lg:py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <div className="flex flex-col gap-6 z-20 max-w-2xl md:pr-10">
            <h1 className="hero-headline text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
              {hero.headlineParts[0]} <span className="text-accent-primary text-glow">{hero.headlineHighlight}</span> {hero.headlineParts[1]}
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

          <div className="hero-spline hidden lg:block relative w-full h-[450px] lg:h-[700px] rounded-3xl overflow-hidden isolate z-10 bg-transparent cursor-grab active:cursor-grabbing">
            <div className={`absolute inset-0 ${radialGradient} pointer-events-none z-0`}></div>

            <div className="absolute inset-y-0 -right-50 w-[240%] h-full pointer-events-auto mix-blend-screen z-10">
              <Spline
                scene={hero.splineScene}
                className="w-full h-full"
              />
            </div>

            <div className="absolute bottom-4 right-4 w-full h-10 bg-black z-20 pointer-events-none blur-[2px] rounded-bl-3xl"></div>
            <div className="absolute bottom-0 right-0 w-full h-12 bg-black z-30 pointer-events-none rounded-br-3xl"></div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-accent-primary to-transparent opacity-50 border-glow z-20"></div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";
