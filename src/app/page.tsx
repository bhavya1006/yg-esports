import Link from "next/link";
import TierLadder from "@/components/TierLadder";
import TournamentCarousel from "@/components/TournamentCarousel";
import LeaderboardPreview from "@/components/LeaderboardPreview";
import CommunityFeed from "@/components/CommunityFeed";
import HeroCTA from "@/components/HeroCTA";

export default function Home() {
  return (
    <>
      {/* ═══ HERO ═══════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
        {/* grid bg */}
        <div className="absolute inset-0 grid-bg pointer-events-none" />
        {/* radial gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(204,255,0,0.12),transparent)]" />
        {/* decorative elements */}
        <div className="absolute top-32 left-10 w-64 h-64 bg-cyber-teal/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-cyber-purple/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
        {/* geometric accents inspired by image 1 */}
        <div className="absolute top-40 right-[15%] w-20 h-3 bg-cyber-teal/20 clip-angle-tr hidden lg:block" />
        <div className="absolute top-48 right-[13%] w-32 h-3 bg-cyber-teal/10 clip-angle-tr hidden lg:block" />
        <div className="absolute bottom-40 left-[10%] w-24 h-3 bg-cyber-purple/15 clip-angle-bl hidden lg:block" />
        <div className="absolute bottom-48 left-[12%] w-16 h-3 bg-cyber-purple/10 clip-angle-bl hidden lg:block" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            {/* tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-cyber-teal/30 bg-cyber-teal/5 text-cyber-teal text-xs tracking-widest uppercase mb-6 clip-angle-tl animate-fade-in">
              <span className="w-2 h-2 bg-cyber-teal rounded-full animate-pulse" />
              Season 1 Now Live
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight mb-6 animate-slide-left">
              FROM <span className="text-cyber-teal text-glow">PRACTICE</span>
              <br />
              TO <span className="text-cyber-purple text-glow-purple">PRO</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-400 max-w-xl mb-10 leading-relaxed animate-fade-in" style={{ animationDelay: "0.3s" }}>
              Tiered Valorant tournaments powered by Yuva Gabbrus.
              Verified competition, free scrims, and a community that
              builds India&apos;s next generation of esports talent.
            </p>

            <HeroCTA />

            {/* Quick stats */}
            <div className="mt-14 grid grid-cols-3 gap-6 max-w-md animate-fade-in" style={{ animationDelay: "0.8s" }}>
              {[
                { value: "2,400+", label: "Players" },
                { value: "180+", label: "Teams Verified" },
                { value: "50+", label: "Tournaments" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-black text-cyber-teal">{s.value}</div>
                  <div className="text-xs text-gray-500 tracking-wider uppercase mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
          <span className="text-[10px] tracking-[0.3em] uppercase text-gray-600">Scroll</span>
          <svg className="w-4 h-4 text-cyber-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* ═══ QUICK MATCHMAKER ═══════════════════ */}
      <section className="relative py-20 border-t border-cyber-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="cyber-card p-8 sm:p-10 clip-cyber">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1">
                <h2 className="text-2xl font-black tracking-tight mb-2">
                  <span className="text-cyber-teal">QUICK</span> MATCHMAKER
                </h2>
                <p className="text-gray-400 text-sm">
                  Enter solo or as a team. Select your tier. Get matched into a practice scrim — instantly.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 items-center">
                <select className="cyber-input w-40 text-sm clip-angle-tl cursor-pointer">
                  <option>Solo Queue</option>
                  <option>Team (5v5)</option>
                </select>
                <select className="cyber-input w-40 text-sm clip-angle-tl cursor-pointer">
                  <option>Any Tier</option>
                  <option>Tier 1</option>
                  <option>Tier 2</option>
                  <option>Tier 3</option>
                  <option>Tier 4</option>
                  <option>Tier 5 — Esports</option>
                </select>
                <button className="cyber-btn cyber-btn-primary text-sm whitespace-nowrap">
                  Find a Match
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ UPCOMING TOURNAMENTS ═══════════════ */}
      <section className="py-20 border-t border-cyber-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-xs tracking-[0.3em] text-cyber-teal uppercase">Compete</span>
              <h2 className="text-3xl font-black tracking-tight mt-1">
                UPCOMING <span className="text-cyber-teal">TOURNAMENTS</span>
              </h2>
            </div>
            <Link href="/tournaments" className="hidden sm:inline-flex cyber-btn text-xs py-2 px-4">
              View All
            </Link>
          </div>
          <TournamentCarousel />
        </div>
      </section>

      {/* ═══ TIER LADDER ═══════════════════════ */}
      <section className="py-20 border-t border-cyber-border relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(204,255,0,0.04),transparent)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs tracking-[0.3em] text-cyber-teal uppercase">Progression</span>
            <h2 className="text-3xl font-black tracking-tight mt-1">
              TIER <span className="text-cyber-teal">LADDER</span>
            </h2>
            <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto">
              Climb through verified tiers. Each rank unlocks new tournament access and competitive privileges.
            </p>
          </div>
          <TierLadder />
        </div>
      </section>

      {/* ═══ LEADERBOARDS ══════════════════════ */}
      <section className="py-20 border-t border-cyber-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-xs tracking-[0.3em] text-cyber-teal uppercase">Rankings</span>
              <h2 className="text-3xl font-black tracking-tight mt-1">
                LEADER<span className="text-cyber-teal">BOARDS</span>
              </h2>
            </div>
            <Link href="/stats" className="hidden sm:inline-flex cyber-btn text-xs py-2 px-4">
              Full Rankings
            </Link>
          </div>
          <LeaderboardPreview />
        </div>
      </section>

      {/* ═══ TRAINING & CREATOR SPOTLIGHT ═════ */}
      <section className="py-20 border-t border-cyber-border relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(139,92,246,0.06),transparent)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs tracking-[0.3em] text-cyber-purple uppercase">Why YG</span>
          <h2 className="text-3xl font-black tracking-tight mt-1 mb-4">
            TRAINING-FIRST <span className="text-cyber-purple">ESPORTS</span>
          </h2>
          <p className="text-gray-500 text-sm max-w-lg mx-auto mb-12">
            YG tournaments are 100% free and open. Our focus is building a competitive training environment for Valorant — not prize money. Improve, compete, rank up.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {[
              { icon: "🎯", title: "Free & Open", desc: "All tournaments are completely free. No entry fees, no hidden costs — just pure competition." },
              { icon: "📈", title: "Skill Growth", desc: "Structured competitive environment designed to help players improve through real match experience." },
              { icon: "🎙️", title: "Creator Spotlights", desc: "We partner with content creators to host sponsored showcase events and promote community talent." },
            ].map((item) => (
              <div
                key={item.title}
                className="cyber-card p-6 clip-angle-tl text-center"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <div className="text-sm font-bold mb-2">{item.title}</div>
                <div className="text-xs text-gray-500">{item.desc}</div>
              </div>
            ))}
          </div>

          {/* Creator / Sponsor callout */}
          <div className="cyber-card p-6 sm:p-8 clip-cyber border-cyber-purple/30 max-w-2xl mx-auto">
            <div className="text-xs tracking-[0.2em] text-cyber-purple uppercase mb-2">Creator Partnership</div>
            <div className="text-lg font-black mb-2">Want to host a sponsored tournament?</div>
            <p className="text-xs text-gray-400 mb-4">
              If you&apos;re a content creator or brand looking to sponsor a YG tournament, reach out on Discord. We&apos;ll feature your name, stream it live, and give your community a stage.
            </p>
            <a
              href="https://discord.gg/nKPrZ9v7wr"
              target="_blank"
              rel="noopener noreferrer"
              className="cyber-btn cyber-btn-purple text-xs py-2 px-6"
            >
              Partner With Us on Discord
            </a>
          </div>
        </div>
      </section>

      {/* ═══ COMMUNITY FEED ═══════════════════ */}
      <section className="py-20 border-t border-cyber-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs tracking-[0.3em] text-cyber-teal uppercase">Community</span>
            <h2 className="text-3xl font-black tracking-tight mt-1">
              WHAT&apos;S <span className="text-cyber-teal">HAPPENING</span>
            </h2>
          </div>
          <CommunityFeed />
        </div>
      </section>

      {/* ═══ CTA BANNER ══════════════════════ */}
      <section className="py-20 border-t border-cyber-border relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyber-teal/5 via-transparent to-cyber-purple/5" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
            READY TO <span className="text-cyber-teal text-glow">COMPETE</span>?
          </h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Register, verify your Riot account, and join the next tournament. Free scrims available daily.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/signup" className="cyber-btn cyber-btn-primary">
              Create Account & Verify
            </Link>
            <a
              href="https://discord.gg/nKPrZ9v7wr"
              target="_blank"
              rel="noopener noreferrer"
              className="cyber-btn cyber-btn-purple"
            >
              Join Discord
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
