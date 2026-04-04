"use client";

import React, { useState } from 'react';
import { ExternalLink, Mic } from 'lucide-react';
import { FocusCards } from "@/components/ui/focus-cards";
import { pageContent } from '@/data/pageContent';
import { Icon } from '@/components/ui/Icon';
import { VoiceAgentDemo } from '@/components/VoiceAgentDemo';

export const PortfolioSection = React.memo(() => {
  const { portfolio } = pageContent;
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [activeAgentId, setActiveAgentId] = useState<string | undefined>(undefined);
  const [activeDemoTitle, setActiveDemoTitle] = useState<string | undefined>(undefined);

  const renderFooter = (proj: any) => {
    switch (proj.footerType) {
      case 'support':
        return (
          <div className="flex justify-between items-center w-full">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-7 h-7 rounded-full bg-accent-primary/20 border-2 border-background" />
              ))}
              <span className="ml-4 text-[10px] text-gray-400 self-center">+12 companies</span>
            </div>
            <button className="text-accent-primary font-bold text-xs flex items-center gap-1">
              Live Preview <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        );
      case 'leadgen':
        return (
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-2 text-[10px] font-bold text-accent-primary">
              <div className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse"></div> 540 Leads Scanned
            </div>
            <button className="text-accent-primary font-bold text-xs flex items-center gap-1">
              Case Study <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        );
      case 'dashboard':
        return (
          <div className="flex justify-between items-center w-full">
            <span className="text-[10px] text-gray-400">Integrates with CRM, Zapier</span>
            <button className="text-accent-primary font-bold text-xs flex items-center gap-1">
              Full UI Tour <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        );
      case 'content':
        return (
          <div className="flex justify-between items-center w-full">
            <div className="flex gap-4">
              <div className="flex flex-col"><span className="text-[10px] text-gray-500">TOKENS/S</span><span className="text-accent-primary text-xs font-bold">145.2</span></div>
              <div className="flex flex-col"><span className="text-[10px] text-gray-500">LATENCY</span><span className="text-accent-primary text-xs font-bold">1.2s</span></div>
            </div>
            <button className="text-accent-primary font-bold text-xs flex items-center gap-1">
              Try Editor <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        );
      case 'voiceagent':
        return (
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-2 text-[10px] font-bold text-accent-primary">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div> Agent Online
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveAgentId(proj.agentId);
                setActiveDemoTitle(proj.title);
                setIsDemoOpen(true);
              }}
              className="text-accent-primary font-bold text-xs flex items-center gap-1 hover:gap-2 transition-all duration-300 group"
            >
              <Mic className="w-3 h-3 group-hover:text-green-400 transition-colors" />
              Try Live Demo
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  const projectCards = portfolio.projects.map(proj => ({
    title: proj.title,
    src: proj.src,
    badge: proj.badge,
    icon: (
      <div className="animate-float" style={{ animationDelay: proj.iconDelay }}>
        <Icon name={proj.icon} className="w-10 h-10" />
      </div>
    ),
    description: proj.description,
    footer: renderFooter(proj),
    action: proj.footerType === 'voiceagent' ? (
      <button
        onClick={(e) => {
          e.stopPropagation();
          setActiveAgentId((proj as any).agentId);
          setActiveDemoTitle(proj.title);
          setIsDemoOpen(true);
        }}
        className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] group"
      >
        <div className="relative">
          <Mic className="w-5 h-5" />
          <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        </div>
        Try Live Demo
      </button>
    ) : undefined
  }));

  return (
    <section id="portfolio" className="scroll-section py-32 border-b border-border bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 z-10 relative">
        <div className="scroll-header mb-24 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
            {portfolio.header.titleParts[0]} <span className="text-accent-primary text-glow">{portfolio.header.titleHighlight}</span> {portfolio.header.titleParts[1]}
          </h2>
          <p className="text-xl text-foreground-muted max-w-2xl mx-auto">{portfolio.header.subtitle}</p>
        </div>

        <div className="max-w-7xl mx-auto">
          <FocusCards cards={projectCards} />
        </div>
      </div>

      {/* Voice Agent Demo Modal */}
      <VoiceAgentDemo 
        isOpen={isDemoOpen} 
        onClose={() => setIsDemoOpen(false)} 
        agentId={activeAgentId}
        title={activeDemoTitle}
      />
    </section>
  );
});

PortfolioSection.displayName = "PortfolioSection";
