/* eslint-disable react-hooks/immutability */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useSpring } from "framer-motion";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import {
  Lock, Unlock, ShieldCheck, ShieldAlert, Scan, Gem,
  Cpu, Activity, Globe, Zap, Award, BarChart3, Terminal
} from "lucide-react";

// --- CONFIG ---
const MIN_FAIR_SCORE = 700;

export default function Home() {
  const { publicKey, connected } = useWallet();
  const [data, setData] = useState<any>(null); // Stores Real API Data
  const [status, setStatus] = useState<"IDLE" | "SCANNING" | "GRANTED" | "DENIED" | "ERROR">("IDLE");
  const [scanProgress, setScanProgress] = useState(0);

  // Animated Counter for Score
  const scoreSpring = useSpring(0, { stiffness: 50, damping: 20 });

  useEffect(() => {
    if (connected && publicKey) {
      handleScan(publicKey.toString());
    } else {
      setStatus("IDLE");
      setData(null);
      setScanProgress(0);
      scoreSpring.set(0);
    }
  }, [connected, publicKey]);

  const handleScan = async (walletAddress: string) => {
    setStatus("SCANNING");

    // Simulate Loading Steps for dramatic effect
    let p = 0;
    const interval = setInterval(() => {
      p += 5;
      if (p > 90) clearInterval(interval);
      setScanProgress(p);
    }, 100);

    try {
      // 1. CALL YOUR NEXT.JS API (Which calls FairScale)
      const response = await fetch(`/api/score?wallet=${walletAddress}`);
      const result = await response.json();

      clearInterval(interval);
      setScanProgress(100);

      if (result.fairscore !== undefined) {
        setData(result);
        scoreSpring.set(result.fairscore); // Animate the number

        // 2. CHECK SCORE
        if (result.fairscore >= MIN_FAIR_SCORE) {
          setStatus("GRANTED");
        } else {
          setStatus("DENIED");
        }
      } else {
        setStatus("ERROR");
      }
    } catch (e) {
      setStatus("ERROR");
    }
  };
  console.log(data, "wallet score");
  return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center relative overflow-hidden font-mono perspective-1000">

      {/* --- 1. DYNAMIC BACKGROUND --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04]" />
        <div className={`absolute inset-0 transition-colors duration-1000 ${status === 'GRANTED' ? 'bg-emerald-900/20' : status === 'DENIED' ? 'bg-red-900/20' : 'bg-blue-900/10'}`} />

        {/* Floating Data Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      {/* --- 2. HEADER HUD --- */}
      <header className="absolute top-0 w-full p-8 flex justify-between items-start z-30">
        <div>
          <div className="flex items-center gap-2 opacity-60 mb-1">
            <Globe size={12} className="text-cyan-500 animate-spin-slow" />
            <span className="text-[10px] tracking-[0.3em] uppercase">FairScale_Link_v1</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tighter uppercase">
            Fair<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Gate</span>
          </h1>
        </div>

        {/* Custom Wallet Button Wrapper */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl opacity-50 blur group-hover:opacity-100 transition-opacity" />
          <WalletMultiButton style={{ backgroundColor: "#000", border: "1px solid #333", borderRadius: "10px", fontFamily: "inherit", fontWeight: 800, textTransform: "uppercase" }} />
        </div>
      </header>

      {/* --- 3. MAIN REACTOR CORE --- */}
      <main className="relative z-10 flex flex-col items-center w-full max-w-4xl">

        <div className="relative w-[600px] h-[600px] flex items-center justify-center">

          {/* A. ORBITAL RINGS */}
          <div className={`absolute inset-0 rounded-full border border-white/5 transition-all duration-1000 ${status === 'SCANNING' ? 'scale-100 opacity-100 animate-[spin_10s_linear_infinite]' : 'scale-50 opacity-0'}`} />
          <div className={`absolute inset-20 rounded-full border border-dashed border-white/10 transition-all duration-1000 ${status === 'SCANNING' ? 'scale-100 opacity-100 animate-[spin_15s_linear_infinite_reverse]' : 'scale-75 opacity-0'}`} />

          {/* B. THE CENTER MODULE */}
          <motion.div
            layout
            className={`
                    relative bg-[#0a0a0a]/90 backdrop-blur-2xl border-2 rounded-[40px] flex flex-col items-center overflow-hidden shadow-2xl transition-all duration-500
                    ${status === 'GRANTED' ? 'w-[500px] h-[350px] border-emerald-500/50 shadow-emerald-500/20' :
                status === 'DENIED' ? 'w-[400px] h-[400px] border-red-500/50 shadow-red-500/20' :
                  'w-80 h-80 border-white/10 shadow-blue-500/10'}
                `}
          >
            {/* 1. IDLE STATE */}
            {status === 'IDLE' && (
              <div className="h-full flex flex-col items-center justify-center gap-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full animate-pulse" />
                  <Lock size={64} className="text-zinc-500 relative z-10" />
                </div>
                <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest text-center">
                  Awaiting<br />Wallet Connection
                </p>
              </div>
            )}

            {/* 2. SCANNING STATE */}
            {status === 'SCANNING' && (
              <div className="h-full w-full flex flex-col items-center justify-center gap-6 p-8">
                <Scan size={64} className="text-cyan-400 animate-pulse" />
                <div className="w-full space-y-2">
                  <div className="flex justify-between text-[10px] uppercase font-bold text-cyan-500">
                    <span>Analysis In Progress</span>
                    <span>{scanProgress}%</span>
                  </div>
                  <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-cyan-500 shadow-[0_0_10px_#22d3ee]"
                      animate={{ width: `${scanProgress}%` }}
                    />
                  </div>
                </div>
                {/* Fake Terminal Output */}
                <div className="text-[8px] font-mono text-zinc-600 space-y-1 text-left w-full h-12 overflow-hidden">
                  <p> Connecting to FairScale Node...</p>
                  <p> Verifying Wallet History...</p>
                  <p> Calculating Trust Score...</p>
                </div>
              </div>
            )}

            {/* 3. RESULT STATE (GRANTED / DENIED) */}
            {(status === 'GRANTED' || status === 'DENIED') && data && (
              <div className="h-full w-full p-8 flex flex-col">

                {/* Top Bar: Tier & Icon */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Reputation Tier</span>
                    <span className={`text-2xl font-black uppercase italic ${status === 'GRANTED' ? 'text-emerald-400' : 'text-red-500'}`}>
                      {data.tier || "UNRANKED"}
                    </span>
                  </div>
                  <div className={`p-3 rounded-xl border ${status === 'GRANTED' ? 'bg-emerald-500/10 border-emerald-500 text-emerald-500' : 'bg-red-500/10 border-red-500 text-red-500'}`}>
                    {status === 'GRANTED' ? <ShieldCheck size={24} /> : <ShieldAlert size={24} />}
                  </div>
                </div>

                {/* Middle: Stats Grid */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  <StatBox label="FairScore" value={data.fairscore.toFixed(0)} />
                  <StatBox label="Social Score" value={data.social_score} />
                  <StatBox label="Wallet Age" value={`${data.features?.wallet_age_days || 0} Days`} />
                  <StatBox label="Tx Count" value={data.features?.tx_count || 0} />
                </div>

                {/* Bottom: Action */}
                <div className="mt-auto">
                  {status === 'GRANTED' ? (
                    <button className="w-full py-4 bg-emerald-500 text-black font-black uppercase tracking-widest rounded-xl hover:scale-[1.02] transition-transform shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2">
                      <Gem size={16} /> Enter Vault
                    </button>
                  ) : (
                    <div className="bg-red-950/30 border border-red-900/50 rounded-xl p-3 flex items-center gap-3">
                      <div className="text-[9px] font-mono text-red-400">
                        SCORE TOO LOW ({data.fairscore} / {MIN_FAIR_SCORE})<br />
                        Increase on-chain activity to unlock.
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>

          {/* --- BADGES (Only show if exists) --- */}
          {data?.badges?.length > 0 && (
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="absolute bottom-10 flex gap-4"
            >
              {data.badges.map((badge: any, i: number) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
                  <Award size={14} className="text-yellow-500" />
                  <span className="text-[10px] font-bold text-white uppercase">{badge.label}</span>
                </div>
              ))}
            </motion.div>
          )}

        </div>
      </main>
    </div>
  );
}

// Sub-component
const StatBox = ({ label, value }: { label: string, value: string | number }) => (
  <div className="bg-black/40 border border-white/5 p-2 rounded-lg">
    <span className="text-[8px] text-zinc-500 uppercase block">{label}</span>
    <span className="text-sm font-bold text-white">{value}</span>
  </div>
);