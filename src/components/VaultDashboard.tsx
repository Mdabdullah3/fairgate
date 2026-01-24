/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, Zap, Globe, Activity, Rocket, CheckCircle, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function VaultDashboard({ onClose }: { onClose: () => void, data: any }) {
    const [yieldAmount, setYieldAmount] = useState(1240.50);
    const [isClaiming, setIsClaiming] = useState(false);
    const [isClaimed, setIsClaimed] = useState(false);
    const [showToast, setShowToast] = useState(false);
    useEffect(() => {
        if (isClaimed) return;
        const interval = setInterval(() => {
            setYieldAmount(prev => prev + 0.0001);
        }, 50);
        return () => clearInterval(interval);
    }, [isClaimed]);

    const handleClaim = () => {
        if (isClaimed) return;
        setIsClaiming(true);
        setTimeout(() => {
            setIsClaiming(false);
            setIsClaimed(true);
            setYieldAmount(0); // Reset balance
            setShowToast(true); // Show notification
            setTimeout(() => setShowToast(false), 4000);
        }, 1500);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 bg-black/90 backdrop-blur-3xl text-white flex flex-col font-sans overflow-hidden"
        >
            {/* 1. AMBIENT LIGHTING */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05]" />
            </div>
            <div className="relative z-20 p-8 flex justify-end items-center">

                <button
                    onClick={onClose}
                    className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all group border border-white/5 cursor-pointer"
                >
                    <X size={24} className="text-white/50 group-hover:text-white transition-colors" />
                </button>
            </div>
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center">
                <motion.div
                    layout
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.8 }}
                >
                    <div className="flex items-center justify-center gap-2 mb-4 opacity-60">
                        <Activity size={14} className="text-amber-400" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Protocol Revenue Share</span>
                    </div>
                    <h1 className="text-[12vw] md:text-[10rem] font-medium tracking-tighter leading-none tabular-nums text-transparent bg-clip-text bg-linear-to-b from-white to-white/50 drop-shadow-2xl transition-all duration-1000">
                        {yieldAmount.toFixed(4)}
                    </h1>

                    <div className="flex items-center justify-center gap-2 mt-4 text-zinc-500">
                        <span className="text-xl font-medium tracking-tight">USDC</span>
                        <span className="text-xs uppercase tracking-widest bg-white/5 px-2 py-1 rounded">
                            {isClaimed ? "Payout Complete" : "Accumulating"}
                        </span>
                    </div>
                    <motion.button
                        onClick={handleClaim}
                        disabled={isClaimed || isClaiming}
                        whileHover={!isClaimed ? { scale: 1.05 } : {}}
                        whileTap={!isClaimed ? { scale: 0.95 } : {}}
                        className={`
                            mt-7 px-10 py-5 rounded-full font-black uppercase tracking-[0.2em] text-xs shadow-[0_0_50px_rgba(255,255,255,0.2)] flex items-center gap-3 mx-auto transition-all duration-300
                            ${isClaimed
                                ? 'bg-emerald-500 text-black cursor-default shadow-[0_0_50px_rgba(16,185,129,0.4)]'
                                : 'bg-white text-black hover:bg-zinc-200'}
                        `}
                    >
                        {isClaiming ? (
                            <><Loader2 size={16} className="animate-spin" /> Processing...</>
                        ) : isClaimed ? (
                            <><CheckCircle size={16} /> Claimed to Wallet</>
                        ) : (
                            <>Claim to Wallet <ArrowUpRight size={16} /></>
                        )}
                    </motion.button>
                </motion.div>
            </div>
            <div className="relative z-20 pb-8 px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
                    <div className="bg-white/5 border border-white/5 p-6 rounded-[30px] hover:bg-white/10 transition-colors cursor-pointer group backdrop-blur-md">
                        <div className="flex justify-between items-start mb-8">
                            <Zap size={24} className="text-emerald-400 group-hover:scale-110 transition-transform" />
                            <span className="text-[9px] font-bold uppercase tracking-widest text-white/30">Safe Mode</span>
                        </div>
                        <div>
                            <div className="text-3xl font-medium text-white mb-1">Unlimited</div>
                            <div className="text-xs text-zinc-500 uppercase tracking-wider">Collateral-Free Borrowing</div>
                        </div>
                    </div>
                    <div className="bg-white/5 border border-white/5 p-6 rounded-[30px] hover:bg-white/10 transition-colors cursor-pointer group backdrop-blur-md">
                        <div className="flex justify-between items-start mb-8">
                            <Globe size={24} className="text-blue-400 group-hover:scale-110 transition-transform" />
                            <span className="text-[9px] font-bold uppercase tracking-widest text-white/30">Governance</span>
                        </div>
                        <div>
                            <div className="text-3xl font-medium text-white mb-1">100x</div>
                            <div className="text-xs text-zinc-500 uppercase tracking-wider">Voting Power Multiplier</div>
                        </div>
                    </div>
                    <div className="bg-linear-to-br from-amber-500/20 to-purple-500/20 border border-white/10 p-6 rounded-[30px] hover:scale-[1.02] transition-transform cursor-pointer backdrop-blur-md relative overflow-hidden">
                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />
                        <div className="flex justify-between items-start mb-8">
                            <Rocket size={24} className="text-white" />
                            <span className="text-[9px] font-bold uppercase tracking-widest text-amber-300">Priority</span>
                        </div>
                        <div>
                            <div className="text-3xl font-medium text-white mb-1">50x Alloc</div>
                            <div className="text-xs text-zinc-300 uppercase tracking-wider">Launchpad Whitelist</div>
                        </div>
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {showToast && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 bg-[#0a0a0a] border border-emerald-500/30 px-6 py-4 rounded-2xl shadow-[0_0_40px_rgba(16,185,129,0.3)]"
                    >
                        <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                            <CheckCircle size={18} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-white">Transfer Successful</span>
                            <span className="text-[10px] text-zinc-400 font-mono">{yieldAmount} USDC SENT TO WALLET</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </motion.div>
    );
}