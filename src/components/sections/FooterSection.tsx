"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { pageContent } from '@/data/pageContent';
import { Icon } from '@/components/ui/Icon';
import { LegalModal } from '@/components/ui/LegalModal';

export const FooterSection = React.memo(() => {
  const { footer, legal } = pageContent;
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <footer className="py-20 border-t border-border mt-auto bg-[#050505] text-white transition-colors duration-500">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          <div className="max-w-sm">
            <Link href="/" className="group inline-flex items-center gap-2 mb-6 transition-all">
              <div className="w-8 h-8 rounded-lg bg-accent-primary flex items-center justify-center group-hover:bg-accent-warm transition-colors duration-300 shadow-lg shadow-accent-primary/20">
                <span className="text-black font-black text-lg">{footer.brand.name.charAt(0)}</span>
              </div>
              <span className="text-2xl font-bold tracking-tighter group-hover:text-accent-primary transition-colors">{footer.brand.name}</span>
            </Link>
            <p className="text-zinc-400 leading-relaxed">
              {footer.brand.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-12 lg:gap-24">
            <div className="flex flex-col gap-6">
              <h4 className="font-bold uppercase tracking-widest text-[10px] text-zinc-500">Platform</h4>
              <div className="flex flex-col gap-4 text-sm font-medium">
                {footer.nav.map((item, i) => (
                  <Link key={i} href={item.link} className="text-zinc-400 hover:text-accent-primary transition-colors">{item.label}</Link>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <h4 className="font-bold uppercase tracking-widest text-[10px] text-zinc-500">Socials</h4>
              <div className="flex gap-4">
                {footer.socials.map((social, i) => (
                  <Link key={i} href={social.link} className="w-10 h-10 rounded-full flex items-center justify-center bg-zinc-900 border border-white/5 hover:bg-accent-primary/10 hover:border-accent-primary/50 transition-all overflow-hidden p-2">
                    <div>
                      <Icon name={social.icon} className="w-full h-full object-contain" priority={false} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="text-sm text-zinc-500 tracking-tight">
            {footer.legal.copyright.replace('{year}', new Date().getFullYear().toString())}
          </span>
          <div className="flex gap-8 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
            <LegalModal
              title="Privacy Policy"
              lastUpdated={legal.privacyPolicy.lastUpdated}
              sections={legal.privacyPolicy.sections}
              trigger={<button className="hover:text-accent-primary transition-colors">Privacy Policy</button>}
            />
            <LegalModal
              title="Terms of Service"
              lastUpdated={legal.termsOfService.lastUpdated}
              sections={legal.termsOfService.sections}
              trigger={<button className="hover:text-accent-primary transition-colors">Terms of Service</button>}
            />
          </div>
        </div>
      </div>
    </footer>
  );
});

FooterSection.displayName = "FooterSection";
