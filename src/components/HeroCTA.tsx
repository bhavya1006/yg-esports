"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function HeroCTA() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: "0.5s" }}>
      {session?.user ? (
        <>
          <Link href="/profile" className="cyber-btn cyber-btn-primary text-sm">
            My Profile
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </Link>
          <Link href="/tournaments" className="cyber-btn text-sm">
            Browse Tournaments
          </Link>
          <Link href="/teams" className="cyber-btn cyber-btn-purple text-sm">
            Create Team
          </Link>
        </>
      ) : (
        <>
          <Link href="/signup" className="cyber-btn cyber-btn-primary text-sm">
            Register an Account
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <Link href="/tournaments" className="cyber-btn text-sm">
            Browse Tournaments
          </Link>
          <Link href="/teams" className="cyber-btn cyber-btn-purple text-sm">
            Create Team
          </Link>
        </>
      )}
    </div>
  );
}
