const feedItems = [
  {
    type: "discord",
    title: "Community Custom — 10v10 Tonight!",
    desc: "Join the #customs channel on Discord. All tiers welcome. Starts at 9 PM IST.",
    time: "2h ago",
    icon: "💬",
  },
  {
    type: "event",
    title: "Tier 1 Clash Winners Announced",
    desc: "Team IronWill takes the weekly Tier 1 Cup with a 3-1 victory over ShadowPulse.",
    time: "5h ago",
    icon: "🏆",
  },
  {
    type: "content",
    title: "New Video: YG Top 10 Plays of the Week",
    desc: "Watch the sickest clips from this week's tournaments. Featuring PhantomAce's 1v4 clutch.",
    time: "1d ago",
    icon: "🎬",
  },
  {
    type: "update",
    title: "Season 1 Rulebook Updated",
    desc: "Anti-cheat policy and dispute flow updated. Please review before your next tournament.",
    time: "2d ago",
    icon: "📋",
  },
];

export default function CommunityFeed() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {feedItems.map((item, i) => (
        <div key={i} className="cyber-card p-5 clip-angle-tl group cursor-pointer">
          <div className="flex items-start gap-4">
            <div className="text-2xl mt-1">{item.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] tracking-widest uppercase text-cyber-teal font-bold">
                  {item.type}
                </span>
                <span className="text-[10px] text-gray-600">{item.time}</span>
              </div>
              <h4 className="text-sm font-bold mb-1 group-hover:text-cyber-teal transition-colors truncate">
                {item.title}
              </h4>
              <p className="text-xs text-gray-500 line-clamp-2">{item.desc}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
