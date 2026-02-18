"use client";

import { useState } from "react";

const playerData = {
  name: "PhantomAce",
  tag: "#YGIN",
  tier: "Tier 5",
  mmr: 2140,
  verified: true,
  avatar: "👤",
  badges: ["✅ Verified", "👑 Weekly Top", "⭐ MVP"],
  kda: "1.8",
  winrate: "68%",
  gamesPlayed: 142,
  headshotPct: "32%",
  avgDamage: 156,
  team: "Team Phantom",
  region: "India",
  matchHistory: [
    { id: 1, map: "Ascent", result: "Win", score: "13-8", kda: "22/14/6", agent: "Jett", date: "Feb 17, 2026" },
    { id: 2, map: "Bind", result: "Win", score: "13-11", kda: "18/16/4", agent: "Jett", date: "Feb 16, 2026" },
    { id: 3, map: "Icebox", result: "Loss", score: "9-13", kda: "14/17/3", agent: "Raze", date: "Feb 15, 2026" },
    { id: 4, map: "Split", result: "Win", score: "13-5", kda: "25/8/5", agent: "Jett", date: "Feb 14, 2026" },
    { id: 5, map: "Haven", result: "Win", score: "13-10", kda: "20/15/7", agent: "Neon", date: "Feb 13, 2026" },
    { id: 6, map: "Breeze", result: "Loss", score: "11-13", kda: "16/18/2", agent: "Jett", date: "Feb 12, 2026" },
    { id: 7, map: "Lotus", result: "Win", score: "13-7", kda: "21/11/4", agent: "Jett", date: "Feb 11, 2026" },
    { id: 8, map: "Ascent", result: "Win", score: "13-9", kda: "19/13/5", agent: "Jett", date: "Feb 10, 2026" },
  ],
};

const teamData = {
  name: "Team Phantom",
  tag: "PHNT",
  tier: "Tier 5",
  mmr: 1920,
  verified: true,
  winrate: "72%",
  mapsPlayed: 48,
  roster: [
    { name: "PhantomAce", role: "Entry / IGL", mmr: 2140 },
    { name: "VoidWalker", role: "Support", mmr: 2085 },
    { name: "NeonSurge", role: "Entry", mmr: 1990 },
    { name: "CypherMain", role: "Sentinel", mmr: 1870 },
    { name: "SmokeKing", role: "Controller", mmr: 1780 },
  ],
  mapWinrates: [
    { map: "Ascent", winrate: 78, played: 9 },
    { map: "Bind", winrate: 71, played: 7 },
    { map: "Split", winrate: 80, played: 5 },
    { map: "Icebox", winrate: 60, played: 10 },
    { map: "Haven", winrate: 66, played: 6 },
    { map: "Breeze", winrate: 55, played: 4 },
    { map: "Lotus", winrate: 85, played: 7 },
  ],
  recentMatches: [
    { opponent: "Void Squad", result: "Win", score: "2-1", date: "Feb 17" },
    { opponent: "Neon Rush", result: "Win", score: "2-0", date: "Feb 15" },
    { opponent: "IronWill Gaming", result: "Win", score: "2-0", date: "Feb 13" },
    { opponent: "Rising Stars", result: "Loss", score: "1-2", date: "Feb 10" },
    { opponent: "Shadow Pulse", result: "Win", score: "2-0", date: "Feb 8" },
  ],
};

