"use client";

import React from 'react';
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { Zap } from 'lucide-react';
import { pageContent } from '@/data/pageContent';
import { Icon } from '@/components/ui/Icon';
import { FloatingPaths } from '@/components/ui/background-paths';

export const BusinessProblemSection = React.memo(() => {
  const { businessProblems } = pageContent;

  return (
    <section className="scroll-section py-32 border-b border-border bg-background relative overflow-hidden group/section">
      <FloatingPaths position={1} />
      <FloatingPaths position={-2} />
      <div className="container mx-auto px-4 z-10 relative">
        <div className="scroll-header text-center max-w-4xl mx-auto mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-6 tracking-tight">
            {businessProblems.header.titleParts[0]} <span className="text-accent-primary text-glow">{businessProblems.header.titleHighlight}</span> {businessProblems.header.titleParts[1]}
          </h2>
          <p className="text-xl lg:text-2xl text-foreground-muted leading-relaxed">
            {businessProblems.header.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 max-w-7xl mx-auto">
          {businessProblems.problems.map((problem, i) => (
            <CardContainer key={i} className="inter-var group/card w-full h-full" containerClassName="py-0 h-full flex-col">
              <CardBody className="scroll-card group card-surface p-10 lg:p-12 flex flex-col h-full transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:border-accent-primary/50 overflow-hidden relative z-0 hover:z-20 w-full">
                <div className="relative z-10 flex flex-col h-full">
                  <CardItem translateZ="60" className="w-20 h-20 flex items-center justify-center mb-8">
                    <div className="animate-float" style={{ animationDelay: problem.delay }}>
                      <Icon name={problem.icon} className="w-full h-full object-contain" priority={false} />
                    </div>
                  </CardItem>
                  <CardItem translateZ="50" as="h3" className="text-2xl lg:text-3xl font-bold mb-5 leading-tight group-hover:text-accent-primary transition-colors duration-300">
                    {problem.title}
                  </CardItem>
                  <CardItem translateZ="40" as="p" className="text-lg text-foreground-muted leading-relaxed mb-8">
                    {problem.description}
                  </CardItem>
                  <CardItem translateZ="30" className="mt-auto">
                    <div className="flex flex-col gap-1">
                      <span className="text-2xl font-black text-accent-primary">{problem.metricInfo.value}</span>
                      <span className="text-sm font-medium text-foreground-muted uppercase tracking-wider leading-tight">
                        {problem.metricInfo.label}
                      </span>
                    </div>
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          ))}
        </div>

        <div className="mt-16 flex justify-center scroll-card">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-accent-primary/5 border border-accent-primary/20 hover:border-accent-primary/40 transition-colors duration-300">
            <Zap className="w-5 h-5 text-accent-primary" />
            <span className="text-base md:text-lg font-bold tracking-tight">
              {businessProblems.solutionPromise.parts[0]}
              <span className="text-accent-primary">{businessProblems.solutionPromise.highlight}</span>
              {businessProblems.solutionPromise.parts[1]}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
});

BusinessProblemSection.displayName = "BusinessProblemSection";
