"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const regions = ["India", "SEA", "EU", "NA", "KR", "JP", "BR", "LATAM"];

type VerifyStep = "unverified" | "pending" | "verified";

export default function SignUpPage() {
  const router = useRouter();
  const [step, setStep] = useState<"register" | "verify">("register");
  const [verifyStatus, setVerifyStatus] = useState<VerifyStep>("unverified");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [riotId, setRiotId] = useState("");
  const [discordTag, setDiscordTag] = useState("");

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, riotId: riotId || undefined }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      // Success — move to verify step
      setStep("verify");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen pt-20 pb-20 relative">
      {/* bg effects */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_20%,rgba(204,255,0,0.08),transparent)]" />

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6">
        {/* heading */}
        <div className="text-center mb-10">
          <span className="text-xs tracking-[0.3em] text-cyber-teal uppercase">Join YG</span>
          <h1 className="text-4xl font-black tracking-tight mt-1">
            CREATE YOUR <span className="text-cyber-teal text-glow">ACCOUNT</span>
          </h1>
          <p className="text-gray-400 text-sm mt-3 max-w-md mx-auto">
            Register to join Yuva Gabbrus (YG) Tiers. Verify your Riot account to unlock ranking, team creation, and tournament eligibility.
          </p>
        </div>

        {/* Verification progress bar */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {(["unverified", "pending", "verified"] as VerifyStep[]).map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all ${
                  verifyStatus === s
                    ? "border-cyber-teal bg-cyber-teal/20 text-cyber-teal"
                    : (["unverified", "pending", "verified"].indexOf(verifyStatus) > i
                      ? "border-cyber-teal bg-cyber-teal text-cyber-dark"
                      : "border-cyber-border text-gray-600")
                }`}
              >
                {["unverified", "pending", "verified"].indexOf(verifyStatus) > i ? "✓" : i + 1}
              </div>
              <span className="text-xs text-gray-500 hidden sm:inline capitalize">{s}</span>
              {i < 2 && <div className="w-8 h-[2px] bg-cyber-border" />}
            </div>
          ))}
        </div>

        {step === "register" ? (
          <div className="cyber-card p-8 sm:p-10 clip-cyber animate-fade-in">
            <form
              onSubmit={handleSignup}
              className="space-y-5"
            >
              {/* Error message */}
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded">
                  {error}
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-xs font-bold tracking-wider uppercase text-gray-400 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="cyber-input clip-angle-tl"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold tracking-wider uppercase text-gray-400 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  placeholder="Min 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="cyber-input clip-angle-tl"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Username */}
                <div>
                  <label className="block text-xs font-bold tracking-wider uppercase text-gray-400 mb-2">
                    Username (In-game Name)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="YourRiotTag"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="cyber-input clip-angle-tl"
                  />
                </div>

                {/* Region */}
                <div>
                  <label className="block text-xs font-bold tracking-wider uppercase text-gray-400 mb-2">
                    Region
                  </label>
                  <select className="cyber-input clip-angle-tl cursor-pointer" required>
                    <option value="">Select region</option>
                    {regions.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Primary Game */}
              <div>
                <label className="block text-xs font-bold tracking-wider uppercase text-gray-400 mb-2">
                  Primary Game
                </label>
                <select className="cyber-input clip-angle-tl cursor-pointer" required>
                  <option value="valorant">Valorant</option>
                </select>
              </div>

              {/* Optional fields */}
              <div className="pt-4 border-t border-cyber-border">
                <p className="text-xs text-gray-500 mb-4 uppercase tracking-wider">Optional</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold tracking-wider uppercase text-gray-400 mb-2">
                      Discord Handle
                    </label>
                    <input
                      type="text"
                      placeholder="user#0000"
                      value={discordTag}
                      onChange={(e) => setDiscordTag(e.target.value)}
                      className="cyber-input clip-angle-tl"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold tracking-wider uppercase text-gray-400 mb-2">
                      Riot ID (optional)
                    </label>
                    <input
                      type="text"
                      placeholder="Name#TAG"
                      value={riotId}
                      onChange={(e) => setRiotId(e.target.value)}
                      className="cyber-input clip-angle-tl"
                    />
                  </div>
                </div>
              </div>

              {/* Avatar Upload */}
              <div>
                <label className="block text-xs font-bold tracking-wider uppercase text-gray-400 mb-2">
                  Profile Avatar
                </label>
                <div className="cyber-input clip-angle-tl flex items-center gap-3 cursor-pointer hover:border-cyber-teal/50 transition-colors">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-500 text-sm">Choose an image...</span>
                </div>
              </div>

              <button type="submit" disabled={loading} className="cyber-btn cyber-btn-primary w-full justify-center text-sm mt-4 disabled:opacity-50">
                {loading ? "Creating Account..." : "Create Account & Verify"}
                {!loading && (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                )}
              </button>
            </form>

            <p className="text-center text-xs text-gray-500 mt-6">
              Already have an account?{" "}
              <Link href="/signin" className="text-cyber-teal hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        ) : (
          /* Verify step */
          <div className="cyber-card p-8 sm:p-10 clip-cyber animate-fade-in">
            <div className="text-center">
              <div className="text-4xl mb-4">🔗</div>
              <h2 className="text-2xl font-black mb-2">
                VERIFY YOUR <span className="text-cyber-teal">RIOT ACCOUNT</span>
              </h2>
              <p className="text-gray-400 text-sm mb-8 max-w-sm mx-auto">
                Link your Riot account via OAuth to confirm ownership. This enables verified rankings, team eligibility, and a trusted badge.
              </p>

              {/* Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {[
                  { icon: "🏆", label: "Tournament Eligibility" },
                  { icon: "👥", label: "Team Creation" },
                  { icon: "✅", label: "Verified Badge" },
                ].map((b) => (
                  <div key={b.label} className="p-4 bg-cyber-surface/50 border border-cyber-border rounded text-center">
                    <div className="text-xl mb-1">{b.icon}</div>
                    <div className="text-xs font-bold text-gray-400">{b.label}</div>
                  </div>
                ))}
              </div>

              {verifyStatus === "unverified" && (
                <div className="space-y-3">
                  <a
                    href="/api/verify/riot/start"
                    className="cyber-btn cyber-btn-primary justify-center w-full max-w-xs mx-auto"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    Sign in with Riot
                  </a>
                  <Link
                    href="/"
                    className="block text-sm text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    Skip, I&apos;ll do it later →
                  </Link>
                </div>
              )}

              {verifyStatus === "pending" && (
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-sm rounded">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                    Redirecting to Riot...
                  </div>
                  <p className="text-xs text-gray-500">You&apos;ll be redirected to Riot&apos;s login page to verify your account.</p>
                  <Link
                    href="/"
                    className="block text-sm text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    Skip, I&apos;ll do it later →
                  </Link>
                </div>
              )}

              {verifyStatus === "verified" && (
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyber-teal/10 border border-cyber-teal/30 text-cyber-teal text-sm rounded">
                    <span className="text-lg">✅</span>
                    Riot Account Verified!
                  </div>
                  <p className="text-xs text-gray-500">You&apos;re all set. Your verified badge is now active.</p>
                  <Link href="/" className="cyber-btn cyber-btn-primary justify-center w-full max-w-xs mx-auto mt-4">
                    Go to Dashboard
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Security note */}
        <div className="mt-6 p-4 border border-cyber-border/50 bg-cyber-card/30 text-center text-xs text-gray-600 rounded">
          🔒 Your password is securely hashed. We never store plain-text passwords.
        </div>
      </div>
    </div>
  );
}