export default function StatsPage() {
  const [view, setView] = useState<"player" | "team">("player");

  return (
    <div className="min-h-screen pt-20 pb-20">
      {/* Hero */}
      <section className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 grid-bg pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_20%,rgba(204,255,0,0.06),transparent)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs tracking-[0.3em] text-cyber-teal uppercase">Analytics</span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mt-1 mb-3">
            STATS & <span className="text-cyber-teal text-glow">HISTORY</span>
          </h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Toggle */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setView("player")}
            className={`cyber-btn text-xs py-2 px-5 ${view === "player" ? "cyber-btn-primary" : ""}`}
          >
            Player Profile
          </button>
          <button
            onClick={() => setView("team")}
            className={`cyber-btn text-xs py-2 px-5 ${view === "team" ? "cyber-btn-primary" : ""}`}
          >
            Team Profile
          </button>
        </div>

        {view === "player" ? (
          <div className="animate-fade-in space-y-6">
            {/* Player card */}
            <div className="cyber-card p-6 sm:p-8 clip-cyber">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="w-20 h-20 bg-cyber-surface border-2 border-cyber-teal rounded-lg flex items-center justify-center text-4xl">
                  {playerData.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h2 className="text-2xl font-black">{playerData.name}</h2>
                    <span className="text-xs text-gray-500 font-mono">{playerData.tag}</span>
                    {playerData.verified && <span className="text-xs text-cyber-teal">✅ Verified</span>}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="tier-5 text-xs font-bold px-2 py-0.5 border border-current clip-angle-tl">
                      {playerData.tier}
                    </span>
                    <span className="text-sm font-mono text-cyber-teal">MMR {playerData.mmr}</span>
                    <span className="text-xs text-gray-500">{playerData.team} &middot; {playerData.region}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {playerData.badges.map((b) => (
                      <span key={b} className="text-[10px] px-2 py-1 bg-cyber-surface border border-cyber-border rounded">
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { label: "KDA", value: playerData.kda },
                { label: "Win Rate", value: playerData.winrate },
                { label: "Games", value: playerData.gamesPlayed.toString() },
                { label: "HS%", value: playerData.headshotPct },
                { label: "Avg DMG", value: playerData.avgDamage.toString() },
                { label: "Tier", value: playerData.tier },
              ].map((s) => (
                <div key={s.label} className="cyber-card p-4 text-center clip-angle-tl">
                  <div className="text-xl font-black text-cyber-teal">{s.value}</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Match History */}
            <div className="cyber-card p-6 clip-angle-tl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold tracking-widest uppercase text-cyber-teal">
                  Match History
                </h3>
                <button className="text-xs text-gray-500 hover:text-cyber-teal transition-colors">
                  Export CSV ↓
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs text-gray-500 border-b border-cyber-border">
                      <th className="pb-2 pr-4">Date</th>
                      <th className="pb-2 pr-4">Map</th>
                      <th className="pb-2 pr-4">Agent</th>
                      <th className="pb-2 pr-4">Result</th>
                      <th className="pb-2 pr-4">Score</th>
                      <th className="pb-2">KDA</th>
                    </tr>
                  </thead>
                  <tbody>
                    {playerData.matchHistory.map((m) => (
                      <tr key={m.id} className="border-b border-cyber-border/50 hover:bg-cyber-surface/50 transition-colors">
                        <td className="py-3 pr-4 text-xs text-gray-500">{m.date}</td>
                        <td className="py-3 pr-4">{m.map}</td>
                        <td className="py-3 pr-4 text-xs">{m.agent}</td>
                        <td className={`py-3 pr-4 text-xs font-bold ${m.result === "Win" ? "text-cyber-teal" : "text-red-400"}`}>
                          {m.result}
                        </td>
                        <td className="py-3 pr-4 font-mono text-xs">{m.score}</td>
                        <td className="py-3 font-mono text-xs">{m.kda}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          /* Team view */
          <div className="animate-fade-in space-y-6">
            {/* Team header */}
            <div className="cyber-card p-6 sm:p-8 clip-cyber">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="w-20 h-20 bg-cyber-purple/20 border-2 border-cyber-purple rounded-lg flex items-center justify-center text-2xl font-black text-cyber-purple">
                  {teamData.tag}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h2 className="text-2xl font-black">{teamData.name}</h2>
                    {teamData.verified && <span className="text-xs text-cyber-teal">✅ Verified</span>}
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="tier-5 text-xs font-bold px-2 py-0.5 border border-current clip-angle-tl">
                      {teamData.tier}
                    </span>
                    <span className="text-sm font-mono text-cyber-teal">Team MMR {teamData.mmr}</span>
                    <span className="text-xs text-gray-500">{teamData.winrate} win rate &middot; {teamData.mapsPlayed} maps</span>
                  </div>
                </div>
                <button className="cyber-btn text-xs py-2 px-4">
                  Export CSV ↓
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Roster */}
              <div className="cyber-card p-6 clip-angle-tl">
                <h3 className="text-sm font-bold tracking-widest uppercase text-cyber-purple mb-4">
                  Roster
                </h3>
                <div className="space-y-3">
                  {teamData.roster.map((p, i) => (
                    <div key={p.name} className="flex items-center gap-4 p-3 bg-cyber-surface/50 rounded hover:bg-cyber-surface transition-colors">
                      <span className="w-6 h-6 flex items-center justify-center text-xs font-bold text-gray-500 bg-cyber-card border border-cyber-border rounded">
                        {i + 1}
                      </span>
                      <div className="flex-1">
                        <div className="font-bold text-sm">{p.name}</div>
                        <div className="text-[10px] text-gray-500">{p.role}</div>
                      </div>
                      <span className="text-sm font-mono text-cyber-teal">{p.mmr}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map Winrates */}
              <div className="cyber-card p-6 clip-angle-tr">
                <h3 className="text-sm font-bold tracking-widest uppercase text-cyber-teal mb-4">
                  Map Win Rates
                </h3>
                <div className="space-y-3">
                  {teamData.mapWinrates.map((m) => (
                    <div key={m.map}>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-bold">{m.map}</span>
                        <span className="text-gray-500">{m.winrate}% ({m.played} played)</span>
                      </div>
                      <div className="progress-cyber">
                        <div
                          className="progress-cyber-fill"
                          style={{ width: `${m.winrate}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent matches */}
            <div className="cyber-card p-6 clip-angle-tl">
              <h3 className="text-sm font-bold tracking-widest uppercase text-cyber-teal mb-4">
                Recent Matches
              </h3>
              <div className="space-y-3">
                {teamData.recentMatches.map((m, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 bg-cyber-surface/50 rounded hover:bg-cyber-surface transition-colors">
                    <span className={`w-2 h-2 rounded-full ${m.result === "Win" ? "bg-cyber-teal" : "bg-red-400"}`} />
                    <div className="flex-1">
                      <span className="font-bold text-sm">vs {m.opponent}</span>
                    </div>
                    <span className={`text-xs font-bold ${m.result === "Win" ? "text-cyber-teal" : "text-red-400"}`}>
                      {m.result} {m.score}
                    </span>
                    <span className="text-[10px] text-gray-500">{m.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Head to Head */}
            <div className="cyber-card p-6 clip-cyber text-center">
              <h3 className="text-sm font-bold tracking-widest uppercase text-cyber-purple mb-4">
                Head-to-Head Comparison
              </h3>
              <p className="text-xs text-gray-500 mb-4">Select an opponent team to compare stats</p>
              <select className="cyber-input clip-angle-tl w-60 text-sm cursor-pointer mx-auto">
                <option>Void Squad</option>
                <option>Neon Rush</option>
                <option>IronWill Gaming</option>
              </select>
              <div className="grid grid-cols-3 gap-8 mt-8">
                <div className="text-right">
                  <div className="text-2xl font-black text-cyber-teal">72%</div>
                  <div className="text-xs text-gray-500">Team Phantom</div>
                </div>
                <div>
                  <div className="text-lg font-black text-gray-500">VS</div>
                  <div className="text-xs text-gray-600">3 matches played</div>
                </div>
                <div className="text-left">
                  <div className="text-2xl font-black text-cyber-purple">68%</div>
                  <div className="text-xs text-gray-500">Void Squad</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
