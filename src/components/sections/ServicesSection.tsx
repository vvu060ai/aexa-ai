"use client";

import React from 'react';
import { WobbleCard } from "@/components/ui/wobble-card";
import { CheckCircle2 } from 'lucide-react';
import { pageContent } from '@/data/pageContent';
import { Icon } from '@/components/ui/Icon';

export const ServicesSection = React.memo(() => {
  const { services } = pageContent;

  return (
    <section id="services" className="scroll-section py-32 border-b border-border bg-background relative">
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
            const bgClass = i === 0 || i === 3 
              ? 'bg-accent-primary/5 border-accent-primary/20' 
              : 'bg-surface border-border';

            return (
              <WobbleCard
                key={i}
                containerClassName={`scroll-card ${colSpanClass} ${bgClass} border min-h-[380px] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:border-accent-primary/50 group overflow-hidden`}
                className="p-8 lg:p-12"
              >
                <div className="relative z-10 flex flex-col h-full">
                  <div className="animate-float shrink-0 mb-8" style={{ animationDelay: item.delay }}>
                    <Icon name={item.icon} className="w-20 h-20 object-contain transform group-hover:scale-110 transition-transform duration-500" priority={false} />
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

                {/* Subtle Background Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent-primary/5 blur-[100px] -z-10 group-hover:bg-accent-primary/10 transition-colors duration-700"></div>
              </WobbleCard>
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
