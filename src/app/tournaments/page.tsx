"use client";

import { useState } from "react";

const tournaments = [
  {
    id: 1,
    name: "YG Valorant Open #12",
    tier: "All Tiers",
    entryReq: "Any verified team — min 5 players",
    entry: "Free",
    date: "March 1–2, 2026",
    regClose: "Feb 27, 2026 — 11:59 PM IST",
    format: "Single Elimination Bo3 → Grand Final Bo5",
    mapPool: ["Ascent", "Bind", "Split", "Haven", "Lotus"],
    slots: 16,
    filled: 11,
    status: "open",
    adminRef: "YG Ref Team — live on Discord VC",
    sponsored: false,
    description:
      "The flagship YG Valorant Open — free for all verified teams. All matches will be refereed and streamed. Focus on training and competitive experience.",
  },
  {
    id: 2,
    name: "Rising Stars Open #8",
    tier: "Tier 1 / Tier 2",
    entryReq: "Tier 1 or Tier 2 teams — min 5 players, no MMR floor",
    entry: "Free",
    date: "March 8–9, 2026",
    regClose: "March 5, 2026 — 11:59 PM IST",
    format: "Swiss → Top 8 Single Elimination Bo1",
    mapPool: ["Icebox", "Breeze", "Fracture", "Sunset"],
    slots: 32,
    filled: 24,
    status: "open",
    adminRef: "Community Refs + Auto-Record",
    sponsored: false,
    description:
      "An open gateway for new teams to earn ranking points and experience competitive play. Perfect for teams just starting their YG journey.",
  },
  {
    id: 3,
    name: "Creator Cup — Sponsored Showcase",
    tier: "Tier 4 / Tier 5",
    entryReq: "Tier 4 or Tier 5 verified teams — avg MMR ≥ 1600",
    entry: "Free · Sponsored by Creator",
    date: "March 15–16, 2026",
    regClose: "March 12, 2026 — 11:59 PM IST",
    format: "Double Elimination Bo3",
    mapPool: ["Split", "Ascent", "Haven", "Lotus", "Bind"],
    slots: 16,
    filled: 16,
    status: "full",
    adminRef: "YG Ref Team + Creator Stream",
    sponsored: true,
    description:
      "A sponsored showcase tournament hosted in partnership with a content creator. Free entry, streamed live, with the creator community watching. Waitlist active.",
  },
];

function tierColor(tier: string) {
  if (tier.includes("5")) return "tier-5";
  if (tier.includes("4")) return "tier-4";
  if (tier.includes("3")) return "tier-3";
  if (tier.includes("2")) return "tier-2";
  return "tier-1";
}

