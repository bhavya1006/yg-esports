"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const DEFAULT_AVATAR = "/lib-profile/Default.png";

const PROFILE_IMAGES = [
  "Default.png",
  "Astra pfp.jpeg",
  "breach pfp.jpeg",
  "brimstone pfp.jpeg",
  "chamber pfp.jpeg",
  "clove pfp.jpeg",
  "cypher pfp.jpeg",
  "deadlock pfp.jpeg",
  "fade pfp.jpeg",
  "Geeko pfp.jpeg",
  "harbor pfp.jpeg",
  "iso pfp.jpeg",
  "jett pfp.jpeg",
  "kayo pfp.jpeg",
  "kj pfp.jpeg",
  "neon pfp.jpeg",
  "omen pfp.jpeg",
  "pfp valorant.jpeg",
  "phoinex pfp.jpeg",
  "raze .jpeg",
  "reyna pfp.jpeg",
  "sage pfp.jpeg",
  "skye pfp.jpeg",
  "sova pfp.jpeg",
  "tejo pfp.png",
  "veto pfp.png",
  "viper pfp.jpeg",
  "Waylay pfp.png",
  "yoru pfp.jpeg",
];

interface PlayerStats {
  id: string;
  kills: number;
  deaths: number;
  assists: number;
  wins: number;
  losses: number;
  headshotPct: number;
}

interface TeamInfo {
  team: {
    id: string;
    name: string;
    tag: string;
    tier: number;
    avgMmr: number;
    verified: boolean;
  };
  role: string;
}

interface ProfileData {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  riotId: string | null;
  discordTag: string | null;
  bio: string | null;
  role: string;
  tier: number;
  mmr: number;
  verified: boolean;
  verificationCode: string | null;
  createdAt: string;
  playerStats: PlayerStats[];
  teamMembers: TeamInfo[];
}

