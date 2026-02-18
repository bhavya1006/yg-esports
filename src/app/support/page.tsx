"use client";

import { useState } from "react";

const rules = [
  {
    title: "Fair Play Policy",
    icon: "⚖️",
    items: [
      "All players must compete under their verified Riot ID — no smurfs or shared accounts.",
      "Exploiting game-breaking bugs intentionally results in immediate disqualification.",
      "Third-party tools, aim assists, or any form of cheating software is strictly prohibited.",
      "Players must maintain respect for opponents, referees, and staff at all times.",
      "Match-fixing or intentional throwing will result in a permanent ban from YG Esports.",
    ],
  },
  {
    title: "Anti-Cheat & Monitoring",
    icon: "🛡️",
    items: [
      "All matches are recorded and subject to review by the YG Admin team.",
      "Riot Vanguard anti-cheat is required to be active during all competitive matches.",
      "Players may be asked to join a Discord screenshare for random audit during live matches.",
      "Suspicious activity will trigger auto-flag — admins review within 24 hours.",
      "Community reports are taken seriously — provide match ID and timestamp when filing.",
    ],
  },
  {
    title: "Dispute Resolution",
    icon: "🔧",
    items: [
      "Disputes must be raised within 24 hours of the match via the #dispute-ticket channel.",
      "Provide match ID, screenshot/clip evidence, and a brief description.",
      "Admin will review within 48 hours and issue a ruling.",
      "Rulings are final unless new substantial evidence is presented for appeal.",
      "Appeals must be filed within 7 days via the support form below.",
    ],
  },
  {
    title: "Team & Roster Rules",
    icon: "👥",
    items: [
      "Each team must have exactly 5 main players and up to 2 substitutes registered.",
      "Roster changes are locked 48 hours before any tournament you are registered for.",
      "A player can only represent one team per tournament cycle.",
      "Teams must maintain minimum tier requirements throughout the tournament.",
      "Unverified players cannot participate in ranked tournaments.",
    ],
  },
  {
    title: "Match Lobby Rules",
    icon: "🎮",
    items: [
      "All players must join the Discord match lobby 15 minutes before scheduled time.",
      "Failure to show within 10 minutes of scheduled start = automatic forfeit (0-13).",
      "Map picks follow the tournament-specific veto system published in the bracket.",
      "Pauses are limited to 2 per team per map, max 5 minutes each.",
      "Technical issues must be reported immediately — admin will decide on remakes.",
    ],
  },
];