export default function TournamentsPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const [registered, setRegistered] = useState<number[]>([]);
  const [teamVerified] = useState(true);

  const handleRegister = (id: number) => {
    setRegistered((prev) => [...prev, id]);
    setSelected(null);
  };

  return (
    <div className="min-h-screen pt-20 pb-20">
      {/* Hero */}
      <section className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 grid-bg pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_20%,rgba(139,92,246,0.06),transparent)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs tracking-[0.3em] text-cyber-purple uppercase">Compete</span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mt-1 mb-3">
            TOURNAMENT <span className="text-cyber-purple text-glow">REGISTRATION</span>
          </h1>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Browse upcoming tournaments, check entry criteria, and register your team.
            Only verified teams may enter ranked events.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Info Banner */}
        <div className="cyber-card p-4 mb-8 border-l-4 border-cyber-teal clip-angle-tr">
          <div className="flex items-start gap-3">
            <span className="text-lg">ℹ️</span>
            <div>
              <div className="text-sm font-bold mb-1">Registration Rules</div>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• All team members must be <span className="text-cyber-teal">Riot-verified</span> before registration closes</li>
                <li>• Teams must meet the tier &amp; MMR requirements</li>
                <li>• Registration locks 48 hours before tournament start</li>
                <li>• Unverified teams will be greyed out from registration</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Tournament list */}
        <div className="space-y-6">
          {tournaments.map((t) => {
            const isRegistered = registered.includes(t.id);
            const isFull = t.status === "full";
            const fillPct = Math.round((t.filled / t.slots) * 100);

            return (
              <div key={t.id} className="cyber-card clip-angle-tl overflow-hidden">
                {/* Header */}
                <div className="p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h2 className="text-xl font-black">{t.name}</h2>
                        <span className={`${tierColor(t.tier)} text-xs font-bold px-2 py-0.5 border border-current clip-angle-tl`}>
                          {t.tier}
                        </span>
                        {isFull && (
                          <span className="text-xs text-red-400 font-bold px-2 py-0.5 bg-red-400/10 rounded">
                            FULL
                          </span>
                        )}
                        {isRegistered && (
                          <span className="text-xs text-cyber-teal font-bold px-2 py-0.5 bg-cyber-teal/10 rounded">
                            ✅ REGISTERED
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mb-3">{t.description}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-xs">
                        <div>
                          <span className="text-gray-500">Date:</span>{" "}
                          <span className="font-bold">{t.date}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Reg Closes:</span>{" "}
                          <span className="font-bold text-amber-400">{t.regClose}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Format:</span>{" "}
                          <span className="font-bold">{t.format}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Entry:</span>{" "}
                          <span className={`font-bold ${t.sponsored ? 'text-cyber-purple' : 'text-cyber-teal'}`}>{t.entry}</span>
                          {t.sponsored && <span className="ml-2 text-[10px] text-cyber-purple bg-cyber-purple/10 px-1.5 py-0.5 rounded">SPONSORED</span>}
                        </div>
                        <div>
                          <span className="text-gray-500">Admin Ref:</span>{" "}
                          <span>{t.adminRef}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Entry Req:</span>{" "}
                          <span>{t.entryReq}</span>
                        </div>
                      </div>
                    </div>

                    {/* Register / View button */}
                    <div className="flex flex-col items-end gap-2 min-w-[140px]">
                      {isRegistered ? (
                        <button
                          onClick={() => setSelected(selected === t.id ? null : t.id)}
                          className="cyber-btn cyber-btn-primary text-xs py-2 px-5"
                        >
                          View Details
                        </button>
                      ) : isFull ? (
                        <div className="tooltip-cyber">
                          <button className="cyber-btn text-xs py-2 px-5 opacity-50 cursor-not-allowed" disabled>
                            Full
                          </button>
                          <span className="tooltip-cyber-text">Tournament is full. Join waitlist on Discord.</span>
                        </div>
                      ) : !teamVerified ? (
                        <div className="tooltip-cyber">
                          <button className="cyber-btn text-xs py-2 px-5 opacity-50 cursor-not-allowed" disabled>
                            Register
                          </button>
                          <span className="tooltip-cyber-text">Your team must be verified to register</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => setSelected(selected === t.id ? null : t.id)}
                          className="cyber-btn cyber-btn-purple text-xs py-2 px-5"
                        >
                          Register →
                        </button>
                      )}
                      <div className="text-xs text-gray-500">
                        {t.filled}/{t.slots} slots
                      </div>
                    </div>
                  </div>

                  {/* Slot progress */}
                  <div className="progress-cyber mb-3">
                    <div
                      className="progress-cyber-fill"
                      style={{
                        width: `${fillPct}%`,
                        background: isFull
                          ? "linear-gradient(90deg, #ef4444, #f87171)"
                          : undefined,
                      }}
                    />
                  </div>

                  {/* Map pool */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider">Map Pool:</span>
                    {t.mapPool.map((m) => (
                      <span key={m} className="text-[10px] px-2 py-0.5 bg-cyber-surface border border-cyber-border rounded">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Expanded registration panel */}
                {selected === t.id && !isRegistered && !isFull && (
                  <div className="border-t border-cyber-border bg-cyber-surface/30 p-6 sm:p-8 animate-fade-in">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-cyber-purple mb-4">
                      Confirm Registration
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Team Name</label>
                        <input
                          className="cyber-input w-full clip-angle-tl"
                          readOnly
                          value="Team Phantom [PHNT]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Tier / MMR</label>
                        <input
                          className="cyber-input w-full clip-angle-tl"
                          readOnly
                          value="Tier 5 — 2020 avg MMR"
                        />
                      </div>
                    </div>
                    <div className="mb-6">
                      <label className="block text-xs text-gray-500 mb-2">Roster Check</label>
                      <div className="space-y-2">
                        {["PhantomAce ✅", "VoidWalker ✅", "NeonSurge ✅", "CypherMain ✅", "SmokeKing ✅"].map(
                          (p) => (
                            <div key={p} className="text-xs px-3 py-2 bg-cyber-card border border-cyber-border rounded flex items-center gap-2">
                              <span className="w-2 h-2 bg-cyber-teal rounded-full" />
                              {p}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => handleRegister(t.id)}
                        className="cyber-btn cyber-btn-primary text-xs py-2 px-8"
                      >
                        ✓ Confirm Registration
                      </button>
                      <button
                        onClick={() => setSelected(null)}
                        className="cyber-btn text-xs py-2 px-6"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Post-registration details */}
                {selected === t.id && isRegistered && (
                  <div className="border-t border-cyber-border bg-cyber-surface/30 p-6 sm:p-8 animate-fade-in">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-cyber-teal mb-4">
                      Match Details
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                      <div className="cyber-card p-4">
                        <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Your First Match</div>
                        <div className="text-sm font-bold mb-1">vs TBD — Round 1</div>
                        <div className="text-xs text-gray-400">
                          Bracket will be revealed 24h before start
                        </div>
                      </div>
                      <div className="cyber-card p-4">
                        <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Match Lobby</div>
                        <div className="text-sm font-bold mb-1">Discord: #match-lobby-{t.id}</div>
                        <div className="text-xs text-gray-400">Join 15 min before scheduled time</div>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <a
                        href="#"
                        className="cyber-btn text-xs py-2 px-5"
                      >
                        View Full Bracket
                      </a>
                      <a
                        href="#"
                        className="cyber-btn text-xs py-2 px-5"
                      >
                        Open ValoPlant ↗
                      </a>
                      <a
                        href="#"
                        className="cyber-btn text-xs py-2 px-5"
                      >
                        Schedule (Google Cal)
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Upcoming / Calendar */}
        <section className="mt-12">
          <h2 className="text-lg font-black mb-6 uppercase tracking-wider">
            Full <span className="text-cyber-teal">Schedule</span>
          </h2>
          <div className="cyber-card p-6 clip-angle-tl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { month: "March", count: 3, highlight: "YG Cup #12" },
                { month: "April", count: 4, highlight: "YG Invitational" },
                { month: "May", count: 2, highlight: "Season Finals" },
              ].map((m) => (
                <div key={m.month} className="p-4 bg-cyber-surface/50 rounded border border-cyber-border hover:border-cyber-teal/30 transition-colors">
                  <div className="text-sm font-bold">{m.month} 2026</div>
                  <div className="text-xs text-gray-500 mt-1">{m.count} tournaments</div>
                  <div className="text-xs text-cyber-teal mt-2">Featured: {m.highlight}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
