/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Scan, Lock, ArrowRight } from "lucide-react";

export default function HeroVault({ status, data, onEnter }: any) {
    return (
        <div className="relative h-full w-full perspective-1000">
            <motion.div
                layout
                initial={{ rotateX: 5 }}
                whileHover={{ rotateX: 0, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 100 }}
                className={`
                relative h-full w-full rounded-[40px] border flex flex-col justify-between overflow-hidden shadow-2xl backdrop-blur-xl transition-colors duration-1000
                ${status === 'GRANTED' ? 'bg-emerald-900/30 border-emerald-500/30' :
                        status === 'DENIED' ? 'bg-rose-900/30 border-rose-500/30' :
                            'bg-white/5 border-white/20'}
            `}
            >
                {/* Top Bar */}
                <div className="p-8 flex justify-between items-start">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">System Status</span>
                        <span className="text-sm font-medium tracking-wide">
                            {status === 'IDLE' ? 'STANDBY' : status === 'SCANNING' ? 'ANALYZING' : 'COMPLETE'}
                        </span>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${status === 'SCANNING' ? 'bg-purple-500 animate-ping' : 'bg-white/20'}`} />
                </div>

                {/* Middle: The Score Hero */}
                <div className="flex-1 flex flex-col items-center justify-center relative">
                    <AnimatePresence mode="wait">
                        {status === 'GRANTED' ? (
                            <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
                                <h1 className="text-[120px] font-medium leading-none tracking-tighter text-emerald-400 drop-shadow-2xl">
                                    {data?.fairscore}
                                </h1>
                                <span className="text-xl text-emerald-200/60 font-medium">VIP Tier Unlocked</span>
                            </motion.div>
                        ) : status === 'DENIED' ? (
                            <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
                                <h1 className="text-[120px] font-medium leading-none tracking-tighter text-rose-400 drop-shadow-2xl">
                                    {data?.fairscore}
                                </h1>
                                <span className="text-xl text-rose-200/60 font-medium">Access Restricted</span>
                            </motion.div>
                        ) : status === 'SCANNING' ? (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <Scan size={80} className="text-purple-400 animate-pulse" strokeWidth={1} />
                            </motion.div>
                        ) : (
                            <Lock size={80} className="text-white/20" strokeWidth={1} />
                        )}
                    </AnimatePresence>
                </div>

                {/* Bottom: Action */}
                <div className="p-8">
                    {status === 'GRANTED' && (
                        <button
                            onClick={onEnter}
                            className="
        group relative w-full py-5 rounded-[24px] overflow-hidden 
        transition-all duration-300 hover:scale-[1.02] active:scale-95
        shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_80px_rgba(16,185,129,0.5)]
    "
                        >
                            <div className="absolute inset-0 bg-linear-to-r from-white via-emerald-100 to-white animate-[shimmer_2s_linear_infinite] bg-size-[200%_100%]" />

                            <div className="absolute inset-[2px] bg-white/90 rounded-[22px] backdrop-blur-sm group-hover:bg-white/95 transition-colors" />

                            <span className="relative z-10 flex items-center justify-center gap-3 text-black font-black text-lg tracking-widest uppercase">
                                <span className="bg-clip-text text-transparent bg-linear-to-r from-black to-emerald-900">
                                    Enter Vault
                                </span>
                                <ArrowRight size={20} className="text-black group-hover:translate-x-1 transition-transform duration-300" strokeWidth={3} />
                            </span>
                        </button>
                    )}
                    {status === 'DENIED' && (
                        <div className="w-full py-5 rounded-[20px] bg-rose-500/20 border border-rose-500/20 text-rose-200 font-medium text-center text-sm">
                            Score 700+ Required for Entry
                        </div>
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