const faq = [
  {
    q: "How do I verify my Riot account?",
    a: "Go to Sign Up or your Profile page, click 'Link Riot Account', and complete the OAuth flow. A verification tag will be added to your Riot account name. This usually takes under 2 minutes.",
  },
  {
    q: "What happens if a teammate disconnects during a match?",
    a: "The team has 5 minutes to reconnect. If the player cannot rejoin, a registered substitute may take over. If no sub is available, the match continues 4v5. Admin may grant additional pause time for ISP issues on a case-by-case basis.",
  },
  {
    q: "Can I play in multiple teams?",
    a: "No. A player can only be registered on one team roster per tournament cycle. Switching teams mid-cycle requires admin approval and a 7-day cooldown period.",
  },
  {
    q: "How is MMR calculated?",
    a: "MMR is a rolling average factoring in match wins, round differentials, KDA, and opponent tier. Tier 5 matches weigh more. The exact formula is proprietary but transparent tier thresholds are published.",
  },
  {
    q: "What are the tier thresholds?",
    a: "Tier 1: 0–599 MMR, Tier 2: 600–1199, Tier 3: 1200–1599, Tier 4: 1600–1999, Tier 5 (Esports): 2000+. Promotion/demotion occurs after a 5-match evaluation window.",
  },
  {
    q: "How do I report a cheater?",
    a: "Use the #dispute-ticket channel on Discord or the support form below. Include the match ID, player name, and any evidence (clips/screenshots). Reports are reviewed within 48 hours.",
  },
];

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [tab, setTab] = useState<"rules" | "faq" | "support" | "admin">("rules");

  return (
    <div className="min-h-screen pt-20 pb-20">
      {/* Hero */}
      <section className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 grid-bg pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_20%,rgba(204,255,0,0.06),transparent)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs tracking-[0.3em] text-cyber-teal uppercase">Support</span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mt-1 mb-3">
            RULES & <span className="text-cyber-teal text-glow">SUPPORT</span>
          </h1>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Fair play policies, FAQ, dispute resolution, and admin tools.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {(["rules", "faq", "support", "admin"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`cyber-btn text-xs py-2 px-5 ${tab === t ? "cyber-btn-primary" : ""}`}
            >
              {t === "rules" && "📜 Rules"}
              {t === "faq" && "❓ FAQ"}
              {t === "support" && "🎫 Support"}
              {t === "admin" && "⚙️ Admin Panel"}
            </button>
          ))}
        </div>

        {/* Rules Tab */}
        {tab === "rules" && (
          <div className="space-y-6 animate-fade-in">
            {rules.map((section) => (
              <div key={section.title} className="cyber-card p-6 sm:p-8 clip-angle-tl">
                <h3 className="text-sm font-bold uppercase tracking-widest text-cyber-teal mb-4 flex items-center gap-2">
                  <span className="text-lg">{section.icon}</span>
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                      <span className="w-5 h-5 flex items-center justify-center text-[10px] font-bold text-cyber-teal bg-cyber-teal/10 rounded shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* FAQ Tab */}
        {tab === "faq" && (
          <div className="space-y-3 animate-fade-in max-w-3xl">
            {faq.map((item, i) => (
              <div key={i} className="cyber-card overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left p-5 flex items-center gap-3 hover:bg-cyber-surface/50 transition-colors"
                >
                  <span className={`text-cyber-teal transition-transform ${openFaq === i ? "rotate-90" : ""}`}>
                    ▶
                  </span>
                  <span className="text-sm font-bold">{item.q}</span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 pl-12 animate-fade-in">
                    <p className="text-sm text-gray-400 leading-relaxed">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Support Tab */}
        {tab === "support" && (
          <div className="animate-fade-in max-w-2xl">
            <div className="cyber-card p-6 sm:p-8 clip-angle-tl">
              <h3 className="text-sm font-bold uppercase tracking-widest text-cyber-teal mb-6">
                Submit a Ticket
              </h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Your Name / IGN</label>
                    <input className="cyber-input w-full clip-angle-tl" placeholder="PhantomAce#YGIN" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Email</label>
                    <input className="cyber-input w-full clip-angle-tl" type="email" placeholder="you@email.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Category</label>
                  <select className="cyber-input w-full clip-angle-tl cursor-pointer">
                    <option>Dispute / Match Issue</option>
                    <option>Cheating Report</option>
                    <option>Account / Verification</option>
                    <option>Technical Issue</option>
                    <option>Team / Roster Issue</option>
                    <option>General Question</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Match ID (if applicable)</label>
                  <input className="cyber-input w-full clip-angle-tl" placeholder="e.g. YG-VAL-2026-0312-007" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Description</label>
                  <textarea
                    className="cyber-input w-full clip-angle-tl min-h-[120px] resize-y"
                    placeholder="Describe the issue in detail. Include timestamps and evidence links."
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Evidence Upload</label>
                  <div className="border-2 border-dashed border-cyber-border rounded-lg p-6 text-center hover:border-cyber-teal/50 transition-colors cursor-pointer">
                    <div className="text-2xl mb-2">📎</div>
                    <div className="text-xs text-gray-500">
                      Drag files here or click to upload (screenshots, clips — max 25MB)
                    </div>
                  </div>
                </div>
                <button type="submit" className="cyber-btn cyber-btn-primary text-xs py-3 px-8 w-full sm:w-auto">
                  Submit Ticket →
                </button>
              </form>
            </div>

            <div className="cyber-card p-5 mt-6 border-l-4 border-cyber-purple">
              <div className="text-sm font-bold mb-1">Need faster help?</div>
              <p className="text-xs text-gray-400">
                Join our Discord and open a ticket in <span className="text-cyber-purple font-mono">#dispute-ticket</span> for real-time support from the admin team.
              </p>
            </div>
          </div>
        )}

        {/* Admin Panel Tab */}
        {tab === "admin" && (
          <div className="animate-fade-in space-y-6">
            <div className="cyber-card p-4 border-l-4 border-amber-400 clip-angle-tr">
              <div className="flex items-center gap-2 text-sm">
                <span>🔒</span>
                <span className="font-bold text-amber-400">Admin Access Required</span>
                <span className="text-xs text-gray-500">— This panel is for authorized YG staff only</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Team Validation */}
              <div className="cyber-card p-6 clip-angle-tl">
                <h3 className="text-sm font-bold uppercase tracking-widest text-cyber-teal mb-4">
                  Team Validation Queue
                </h3>
                <div className="space-y-3 mb-4">
                  {[
                    { team: "Night Owls", members: 5, status: "pending" },
                    { team: "Rocket Surge", members: 4, status: "incomplete" },
                    { team: "Shadow Pulse", members: 5, status: "pending" },
                  ].map((t) => (
                    <div key={t.team} className="flex items-center gap-3 p-3 bg-cyber-surface/50 rounded">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          t.status === "pending" ? "bg-amber-400" : "bg-red-400"
                        }`}
                      />
                      <div className="flex-1">
                        <div className="text-xs font-bold">{t.team}</div>
                        <div className="text-[10px] text-gray-500">{t.members}/5 verified • {t.status}</div>
                      </div>
                      <button className="text-[10px] text-cyber-teal hover:underline">Review</button>
                    </div>
                  ))}
                </div>
                <div className="text-xs text-gray-500">3 teams awaiting review</div>
              </div>

              {/* Tournament Management */}
              <div className="cyber-card p-6 clip-angle-tr">
                <h3 className="text-sm font-bold uppercase tracking-widest text-cyber-purple mb-4">
                  Tournament Management
                </h3>
                <div className="space-y-3 mb-4">
                  <button className="w-full text-left p-3 bg-cyber-surface/50 rounded hover:bg-cyber-surface transition-colors text-xs">
                    <div className="font-bold">Create New Tournament</div>
                    <div className="text-gray-500 mt-0.5">Set up brackets, maps, rules</div>
                  </button>
                  <button className="w-full text-left p-3 bg-cyber-surface/50 rounded hover:bg-cyber-surface transition-colors text-xs">
                    <div className="font-bold">Manage Active Tournaments</div>
                    <div className="text-gray-500 mt-0.5">3 active, 2 upcoming</div>
                  </button>
                  <button className="w-full text-left p-3 bg-cyber-surface/50 rounded hover:bg-cyber-surface transition-colors text-xs">
                    <div className="font-bold">Result Entry</div>
                    <div className="text-gray-500 mt-0.5">Input match scores & verify</div>
                  </button>
                </div>
              </div>

              {/* Moderation */}
              <div className="cyber-card p-6 clip-angle-tl">
                <h3 className="text-sm font-bold uppercase tracking-widest text-red-400 mb-4">
                  Moderation
                </h3>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between p-3 bg-cyber-surface/50 rounded">
                    <div>
                      <div className="text-xs font-bold">Active Bans</div>
                      <div className="text-[10px] text-gray-500">Permanent & temporary</div>
                    </div>
                    <span className="text-sm font-black text-red-400">7</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-cyber-surface/50 rounded">
                    <div>
                      <div className="text-xs font-bold">Open Disputes</div>
                      <div className="text-[10px] text-gray-500">Awaiting review</div>
                    </div>
                    <span className="text-sm font-black text-amber-400">4</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-cyber-surface/50 rounded">
                    <div>
                      <div className="text-xs font-bold">Flagged Matches</div>
                      <div className="text-[10px] text-gray-500">Auto-flagged by system</div>
                    </div>
                    <span className="text-sm font-black text-amber-400">2</span>
                  </div>
                </div>
                <button className="cyber-btn text-[10px] py-1.5 px-4 w-full">
                  Open Moderation Dashboard
                </button>
              </div>

              {/* Manual Verification */}
              <div className="cyber-card p-6 clip-angle-tr">
                <h3 className="text-sm font-bold uppercase tracking-widest text-cyber-teal mb-4">
                  Manual Verification
                </h3>
                <p className="text-xs text-gray-400 mb-4">
                  Override verification for players with OAuth issues. Requires admin + secondary approval.
                </p>
                <div className="space-y-3">
                  <input
                    className="cyber-input w-full text-xs clip-angle-tl"
                    placeholder="Search player by IGN or email..."
                  />
                  <button className="cyber-btn text-[10px] py-1.5 px-4">
                    Search & Verify
                  </button>
                </div>
              </div>

              {/* Platform Stats */}
              <div className="cyber-card p-6 clip-angle-tl">
                <h3 className="text-sm font-bold uppercase tracking-widest text-cyber-teal mb-4">
                  Platform Overview
                </h3>
                <div className="space-y-3">
                  {[
                    { label: "Total Players", value: "2,437" },
                    { label: "Verified Players", value: "1,892" },
                    { label: "Active Teams", value: "186" },
                    { label: "Tournaments Run", value: "124" },
                    { label: "Matches This Month", value: "347" },
                  ].map((s) => (
                    <div key={s.label} className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">{s.label}</span>
                      <span className="font-bold text-cyber-teal">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="cyber-card p-6 clip-angle-tr">
                <h3 className="text-sm font-bold uppercase tracking-widest text-cyber-purple mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  {[
                    "Broadcast Announcement",
                    "Lock Tournament Registration",
                    "Export Player Data (CSV)",
                    "Reset Season MMR",
                    "Generate Tournament Report",
                  ].map((action) => (
                    <button
                      key={action}
                      className="w-full text-left p-2 text-xs bg-cyber-surface/50 rounded hover:bg-cyber-surface hover:text-cyber-teal transition-colors"
                    >
                      → {action}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
