/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Scan, Lock, ShieldCheck, ShieldAlert, ArrowRight } from "lucide-react";

export default function HeroVault({ status, data }: any) {
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
                        <button className="w-full py-5 rounded-[20px] bg-white text-black font-bold text-lg tracking-tight hover:scale-[1.02] transition-transform flex items-center justify-center gap-2">
                            Enter Vault <ArrowRight size={20} />
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