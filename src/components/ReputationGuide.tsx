/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ArrowUpRight } from "lucide-react";

export default function ReputationGuide({ data }: { data: any }) {
    // Use data to show "Completed" status if available
    const items = [
        { title: "Diamond Hands", label: "Wallet Age", score: "+50 Pts", active: data?.features?.wallet_age_days > 100 },
        { title: "Social Graph", label: "Twitter Link", score: "+20 Pts", active: data?.social_score > 0 },
        { title: "Power User", label: "Transaction Vol", score: "+30 Pts", active: data?.features?.tx_count > 50 }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {items.map((item, i) => (
                <div key={i} className="group cursor-pointer">
                    <div className={`h-[300px] w-full rounded-[40px] mb-6 p-8 flex flex-col justify-between transition-colors duration-500 ${item.active ? 'bg-black text-white' : 'bg-zinc-100 text-black hover:bg-zinc-200'}`}>
                        <div className="flex justify-between items-start">
                            <span className="text-xs font-bold uppercase tracking-widest opacity-50">{item.label}</span>
                            <div className={`w-3 h-3 rounded-full ${item.active ? 'bg-emerald-500' : 'bg-zinc-300'}`} />
                        </div>
                        <div>
                            <h3 className="text-4xl font-medium tracking-tighter mb-2">{item.score}</h3>
                            <p className="text-sm font-medium opacity-60">Boost your FairScore by improving this metric.</p>
                        </div>
                    </div>
                    <div className="flex justify-between items-center px-2">
                        <span className="text-lg font-bold tracking-tight">{item.title}</span>
                        <ArrowUpRight size={20} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                </div>
            ))}
        </div>
    );
}