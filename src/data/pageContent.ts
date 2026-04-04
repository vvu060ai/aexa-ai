export const pageContent = {
  hero: {
    headlineParts: ["Turn Your Business Into an", "Company"],
    headlineHighlight: "AI-Powered",
    subheadline: "We build AI automation and smart software that helps businesses save time, reduce costs, and grow faster.",
    buttons: {
      primary: { text: "Book Free Consultation", link: "#contact" },
      secondary: { text: "See How It Works", link: "#portfolio" }
    },
    trustBadges: [
      { text: "Setup in 48 hrs", icon: "Clock" },
      { text: "Your data stays yours", icon: "ShieldCheck" },
      { text: "30-day results guarantee", icon: "CheckCircle2" }
    ],
    splineScene: "https://prod.spline.design/l-2RtvS8LizHLEZz/scene.splinecode"
  },
  businessProblems: {
    header: {
      titleParts: ["The Silent Profit Killers in", ""],
      titleHighlight: "Your Business",
      subtitle: "If your business is growing but profits are not, manual work and slow systems may be the reason."
    },
    problems: [
      {
        icon: "file-text",
        title: "Paying Salaries For Data Entry?",
        description: "Your team spends hours copying data between spreadsheets, emails, and PDFs. That time should be spent closing deals and growing the business.",
        metricInfo: {
          value: "20–30%",
          label: "Employee time wasted on manual data work"
        },
        delay: "0s"
      },
      {
        icon: "clock",
        title: "Hot Leads Going Cold Overnight?",
        description: "You spend money on ads, but leads are not followed up fast enough. When responses are delayed, customers choose your competitors.",
        metricInfo: {
          value: "21× Higher",
          label: "Likelihood to convert leads within 5 minutes"
        },
        delay: "0.5s"
      },
      {
        icon: "ghost",
        title: "Flying Blind Without Live Data?",
        description: "Your business data is scattered across WhatsApp, spreadsheets, and reports. By the time you see the numbers, it’s already too late to react.",
        metricInfo: {
          value: "Slower Decisions",
          label: "Companies without real-time data visibility"
        },
        delay: "1s"
      }
    ],
    solutionPromise: {
      parts: ["The right automation systems can ", " these problems completely."],
      highlight: "eliminate"
    }
  },
  services: {
    header: {
      titleParts: ["", "That Run Your Business"],
      titleHighlight: "AI Systems",
      subtitle: "We build AI-powered systems that save time, increase leads, and simplify your business operations."
    },
    items: [
      {
        icon: "computer",
        title: "Websites That Grow Your Business",
        description: "Whether you need a simple business website or a powerful web platform, we build fast, modern sites that represent your brand and capture customer inquiries automatically.",
        delay: "0.2s",
        colSpan: 2
      },
      {
        icon: "setting",
        title: "Automate Repetitive Work",
        description: "We automate repetitive work like data entry, email follow-ups, and reporting — so your team can focus on growing the business.",
        delay: "0.6s",
        colSpan: 1
      },
      {
        icon: "chat-bubble",
        title: "24/7 AI Customer Support",
        description: "AI chatbots answer customer questions instantly on your website and WhatsApp — 24/7 without hiring extra support staff.",
        delay: "1s",
        colSpan: 1
      },
      {
        icon: "rocket",
        title: "Business Dashboard & Integrations",
        description: "We connect your apps and centralize your data into a simple dashboard so you always know what’s happening in your business.",
        delay: "1.4s",
        colSpan: 2
      }
    ],
    footerPromise: {
      parts: ["Every system is ", " for your business workflows."],
      highlight: "custom-built"
    }
  },
  portfolio: {
    header: {
      titleParts: ["AI Solutions", ""],
      titleHighlight: "In Action",
      subtitle: "See real automation systems and AI tools we've built to help businesses save time, capture leads, and streamline operations."
    },
    projects: [
      {
        title: "AI Booking Assistant",
        src: "/portfolio/booking-agent.webp",
        badge: "Live Demo",
        icon: "chat-bubble",
        iconDelay: "1.6s",
        description: "A voice-powered AI agent that can check, book, update, and cancel calendar appointments in real-time. Try the live demo and speak directly with the AI.",
        footerType: "voiceagent",
        agentId: "1a1e4be8-ad23-4f77-b3a5-14bada886f47"
      },
      {
        title: "Brightsmile Dental Clinic",
        src: "/portfolio/support.png",
        badge: "Live Demo",
        icon: "chat-bubble",
        iconDelay: "2.0s",
        description: "A specialized AI agent tailored for Brightsmile Dental Clinic. It can assist patients with scheduling dental appointments, answering clinic-specific questions, and managing check-ups.",
        footerType: "voiceagent",
        agentId: "69286b58-d357-4099-b30a-c6f42a69ca22"
      }
    ]
  },
  contact: {
    header: {
      titleParts: ["What Businesses Achieve With", ""],
      titleHighlight: "Automation",
      subtitle: "We build systems that save time, reduce manual work, and help businesses grow faster."
    },
    stats: [
      { metric: "70%", label: "Less manual work", icon: "flash", delay: "0s" },
      { metric: "3×", label: "Faster lead response", icon: "rocket", delay: "0.4s" },
      { metric: "48 hrs", label: "Automation setup", icon: "clock", delay: "0.8s" },
      { metric: "24/7", label: "AI-powered customer support", icon: "chat-bubble", delay: "1.2s" }
    ],
    form: {
      title: "Let's Automate Your Business",
      subtitle: "Tell us what task or process you want to automate. We'll show you how it can be built.",
      buttonText: "Send My Automation Idea"
    }
  },
  footer: {
    brand: {
      name: "Aexa AI",
      description: "Empowering businesses with intelligent software infrastructure. We automate the mundane so you can focus on the extraordinary."
    },
    nav: [
      { label: "Services", link: "#services" },
      { label: "Portfolio", link: "#portfolio" },
      { label: "Capabilities", link: "#capabilities" }
    ],
    socials: [
      { icon: "twitter", delay: "0s", link: "#" },
      { icon: "linkedin", delay: "0.3s", link: "#" },
      { icon: "instagram", delay: "0.6s", link: "#" }
    ],
    legal: {
      copyright: "© {year} Aexa Studio. All rights reserved.",
      links: [
        { label: "Privacy Policy", link: "#" },
        { label: "Terms of Service", link: "#" }
      ]
    }
  }
};
