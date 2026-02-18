import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="min-h-screen pt-20 pb-20 relative flex items-center justify-center">
      {/* bg effects */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_30%,rgba(139,92,246,0.08),transparent)]" />

      <div className="relative w-full max-w-md mx-auto px-4 sm:px-6">
        {/* heading */}
        <div className="text-center mb-8">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 bg-cyber-teal clip-angle-tl animate-pulse-glow" />
            <div className="absolute inset-[3px] bg-cyber-dark clip-angle-tl" />
            <span className="absolute inset-0 flex items-center justify-center text-cyber-teal font-black text-2xl">
              YG
            </span>
          </div>
          <h1 className="text-3xl font-black tracking-tight">
            SIGN <span className="text-cyber-teal text-glow">IN</span>
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Welcome back, player.
          </p>
        </div>

        <div className="cyber-card p-8 clip-cyber animate-fade-in">
          <form className="space-y-5">
            {/* Email / Username */}
            <div>
              <label className="block text-xs font-bold tracking-wider uppercase text-gray-400 mb-2">
                Email or Username
              </label>
              <input
                type="text"
                required
                placeholder="you@example.com"
                className="cyber-input clip-angle-tl"
              />
            </div>

            {/* Password */}
            <div>
              <label className="flex items-center justify-between text-xs font-bold tracking-wider uppercase text-gray-400 mb-2">
                Password
                <a href="#" className="text-cyber-teal normal-case tracking-normal hover:underline">
                  Forgot password?
                </a>
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="cyber-input clip-angle-tl"
              />
            </div>

            <button type="submit" className="cyber-btn cyber-btn-primary w-full justify-center text-sm">
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-[1px] bg-cyber-border" />
            <span className="text-xs text-gray-600">OR</span>
            <div className="flex-1 h-[1px] bg-cyber-border" />
          </div>

          {/* Riot OAuth */}
          <button className="cyber-btn w-full justify-center text-sm group">
            <svg className="w-5 h-5 text-red-500 group-hover:text-red-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.162 2L2 5.369v1.51l1.162-.484V2zm16.276 4.394L21 2H4.838L3.6 5.884l8.168 7.116h5.67l2-2.606z" />
            </svg>
            Sign in with Riot
          </button>

          {/* Resend verification */}
          <div className="mt-4 text-center">
            <a href="#" className="text-xs text-gray-500 hover:text-cyber-teal transition-colors">
              Resend verification email
            </a>
          </div>
        </div>

        {/* Quick action */}
        <div className="mt-6 cyber-card p-4 clip-angle-bl text-center">
          <p className="text-xs text-gray-500 mb-2">Want to try before signing up?</p>
          <Link href="/tournaments" className="cyber-btn cyber-btn-purple text-xs py-2 px-5 inline-flex">
            ⚡ Play Free Scrim Today
          </Link>
        </div>

        <p className="text-center text-xs text-gray-500 mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-cyber-teal hover:underline">
            Register Now
          </Link>
        </p>
      </div>
    </div>
  );
}
