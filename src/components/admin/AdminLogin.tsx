"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";

export function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (data.success) {
        router.refresh();
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center section-padding relative">
      <div className="absolute inset-0 mesh-gradient opacity-30 pointer-events-none" />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass-card rounded-2xl p-8 border border-white/10 dark:border-white/10 relative z-10 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/20">
          <Lock className="text-white" size={28} />
        </div>
        
        <h1 className="text-2xl font-bold mb-2">Admin Access</h1>
        <p className="text-sm text-muted-foreground mb-8">Enter your secret password to edit your portfolio data.</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="password"
              placeholder="Enter password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-background/50 border border-foreground/10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all text-center tracking-widest"
              autoFocus
            />
          </div>
          
          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90 transition-opacity disabled:opacity-50 shadow-lg"
          >
            {loading ? "Verifying..." : "Enter Dashboard"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
