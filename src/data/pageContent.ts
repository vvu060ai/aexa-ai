export const pageContent = {
  hero: {
    headlineParts: ["Run Your Business on", ""],
    headlineHighlight: "Autopilot.",
    subheadline: "We build AI systems that handle your bookings, lead follow-ups, invoices, and customer support — so your team focuses on growth, not busywork.",
    buttons: {
      primary: { text: "Book Free Consultation", link: "#contact" },
      secondary: { text: "See Live Demos", link: "#portfolio" }
    },
    trustBadges: [
      { text: "Live in 48 hrs", icon: "Clock" },
      { text: "Your data stays yours", icon: "ShieldCheck" },
      { text: "30-day results guarantee", icon: "CheckCircle2" }
    ],
    splineScene: "https://prod.spline.design/l-2RtvS8LizHLEZz/scene.splinecode"
  },
  businessProblems: {
    header: {
      titleParts: ["The Silent Profit Killers in", ""],
      titleHighlight: "Your Business",
      subtitle: "If your business is growing but profits aren't keeping up, manual processes are likely bleeding you dry."
    },
    problems: [
      {
        icon: "file-text",
        title: "Paying Salaries For Data Entry?",
        description: "Your team copies data from emails to spreadsheets, PDFs to systems — by hand. That's not work, that's waste. Every hour on data entry is an hour not spent on clients or revenue.",
        metricInfo: {
          value: "20–30%",
          label: "Employee time wasted on manual data work"
        },
        delay: "0s"
      },
      {
        icon: "clock",
        title: "Hot Leads Going Cold Overnight?",
        description: "You pay for ads and referrals, but leads sit unread for hours. By then, they've moved on to whoever replied first. Speed of follow-up is the single biggest lever in sales — and right now you're losing it.",
        metricInfo: {
          value: "21× Higher",
          label: "Likelihood to convert leads within 5 minutes"
        },
        delay: "0.5s"
      },
      {
        icon: "ghost",
        title: "Flying Blind Without Live Data?",
        description: "Your revenue is in one app, leads in another, expenses in someone’s inbox. By the time you piece together what’s happening, it’s already cost you. Real-time visibility means real-time control.",
        metricInfo: {
          value: "Slower Decisions",
          label: "Companies without real-time data visibility"
        },
        delay: "1s"
      }
    ],
    solutionPromise: {
      parts: ["Automation doesn't just reduce these problems. It ", " them."],
      highlight: "removes"
    }
  },
  services: {
    header: {
      titleParts: ["", "That Run Your Business"],
      titleHighlight: "AI Systems",
      subtitle: "From websites to AI agents to full automation flows — systems that let your business run without everything going through you."
    },
    items: [
      {
        icon: "computer",
        title: "Websites That Grow Your Business",
        description: "A fast, premium website that looks the part and captures every lead automatically. No more manually checking forms or chasing down inquiries that slipped through the cracks.",
        delay: "0.2s",
        colSpan: 2
      },
      {
        icon: "setting",
        title: "Automate Repetitive Work",
        description: "Data entry, follow-up emails, approvals, reporting — off your team's plate and handled automatically. Your people do higher-value work; the machines do the rest.",
        delay: "0.6s",
        colSpan: 1
      },
      {
        icon: "chat-bubble",
        title: "24/7 AI Customer Support",
        description: "Customers get instant answers on your website and WhatsApp, any time of day — without adding headcount. Your AI handles routine questions; your team closes the deals.",
        delay: "1s",
        colSpan: 1
      },
      {
        icon: "rocket",
        title: "Business Dashboard & Integrations",
        description: "All your business data — leads, revenue, bookings, pipeline — in one clean dashboard. Know what’s happening without digging through five different apps.",
        delay: "1.4s",
        colSpan: 2
      }
    ],
    footerPromise: {
      parts: ["Every system is built around ", "."],
      highlight: "how your business actually works"
    }
  },
  portfolio: {
    header: {
      titleParts: ["AI Solutions", ""],
      titleHighlight: "In Action",
      subtitle: "Live systems built for real businesses. Click any demo to see them in action."
    },
    projects: [
      {
        title: "Restaurant Booking Agent — Emily",
        src: "/portfolio/restaurant-agent.png",
        badge: "Voice AI",
        icon: "call-ringing",
        iconDelay: "1.6s",
        description: "Emily is a voice AI agent for restaurants. She checks live table availability, takes reservations, handles special requests, and suggests alternatives when your preferred slot is full.",
        footerType: "voiceagent",
        category: "agent",
        agentId: "1a1e4be8-ad23-4f77-b3a5-14bada886f47"
      },
      {
        title: "Dental Assistant — Brightsmile",
        src: "/portfolio/dental-agent.png",
        badge: "Voice AI",
        icon: "call-ringing",
        iconDelay: "2.0s",
        description: "A voice AI agent for Brightsmile Dental Clinic. Handles patient appointment scheduling, answers clinic-specific queries, and manages check-up reminders — without a single staff call.",
        footerType: "voiceagent",
        category: "agent",
        agentId: "69286b58-d357-4099-b30a-c6f42a69ca22"
      },
      {
        title: "Real Estate Agent — Aria",
        src: "/portfolio/realestate-agent.png",
        badge: "Voice AI",
        icon: "call-ringing",
        iconDelay: "2.4s",
        description: "Aria is a voice AI agent for real estate firms. She checks live calendar availability, books property viewings and consultations, and instantly offers alternative slots when preferred times are taken.",
        footerType: "voiceagent",
        category: "agent",
        agentId: "0bfcf385-987c-4f41-87fd-27b04f51d589"
      },
      {
        title: "Invoice Data Extraction",
        src: "/portfolio/data-extraction.png",
        badge: "OCR + AI",
        icon: "file-text",
        iconDelay: "2.8s",
        description: "AI reads any invoice — PDF, image, or scan — and extracts every field instantly: vendor, amounts, line items, bank details, and more. No templates, no manual entry.",
        footerType: "invoiceextract",
        category: "agent"
      },
      {
        title: "Boundless Tatoos",
        src: "/portfolio/boundless-preview.png",
        badge: "Modern Website",
        icon: "computer",
        iconDelay: "0s",
        description: "Premium website for a tattoo studio — built to showcase their design portfolio, a curated gallery of tattoo styles, and a seamless browsing experience across all devices.",
        footerType: "website",
        category: "website",
        url: "https://boundless-23gz.vercel.app"
      }
    ]
  },
  contact: {
    header: {
      titleParts: ["What Businesses Achieve With", ""],
      titleHighlight: "Automation",
      subtitle: "Real numbers from the systems we've built and deployed."
    },
    stats: [
      { metric: "70%", label: "Less manual work", icon: "flash", delay: "0s" },
      { metric: "3×", label: "Faster lead response", icon: "rocket", delay: "0.4s" },
      { metric: "48 hrs", label: "Automation setup", icon: "clock", delay: "0.8s" },
      { metric: "24/7", label: "AI-powered customer support", icon: "chat-bubble", delay: "1.2s" }
    ],
    form: {
      title: "Tell Us What You Want Automated",
      subtitle: "Describe one thing you wish ran by itself. We'll show you exactly how to make it happen.",
      buttonText: "Send My Automation Idea",
      businessNameLabel: "Business Name",
      businessNamePlaceholder: "Acme Corp, The Coffee House, etc."
    }
  },
  legal: {
    privacyPolicy: {
      lastUpdated: "April 15, 2026",
      sections: [
        {
          heading: "1. Introduction",
          paragraphs: [
            "Aexa AI is a subsidiary of Aexa Dimensions (\"Company,\" \"we,\" \"us,\" or \"our\"), a company registered in the United States. We operate this website and provide AI-powered automation and software services to businesses.",
            "This Privacy Policy explains how we collect, use, disclose, and protect information when you visit our Site or interact with our demo features. It applies to users in both the United States and India.",
            "By using the Site, you agree to the collection and use of information in accordance with this policy."
          ]
        },
        {
          heading: "2. Information We Collect",
          paragraphs: [
            "Contact Information: When you submit our contact form, we collect your name, email address, phone number (optional), and a description of your automation inquiry.",
            "Appointment Data (Demo): When you interact with our voice booking demos, the AI agent may collect your name, phone number, email address, a description of your requirement, and your preferred appointment time. This data is used solely to facilitate the demo interaction.",
            "Technical Data: We automatically collect certain technical information when you visit the Site, including your IP address, browser type and version, operating system, and pages visited. This data is used for security and operational purposes only.",
            "Preference Data: We store your light/dark theme preference in your browser's local storage. This data never leaves your device and is not transmitted to our servers."
          ]
        },
        {
          heading: "3. How We Use Your Information",
          paragraphs: [
            "We use the information we collect to: respond to your business inquiries and consultation requests; facilitate demo interactions (voice booking, appointment scheduling); send appointment confirmation emails; monitor and improve the security and performance of the Site; and comply with applicable legal obligations.",
            "We do not sell, rent, or trade your personal information to third parties for marketing purposes."
          ]
        },
        {
          heading: "4. Third-Party Service Providers",
          paragraphs: [
            "We share information with the following third-party processors to deliver our services:",
            "Google Calendar (Google LLC) — stores appointment data for demos: name, phone, email, inquiry, time.",
            "Resend (Resend Inc.) — sends transactional confirmation emails: name, email, appointment details.",
            "Vapi (Vapi AI Inc.) — provides voice AI agent infrastructure: call audio and transcripts during demos.",
            "Google Gemini (Google LLC) — processes invoice images for the extraction demo. Images are not stored after processing.",
            "n8n (n8n GmbH) — handles contact form automation: name, email, phone, inquiry.",
            "Anthropic (Anthropic PBC) — provides AI invoice processing on the server side only.",
            "Spline (Spline Design) — renders the 3D scene in your browser. No personal data is shared.",
            "Each provider is governed by their own privacy policy. We encourage you to review them."
          ]
        },
        {
          heading: "5. Demo Features Disclaimer",
          paragraphs: [
            "Our voice AI agents (booking assistant, dental demo, real estate agent) and invoice extraction tool are demonstrations of our capabilities. These features process real input during your interaction.",
            "Voice calls are processed through Vapi's infrastructure, which may maintain call logs per their own data retention policies. We do not independently record or store voice call audio.",
            "Invoice images submitted for extraction are processed ephemerally and are not stored on our servers."
          ]
        },
        {
          heading: "6. Data Retention",
          paragraphs: [
            "Contact form submissions are retained for 1 year from the date of submission, after which they are deleted from our automation systems.",
            "Appointment data stored in Google Calendar is retained per Google's standard data policies.",
            "We do not maintain a separate database of user records on this Site."
          ]
        },
        {
          heading: "7. Your Privacy Rights",
          paragraphs: [
            "CCPA (California Residents): If you are a California resident, you have the right to know what personal information we collect, request deletion of your data, opt out of the sale of personal information (we do not sell data), and not be discriminated against for exercising these rights.",
            "DPDP Act 2023 (India Residents): If you are located in India, you have the right to access your personal data, correct inaccurate data, erase your data, and nominate a representative to exercise these rights on your behalf. You may also withdraw consent at any time.",
            "To exercise any of these rights, contact us at contactaexa@aexadimensions.com."
          ]
        },
        {
          heading: "8. Data Security",
          paragraphs: [
            "We implement industry-standard security measures including HTTPS encryption for all data in transit and access-controlled API keys and credentials.",
            "However, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security of your information."
          ]
        },
        {
          heading: "9. Children's Privacy",
          paragraphs: [
            "Our Site is intended for business owners and professionals aged 18 or older. We do not knowingly collect personal information from individuals under the age of 18.",
            "If you believe we have inadvertently collected such information, please contact us immediately for deletion."
          ]
        },
        {
          heading: "10. International Data Transfers",
          paragraphs: [
            "Our servers and third-party processors are primarily located in the United States. If you access our Site from India or other regions, your information may be transferred to and processed in the United States.",
            "By using the Site, you acknowledge this transfer. We take reasonable steps to ensure your data is treated securely and in accordance with this policy."
          ]
        },
        {
          heading: "11. Changes to This Policy",
          paragraphs: [
            "We may update this Privacy Policy periodically. The \"Last Updated\" date at the top of this document reflects the most recent revision.",
            "For material changes, we will notify you by email (if we have your contact information) or by placing a prominent notice on our Site. Continued use of the Site after changes take effect constitutes your acceptance of the revised policy."
          ]
        },
        {
          heading: "12. Contact Us",
          paragraphs: [
            "For privacy-related inquiries, to exercise your rights, or to report a concern:",
            "Aexa Dimensions / Aexa AI\n1160 Dumont Ranch Parkway, Reno, NV 89521, USA\nPhone: +1 (512) 979-5262\nEmail: contactaexa@aexadimensions.com"
          ]
        }
      ]
    },
    termsOfService: {
      lastUpdated: "April 15, 2026",
      sections: [
        {
          heading: "1. Acceptance of Terms",
          paragraphs: [
            "By accessing or using the Aexa AI website (the \"Site\"), you agree to be bound by these Terms of Service (\"Terms\"). If you do not agree to these Terms, do not use the Site.",
            "These Terms constitute a legally binding agreement between you and Aexa Dimensions and its subsidiary Aexa AI."
          ]
        },
        {
          heading: "2. About Aexa",
          paragraphs: [
            "Aexa AI is a product of Aexa Dimensions, a company registered in the United States with its principal address at 1160 Dumont Ranch Parkway, Reno, NV 89521.",
            "Aexa AI provides AI automation and software development services to businesses."
          ]
        },
        {
          heading: "3. Eligibility",
          paragraphs: [
            "This Site is intended exclusively for businesses, business owners, and professionals aged 18 or older.",
            "By using the Site, you represent and warrant that: you are at least 18 years of age; you are accessing the Site on behalf of a business or professional entity; and you have the authority to bind that entity to these Terms."
          ]
        },
        {
          heading: "4. Description of Services",
          paragraphs: [
            "The Site serves as a marketing presence and demonstration platform for Aexa AI's services. The interactive demos (voice booking agents, invoice extraction, etc.) are proof-of-concept showcases only.",
            "Actual service agreements, deliverables, timelines, and payment terms are governed by separate written contracts executed between Aexa and each client. Nothing on this Site constitutes a binding service agreement or guarantee of results."
          ]
        },
        {
          heading: "5. Demo Features Disclaimer",
          paragraphs: [
            "All demo features on this Site — including AI voice agents, appointment booking, and invoice data extraction — are provided strictly for demonstration purposes.",
            "Demo interactions may process real input but do not constitute production-grade services. Results from demos are not guaranteed to be accurate, complete, or suitable for any business purpose. Aexa AI disclaims all liability for actions taken based on demo outputs."
          ]
        },
        {
          heading: "6. Intellectual Property",
          paragraphs: [
            "All content on this Site — including text, graphics, code, AI agent configurations, and branding — is the exclusive property of Aexa Dimensions or its licensors and is protected by applicable intellectual property laws.",
            "You may not reproduce, distribute, modify, create derivative works of, or commercially exploit any content from this Site without prior written permission from Aexa."
          ]
        },
        {
          heading: "7. Acceptable Use",
          paragraphs: [
            "You agree not to: use automated scripts or bots to access or scrape the Site or its demo features; attempt to reverse engineer, decompile, or extract the source code of any demo agent or Site feature; use the demo features to transmit harmful, fraudulent, or illegal content; interfere with or disrupt the Site's infrastructure; impersonate any person or entity; or use the Site for any purpose that violates applicable law."
          ]
        },
        {
          heading: "8. Disclaimer of Warranties",
          paragraphs: [
            "THE SITE AND ALL DEMO FEATURES ARE PROVIDED ON AN \"AS IS\" AND \"AS AVAILABLE\" BASIS WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED.",
            "AEXA EXPRESSLY DISCLAIMS ALL WARRANTIES INCLUDING BUT NOT LIMITED TO MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, AND ACCURACY OF INFORMATION. WE DO NOT WARRANT THAT THE SITE WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS."
          ]
        },
        {
          heading: "9. Limitation of Liability",
          paragraphs: [
            "TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, AEXA DIMENSIONS AND AEXA AI SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO YOUR USE OF THE SITE.",
            "IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU EXCEED ONE HUNDRED US DOLLARS ($100 USD). SOME JURISDICTIONS DO NOT ALLOW LIMITATION OF LIABILITY FOR CONSEQUENTIAL DAMAGES; IN SUCH CASES, OUR LIABILITY IS LIMITED TO THE MAXIMUM EXTENT PERMITTED BY LAW."
          ]
        },
        {
          heading: "10. Indemnification",
          paragraphs: [
            "You agree to indemnify, defend, and hold harmless Aexa Dimensions, Aexa AI, and their officers, directors, employees, and agents from any claims, liabilities, damages, losses, and expenses (including reasonable legal fees) arising out of or related to your use of the Site, your violation of these Terms, or your violation of any applicable law or third-party rights."
          ]
        },
        {
          heading: "11. Governing Law & Dispute Resolution",
          paragraphs: [
            "These Terms are governed by and construed in accordance with the laws of the State of Nevada, United States, without regard to its conflict of law principles.",
            "For disputes involving amounts greater than $10,000 USD, the parties agree to binding arbitration administered by JAMS in Reno, Nevada, under its Commercial Arbitration Rules. For smaller disputes, either party may pursue resolution in the appropriate small claims court in Washoe County, Nevada."
          ]
        },
        {
          heading: "12. India-Specific Provisions",
          paragraphs: [
            "For users accessing the Site from India: these Terms shall also be subject to the Information Technology Act, 2000, and the Digital Personal Data Protection Act, 2023, as applicable.",
            "Disputes involving Indian parties shall, at Aexa's election, be subject to binding arbitration in accordance with the Arbitration and Conciliation Act, 1996 of India, with proceedings conducted in English.",
            "Indian users acknowledge that data will be transferred to and processed in the United States."
          ]
        },
        {
          heading: "13. Modifications to Terms",
          paragraphs: [
            "We reserve the right to modify these Terms at any time. Changes take effect upon posting to the Site with an updated effective date.",
            "Your continued use of the Site after changes are posted constitutes your acceptance of the modified Terms. If you do not agree to the modified Terms, you must discontinue use of the Site."
          ]
        },
        {
          heading: "14. Contact Us",
          paragraphs: [
            "For questions about these Terms:",
            "Aexa Dimensions / Aexa AI\n1160 Dumont Ranch Parkway, Reno, NV 89521, USA\nPhone: +1 (512) 979-5262\nEmail: contactaexa@aexadimensions.com"
          ]
        }
      ]
    }
  },
  footer: {
    brand: {
      name: "Aexa AI",
      description: "AI systems for businesses that want to grow without everything running through them manually."
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
