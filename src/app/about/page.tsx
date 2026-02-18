"use client";

import { useEffect, useRef, useState } from "react";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 2000;
          const increment = target / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-4xl sm:text-5xl font-black text-cyber-teal text-glow animate-count-up">
      {count.toLocaleString()}{suffix}
    </div>
  );
}

const stats = [
  { value: 120, suffix: "+", label: "Events Hosted" },
  { value: 180, suffix: "+", label: "Teams Verified" },
  { value: 50, suffix: "+", label: "Free Tournaments" },
  { value: 2400, suffix: "+", label: "Active Players" },
];

const testimonials = [
  {
    quote: "YG gave our team a fair place to start competing. The tier system is brilliant for new teams.",
    name: "Aditya 'PhantomAce' S.",
    role: "Team Captain",
  },
  {
    quote: "From Tier 1 scrims to a Tier 4 tournament final — the journey has been incredible.",
    name: "Priya 'NeonSurge' K.",
    role: "IGL, Neon Rush",
  },
  {
    quote: "Best community customs in India. The Discord is always buzzing.",
    name: "Rohan 'VoidWalker' M.",
    role: "Content Creator",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-16">
      {/* ═══ HERO ═══════════════════════════════ */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 grid-bg pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(204,255,0,0.15),transparent)]" />
        {/* Floating geometric shapes */}
        <div className="absolute top-20 right-[10%] w-40 h-40 border border-cyber-teal/10 rotate-45 animate-float hidden lg:block" />
        <div className="absolute bottom-20 left-[5%] w-56 h-56 border border-cyber-purple/10 -rotate-12 animate-float hidden lg:block" style={{ animationDelay: "2s" }} />
        {/* Abstract stacked rectangles (inspired by image 1) */}
        <div className="absolute right-[5%] top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-2 opacity-20">
          {[80, 120, 100, 140, 90, 60, 110].map((w, i) => (
            <div
              key={i}
              className="h-4 bg-cyber-teal clip-angle-tr"
              style={{ width: `${w}px`, marginLeft: `${(i % 3) * 15}px` }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1 border border-cyber-teal/30 bg-cyber-teal/5 text-cyber-teal text-xs tracking-widest uppercase mb-6 clip-angle-tl">
            About Us
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight mb-6">
            YUVA <span className="text-cyber-teal text-glow">GABBRUS</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 font-light max-w-2xl mx-auto mb-4">
            Building India&apos;s next generation of esports talent.
          </p>
          <p className="text-base text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10">
            Yuva Gabbrus is India&apos;s community-first esports hub — where grassroots players level up
            through verified, tier-based competition. We host practice scrims, tier-exclusive tournaments,
            and community customs to help players learn, compete, and grow. YG connects players to scouts,
            creators, and sponsors while championing fair play and skill-first progression.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://discord.gg/nKPrZ9v7wr"
              target="_blank"
              rel="noopener noreferrer"
              className="cyber-btn cyber-btn-primary text-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
              </svg>
              Join Discord
            </a>
            <a href="#contact" className="cyber-btn cyber-btn-purple text-sm">
              🤝 Run with Us — Sponsors & Organizers
            </a>
          </div>
        </div>
      </section>

      {/* ═══ ANIMATED COUNTERS ═════════════════ */}
      <section className="py-20 border-t border-cyber-border relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(204,255,0,0.04),transparent)]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <AnimatedCounter target={s.value} suffix={s.suffix} />
                <div className="text-xs text-gray-500 tracking-wider uppercase mt-2">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHAT WE DO ═══════════════════════ */}
      <section className="py-20 border-t border-cyber-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs tracking-[0.3em] text-cyber-teal uppercase">What We Do</span>
            <h2 className="text-3xl font-black tracking-tight mt-1">
              OUR <span className="text-cyber-teal">MISSION</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "⚡",
                title: "Tier-Based Tournaments",
                desc: "Fair, skill-matched competition from Tier 1 to Tier 5. No smurfs, no gatekeeping — just verified play.",
              },
              {
                icon: "🎯",
                title: "Free Practice Scrims",
                desc: "Daily community customs and private lobbies. Warmup, experiment, and improve as a team.",
              },
              {
                icon: "🚀",
                title: "Growth Pathways",
                desc: "Connect with scouts, content creators, and sponsors. Turn competitive drive into real opportunities.",
              },
            ].map((item) => (
              <div key={item.title} className="cyber-card p-6 clip-angle-tl text-center group">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-black mb-2 group-hover:text-cyber-teal transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═════════════════════ */}
      <section className="py-20 border-t border-cyber-border relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(139,92,246,0.05),transparent)]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs tracking-[0.3em] text-cyber-purple uppercase">Voices</span>
            <h2 className="text-3xl font-black tracking-tight mt-1">
              FROM THE <span className="text-cyber-purple">COMMUNITY</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="cyber-card p-6 clip-angle-tl">
                <div className="text-lg text-cyber-teal mb-3">&quot;</div>
                <p className="text-sm text-gray-400 leading-relaxed italic mb-4">{t.quote}</p>
                <div className="border-t border-cyber-border pt-3">
                  <div className="text-sm font-bold">{t.name}</div>
                  <div className="text-xs text-gray-500">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ VIDEO HIGHLIGHT ══════════════════ */}
      <section className="py-20 border-t border-cyber-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs tracking-[0.3em] text-cyber-teal uppercase">Watch</span>
          <h2 className="text-3xl font-black tracking-tight mt-1 mb-8">
            HIGHLIGHT <span className="text-cyber-teal">REEL</span>
          </h2>
          {/* Video placeholder */}
          <div className="cyber-card aspect-video flex items-center justify-center clip-cyber">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-cyber-teal/20 border-2 border-cyber-teal flex items-center justify-center mb-3 animate-pulse-glow cursor-pointer hover:bg-cyber-teal/30 transition-colors">
                <svg className="w-8 h-8 text-cyber-teal ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="text-sm text-gray-500">YG Esports — Season 1 Highlights</p>
              <p className="text-xs text-gray-600 mt-1">Coming soon — embedded video player</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SPONSORS ═════════════════════════ */}
      <section className="py-20 border-t border-cyber-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs tracking-[0.3em] text-cyber-teal uppercase">Partners</span>
          <h2 className="text-3xl font-black tracking-tight mt-1 mb-8">
            OUR <span className="text-cyber-teal">SPONSORS</span>
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-40 mb-8">
            {["Gaming Brand", "Energy Drink", "Peripherals Co", "Streaming Platform", "Telecom Partner"].map((s) => (
              <div
                key={s}
                className="px-8 py-4 border border-dashed border-cyber-border text-sm text-gray-600 tracking-wider uppercase"
              >
                {s}
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500">
            Interested in partnering?{" "}
            <a href="#contact" className="text-cyber-teal hover:underline">
              Contact us
            </a>
          </p>
        </div>
      </section>

      {/* ═══ CONTACT / RUN WITH US ═══════════ */}
      <section id="contact" className="py-20 border-t border-cyber-border relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyber-teal/5 via-transparent to-cyber-purple/5" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black tracking-tight mb-4">
            RUN WITH <span className="text-cyber-teal text-glow">US</span>
          </h2>
          <p className="text-gray-400 text-sm mb-8 max-w-md mx-auto">
            Are you a brand, content creator, or event organizer? Let&apos;s collaborate to grow
            grassroots esports in India.
          </p>
          <div className="cyber-card p-8 clip-cyber">
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" placeholder="Your Name" className="cyber-input clip-angle-tl" />
                <input type="email" placeholder="Email" className="cyber-input clip-angle-tl" />
              </div>
              <input type="text" placeholder="Organization / Brand" className="cyber-input clip-angle-tl" />
              <textarea
                rows={4}
                placeholder="Tell us how you'd like to collaborate..."
                className="cyber-input clip-angle-tl resize-none"
              />
              <button type="submit" className="cyber-btn cyber-btn-primary w-full justify-center">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
