/* eslint-disable react-hooks/immutability */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Sparkles } from "lucide-react";
import HeroVault from "@/components/HeroVault";
import ReputationGuide from "@/components/ReputationGuide";
import VaultDashboard from "@/components/VaultDashboard";

const MIN_FAIR_SCORE = 2;

export default function Home() {
  const { publicKey, connected } = useWallet();
  const [data, setData] = useState<any>(null);
  const [status, setStatus] = useState<"IDLE" | "SCANNING" | "GRANTED" | "DENIED">("IDLE");
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const [showDashboard, setShowDashboard] = useState(false);
  // LOGIC
  useEffect(() => {
    if (connected && publicKey) {
      handleScan(publicKey.toString());
    } else {
      setStatus("IDLE");
      setData(null);
    }
  }, [connected, publicKey]);

  const handleScan = async (walletAddress: string) => {
    setStatus("SCANNING");
    setTimeout(async () => {
      try {
        const response = await fetch(`/api/score?wallet=${walletAddress}`);
        const result = await response.json();
        if (result.fairscore !== undefined) {
          setData(result);
          setStatus(result.fairscore >= MIN_FAIR_SCORE ? "GRANTED" : "DENIED");
        }
      } catch (e) {
        setStatus("IDLE"); // Reset on error
      }
    }, 2000);
  };

  console.log(showDashboard);
  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden selection:bg-purple-500/50">

      {/* 1. LIQUID BACKGROUND */}
      <div className="fixed inset-0 z-0">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
          className={`absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] rounded-full blur-[150px] transition-colors duration-1000 
            ${status === 'GRANTED' ? 'bg-emerald-600' : status === 'DENIED' ? 'bg-rose-600' : 'bg-purple-900'}`}
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
          className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-blue-900 rounded-full blur-[150px] opacity-30"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[100px]" />
      </div>

      {/* 2. HEADER */}
      <header className="fixed top-0 w-full z-50 px-8 py-6 flex justify-between items-center">
        <span className="text-xl font-bold tracking-tighter">FAIRGATE.</span>
        <WalletMultiButton style={{ backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "100px", height: "40px", fontSize: "12px", fontWeight: "600", backdropFilter: "blur(10px)" }} />
      </header>

      {/* 3. HERO (Centered Prism) */}
      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center pt-20">

        {/* Status Label */}
        <div className="mb-10 text-center space-y-4">
          <motion.div style={{ opacity }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <Sparkles size={14} className="text-purple-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-300">
              Decentralized Reputation Layer
            </span>
          </motion.div>
          <motion.h1 style={{ opacity }} className="text-5xl md:text-7xl font-black uppercase tracking-tight text-center leading-tighter">
            Verify your <br /> <span className="text-transparent bg-clip-text bg-linear-to-r from-white to-white/50">On-Chain Worth.</span>
          </motion.h1>
        </div>

        {/* THE PRISM */}
        <div className="w-full max-w-md px-6">
          <HeroVault onEnter={() => setShowDashboard(true)} status={status} data={data} />
        </div>


      </main>
      <AnimatePresence>
        {showDashboard && <VaultDashboard data={data} onClose={() => setShowDashboard(false)} />}
      </AnimatePresence>

      {/* 4. DETAILS (Dark Mode Upgrade) */}
      <section className="relative z-20 bg-[#fff9f9] border-t border-white/5 py-18 rounded-t-[60px] shadow-[0_-50px_100px_rgba(0,0,0,1)]">
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-purple-500 to-transparent opacity-50" />

        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24">
            <h2 className="text-6xl md:text-8xl font-medium tracking-tighter leading-[0.85] text-black">
              Identity <br /> <span className="text-zinc-600">Decoded.</span>
            </h2>
            <p className="max-w-xs text-sm font-mono text-zinc-500 leading-relaxed uppercase tracking-wide mt-8 md:mt-0 text-right">
              Analysis of on-chain behavior.<br />
              <span className="text-gray-900">Optimization Required.</span>
            </p>
          </div>

          <ReputationGuide data={data} />
        </div>
      </section>

    </div>
  );
}