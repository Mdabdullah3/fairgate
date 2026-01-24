/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { motion } from "framer-motion";
import { ArrowUpRight, Zap, Target, Shield } from "lucide-react";

export default function ReputationGuide({ data }: { data: any }) {
    const actions = data?.actions || [
        {
            label: "Connect Your Socials",
            description: "Link your Twitter to boost your score.",
            priority: "high",
            cta: "Connect Twitter"
        },
        {
            label: "Hold Positions Longer",
            description: "Diamond hands hold for 30+ days.",
            priority: "medium",
            cta: "Learn More"
        },
        {
            label: "Try More Platforms",
            description: "Explore Jupiter, Raydium, Orca, and more.",
            priority: "low",
            cta: "Discover DEXes"
        }
    ];

    const getTheme = (priority: string) => {
        switch (priority) {
            case 'high': return {
                icon: Zap, color: 'text-rose-400', gradient: 'from-rose-500 via-red-500 to-orange-500', points: "+30 PTS", bg: 'bg-rose-50'
            };
            case 'medium': return {
                icon: Shield, color: 'text-blue-400', gradient: 'from-blue-500 via-indigo-500 to-violet-500', points: "+50 PTS"
                , bg: 'bg-blue-50'
            };
            default: return { icon: Target, color: 'text-emerald-400', gradient: 'from-emerald-400 via-teal-500 to-cyan-500', points: "+50 PTS", bg: 'bg-emerald-50' };
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {actions.map((item: any, i: number) => {
                const theme = getTheme(item.priority);
                const Icon = theme.icon;

                return (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
                        className={`
                            group relative h-[420px] w-full rounded-[40px] overflow-hidden border border-white/60
                            bg-white/80 backdrop-blur-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)]
                            hover:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.12)] transition-all duration-500
                        `}
                    >
                        <div className={`absolute top-[-20%] right-[-20%] w-[300px] h-[300px] bg-linear-to-br ${theme.gradient} opacity-[0.08] blur-[80px] group-hover:opacity-[0.15] transition-opacity duration-700`} />

                        <div className="relative z-10 h-full p-8 flex flex-col justify-between">

                            {/* Header */}
                            <div className="flex justify-between items-start">
                                <div className="p-3 rounded-2xl bg-white shadow-sm border border-zinc-100 group-hover:scale-110 transition-transform duration-500">
                                    <Icon size={28} className={theme.color} />
                                </div>
                                <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-zinc-200 bg-white text-zinc-500`}>
                                    Priority: {item.priority}
                                </div>
                            </div>

                            {/* Main Info */}
                            <div className="space-y-4">
                                <div>
                                    <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Recommended Action</span>
                                    <h3 className="text-3xl font-medium text-zinc-900 tracking-tight mt-2 leading-tight">{item.label}</h3>
                                </div>
                                <p className="text-sm font-medium text-zinc-500 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>

                            {/* Footer */}
                            <div className="pt-6 border-t border-zinc-100 flex justify-between items-end">
                                <div>
                                    <span className="block text-[10px] text-zinc-400 mb-1">Potential Reward</span>
                                    <span className='text-4xl font-black tracking-tighter text-zinc-700'>
                                        {theme.points}
                                    </span>
                                </div>

                                <button className={`w-12 h-12 rounded-full flex items-center justify-center text-white bg-linear-to-br ${theme.gradient} shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300`}>
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