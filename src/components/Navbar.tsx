"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/discover", label: "Discover" },
  { href: "/teams", label: "Teams" },
  { href: "/tournaments", label: "Tournaments" },
  { href: "/stats", label: "Stats" },
  { href: "/about", label: "About" },
  { href: "/support", label: "Support" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cyber-dark/80 backdrop-blur-xl border-b border-cyber-border">
      {/* top accent line */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-cyber-teal to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10">
              <img
                src="/YG-logo.jpg"
                alt="YG Logo"
                className="w-full h-full rounded-full object-cover drop-shadow-[0_0_8px_rgba(204,255,0,0.3)] group-hover:drop-shadow-[0_0_12px_rgba(204,255,0,0.5)] transition-all"
              />
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-black tracking-wider text-foreground">
                YUVA<span className="text-cyber-teal">GABBRUS</span>
              </span>
              <span className="block text-[10px] tracking-[0.3em] text-cyber-teal-dim uppercase -mt-1">
                Esports Platform
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm tracking-wide text-gray-400 hover:text-cyber-teal transition-colors relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-cyber-teal transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Auth buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {status === "loading" ? (
              <div className="w-20 h-8 bg-cyber-surface animate-pulse rounded" />
            ) : session?.user ? (
              <>
                <Link href="/profile" className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-cyber-teal transition-colors">
                  <div className="relative">
                    <img
                      src={session.user.image || "/lib-profile/Default.png"}
                      alt=""
                      className="w-7 h-7 rounded-full object-cover border border-cyber-teal/40"
                    />
                    {(session.user as any).verified === true && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-cyber-teal rounded-full border border-cyber-dark text-[6px] flex items-center justify-center">✓</span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="max-w-[100px] truncate leading-tight">{session.user.name}</span>
                    <span className="text-[10px] leading-tight text-gray-500">
                      {(session.user as any).verified === true ? (
                        <span className="text-cyber-teal">Verified</span>
                      ) : (
                        <span className="text-yellow-400">Unverified</span>
                      )}
                      {" · T" + ((session.user as any).tier || 1)}
                    </span>
                  </div>
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="cyber-btn text-xs py-2 px-4"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/signin" className="cyber-btn text-xs py-2 px-4">
                  Sign In
                </Link>
                <Link href="/signup" className="cyber-btn cyber-btn-primary text-xs py-2 px-4">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-cyber-teal transition-transform ${
                open ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-cyber-teal transition-opacity ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-cyber-teal transition-transform ${
                open ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-cyber-dark/95 backdrop-blur-xl border-t border-cyber-border animate-slide-up">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 text-sm text-gray-400 hover:text-cyber-teal hover:bg-cyber-card/50 rounded transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 flex gap-3">
              {session?.user ? (
                <>
                  <Link
                    href="/profile"
                    onClick={() => setOpen(false)}
                    className="cyber-btn text-xs py-2 px-4 flex-1 justify-center"
                  >
                    {session.user.name || "Profile"}
                  </Link>
                  <button
                    onClick={() => { setOpen(false); signOut({ callbackUrl: "/" }); }}
                    className="cyber-btn cyber-btn-primary text-xs py-2 px-4 flex-1 justify-center"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/signin"
                    onClick={() => setOpen(false)}
                    className="cyber-btn text-xs py-2 px-4 flex-1 justify-center"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setOpen(false)}
                    className="cyber-btn cyber-btn-primary text-xs py-2 px-4 flex-1 justify-center"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
