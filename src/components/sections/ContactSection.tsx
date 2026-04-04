"use client";

import React, { useState } from 'react';
import { Users, Mail, Phone, MessageSquare, Send, CheckCircle2, Loader2, Check, AlertCircle } from 'lucide-react';
import { Ripple } from "@/components/magicui/ripple";
import { pageContent } from '@/data/pageContent';
import { Icon } from '@/components/ui/Icon';
import { RippleButton } from '@/components/ui/ripple-button';
import { cn } from "@/lib/utils";

export const ContactSection = React.memo(() => {
  const { contact } = pageContent;
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [countryCode, setCountryCode] = useState('+91');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [idea, setIdea] = useState('');
  const [formError, setFormError] = useState('');

  const sanitizeMessage = (msg: string) => {
    return msg.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;");
  };

  const validatePhone = (phoneNumber: string) => {
    const digitsOnly = phoneNumber.replace(/\D/g, "");
    return digitsOnly.length === 10;
  };

  const validateEmail = (emailStr: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(emailStr);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSending || isSent) return;

    setFormError('');

    if (!validateEmail(email)) {
      setFormError('Please enter a valid email address.');
      return;
    }

    if (phone.trim() && !validatePhone(phone)) {
      setFormError('Please enter a valid 10-digit phone number.');
      return;
    }

    const sanitizedIdea = sanitizeMessage(idea);
    if (sanitizedIdea.length < 5) {
      setFormError('Please provide more details about your idea.');
      return;
    }

    setIsSending(true);

    try {
      const webhookUrl = process.env.NEXT_PUBLIC_CONTACT_WEBHOOK_URL;
      if (webhookUrl) {
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            phone: phone.trim() ? `${countryCode}${phone}` : "",
            idea: sanitizedIdea,
          }),
        });

        if (!response.ok) {
          throw new Error('Unable to send the message. Please try again later.');
        }

        // Only clear and set sent state on success
        (e.target as HTMLFormElement).reset();
        setName('');
        setEmail('');
        setPhone('');
        setIdea('');
        setFormError('');
        setCountryCode('+91');
        setIsSent(true);

        // Reset after 5 seconds
        setTimeout(() => setIsSent(false), 5000);
      } else {
        // Mock sending animation if no webhook config
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsSent(true);
        setTimeout(() => setIsSent(false), 5000);
      }
    } catch (error) {
      console.error('Error sending form:', error);
      setFormError("Don't worry! We're just having a small connection hiccup. Your idea is safe—please try clicking send again in a moment.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="scroll-section py-32 border-b border-border bg-background relative overflow-hidden">
      <Ripple mainCircleOpacity={0.5} numCircles={8} className="z-0 opacity-100" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(0,184,162,0.08)_0%,rgba(0,0,0,0)_60%)] pointer-events-none"></div>

      <div className="container mx-auto px-4 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center max-w-7xl mx-auto">

          <div className="flex flex-col gap-12">
            <div className="scroll-header">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
                {contact.header.titleParts[0]} <span className="text-accent-primary text-glow">{contact.header.titleHighlight}</span> {contact.header.titleParts[1]}
              </h2>
              <p className="text-xl text-foreground-muted max-w-md">{contact.header.subtitle}</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {contact.stats.map((stat, i) => (
                <div key={i} className="scroll-card card-surface p-8 flex flex-col gap-4 hover:scale-105 transition-all duration-300 border border-border/50 group">
                  <div className="flex items-center justify-start group-hover:scale-110 transition-transform duration-300">
                    <div className="animate-float" style={{ animationDelay: stat.delay }}>
                      <Icon name={stat.icon} className="w-12 h-12 object-contain" priority={false} />
                    </div>
                  </div>
                  <div>
                    <span className="block text-3xl font-bold mb-1">{stat.metric}</span>
                    <span className="text-sm font-bold text-foreground block uppercase tracking-wider leading-relaxed">{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="scroll-card card-surface p-10 lg:p-12 relative overflow-hidden group/form shadow-2xl">
            <div className="relative z-10">
              <div className="mb-10">
                <h3 className="text-3xl font-bold mb-3">{contact.form.title}</h3>
                <p className="text-foreground-muted">{contact.form.subtitle}</p>
              </div>

              <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-foreground-muted uppercase tracking-widest ml-1">Full Name</label>
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-muted group-focus-within/field:text-accent-primary transition-colors" />
                    <input
                      required
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
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
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@company.com"
                      className="w-full bg-background border border-border rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-accent-primary/20 focus:border-accent-primary transition-all text-lg"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-foreground-muted uppercase tracking-widest ml-1">Phone Number <span className="text-[10px] lowercase font-medium opacity-60 ml-1">(Optional)</span></label>
                  <div className="relative group/field">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-muted group-focus-within/field:text-accent-primary transition-colors z-20 pointer-events-none" />
                    <div className="flex w-full bg-background border border-border rounded-xl focus-within:ring-2 focus-within:ring-accent-primary/20 focus-within:border-accent-primary transition-all overflow-hidden">
                      <div className="relative flex items-center border-r border-border bg-foreground/[0.02]">
                        <select
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          className="bg-transparent py-4 pl-12 pr-4 focus:outline-none text-lg cursor-pointer appearance-none font-medium text-foreground relative z-10"
                        >
                          <option value="+91">🇮🇳 +91</option>
                          <option value="+1">🇺🇸 +1</option>
                        </select>
                        <div className="absolute right-0.5 pointer-events-none text-foreground-muted">
                          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </div>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                        placeholder="9876543210"
                        className="w-full bg-transparent py-4 px-4 focus:outline-none text-lg text-foreground placeholder:text-foreground-muted/50"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-foreground-muted uppercase tracking-widest ml-1">What Would You Like To Automate?</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-5 w-5 h-5 text-foreground-muted group-focus-within/field:text-accent-primary transition-colors" />
                    <textarea
                      required
                      rows={4}
                      value={idea}
                      onChange={(e) => setIdea(e.target.value)}
                      placeholder="Example: I want to automate WhatsApp lead follow-ups."
                      className="w-full bg-background border border-border rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-accent-primary/20 focus:border-accent-primary transition-all text-lg resize-none"
                    ></textarea>
                  </div>
                </div>

                {formError && (
                  <div className="flex items-center gap-3 text-red-400 bg-red-500/5 border border-red-500/20 p-5 rounded-2xl text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-500 shadow-xl shadow-red-500/5">
                    <div className="bg-red-500/10 p-2 rounded-lg">
                      <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400" />
                    </div>
                    <span className="leading-relaxed">{formError}</span>
                  </div>
                )}

                <RippleButton
                  type="submit"
                  disabled={isSending || isSent || !name.trim() || !email.trim() || !idea.trim()}
                  rippleColor="rgba(255, 255, 255, 0.4)"
                  className={cn(
                    "mt-4 text-white font-black py-5 rounded-xl text-xl transition-all duration-500 shadow-lg border-none",
                    isSent ? "bg-green-600 shadow-green-600/30 scale-105" : "bg-accent-primary shadow-accent-primary/20 hover:shadow-accent-primary/40 hover:-translate-y-1",
                    (isSending || isSent || !name.trim() || !email.trim() || !idea.trim()) && "cursor-not-allowed opacity-90"
                  )}
                >
                  {isSending ? (
                    <>
                      Sending Idea... <Loader2 className="w-5 h-5 animate-spin" />
                    </>
                  ) : isSent ? (
                    <>
                      Idea Sent! <Check className="w-5 h-5" />
                    </>
                  ) : (
                    <>
                      {contact.form.buttonText} <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </RippleButton>

                <div className="mt-2 flex flex-col items-center gap-3">
                  <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] text-foreground-muted">
                    <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-accent-primary" /> Free consultation</span>
                    <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-accent-primary" /> No obligation</span>
                  </div>
                  <p className="text-xs font-medium text-foreground-muted/50 py-1 px-3 border border-border/30 rounded-full italic">
                    We&apos;ll reply within 24 hours.
                  </p>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
});

ContactSection.displayName = "ContactSection";
