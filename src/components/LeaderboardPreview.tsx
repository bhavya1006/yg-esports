const players = [
  { rank: 1, name: "PhantomAce", tag: "#YGIN", tier: "Tier 5", mmr: 2140, kda: "1.8", winrate: "68%", badge: "👑" },
  { rank: 2, name: "VoidWalker", tag: "#YG01", tier: "Tier 5", mmr: 2085, kda: "1.6", winrate: "65%", badge: "⚡" },
  { rank: 3, name: "NeonSurge", tag: "#YGPK", tier: "Tier 5", mmr: 1990, kda: "1.5", winrate: "63%", badge: "🔥" },
  { rank: 4, name: "CypherMain", tag: "#YGDL", tier: "Tier 4", mmr: 1870, kda: "1.4", winrate: "61%", badge: "" },
  { rank: 5, name: "JettDiff", tag: "#YGMU", tier: "Tier 4", mmr: 1810, kda: "1.3", winrate: "59%", badge: "" },
];

const teams = [
  { rank: 1, name: "Team Phantom", tier: "Tier 5", winrate: "72%", matches: 48 },
  { rank: 2, name: "Void Squad", tier: "Tier 5", winrate: "68%", matches: 42 },
  { rank: 3, name: "Neon Rush", tier: "Tier 4", winrate: "65%", matches: 36 },
];

function tierColor(tier: string) {
  if (tier.includes("5")) return "text-cyber-teal";
  if (tier.includes("4")) return "text-[#8b5cf6]";
  if (tier.includes("3")) return "text-[#a78bfa]";
  if (tier.includes("2")) return "text-[#60a5fa]";
  if (tier.includes("1")) return "text-[#6b7280]";
  return "";
}

export default function LeaderboardPreview() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Top Players */}
      <div className="lg:col-span-2 cyber-card p-6 clip-angle-tl">
        <h3 className="text-sm font-bold tracking-widest uppercase text-cyber-teal mb-4">
          Top Players — Global
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-500 border-b border-cyber-border">
                <th className="pb-2 pr-4">#</th>
                <th className="pb-2 pr-4">Player</th>
                <th className="pb-2 pr-4">Tier</th>
                <th className="pb-2 pr-4">MMR</th>
                <th className="pb-2 pr-4">KDA</th>
                <th className="pb-2">Win%</th>
              </tr>
            </thead>
            <tbody>
              {players.map((p) => (
                <tr key={p.rank} className="border-b border-cyber-border/50 hover:bg-cyber-surface/50 transition-colors">
                  <td className="py-3 pr-4 font-mono text-gray-500">{p.rank}</td>
                  <td className="py-3 pr-4">
                    <span className="font-bold">{p.badge} {p.name}</span>
                    <span className="text-xs text-gray-600 ml-1">{p.tag}</span>
                  </td>
                  <td className={`py-3 pr-4 text-xs font-bold ${tierColor(p.tier)}`}>{p.tier}</td>
                  <td className="py-3 pr-4 font-mono text-cyber-teal">{p.mmr}</td>
                  <td className="py-3 pr-4">{p.kda}</td>
                  <td className="py-3">{p.winrate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Teams */}
      <div className="cyber-card p-6 clip-angle-tr">
        <h3 className="text-sm font-bold tracking-widest uppercase text-cyber-purple mb-4">
          Top Teams
        </h3>
        <div className="space-y-4">
          {teams.map((t) => (
            <div key={t.rank} className="flex items-center gap-4 p-3 bg-cyber-surface/50 rounded">
              <span className="text-lg font-black text-gray-600">{t.rank}</span>
              <div className="flex-1">
                <div className="font-bold text-sm">{t.name}</div>
                <div className={`text-[10px] font-bold ${tierColor(t.tier)}`}>{t.tier}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-cyber-teal">{t.winrate}</div>
                <div className="text-[10px] text-gray-500">{t.matches} matches</div>
              </div>
            </div>
          ))}
        </div>

        {/* Weekly MVP */}
        <div className="mt-6 p-4 bg-gradient-to-r from-cyber-purple/10 to-transparent border border-cyber-purple/20 rounded">
          <div className="text-[10px] tracking-widest uppercase text-cyber-purple mb-1">Weekly MVP</div>
          <div className="font-black">PhantomAce</div>
          <div className="text-xs text-gray-500">26 kills avg · 3 tournament wins</div>
        </div>
      </div>
    </div>
  );
}
