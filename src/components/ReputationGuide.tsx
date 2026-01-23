/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { motion } from "framer-motion";
import { TrendingUp, Users, Clock, ArrowUpRight, ShieldCheck } from "lucide-react";

export default function ReputationGuide({ data }: { data: any }) {
    const walletAge = data?.features?.wallet_age_days || 0;
    const txCount = data?.features?.tx_count || 0;
    const social = data?.social_score || 0;

    const items = [
        {
            title: "Diamond Hands",
            subtitle: "Asset Maturity",
            score: "50",
            current: walletAge,
            target: 100,
            icon: Clock,
            gradient: "from-blue-400 via-indigo-400 to-violet-400",
            shadow: "shadow-blue-500/20",
            bg: "bg-blue-50/50"
        },
        {
            title: "Social Identity",
            subtitle: "Network Link",
            score: "20",
            current: social,
            target: 1,
            icon: Users,
            gradient: "from-fuchsia-400 via-pink-400 to-rose-400",
            shadow: "shadow-pink-500/20",
            bg: "bg-pink-50/50"
        },
        {
            title: "Power User",
            subtitle: "Chain Volume",
            score: "30",
            current: txCount,
            target: 50,
            icon: TrendingUp,
            gradient: "from-emerald-400 via-teal-400 to-cyan-400",
            shadow: "shadow-emerald-500/20",
            bg: "bg-emerald-50/50"
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {items.map((item, i) => {
                const progress = Math.min((item.current / item.target) * 100, 100);
                const isComplete = progress >= 100;

                return (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
                        className={`
                            group relative h-[480px] w-full rounded-[40px] overflow-hidden border border-white/60
                            bg-[#f6f0f0] backdrop-blur-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)]
                            hover:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.12)] transition-all duration-500
                        `}
                    >
                        {/* 1. Ambient Background Blob */}
                        <div className={`absolute top-[-20%] right-[-20%] w-[300px] h-[300px] bg-linear-to-br ${item.gradient} opacity-[0.08] blur-[80px] group-hover:opacity-[0.15] transition-opacity duration-700`} />

                        <div className="relative z-10 h-full p-8 flex flex-col justify-between">

                            {/* Top: Icon & Status */}
                            <div className="flex justify-between items-start">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-white/70 shadow-sm  `}>
                                    <item.icon size={28} className={`text-black/80`} />
                                </div>
                                {isComplete ? (
                                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100/50 text-emerald-700 rounded-full text-[10px] font-bold uppercase tracking-wider border border-emerald-200/50">
                                        <ShieldCheck size={12} /> Complete
                                    </div>
                                ) : (
                                    <div className="px-3 py-1.5 bg-zinc-100 text-zinc-500 rounded-full text-[10px] font-bold uppercase tracking-wider">
                                        In Progress
                                    </div>
                                )}
                            </div>

                            {/* Middle: Title & Progress */}
                            <div className="space-y-6">
                                <div>
                                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-[0.2em]">{item.subtitle}</span>
                                    <h3 className="text-3xl font-medium text-zinc-900 mt-2 tracking-tight">{item.title}</h3>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs font-medium text-zinc-500">
                                        <span>{item.current} / {item.target}</span>
                                        <span>{Math.round(progress)}%</span>
                                    </div>
                                    <div className="h-3 w-full bg-zinc-100 rounded-full overflow-hidden p-[2px]">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${progress}%` }}
                                            transition={{ duration: 1.5, ease: "circOut" }}
                                            className={`h-full rounded-full bg-linear-to-r ${item.gradient}`}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Bottom: The Massive Score */}
                            <div className="pt-8 border-t border-zinc-100/50 flex justify-between items-end">
                                <div>
                                    <span className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Reputation Impact</span>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-2xl font-medium text-zinc-400">+</span>
                                        <span className={`text-7xl font-medium tracking-tighter text-black/70 `}>
                                            {item.score}
                                        </span>
                                    </div>
                                </div>

                                <button className={`w-12 h-12 rounded-full flex items-center justify-center text-white bg-linear-to-br ${item.gradient} shadow-lg ${item.shadow} opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300`}>
                                    <ArrowUpRight size={24} />
                                </button>
                            </div>

                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}