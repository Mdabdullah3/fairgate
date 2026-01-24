/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { motion } from "framer-motion";
import { X, ArrowUpRight, CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";

export default function VaultDashboard({ onClose }: { onClose: () => void, data: any }) {
    const [selectedReward, setSelectedReward] = useState<number | null>(null);
    const [isMinting, setIsMinting] = useState(false);
    const [isMinted, setIsMinted] = useState(false);

    const rewards = [
        {
            id: 1,
            name: "Cyber Ape #402",
            type: "IDENTITY",
            image: "https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149622024.jpg?semt=ais_hybrid&w=740&q=80",
            color: "shadow-blue-500/50",
            border: "border-blue-500/50"
        },
        {
            id: 2,
            name: "Mutant Ape #99",
            type: "YIELD BOOST",
            image: "https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149629588.jpg?semt=ais_hybrid&w=740&q=80",
            color: "shadow-emerald-500/50",
            border: "border-emerald-500/50"
        },
        {
            id: 3,
            name: "Golden Ape #01",
            type: "ACCESS KEY",
            image: "https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149619496.jpg",
            color: "shadow-amber-500/50",
            border: "border-amber-500/50"
        },
    ];

    const handleMint = () => {
        if (!selectedReward || isMinted) return;
        setIsMinting(true);
        setTimeout(() => {
            setIsMinting(false);
            setIsMinted(true);
        }, 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 bg-black/95 backdrop-blur-3xl text-white flex flex-col font-sans overflow-hidden"
        >
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05]" />
            </div>

            {/* 2. HEADER */}
            <div className="relative z-20 p-8 flex justify-end items-center">
                <button
                    onClick={onClose}
                    className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all group border border-white/5 cursor-pointer"
                >
                    <X size={24} className="text-white/50 group-hover:text-white transition-colors" />
                </button>
            </div>

            {/* 3. CENTER STAGE: THE REWARD TRINITY */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center gap-10 pb-20">

                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
                    Select Your Artifact
                </span>

                <div className="flex flex-col md:flex-row gap-6">
                    {rewards.map((reward) => (
                        <motion.div
                            key={reward.id}
                            onClick={() => !isMinted && setSelectedReward(reward.id)}
                            whileHover={!isMinted ? { y: -20, scale: 1.05 } : {}}
                            className={`
                                relative w-72 h-96 rounded-[32px] border-2 cursor-pointer transition-all duration-500 flex flex-col overflow-hidden group
                                ${selectedReward === reward.id
                                    ? `bg-[#0a0a0a] ${reward.border} shadow-[0_0_80px_rgba(0,0,0,0.8)] z-10`
                                    : 'bg-[#0a0a0a]/50 border-white/5 opacity-60 hover:opacity-100'}
                            `}
                        >
                            {/* Selected Glow */}
                            {selectedReward === reward.id && (
                                <div className={`absolute inset-0 ${reward.color} opacity-20 blur-xl`} />
                            )}

                            {/* Image Container */}
                            <div className="h-[70%] w-full relative overflow-hidden bg-black">
                                <img
                                    src={reward.image}
                                    alt="NFT"
                                    className={`w-full h-full object-cover transition-transform duration-700 ${selectedReward === reward.id ? 'scale-110' : 'grayscale group-hover:grayscale-0'}`}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-80" />
                            </div>

                            {/* Info */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col items-center pb-8">
                                <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded mb-2 border ${selectedReward === reward.id ? 'bg-white text-black border-white' : 'bg-white/10 text-zinc-400 border-transparent'}`}>
                                    {reward.type}
                                </span>
                                <h3 className="text-lg font-bold text-white uppercase tracking-tight">{reward.name}</h3>
                            </div>

                            {/* Checkmark Overlay */}
                            {selectedReward === reward.id && (
                                <div className="absolute top-4 right-4 bg-emerald-500 text-black rounded-full p-1 shadow-lg">
                                    <CheckCircle size={20} />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                <motion.button
                    onClick={handleMint}
                    disabled={!selectedReward || isMinted || isMinting}
                    className={`
                        px-16 py-6 rounded-full font-black uppercase tracking-[0.2em] text-xs shadow-2xl flex items-center gap-3 transition-all duration-300 transform
                        ${!selectedReward
                            ? 'bg-zinc-900 text-zinc-600 cursor-not-allowed border border-zinc-800'
                            : isMinted
                                ? 'bg-emerald-500 text-black cursor-default scale-110'
                                : 'bg-white text-black hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]'}
                    `}
                >
                    {isMinting ? (
                        <><Loader2 size={16} className="animate-spin" /> Minting Asset...</>
                    ) : isMinted ? (
                        <><CheckCircle size={16} /> Asset Secured</>
                    ) : (
                        <>Mint Selected Artifact <ArrowUpRight size={16} /></>
                    )}
                </motion.button>
            </div>
        </motion.div>
    );
}