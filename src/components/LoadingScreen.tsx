"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [loaded, setLoaded] = useState(false);
  const [percent, setPercent] = useState(0);
  const [logoOpacity, setLogoOpacity] = useState(0);

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const interval = 20;
    const steps = duration / interval;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = Math.min(Math.round((step / steps) * 100), 100);
      setPercent(progress);
      setLogoOpacity(progress / 100);

      if (progress >= 100) {
        clearInterval(timer);
        setTimeout(() => setLoaded(true), 400);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`loading-screen ${loaded ? "loaded" : ""}`}>
      {/* YG Logo - fades from 0 to 100% opacity */}
      <img
        src="/YG-logo.jpg"
        alt="YG Logo"
        className="loading-logo-svg rounded-full"
        style={{ opacity: logoOpacity, transition: "opacity 0.15s linear" }}
      />

      {/* Percentage */}
      <div className="loading-pct">{percent}%</div>

      {/* Progress bar */}
      <div className="loading-bar-track">
        <div className="loading-bar-fill" style={{ width: `${percent}%` }} />
      </div>

      {/* Brand text */}
      <div className="text-[10px] text-gray-700 tracking-widest uppercase">
        Yuva Gabbrus Esports
      </div>
    </div>
  );
}
