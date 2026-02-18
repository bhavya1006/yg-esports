const tournaments = [
  {
    id: 1,
    name: "YG Valorant Open",
    tier: "All Tiers",
    date: "Mar 15, 2026",
    format: "Single Elimination",
    entry: "Free",
    teams: 16,
    registered: 12,
    maps: ["Ascent", "Bind", "Split"],
    status: "open",
  },
  {
    id: 2,
    name: "Tier 1 Clash Weekly",
    tier: "Tier 1",
    date: "Mar 8, 2026",
    format: "Round Robin",
    entry: "Free",
    teams: 8,
    registered: 6,
    maps: ["Icebox", "Breeze"],
    status: "open",
  },
  {
    id: 3,
    name: "Tier 2 Training Cup",
    tier: "Tier 2",
    date: "Mar 12, 2026",
    format: "Swiss",
    entry: "Free",
    teams: 12,
    registered: 10,
    maps: ["Ascent", "Haven", "Lotus"],
    status: "filling",
  },
  {
    id: 4,
    name: "Creator Cup — Sponsored",
    tier: "Tier 4 & 5",
    date: "Apr 1, 2026",
    format: "Double Elimination",
    entry: "Free · Sponsored",
    teams: 8,
    registered: 3,
    maps: ["All Maps"],
    status: "open",
    sponsored: true,
  },
];

function tierColor(tier: string) {
  if (tier.includes("5")) return "tier-5";
  if (tier.includes("4")) return "tier-4";
  if (tier.includes("3")) return "tier-3";
  if (tier.includes("2")) return "tier-2";
  if (tier.includes("1")) return "tier-1";
  return "text-cyber-teal";
}

export default function TournamentCarousel() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {tournaments.map((t) => (
        <div
          key={t.id}
          className="cyber-card p-5 clip-angle-tl group cursor-pointer"
        >
          {/* status dot */}
          <div className="flex items-center justify-between mb-3">
            <span className={`text-[10px] font-bold tracking-widest uppercase ${tierColor(t.tier)}`}>
              {t.tier}
            </span>
            <span className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${t.status === "filling" ? "bg-yellow-400 animate-pulse" : "bg-cyber-teal"}`} />
              <span className="text-[10px] text-gray-500 uppercase">{t.status}</span>
            </span>
          </div>

          <h3 className="text-base font-bold tracking-tight mb-1 group-hover:text-cyber-teal transition-colors">
            {t.name}
          </h3>
          <p className="text-xs text-gray-500 mb-4">{t.date} &middot; {t.format}</p>

          {/* progress bar */}
          <div className="mb-3">
            <div className="flex justify-between text-[10px] text-gray-500 mb-1">
              <span>{t.registered}/{t.teams} Teams</span>
              <span>{Math.round((t.registered / t.teams) * 100)}%</span>
            </div>
            <div className="progress-cyber">
              <div
                className="progress-cyber-fill"
                style={{ width: `${(t.registered / t.teams) * 100}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className={`text-sm font-black ${(t as any).sponsored ? 'text-cyber-purple' : 'text-cyber-teal'}`}>{t.entry}</span>
            <span className="text-[10px] text-gray-600">{t.maps.join(", ")}</span>
          </div>

          {/* hover expand arrow */}
          <div className="mt-3 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
            <svg className="w-4 h-4 text-cyber-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}
