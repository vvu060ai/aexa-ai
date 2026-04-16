"use client";

import React from 'react';
import { useTheme } from 'next-themes';
import { GlowCard } from "@/components/ui/spotlight-card";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { CheckCircle2 } from 'lucide-react';
import { pageContent } from '@/data/pageContent';
import { Icon } from '@/components/ui/Icon';
import { FallingPattern } from '@/components/ui/falling-pattern';

const darkColors = {
  gradientBackgroundStart: "transparent",
  gradientBackgroundEnd: "transparent",
  firstColor:   "0, 224, 198",   // teal primary
  secondColor:  "0, 160, 140",   // deep teal
  thirdColor:   "0, 200, 180",   // mid teal
  fourthColor:  "255, 140, 89",  // warm accent
  fifthColor:   "0, 100, 90",    // darkest teal
  pointerColor: "0, 224, 198",
  blendingValue: "hard-light",
};

const lightColors = {
  gradientBackgroundStart: "transparent",
  gradientBackgroundEnd: "transparent",
  firstColor:   "245, 163, 21",  // golden primary
  secondColor:  "217, 119, 6",   // amber
  thirdColor:   "250, 190, 60",  // light gold
  fourthColor:  "255, 140, 50",  // warm orange
  fifthColor:   "200, 90, 0",    // deep amber
  pointerColor: "245, 158, 11",
  blendingValue: "soft-light",
};

export const ServicesSection = React.memo(() => {
  const { services } = pageContent;
  const { resolvedTheme } = useTheme();
  const colors = resolvedTheme === 'dark' ? darkColors : lightColors;

  return (
    <section id="services" className="scroll-section py-32 border-b border-border bg-background relative overflow-hidden">
      {/* Layer 0 — floating gradient blobs */}
      <BackgroundGradientAnimation
        {...colors}
        size="60%"
        interactive={false}
        containerClassName="absolute inset-0 z-0 pointer-events-none opacity-30"
      />
      <FallingPattern
        className="absolute inset-0 z-[1] opacity-40 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,var(--background)_80%)]"
        duration={120}
        density={1.5}
      />
      <div className="container mx-auto px-4 z-10 relative">
        <div className="scroll-header mb-20 text-center flex flex-col items-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
            <span className="text-accent-primary text-glow">{services.header.titleHighlight}</span> {services.header.titleParts[1]}
          </h2>
          <p className="text-xl text-foreground-muted max-w-2xl">{services.header.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {services.items.map((item, i) => {
            const colSpanClass = item.colSpan === 2 ? 'md:col-span-2' : 'md:col-span-1';

            return (
              <GlowCard key={i} borderOnly glowColor="teal" className={`scroll-card ${colSpanClass}`}>
                <div className="group relative flex flex-col h-full min-h-[380px] rounded-2xl bg-surface-card border border-border overflow-hidden p-8 lg:p-12 shadow-[0_4px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.5)] hover:border-accent-primary/40 transition-all duration-500">
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="animate-float shrink-0 mb-8" style={{ animationDelay: item.delay }}>
                      <Icon name={item.icon} className="w-20 h-20 object-contain" priority={false} />
                    </div>

                    <div className="flex flex-col">
                      <h3 className={`${item.colSpan === 2 ? 'text-3xl lg:text-4xl' : 'text-2xl'} font-bold mb-4 tracking-tight`}>
                        {item.title}
                      </h3>
                      <p className={`text-foreground-muted leading-relaxed ${item.colSpan === 2 ? 'text-lg max-w-xl' : 'text-base'}`}>
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="absolute top-0 right-0 w-64 h-64 bg-accent-primary/5 blur-[100px] -z-10 group-hover:bg-accent-primary/10 transition-colors duration-700" />
                </div>
              </GlowCard>
            );
          })}
        </div>

        <div className="mt-16 flex justify-center scroll-card">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-accent-primary/5 border border-accent-primary/20 hover:border-accent-primary/40 transition-colors duration-300">
            <CheckCircle2 className="w-5 h-5 text-accent-primary" />
            <span className="text-base md:text-lg font-bold tracking-tight">
              {services.footerPromise.parts[0]}
              <span className="text-accent-primary">{services.footerPromise.highlight}</span>
              {services.footerPromise.parts[1]}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
});

ServicesSection.displayName = "ServicesSection";
