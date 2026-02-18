import Link from "next/link";

const footerLinks = {
  Platform: [
    { href: "/tournaments", label: "Tournaments" },
    { href: "/discover", label: "Discover" },
    { href: "/teams", label: "Teams" },
    { href: "/stats", label: "Leaderboards" },
  ],
  Community: [
    { href: "https://discord.gg/nKPrZ9v7wr", label: "Discord" },
    { href: "https://twitter.com/ygesports", label: "Twitter / X" },
    { href: "https://www.instagram.com/yuvagabbrus?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", label: "Instagram" },
    { href: "https://youtube.com/@ygesports", label: "YouTube" },
  ],
  Resources: [
    { href: "/support", label: "Rules & Fair Play" },
    { href: "/support", label: "Anti-Cheat Policy" },
    { href: "/about", label: "About YG" },
    { href: "/support", label: "Contact" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-cyber-border bg-cyber-dark">
      {/* accent line */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-cyber-teal/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/YG-logo.jpg" alt="YG Logo" className="w-8 h-8 rounded-full object-cover" />
              <span className="font-black tracking-wider text-foreground">
                YUVA<span className="text-cyber-teal">GABBRUS</span>
              </span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              India&apos;s community-first esports hub — grassroots competition,
              verified rankings, and a path from practice to pro.
            </p>
            <a
              href="https://discord.gg/nKPrZ9v7wr"
              target="_blank"
              rel="noopener noreferrer"
              className="cyber-btn cyber-btn-purple text-xs py-2 px-5"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
              </svg>
              Join Discord
            </a>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-cyber-teal mb-4">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-cyber-teal transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-cyber-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} Yuva Gabbrus Esports. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-600">
            <Link href="/support" className="hover:text-cyber-teal transition-colors">
              Privacy
            </Link>
            <span className="text-cyber-border">|</span>
            <Link href="/support" className="hover:text-cyber-teal transition-colors">
              Terms
            </Link>
            <span className="text-cyber-border">|</span>
            <span className="text-gray-700">
              Powered by Riot API &middot; Not affiliated with Riot Games
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
