"use client";

import Spline from '@splinetool/react-spline';
import {
  Workflow,
  Code,
  Network,
  TrendingUp,
  MessageSquare,
  LineChart,
  BarChart3,
  Zap,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Users,
  Timer,
  EyeOff,
  Globe,
  PlayCircle,
  ExternalLink,
  FileText,
  LayoutDashboard,
  Mail,
  Send,
  Twitter,
  Linkedin,
  Facebook,
  Instagram
} from 'lucide-react';
import { Ripple } from "@/components/magicui/ripple";
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from 'next-themes';
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { WobbleCard } from "@/components/ui/wobble-card";
import { FocusCards } from "@/components/ui/focus-cards";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getIconPath = (name: string) => {
    const isLight = mounted && resolvedTheme === 'light';
    const premiumIcons = ['chat-bubble', 'clock', 'flash', 'folder', 'location', 'locker', 'mail', 'pencil', 'rocket', 'target', 'thumb-down', 'wallet', 'zoom', 'ghost', 'puzzle'];
    const hasPremium = premiumIcons.includes(name);

    if (isLight && hasPremium) {
      return `/icons/light/3dicons-${name}-dynamic-premium.png`;
    }
    return `/icons/3dicons-${name}-dynamic-color.png`;
  };

  const projectCards = [
    {
      title: "AI Customer Support Bot",
      src: "/portfolio/support.png",
      badge: "Active Prototype",
      icon: <img src={getIconPath('chat-bubble')} className="w-10 h-10" />,
      description: "A high-intelligence chat agent handling 90% of support tickets automatically through WhatsApp and Web integrations. Built-in sentiment analysis ensures complex issues reach human agents instantly.",
      footer: (
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
      )
    },
    {
      title: "AI Lead Gen Automation",
      src: "/portfolio/leadgen.png",
      badge: "Growth Engine",
      icon: <img src={getIconPath('rocket')} className="w-10 h-10" />,
      description: "Autonomous workflow that scrapers high-intent leads across LinkedIn and Twitter, scores them using AI, and initiates personalized outreach sequences that feel human.",
      footer: (
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-2 text-[10px] font-bold text-accent-primary">
            <div className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse"></div> 540 Leads Scanned
          </div>
          <button className="text-accent-primary font-bold text-xs flex items-center gap-1">
            Case Study <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      )
    },
    {
      title: "Sales Dashboard",
      src: "/portfolio/dashboard.png",
      badge: "Data Intelligence",
      icon: <img src={getIconPath('wallet')} className="w-10 h-10" />,
      description: "Real-time visibility into your entire sales funnel. Integrated with your CRM and WhatsApp to show bottlenecks, agent performance, and revenue forecasting at a glance.",
      footer: (
        <div className="flex justify-between items-center w-full">
          <span className="text-[10px] text-gray-400">Integrates with CRM, Zapier</span>
          <button className="text-accent-primary font-bold text-xs flex items-center gap-1">
            Full UI Tour <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      )
    },
    {
      title: "Content Generation System",
      src: "/portfolio/content.png",
      badge: "Creative AI",
      icon: <img src={getIconPath('pencil')} className="w-10 h-10" />,
      description: "Bulk produce social media posts, blog articles, and ad copies in your brand voice. Includes an AI image engine to create matching visual assets in seconds.",
      footer: (
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-4">
            <div className="flex flex-col"><span className="text-[10px] text-gray-500">TOKENS/S</span><span className="text-accent-primary text-xs font-bold">145.2</span></div>
            <div className="flex flex-col"><span className="text-[10px] text-gray-500">LATENCY</span><span className="text-accent-primary text-xs font-bold">1.2s</span></div>
          </div>
          <button className="text-accent-primary font-bold text-xs flex items-center gap-1">
            Try Editor <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      )
    },
  ];

  useGSAP(() => {
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

  }, { scope: mainRef });

  return (
    <div ref={mainRef} className="flex flex-col min-h-screen">

      {/* 1. HERO SECTION (Always Dark Mode) */}
      <section className="relative w-full overflow-hidden border-b border-border bg-black text-white transition-colors duration-500">
        {/* Warm orb background */}
        <div className="absolute inset-0 w-full h-full bg-[var(--hero-orb-color)] pointer-events-none"></div>

        <div className="container mx-auto px-4 py-20 lg:py-32 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left side: hero content */}
            <div className="flex flex-col gap-6 z-20 max-w-2xl md:pr-10">
              <h1 className="hero-headline text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
                Your Business on <span className="text-accent-primary text-glow">Autopilot</span>. You Stay in Control.
              </h1>
              <p className="hero-subheadline text-lg lg:text-xl text-foreground-muted leading-relaxed max-w-lg">
                We build smart software systems that handle your repetitive tasks — follow-ups, support, lead collection, and reports — so your team can focus on growth.
              </p>

              <div className="hero-buttons flex flex-col sm:flex-row gap-4 mt-8">
                <Link
                  href="#contact"
                  className="group relative inline-flex h-14 items-center justify-center rounded-lg bg-accent-primary text-white font-bold px-8 border border-transparent transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] shadow-[0_0_15px_var(--glow-color)] hover:shadow-[0_0_40px_var(--glow-color)] overflow-hidden text-lg"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                  <span className="relative z-10">Get a Free Demo</span>
                </Link>
                <Link
                  href="#solutions"
                  className="inline-flex h-14 items-center justify-center rounded-lg border-2 border-white/10 font-bold px-8 text-white transition-all duration-300 hover:-translate-y-1 hover:border-accent-primary/50 hover:bg-accent-primary/5 hover:text-accent-primary hover:shadow-[0_0_20px_var(--glow-color)]"
                >
                  See How It Works
                </Link>
              </div>

              {/* Trust bar */}
              <div className="hero-trust flex flex-wrap items-center gap-y-3 gap-x-6 mt-8 text-sm font-medium text-foreground-muted">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-accent-primary" />
                  <span>Setup in 48 hrs</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-accent-primary" />
                  <span>Your data stays yours</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent-primary" />
                  <span>30-day results guarantee</span>
                </div>
              </div>
            </div>

            {/* Right side: 3D object placeholder */}
            <div className="hero-spline hidden lg:block relative w-full h-[450px] lg:h-[700px] rounded-3xl overflow-hidden isolate z-10 bg-transparent cursor-grab active:cursor-grabbing">

              {/* Strong backglow to highlight the dark wireframe orb */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(0,224,198,0.25)_0%,rgba(0,0,0,0)_60%)] pointer-events-none z-0"></div>

              {/* mix-blend-screen makes the black background of the Spline perfectly transparent! */}
              <div className="absolute inset-y-0 -right-50 w-[240%] h-full pointer-events-auto mix-blend-screen z-10">
                <Spline
                  scene="https://prod.spline.design/l-2RtvS8LizHLEZz/scene.splinecode"
                  className="w-full h-full"
                />
              </div>

              {/* Black overlay masking the Spline Logo in the bottom right corner */}
              <div className="absolute bottom-4 right-4 w-full h-10 bg-black z-20 pointer-events-none blur-[2px] rounded-bl-3xl"></div>
              <div className="absolute bottom-0 right-0 w-full h-12 bg-black z-30 pointer-events-none rounded-br-3xl"></div>
            </div>
          </div>
        </div>

        {/* Decorative Glowing Wave Line */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-accent-primary to-transparent opacity-50 border-glow z-20"></div>
      </section>

      {/* 2. BUSINESS PROBLEM */}
      <section className="scroll-section py-32 border-b border-border bg-background relative overflow-hidden group/section">
        <div className="container mx-auto px-4 z-10 relative">
          <div className="scroll-header text-center max-w-4xl mx-auto mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-6 tracking-tight">
              The Hidden Leaks <span className="text-accent-primary text-glow">Draining Your Profits</span>
            </h2>
            <p className="text-xl lg:text-2xl text-foreground-muted leading-relaxed">
              If your business is growing but your margins aren't, you're likely paying people to act like robots.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 max-w-7xl mx-auto">
            {/* Context/Card 1/2/3 common pattern */}
            <CardContainer className="inter-var group/card">
              <CardBody className="scroll-card group card-surface p-10 lg:p-12 flex flex-col justify-between min-h-[420px] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:border-accent-primary/50 overflow-hidden relative z-0 hover:z-20 w-full h-full">
                <div className="relative z-10 flex flex-col h-full">
                  <CardItem translateZ="60" className="w-20 h-20 flex items-center justify-center mb-8">
                    <img src={getIconPath('wallet')} alt="Wallet" className="w-full h-full object-contain" />
                  </CardItem>
                  <CardItem translateZ="50" as="h3" className="text-2xl lg:text-3xl font-bold mb-5 leading-tight group-hover:text-accent-primary transition-colors duration-300">
                    Paying Salaries For Data Entry?
                  </CardItem>
                  <CardItem translateZ="40" as="p" className="text-lg text-foreground-muted leading-relaxed">
                    Your team wastes countless hours doing copy-paste work between spreadsheets, emails, and PDFs. That is expensive time they should be spending on closing deals and growing your business.
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>

            {/* Context/Card 2 */}
            <CardContainer className="inter-var group/card">
              <CardBody className="scroll-card group card-surface p-10 lg:p-12 flex flex-col justify-between min-h-[420px] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:border-accent-primary/50 overflow-hidden relative z-0 hover:z-20 w-full h-full">
                <div className="relative z-10 flex flex-col h-full">
                  <CardItem translateZ="60" className="w-20 h-20 flex items-center justify-center mb-8">
                    <img src={getIconPath('clock')} alt="Clock" className="w-full h-full object-contain" />
                  </CardItem>
                  <CardItem translateZ="50" as="h3" className="text-2xl lg:text-3xl font-bold mb-5 leading-tight group-hover:text-accent-primary transition-colors duration-300">
                    Hot Leads Going Cold Overnight?
                  </CardItem>
                  <CardItem translateZ="40" as="p" className="text-lg text-foreground-muted leading-relaxed">
                    You spend money on advertising, but inquiries slip through the cracks. If nobody responds to a premium lead within the first 5 minutes, your competitors win.
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>

            {/* Context/Card 3 */}
            <CardContainer className="inter-var group/card">
              <CardBody className="scroll-card group card-surface p-10 lg:p-12 flex flex-col justify-between min-h-[420px] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:border-accent-primary/50 overflow-hidden relative z-0 hover:z-20 w-full h-full">
                <div className="relative z-10 flex flex-col h-full">
                  <CardItem translateZ="60" className="w-20 h-20 flex items-center justify-center mb-8">
                    <img src={getIconPath('ghost')} alt="Ghost" className="w-full h-full object-contain" />
                  </CardItem>
                  <CardItem translateZ="50" as="h3" className="text-2xl lg:text-3xl font-bold mb-5 leading-tight group-hover:text-accent-primary transition-colors duration-300">
                    Flying Blind Without Live Data?
                  </CardItem>
                  <CardItem translateZ="40" as="p" className="text-lg text-foreground-muted leading-relaxed">
                    You rely on guesswork, scattered WhatsApp messages, and reports that arrive too late. You don't know your exact real-time bottlenecks or margins until the end of the month.
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          </div>
        </div>
      </section>

      {/* 3. SERVICES (Bento Grid) */}
      <section id="services" className="scroll-section py-32 border-b border-border bg-background relative">
        <div className="container mx-auto px-4 z-10 relative">
          <div className="scroll-header mb-20 text-center flex flex-col items-center">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight">What We <span className="text-accent-primary text-glow">Build For You</span></h2>
            <p className="text-xl text-foreground-muted max-w-2xl">Complete end-to-end digital infrastructure to transition your business into a modern, automated powerhouse.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">

            {/* Bento Item 1: Wide */}
            <WobbleCard
              containerClassName="scroll-card md:col-span-2 bg-transparent border border-border min-h-[320px] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:border-accent-primary/50 group"
              className="p-10"
            >
              <div className="relative z-10 flex flex-col justify-end h-full">
                <img src={getIconPath('location')} className="w-20 h-20 mb-6 object-contain transform group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-2xl lg:text-3xl font-bold mb-4">Custom Websites & Digital Presence</h3>
                <p className="text-foreground-muted leading-relaxed text-lg max-w-xl">
                  We don't just build websites; we build high-converting digital storefronts. Blazingly fast, modern web applications integrated directly with powerful automations to capture and convert every visitor into a lead.
                </p>
              </div>
            </WobbleCard>

            {/* Bento Item 2: Square */}
            <WobbleCard
              containerClassName="scroll-card md:col-span-1 bg-transparent border border-border min-h-[320px] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:border-accent-primary/50 group"
              className="p-10"
            >
              <div className="relative z-10 flex flex-col justify-between h-full">
                <img src={getIconPath('puzzle')} className="w-20 h-20 mb-6 object-contain transform group-hover:scale-110 transition-transform duration-300" />
                <div>
                  <h3 className="text-2xl font-bold mb-3">Task Automation</h3>
                  <p className="text-foreground-muted leading-relaxed text-base">
                    Stop paying for tasks a computer can do. We completely automate your data entry, email follow-ups, and repetitive reporting.
                  </p>
                </div>
              </div>
            </WobbleCard>

            {/* Bento Item 3: Square */}
            <WobbleCard
              containerClassName="scroll-card md:col-span-1 bg-transparent border border-border min-h-[320px] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:border-accent-primary/50 group"
              className="p-10"
            >
              <div className="relative z-10 flex flex-col justify-between h-full">
                <img src={getIconPath('chat-bubble')} className="w-20 h-20 mb-6 object-contain transform group-hover:scale-110 transition-transform duration-300" />
                <div>
                  <h3 className="text-2xl font-bold mb-3">AI Customer Support</h3>
                  <p className="text-foreground-muted leading-relaxed text-base">
                    Answer customer questions instantly, 24/7 across WhatsApp and your website — without hiring extra support staff.
                  </p>
                </div>
              </div>
            </WobbleCard>

            {/* Bento Item 4: Wide */}
            <WobbleCard
              containerClassName="scroll-card md:col-span-2 bg-transparent border border-border min-h-[320px] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:border-accent-primary/50 group"
              className="p-10"
            >
              <div className="relative z-10 flex flex-col justify-end h-full">
                <img src={getIconPath('rocket')} className="w-20 h-20 mb-6 object-contain transform group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-2xl lg:text-3xl font-bold mb-4">Command Center & System Integrations</h3>
                <p className="text-foreground-muted leading-relaxed text-lg max-w-xl">
                  Make your existing apps talk to each other. We centralize your data into beautiful BI dashboards so you always know exactly what's working and what's not, at a glance.
                </p>
              </div>
            </WobbleCard>

          </div>
        </div>
      </section>

      {/* 4. PORTFOLIO / PROTOTYPES */}
      <section id="portfolio" className="scroll-section py-32 border-b border-border bg-background relative overflow-hidden">
        <div className="container mx-auto px-4 z-10 relative">
          <div className="scroll-header mb-24 text-center">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight">AI Solutions <span className="text-accent-primary text-glow">In Action</span></h2>
            <p className="text-xl text-foreground-muted max-w-2xl mx-auto">Explore high-fidelity prototypes of systems we've shipped to production for our partners.</p>
          </div>

          <div className="max-w-7xl mx-auto">
            <FocusCards cards={projectCards} />
          </div>
        </div>
      </section>

      {/* 5. COMBINED STATS & CONTACT SECTION */}
      <section id="contact" className="scroll-section py-32 border-b border-border bg-background relative overflow-hidden">
        <Ripple mainCircleOpacity={0.5} numCircles={8} className="z-0 opacity-100" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(0,184,162,0.08)_0%,rgba(0,0,0,0)_60%)] pointer-events-none"></div>

        <div className="container mx-auto px-4 z-10 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center max-w-7xl mx-auto">

            {/* Left: Stats Column */}
            <div className="flex flex-col gap-12">
              <div className="scroll-header">
                <h2 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight">Our Impact in <span className="text-accent-primary text-glow">Numbers</span></h2>
                <p className="text-xl text-foreground-muted max-w-md">We don't just write code; we deliver measurable bottom-line growth for every partner we work with.</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {[
                  { metric: "₹12L+", label: "Saved per client", icon: <img src={getIconPath('wallet')} className="w-12 h-12 object-contain" /> },
                  { metric: "70%", label: "Manual work cut", icon: <img src={getIconPath('flash')} className="w-12 h-12 object-contain" /> },
                  { metric: "3×", label: "Faster response", icon: <img src={getIconPath('clock')} className="w-12 h-12 object-contain" /> },
                  { metric: "48-hr", label: "Average setup", icon: <img src={getIconPath('target')} className="w-12 h-12 object-contain" /> },
                ].map((stat, i) => (
                  <div key={i} className="scroll-card card-surface p-8 flex flex-col gap-4 hover:scale-105 transition-all duration-300 border border-border/50 group">
                    <div className="flex items-center justify-start group-hover:scale-110 transition-transform duration-300">
                      {stat.icon}
                    </div>
                    <div>
                      <span className="block text-3xl font-bold mb-1">{stat.metric}</span>
                      <span className="text-sm font-medium text-foreground-muted uppercase tracking-wider">{stat.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Premium Contact Form */}
            <div className="scroll-card card-surface p-10 lg:p-12 relative overflow-hidden group/form shadow-2xl">
              <div className="relative z-10">
                <div className="mb-10">
                  <h3 className="text-3xl font-bold mb-3">Get Started Today</h3>
                  <p className="text-foreground-muted">Tell us what you want to automate, and we'll show you exactly how we'd build it.</p>
                </div>

                <form className="flex flex-col gap-6" onSubmit={(e) => { e.preventDefault(); alert("Message sent successfully!"); }}>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-foreground-muted uppercase tracking-widest ml-1">Full Name</label>
                    <div className="relative">
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-muted group-focus-within/field:text-accent-primary transition-colors" />
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full bg-background border border-border rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-accent-primary/20 focus:border-accent-primary transition-all text-lg"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-foreground-muted uppercase tracking-widest ml-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-muted group-focus-within/field:text-accent-primary transition-colors" />
                      <input
                        type="email"
                        placeholder="john@company.com"
                        className="w-full bg-background border border-border rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-accent-primary/20 focus:border-accent-primary transition-all text-lg"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-foreground-muted uppercase tracking-widest ml-1">Your Automation Idea</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-5 w-5 h-5 text-foreground-muted group-focus-within/field:text-accent-primary transition-colors" />
                      <textarea
                        rows={4}
                        placeholder="I want to automate our WhatsApp lead follow-ups..."
                        className="w-full bg-background border border-border rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-accent-primary/20 focus:border-accent-primary transition-all text-lg resize-none"
                      ></textarea>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="mt-4 bg-accent-primary text-white font-bold py-5 rounded-xl text-xl flex items-center justify-center gap-3 hover:bg-accent-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_10px_30px_rgba(0,184,162,0.3)] group/btn"
                  >
                    Send Message <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={`py-20 border-t border-border mt-auto bg-background text-foreground transition-colors duration-500 ${mounted ? (resolvedTheme === 'dark' ? 'light' : 'dark') : ''}`}>
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
            <div className="max-w-sm">
              <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-accent-primary flex items-center justify-center">
                  <span className="text-white font-black text-lg">A</span>
                </div>
                Aexa Studio
              </h2>
              <p className="text-foreground-muted leading-relaxed">
                Empowering businesses with intelligent software infrastructure. We automate the mundane so you can focus on the extraordinary.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 lg:gap-24">
              <div className="flex flex-col gap-6">
                <h4 className="font-bold uppercase tracking-widest text-xs text-foreground-muted">Platform</h4>
                <div className="flex flex-col gap-4 text-sm font-medium">
                  <Link href="#services" className="hover:text-accent-primary transition-colors">Services</Link>
                  <Link href="#portfolio" className="hover:text-accent-primary transition-colors">Portfolio</Link>
                  <Link href="#capabilities" className="hover:text-accent-primary transition-colors">Capabilities</Link>
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <h4 className="font-bold uppercase tracking-widest text-xs text-foreground-muted">Company</h4>
                <div className="flex flex-col gap-4 text-sm font-medium">
                  <Link href="#" className="hover:text-accent-primary transition-colors">About Us</Link>
                  <Link href="#" className="hover:text-accent-primary transition-colors">Careers</Link>
                  <Link href="#" className="hover:text-accent-primary transition-colors">Contact</Link>
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <h4 className="font-bold uppercase tracking-widest text-xs text-foreground-muted">Socials</h4>
                <div className="flex gap-4">
                  <Link href="#" className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-accent-primary/10 hover:border-accent-primary transition-all overflow-hidden p-2">
                    <img src={getIconPath('twitter')} className="w-full h-full object-contain" />
                  </Link>
                  <Link href="#" className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-accent-primary/10 hover:border-accent-primary transition-all overflow-hidden p-2">
                    <img src={getIconPath('linkedin')} className="w-full h-full object-contain" />
                  </Link>
                  <Link href="#" className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-accent-primary/10 hover:border-accent-primary transition-all overflow-hidden p-2">
                    <img src={getIconPath('instagram')} className="w-full h-full object-contain" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
            <span className="text-sm text-foreground-muted tracking-tight">
              © {new Date().getFullYear()} Aexa Studio. All rights reserved.
            </span>
            <div className="flex gap-8 text-xs font-bold text-foreground-muted uppercase tracking-widest">
              <Link href="#" className="hover:text-accent-primary">Privacy Policy</Link>
              <Link href="#" className="hover:text-accent-primary">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
