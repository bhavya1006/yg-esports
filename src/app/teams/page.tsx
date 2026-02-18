"use client";

import { useState } from "react";

const roleTags = ["IGL", "Entry", "Support", "Sentinel", "Flex", "Operator"];

export default function TeamsPage() {
  const [tab, setTab] = useState<"create" | "browse">("create");

  return (
    <div className="min-h-screen pt-20 pb-20">
      {/* Hero */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 grid-bg pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_20%,rgba(139,92,246,0.08),transparent)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs tracking-[0.3em] text-cyber-purple uppercase">Teams</span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mt-1 mb-3">
            TEAM <span className="text-cyber-purple text-glow-purple">HQ</span>
          </h1>
          <p className="text-gray-400 text-sm max-w-lg mx-auto">
            Create your team, manage your roster, and register for tiered tournaments.
            All players must be verified.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setTab("create")}
            className={`cyber-btn text-xs py-2 px-5 ${tab === "create" ? "cyber-btn-primary" : ""}`}
          >
            Create Team
          </button>
          <button
            onClick={() => setTab("browse")}
            className={`cyber-btn text-xs py-2 px-5 ${tab === "browse" ? "cyber-btn-primary" : ""}`}
          >
            Browse Teams
          </button>
        </div>

        {tab === "create" ? (
          <div className="animate-fade-in">
            {/* Info banner */}
            <div className="cyber-card p-4 clip-angle-tl mb-8 border-l-2 border-l-cyber-teal">
              <p className="text-sm text-gray-400">
                <span className="text-cyber-teal font-bold">Competitive Integrity:</span> Teams must have all active players verified to be eligible for tiered tournaments. Verification prevents smurfing and preserves competitive integrity.
              </p>
            </div>

            <div className="cyber-card p-8 sm:p-10 clip-cyber">
              <h2 className="text-2xl font-black mb-6">
                CREATE YOUR <span className="text-cyber-purple">TEAM</span>
              </h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold tracking-wider uppercase text-gray-400 mb-2">
                      Team Name
                    </label>
                    <input type="text" placeholder="e.g., Team Phantom" className="cyber-input clip-angle-tl" required />
                  </div>
                  <div>
                    <label className="block text-xs font-bold tracking-wider uppercase text-gray-400 mb-2">
                      Team Tag (3-5 chars)
                    </label>
                    <input type="text" placeholder="e.g., PHNT" maxLength={5} className="cyber-input clip-angle-tl" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold tracking-wider uppercase text-gray-400 mb-2">
                      Region
                    </label>
                    <select className="cyber-input clip-angle-tl cursor-pointer" required>
                      <option value="">Select region</option>
                      <option>India</option>
                      <option>SEA</option>
                      <option>EU</option>
                      <option>NA</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold tracking-wider uppercase text-gray-400 mb-2">
                      Preferred Tier
                    </label>
                    <select className="cyber-input clip-angle-tl cursor-pointer" required>
                      <option>Tier 1</option>
                      <option>Tier 2</option>
                      <option>Tier 3</option>
                      <option>Tier 4</option>
                      <option>Tier 5 — Esports</option>
                    </select>
                  </div>
                </div>

                {/* Team Logo */}
                <div>
                  <label className="block text-xs font-bold tracking-wider uppercase text-gray-400 mb-2">
                    Team Logo
                  </label>
                  <div className="cyber-input clip-angle-tl flex items-center gap-3 cursor-pointer hover:border-cyber-teal/50 transition-colors">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-500 text-sm">Upload team logo...</span>
                  </div>
                </div>

                {/* Roster */}
                <div>
                  <label className="block text-xs font-bold tracking-wider uppercase text-gray-400 mb-3">
                    Roster (5 Players + Substitutes)
                  </label>
                  <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((slot) => (
                      <div key={slot} className="flex gap-3">
                        <div className="w-8 h-10 flex items-center justify-center bg-cyber-surface border border-cyber-border text-xs font-bold text-gray-500 clip-angle-tl">
                          {slot}
                        </div>
                        <input
                          type="text"
                          placeholder={`Player ${slot} username`}
                          className="cyber-input clip-angle-tl flex-1"
                        />
                        <select className="cyber-input clip-angle-tl w-32 text-xs cursor-pointer">
                          <option value="">Role</option>
                          {roleTags.map((r) => (
                            <option key={r} value={r}>{r}</option>
                          ))}
                        </select>
                        {slot === 1 && (
                          <div className="flex items-center px-3 bg-cyber-teal/10 border border-cyber-teal/30 text-cyber-teal text-[10px] font-bold tracking-wider uppercase clip-angle-tl">
                            Captain
                          </div>
                        )}
                      </div>
                    ))}
                    {/* Subs */}
                    <div className="pt-3 border-t border-cyber-border">
                      <p className="text-xs text-gray-500 mb-3">Substitutes (optional)</p>
                      {[6, 7].map((slot) => (
                        <div key={slot} className="flex gap-3 mb-3">
                          <div className="w-8 h-10 flex items-center justify-center bg-cyber-surface border border-cyber-border text-xs font-bold text-gray-600 clip-angle-tl">
                            S{slot - 5}
                          </div>
                          <input
                            type="text"
                            placeholder={`Sub ${slot - 5} username`}
                            className="cyber-input clip-angle-tl flex-1"
                          />
                          <select className="cyber-input clip-angle-tl w-32 text-xs cursor-pointer">
                            <option value="">Role</option>
                            {roleTags.map((r) => (
                              <option key={r} value={r}>{r}</option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <button type="submit" className="cyber-btn cyber-btn-primary w-full justify-center text-sm">
                  Create Team
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* Browse Teams Tab */
          <div className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: "Team Phantom", tag: "PHNT", tier: "Tier 5", members: 5, verified: true, winrate: "72%", mmr: 1920 },
                { name: "Void Squad", tag: "VOID", tier: "Tier 5", members: 5, verified: true, winrate: "68%", mmr: 1850 },
                { name: "Neon Rush", tag: "NRSH", tier: "Tier 4", members: 5, verified: true, winrate: "65%", mmr: 1640 },
                { name: "IronWill Gaming", tag: "IRON", tier: "Tier 2", members: 4, verified: false, winrate: "58%", mmr: 1350 },
                { name: "Shadow Pulse", tag: "SHPX", tier: "Tier 1", members: 5, verified: true, winrate: "52%", mmr: 1100 },
                { name: "Rising Stars", tag: "STAR", tier: "Tier 2", members: 3, verified: false, winrate: "55%", mmr: 1280 },
              ].map((team) => (
                <div key={team.name} className="cyber-card p-5 clip-angle-tl group cursor-pointer">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-black group-hover:text-cyber-teal transition-colors">
                          {team.name}
                        </h3>
                        {team.verified && (
                          <span className="text-cyber-teal text-xs" title="Verified Team">✅</span>
                        )}
                      </div>
                      <span className="text-xs text-gray-500 font-mono">[{team.tag}]</span>
                    </div>
                    <span className={`text-xs font-bold px-2 py-0.5 border clip-angle-tl ${
                      team.tier.includes("5") ? "tier-5 border-current" :
                      team.tier.includes("4") ? "tier-4 border-current" :
                      team.tier.includes("3") ? "tier-3 border-current" :
                      team.tier.includes("2") ? "tier-2 border-current" :
                      "tier-1 border-current"
                    }`}>
                      {team.tier}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-sm font-bold text-cyber-teal">{team.mmr}</div>
                      <div className="text-[10px] text-gray-500">MMR</div>
                    </div>
                    <div>
                      <div className="text-sm font-bold">{team.winrate}</div>
                      <div className="text-[10px] text-gray-500">Win Rate</div>
                    </div>
                    <div>
                      <div className="text-sm font-bold">{team.members}/5</div>
                      <div className="text-[10px] text-gray-500">Roster</div>
                    </div>
                  </div>

                  {!team.verified && (
                    <div className="mt-3 p-2 bg-yellow-400/5 border border-yellow-400/20 text-yellow-400 text-[10px] rounded text-center">
                      ⚠ Unverified — Not eligible for tiered tournaments
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
