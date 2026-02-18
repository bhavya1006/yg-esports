"use client";

import { useState } from "react";

const maps = [
  { id: "bind", name: "Bind", image: "🗺️" },
  { id: "ascent", name: "Ascent", image: "🏔️" },
  { id: "split", name: "Split", image: "🌆" },
  { id: "icebox", name: "Icebox", image: "🧊" },
  { id: "breeze", name: "Breeze", image: "🏝️" },
  { id: "haven", name: "Haven", image: "🏛️" },
  { id: "lotus", name: "Lotus", image: "🪷" },
  { id: "pearl", name: "Pearl", image: "🌊" },
  { id: "fracture", name: "Fracture", image: "⚡" },
  { id: "sunset", name: "Sunset", image: "🌅" },
  { id: "abyss", name: "Abyss", image: "🕳️" },
];

const agents = ["Jett", "Raze", "Omen", "Cypher", "Sova", "Sage", "Phoenix", "Brimstone", "Viper", "Killjoy", "Chamber", "Neon", "Fade", "Harbor", "Gekko", "Deadlock", "Iso", "Clove", "Vyse", "Tejo", "Waylay"];
const roles = ["Duelist", "Sentinel", "Controller", "Initiator"];

const strategies = [
  {
    id: 1,
    map: "bind",
    title: "A-Short Smoke Execute",
    agent: "Omen",
    role: "Controller",
    site: "A",
    difficulty: "Medium",
    author: "PhantomAce",
    upvotes: 142,
    description: "One-way smoke on A-Short + teleporter fake. Works best with a Jett entry on A-Bath.",
    valoplantUrl: "https://valoplant.gg/room/abc123",
  },
  {
    id: 2,
    map: "ascent",
    title: "Mid-to-B Split Push",
    agent: "Sova",
    role: "Initiator",
    site: "B",
    difficulty: "Hard",
    author: "VoidWalker",
    upvotes: 98,
    description: "Recon dart B-Main + Shock darts market. Coordinate with controller smokes on mid.",
    valoplantUrl: "https://valoplant.gg/room/def456",
  },
  {
    id: 3,
    map: "split",
    title: "B-Heaven Control Lineups",
    agent: "Viper",
    role: "Controller",
    site: "B",
    difficulty: "Easy",
    author: "NeonSurge",
    upvotes: 203,
    description: "Wall + orb combo that blocks B-Heaven and CT. Perfect for retake or post-plant.",
    valoplantUrl: "https://valoplant.gg/room/ghi789",
  },
  {
    id: 4,
    map: "icebox",
    title: "A-Site Default Setup",
    agent: "Killjoy",
    role: "Sentinel",
    site: "A",
    difficulty: "Easy",
    author: "CypherMain",
    upvotes: 176,
    description: "Turret + Alarm Bot positions that cover all A-site entry points. Swap spots each round.",
    valoplantUrl: "",
  },
  {
    id: 5,
    map: "bind",
    title: "Teleporter Rush B",
    agent: "Raze",
    role: "Duelist",
    site: "B",
    difficulty: "Medium",
    author: "JettDiff",
    upvotes: 87,
    description: "Boombot into B-Long, Satchel through teleporter into hookah. Chaotic and fast.",
    valoplantUrl: "https://valoplant.gg/room/jkl012",
  },
  {
    id: 6,
    map: "haven",
    title: "Garage Control + C-Long Split",
    agent: "Fade",
    role: "Initiator",
    site: "C",
    difficulty: "Hard",
    author: "PhantomAce",
    upvotes: 112,
    description: "Haunt garage → Prowler C-Long. Team splits between garage and C-Long simultaneously.",
    valoplantUrl: "",
  },
];

