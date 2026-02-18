const tiers = [
  {
    name: "Tier 1",
    mmr: "< 600",
    color: "#6b7280",
    borderClass: "tier-1",
    perks: ["Free weekly scrims", "Practice lobbies", "Community customs"],
    icon: "🛡️",
  },
  {
    name: "Tier 2",
    mmr: "600 – 1199",
    color: "#60a5fa",
    borderClass: "tier-2",
    perks: ["Tiered tournament access", "Team creation", "Basic stats"],
    icon: "⚔️",
  },
  {
    name: "Tier 3",
    mmr: "1200 – 1599",
    color: "#a78bfa",
    borderClass: "tier-3",
    perks: ["Premium tournaments", "Scouting visibility", "Advanced analytics"],
    icon: "🏆",
  },
  {
    name: "Tier 4",
    mmr: "1600 – 1999",
    color: "#8b5cf6",
    borderClass: "tier-4",
    perks: ["Invitational events", "Sponsor partnerships", "Priority matchmaking"],
    icon: "💎",
  },
  {
    name: "Tier 5 — Esports",
    mmr: "2000+",
    color: "#ccff00",
    borderClass: "tier-5",
    perks: ["Pro league entry", "Org scouting", "Cash prize tournaments"],
    icon: "👑",
  },
];

export default function TierLadder() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
      {tiers.map((tier, i) => (
        <div
          key={tier.name}
          className="cyber-card p-6 clip-angle-tl group relative"
          style={{ animationDelay: `${i * 0.15}s` }}
        >
          {/* top accent */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{ background: `linear-gradient(90deg, transparent, ${tier.color}, transparent)` }}
          />

          <div className="text-3xl mb-3">{tier.icon}</div>
          <h3
            className="text-xl font-black tracking-tight mb-1"
            style={{ color: tier.color }}
          >
            {tier.name}
          </h3>
          <p className="text-xs text-gray-500 mb-4 font-mono">MMR {tier.mmr}</p>

          <ul className="space-y-2">
            {tier.perks.map((perk) => (
              <li key={perk} className="flex items-center gap-2 text-sm text-gray-400">
                <span className="w-1 h-1 rounded-full" style={{ background: tier.color }} />
                {perk}
              </li>
            ))}
          </ul>

          {/* connecting line */}
          {i < 4 && (
            <div className="hidden lg:block absolute top-1/2 -right-3 w-5 h-[2px] bg-cyber-border" />
          )}
        </div>
      ))}

      {/* Tier requirements info */}
      <div className="sm:col-span-2 lg:col-span-5 cyber-card p-4 text-center text-xs text-gray-500">
        <span className="text-cyber-teal font-bold">Placement:</span> 5 matches → initial MMR (weighted by K/D, win/loss, contribution).
        <span className="mx-2">•</span>
        <span className="text-cyber-teal font-bold">Decay:</span> Small MMR decay if inactive &gt; 30 days.
      </div>
    </div>
  );
}
