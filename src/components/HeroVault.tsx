/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { motion, AnimatePresence, useSpring, useTransform } from "framer-motion";
import { Scan, Lock, ArrowRight, Activity, Zap } from "lucide-react";
import { useEffect } from "react";

function Counter({ value }: { value: number }) {
    const spring = useSpring(0, { stiffness: 50, damping: 15 });
    const display = useTransform(spring, (current) => Math.round(current));
    useEffect(() => { spring.set(value); }, [value, spring]);
    return <motion.span>{display}</motion.span>;
}

export default function HeroVault({ status, data, onEnter }: any) {
    const isScanning = status === 'SCANNING';
    const isGranted = status === 'GRANTED';
    const isDenied = status === 'DENIED';

    // Format Tier (e.g., "bronze" -> "BRONZE TIER")
    const tierLabel = data?.tier ? `${data.tier.toUpperCase()} TIER` : "UNRANKED";

    return (
        <div className="relative h-full w-full perspective-1000 mb-10 group">

            {/* Ambient Glow */}
            <AnimatePresence>
                {isGranted && (
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0.8 }}
                        animate={{ scale: 2, opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="absolute inset-0 bg-emerald-500/30 rounded-[60px] blur-[60px] -z-10"
                    />
                )}
            </AnimatePresence>

            <motion.div
                layout
                initial={{ rotateX: 10, scale: 0.95 }}
                animate={{
                    rotateX: 0,
                    scale: isGranted ? 1.05 : 1,
                    borderColor: isGranted ? "rgba(16, 185, 129, 0.5)" : isDenied ? "rgba(244, 63, 94, 0.5)" : "rgba(255, 255, 255, 0.1)"
                }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                className={`
                    relative h-full w-full rounded-[40px] border flex flex-col justify-between overflow-hidden shadow-2xl backdrop-blur-2xl transition-colors duration-500
                    ${isGranted ? 'bg-emerald-950/40 shadow-[0_0_100px_rgba(16,185,129,0.2)]' :
                        isDenied ? 'bg-rose-950/40 shadow-[0_0_100px_rgba(244,63,94,0.2)]' :
                            'bg-black/20 shadow-[0_0_60px_rgba(0,0,0,0.5)]'}
                `}
            >
                {/* Top Bar */}
                <div className="p-8 flex justify-between items-start relative z-10">
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-50 flex items-center gap-2">
                            {isScanning && <Activity size={10} className="animate-pulse text-blue-400" />}
                            System Status
                        </span>
                        <motion.span
                            key={status}
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className={`text-sm font-medium tracking-wide uppercase ${isGranted ? 'text-emerald-400' : isDenied ? 'text-rose-400' : 'text-white'}`}
                        >
                            {status === 'IDLE' ? 'STANDBY' : status === 'SCANNING' ? 'DECRYPTING...' : 'COMPLETE'}
                        </motion.span>
                    </div>
                    <div className={`w-3 h-3 rounded-full transition-colors duration-500 ${isScanning ? 'bg-blue-500 animate-ping' : isGranted ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : isDenied ? 'bg-rose-500' : 'bg-white/40'}`} />
                </div>

                {/* Middle: The Score Hero */}
                <div className="flex-1 flex flex-col items-center justify-center relative z-10">
                    <AnimatePresence mode="wait">
                        {isGranted ? (
                            <motion.div initial={{ scale: 0.5, opacity: 0, filter: "blur(10px)" }} animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }} className="text-center relative">
                                <div className="absolute inset-0 bg-emerald-500/20 blur-[50px] animate-pulse" />
                                <h1 className="text-[120px] font-medium leading-none tracking-tighter text-emerald-400 drop-shadow-2xl flex items-center justify-center relative z-10">
                                    <Counter value={data?.fairscore || 0} />
                                </h1>
                                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="flex items-center justify-center gap-2 mt-2">
                                    <Zap size={16} className="text-emerald-400 fill-emerald-400" />
                                    <span className="text-xl text-emerald-200/80 font-medium">{tierLabel} UNLOCKED</span>
                                </motion.div>
                            </motion.div>
                        ) : isDenied ? (
                            <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
                                <h1 className="text-[120px] font-medium leading-none tracking-tighter text-rose-400 drop-shadow-2xl flex items-center justify-center">
                                    <Counter value={data?.fairscore || 0} />
                                </h1>
                                <div className="flex flex-col gap-1 mt-2">
                                    <span className="text-xl text-rose-200/60 font-medium">Access Restricted</span>
                                    <span className="text-xs font-mono text-rose-500 uppercase tracking-widest">{tierLabel}</span>
                                </div>
                            </motion.div>
                        ) : isScanning ? (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative">
                                <div className="absolute inset-0 bg-blue-500/20 blur-xl animate-pulse" />
                                <Scan size={80} className="text-blue-400 animate-spin-slow duration-3000" strokeWidth={1} />
                            </motion.div>
                        ) : (
                            <Lock size={80} className="text-white/20" strokeWidth={1} />
                        )}
                    </AnimatePresence>
                </div>

                {/* Bottom: Action */}
                <div className="p-8 relative z-10">
                    <AnimatePresence>
                        {isGranted && (
                            <motion.button
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                onClick={onEnter}
                                className="group relative w-full py-5 rounded-[24px] overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_80px_rgba(16,185,129,0.5)]"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-white via-emerald-100 to-white animate-[shimmer_2s_linear_infinite] bg-[length:200%_100%]" />
                                <div className="absolute inset-[2px] bg-white/90 rounded-[22px] backdrop-blur-sm group-hover:bg-white/95 transition-colors" />
                                <span className="relative z-10 flex items-center justify-center gap-3 text-black font-black text-lg tracking-widest uppercase">
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-black to-emerald-900">Enter Vault</span>
                                    <ArrowRight size={20} className="text-black group-hover:translate-x-1 transition-transform" strokeWidth={3} />
                                </span>
                            </motion.button>
                        )}
                    </AnimatePresence>

                    {isDenied && (
                        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full py-5 rounded-[20px] bg-rose-500/10 border border-rose-500/20 text-rose-400 font-medium text-center text-sm">
                            Score 500+ Required for Entry
                        </motion.div>
                    )}
                    {status === 'IDLE' && (
                        <div className="w-full py-5 rounded-[20px] bg-white/5 border border-white/5 text-white/40 font-medium text-center text-sm">
                            Connect Wallet to Begin
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}