export default function DiscoverPage() {
  const [selectedMap, setSelectedMap] = useState<string>("all");
  const [selectedRole, setSelectedRole] = useState<string>("all");
  const [selectedAgent, setSelectedAgent] = useState<string>("all");
  const [search, setSearch] = useState("");

  const filtered = strategies.filter((s) => {
    if (selectedMap !== "all" && s.map !== selectedMap) return false;
    if (selectedRole !== "all" && s.role !== selectedRole) return false;
    if (selectedAgent !== "all" && s.agent !== selectedAgent) return false;
    if (search && !s.title.toLowerCase().includes(search.toLowerCase()) && !s.description.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen pt-20 pb-20">
      {/* Hero */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 grid-bg pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_20%,rgba(204,255,0,0.08),transparent)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs tracking-[0.3em] text-cyber-teal uppercase">Discover</span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mt-1 mb-3">
            VALORANT <span className="text-cyber-teal text-glow">TACTICS</span>
          </h1>
          <p className="text-gray-400 text-sm max-w-lg mx-auto mb-8">
            Map guides, agent lineups, and community strategies. Plan your plays and level up your game.
          </p>

          {/* Search */}
          <div className="max-w-xl mx-auto relative">
            <input
              type="text"
              placeholder="Search strategies, agents, maps..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="cyber-input clip-angle-tl pl-12 text-sm"
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Map selector */}
        <div className="mb-8">
          <h3 className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-3">Select Map</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedMap("all")}
              className={`px-4 py-2 text-xs font-bold tracking-wider uppercase border transition-all clip-angle-tl ${
                selectedMap === "all"
                  ? "border-cyber-teal bg-cyber-teal/10 text-cyber-teal"
                  : "border-cyber-border text-gray-500 hover:text-cyber-teal hover:border-cyber-teal/30"
              }`}
            >
              All Maps
            </button>
            {maps.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedMap(m.id)}
                className={`px-4 py-2 text-xs font-bold tracking-wider uppercase border transition-all clip-angle-tl ${
                  selectedMap === m.id
                    ? "border-cyber-teal bg-cyber-teal/10 text-cyber-teal"
                    : "border-cyber-border text-gray-500 hover:text-cyber-teal hover:border-cyber-teal/30"
                }`}
              >
                {m.image} {m.name}
              </button>
            ))}
          </div>
        </div>

        {/* Filters row */}
        <div className="flex flex-wrap gap-4 mb-10">
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="cyber-input w-44 text-xs clip-angle-tl cursor-pointer"
          >
            <option value="all">All Roles</option>
            {roles.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
          <select
            value={selectedAgent}
            onChange={(e) => setSelectedAgent(e.target.value)}
            className="cyber-input w-44 text-xs clip-angle-tl cursor-pointer"
          >
            <option value="all">All Agents</option>
            {agents.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
          <button className="cyber-btn cyber-btn-purple text-xs py-2 px-4">
            + Add a Strategy
          </button>
        </div>

        {/* Strategy grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filtered.map((s) => (
              <div key={s.id} className="cyber-card p-5 clip-angle-tl group">
                {/* header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-cyber-teal bg-cyber-teal/10 px-2 py-0.5 rounded">
                      {maps.find((m) => m.id === s.map)?.name}
                    </span>
                    <span className="text-[10px] text-gray-500">{s.site} Site</span>
                  </div>
                  <span className={`text-[10px] font-bold ${
                    s.difficulty === "Easy" ? "text-green-400" : s.difficulty === "Medium" ? "text-yellow-400" : "text-red-400"
                  }`}>
                    {s.difficulty}
                  </span>
                </div>

                <h3 className="text-base font-bold mb-1 group-hover:text-cyber-teal transition-colors">
                  {s.title}
                </h3>
                <p className="text-xs text-gray-500 mb-3 line-clamp-2">{s.description}</p>

                <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
                  <span className="px-2 py-0.5 bg-cyber-surface border border-cyber-border rounded">{s.agent}</span>
                  <span className="px-2 py-0.5 bg-cyber-surface border border-cyber-border rounded">{s.role}</span>
                </div>

                {/* footer */}
                <div className="flex items-center justify-between pt-3 border-t border-cyber-border">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">by</span>
                    <span className="text-xs font-bold text-cyber-teal">{s.author}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-cyber-teal transition-colors">
                      ▲ {s.upvotes}
                    </button>
                    {s.valoplantUrl && (
                      <a
                        href={s.valoplantUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-cyber-purple hover:underline"
                      >
                        Open in ValoPlant ↗
                      </a>
                    )}
                  </div>
                </div>

                {/* Try in Scrim CTA */}
                <button className="mt-3 cyber-btn text-[10px] py-1.5 px-3 w-full justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  Try in Scrim — Create Private Match
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-sm">No strategies found matching your filters.</p>
            <button
              onClick={() => { setSelectedMap("all"); setSelectedRole("all"); setSelectedAgent("all"); setSearch(""); }}
              className="cyber-btn text-xs py-2 px-4 mt-4"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* ValoPlant integration note */}
        <div className="cyber-card p-6 clip-cyber text-center mb-12">
          <div className="text-2xl mb-2">🗺️</div>
          <h3 className="text-lg font-black mb-2">
            Powered by <span className="text-cyber-purple">ValoPlant</span>
          </h3>
          <p className="text-sm text-gray-500 max-w-lg mx-auto mb-4">
            Plan lineups and strategies in real-time with ValoPlant&apos;s interactive map planner.
            Link your strategies or open collaborative planning rooms.
          </p>
          <a
            href="https://valoplant.gg"
            target="_blank"
            rel="noopener noreferrer"
            className="cyber-btn cyber-btn-purple text-xs py-2 px-5 inline-flex"
          >
            Visit ValoPlant ↗
          </a>
        </div>
      </div>
    </div>
  );
}