export default function ProfilePage() {
  const { data: session, status, update: updateSession } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [savingAvatar, setSavingAvatar] = useState(false);
  const [verifyMsg, setVerifyMsg] = useState("");
  const [verifyError, setVerifyError] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
      return;
    }
    if (status === "authenticated") {
      // Check for RSO callback query params
      const params = new URLSearchParams(window.location.search);
      if (params.get("verified") === "true") {
        setVerifyMsg(`Riot account "${params.get("riotId") || ""}" verified successfully!`);
        // Clean URL without reloading
        window.history.replaceState({}, "", "/profile");
      }
      if (params.get("verifyError")) {
        setVerifyError(decodeURIComponent(params.get("verifyError") || "Verification failed"));
        window.history.replaceState({}, "", "/profile");
      }

      fetch("/api/players/me")
        .then((res) => {
          if (!res.ok) throw new Error("Failed to load profile");
          return res.json();
        })
        .then((data) => setProfile(data))
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [status, router]);

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-cyber-dark flex items-center justify-center">
        <div className="text-cyber-teal animate-pulse text-lg">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-cyber-dark flex items-center justify-center">
        <div className="text-red-400">{error}</div>
      </div>
    );
  }

  if (!profile) return null;

  const avatarSrc = profile.image || DEFAULT_AVATAR;

  async function handleAvatarSelect(filename: string) {
    setSavingAvatar(true);
    const newImage = `/lib-profile/${filename}`;
    try {
      const res = await fetch("/api/players/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: newImage }),
      });
      if (!res.ok) throw new Error("Failed to update avatar");
      const updated = await res.json();
      setProfile((prev) => prev ? { ...prev, image: updated.image } : prev);
      setShowAvatarPicker(false);
      // Refresh session so Navbar avatar updates
      await updateSession();
    } catch {
      setError("Failed to update avatar");
    } finally {
      setSavingAvatar(false);
    }
  }

  const stats = profile.playerStats[0];
  const kd = stats ? (stats.deaths > 0 ? (stats.kills / stats.deaths).toFixed(2) : stats.kills.toFixed(2)) : null;
  const winRate = stats && (stats.wins + stats.losses) > 0
    ? ((stats.wins / (stats.wins + stats.losses)) * 100).toFixed(1)
    : null;

  return (
    <div className="min-h-screen bg-cyber-dark pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header Card */}
        <div className="relative bg-cyber-dark-800 border border-cyber-teal/20 rounded-xl p-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyber-teal/5 to-cyber-purple/5" />
          <div className="relative flex items-start gap-6">
            {/* Avatar — click to change */}
            <div className="shrink-0">
              <button
                onClick={() => setShowAvatarPicker(true)}
                className="relative group cursor-pointer"
                title="Change profile picture"
              >
                <img
                  src={avatarSrc}
                  alt=""
                  className="w-24 h-24 rounded-full object-cover border-2 border-cyber-teal/40 group-hover:border-cyber-teal transition-colors"
                />
                <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </button>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl font-bold text-white">{profile.name || "Player"}</h1>
                {profile.verified ? (
                  <span className="px-2 py-0.5 rounded-full bg-cyber-teal/20 text-cyber-teal text-xs font-bold border border-cyber-teal/40 flex items-center gap-1">
                    <span>✓</span> Verified
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full bg-yellow-400/20 text-yellow-400 text-xs font-bold border border-yellow-400/40">
                    Unverified
                  </span>
                )}
                <span className="px-2 py-0.5 rounded-full bg-cyber-purple/20 text-cyber-purple text-xs font-bold border border-cyber-purple/40 uppercase">
                  {profile.role}
                </span>
              </div>

              <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                {profile.riotId && (
                  <div>
                    <span className="text-gray-500 text-xs">Riot ID</span>
                    <p className="text-gray-300">{profile.riotId}</p>
                  </div>
                )}
                {profile.discordTag && (
                  <div>
                    <span className="text-gray-500 text-xs">Discord</span>
                    <p className="text-gray-300">{profile.discordTag}</p>
                  </div>
                )}
                <div>
                  <span className="text-gray-500 text-xs">Email</span>
                  <p className="text-gray-300 truncate">{profile.email}</p>
                </div>
              </div>

              {profile.bio && (
                <p className="mt-3 text-gray-400 text-sm">{profile.bio}</p>
              )}

              <p className="mt-3 text-gray-600 text-xs">
                Joined {new Date(profile.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </p>
            </div>
          </div>
        </div>

        {/* Riot Verification Card */}
        {!profile.verified && (
          <div className="bg-cyber-dark-800 border border-yellow-400/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-yellow-400/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Verify Riot Account</h2>
                <p className="text-xs text-gray-500">Sign in with your Riot account to prove ownership</p>
              </div>
            </div>

            <p className="text-sm text-gray-400 mb-4">
              To verify your identity, you&apos;ll be redirected to Riot&apos;s official sign-in page. 
              After logging in, your Riot ID will be linked to your YG Esports account. 
              No one else can claim your Riot ID.
            </p>

            <a
              href="/api/verify/riot/start"
              className="cyber-btn cyber-btn-primary text-sm inline-flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Sign in with Riot
            </a>

            {verifyError && (
              <p className="mt-3 text-sm text-red-400 bg-red-400/10 rounded-lg px-3 py-2">{verifyError}</p>
            )}
            {verifyMsg && (
              <p className="mt-3 text-sm text-cyber-teal bg-cyber-teal/10 rounded-lg px-3 py-2">{verifyMsg}</p>
            )}
          </div>
        )}

        {/* Verified success message (shown after RSO callback) */}
        {profile.verified && verifyMsg && (
          <div className="bg-cyber-dark-800 border border-cyber-teal/30 rounded-xl p-4">
            <p className="text-sm text-cyber-teal bg-cyber-teal/10 rounded-lg px-3 py-2">{verifyMsg}</p>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard label="Tier" value={`T${profile.tier}`} color="teal" />
          <StatCard label="MMR" value={profile.mmr.toString()} color="purple" />
          {winRate && <StatCard label="Win Rate" value={`${winRate}%`} color="teal" />}
          {kd && <StatCard label="K/D" value={kd} color="purple" />}
        </div>

        {stats && (
          <div className="bg-cyber-dark-800 border border-cyber-teal/20 rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-4">Performance</h2>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 text-center">
              <MiniStat label="Kills" value={stats.kills} />
              <MiniStat label="Deaths" value={stats.deaths} />
              <MiniStat label="Assists" value={stats.assists} />
              <MiniStat label="Wins" value={stats.wins} />
              <MiniStat label="Losses" value={stats.losses} />
              <MiniStat label="HS%" value={`${stats.headshotPct}%`} />
            </div>
          </div>
        )}

        {/* Teams */}
        {profile.teamMembers.length > 0 && (
          <div className="bg-cyber-dark-800 border border-cyber-purple/20 rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-4">Teams</h2>
            <div className="space-y-3">
              {profile.teamMembers.map((tm) => (
                <Link
                  key={tm.team.id}
                  href={`/teams/${tm.team.id}`}
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-800 hover:border-cyber-purple/40 transition-colors"
                >
                  <div>
                    <span className="text-white font-semibold">[{tm.team.tag}] {tm.team.name}</span>
                    <span className="ml-2 text-xs text-gray-500 capitalize">{tm.role}</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    T{tm.team.tier} · {tm.team.avgMmr} MMR
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Avatar Picker Modal */}
      {showAvatarPicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => !savingAvatar && setShowAvatarPicker(false)} />
          <div className="relative bg-cyber-dark-800 border border-cyber-teal/30 rounded-xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Choose Profile Picture</h3>
              <button
                onClick={() => !savingAvatar && setShowAvatarPicker(false)}
                className="text-gray-500 hover:text-white transition-colors text-xl leading-none"
              >
                &times;
              </button>
            </div>
            {savingAvatar && (
              <div className="text-center text-cyber-teal text-sm animate-pulse mb-3">Saving...</div>
            )}
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
              {PROFILE_IMAGES.map((img) => {
                const path = `/lib-profile/${img}`;
                const isSelected = avatarSrc === path;
                return (
                  <button
                    key={img}
                    onClick={() => handleAvatarSelect(img)}
                    disabled={savingAvatar}
                    className={`relative rounded-lg overflow-hidden border-2 transition-all aspect-square ${
                      isSelected
                        ? "border-cyber-teal shadow-[0_0_10px_rgba(204,255,0,0.3)]"
                        : "border-transparent hover:border-cyber-teal/50"
                    } ${savingAvatar ? "opacity-50" : ""}`}
                    title={img.replace(/\.(jpeg|jpg|png)$/i, "")}
                  >
                    <img
                      src={path}
                      alt={img.replace(/\.(jpeg|jpg|png)$/i, "")}
                      className="w-full h-full object-cover"
                    />
                    {isSelected && (
                      <div className="absolute inset-0 bg-cyber-teal/20 flex items-center justify-center">
                        <span className="text-cyber-teal text-lg font-bold">✓</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: string; color: "teal" | "purple" }) {
  const colorClass = color === "teal" ? "text-cyber-teal border-cyber-teal/20" : "text-cyber-purple border-cyber-purple/20";
  return (
    <div className={`bg-cyber-dark-800 border ${colorClass} rounded-xl p-4 text-center`}>
      <p className="text-xs text-gray-500 uppercase tracking-wider">{label}</p>
      <p className={`text-2xl font-bold mt-1 ${color === "teal" ? "text-cyber-teal" : "text-cyber-purple"}`}>{value}</p>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: number | string }) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-lg font-bold text-white">{value}</p>
    </div>
  );
}
