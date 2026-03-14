"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { HeroSection } from '@/components/sections/HeroSection';
import { BusinessProblemSection } from '@/components/sections/BusinessProblemSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { PortfolioSection } from '@/components/sections/PortfolioSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { FooterSection } from '@/components/sections/FooterSection';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Add a tiny delay to ensure child components have mounted their DOM nodes
    const timer = setTimeout(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero-headline', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.2
      })
        .from('.hero-subheadline', {
          y: 30,
          opacity: 0,
          duration: 0.8
        }, "-=0.6")
        .from('.hero-buttons', {
          y: 20,
          opacity: 0,
          duration: 0.6
        }, "-=0.4")
        .from('.hero-trust', {
          opacity: 0,
          duration: 0.8
        }, "-=0.4")
        .from('.hero-spline', {
          opacity: 0,
          scale: 0.9,
          duration: 1.5,
          ease: 'power2.out'
        }, "-=1.2");

      // Scroll Animations
      gsap.utils.toArray('.scroll-section').forEach((section: any) => {
        const header = section.querySelector('.scroll-header');
        if (header) {
          gsap.fromTo(header,
            { y: 40, opacity: 0 },
            {
              scrollTrigger: {
                trigger: section,
                start: "top 85%",
              },
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              clearProps: "all"
            }
          );
        }

        const cards = gsap.utils.toArray(section.querySelectorAll('.scroll-card'));
        if (cards.length > 0) {
          gsap.fromTo(cards,
            { y: 50, opacity: 0 },
            {
              scrollTrigger: {
                trigger: section,
                start: "top 75%",
              },
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.15,
              ease: "power3.out",
              clearProps: "all"
            }
          );
        }
      });
    }, 100);

    return () => clearTimeout(timer);
  }, { scope: mainRef });

  return (
    <div ref={mainRef} className="flex flex-col min-h-screen">
      <HeroSection />
      <BusinessProblemSection />
      <ServicesSection />
      <PortfolioSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
}
