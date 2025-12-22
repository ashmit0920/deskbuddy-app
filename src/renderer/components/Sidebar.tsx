import React from "react";
import { MessageSquare, Grid, Settings as Cog } from "lucide-react";
import { motion } from "framer-motion";
import type { Tab } from "../App";

export default function Sidebar({
    active,
    setActive,
}: {
    active: Tab;
    setActive: (t: Tab) => void;
}) {
    const items: { id: Tab; label: string; icon: any }[] = [
        { id: "dashboard", label: "Dashboard", icon: Grid },
        { id: "analytics_daily", label: "Daily Summary", icon: MessageSquare }, // Using generic icon for now
        { id: "analytics_weekly", label: "Weekly Trends", icon: MessageSquare },
        { id: "ai", label: "AI Recommendations", icon: MessageSquare },
        { id: "settings", label: "Settings", icon: Cog },
    ];

    return (
        <aside className="w-72 bg-slate-900 border-r border-slate-800 p-6 flex flex-col gap-8 h-screen sticky top-0 text-slate-400">
            <div className="flex items-center gap-4 px-2">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-lg font-bold shadow-lg shadow-indigo-500/20">DB</div>
                <div>
                    <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">DeskBuddy</h1>
                    <p className="text-slate-500 text-xs font-medium uppercase tracking-wide">Productivity AI</p>
                </div>
            </div>

            <nav className="flex-1 space-y-1">
                {items.map((it) => {
                    const Icon = it.icon;
                    const isActive = active === it.id;
                    return (
                        <button
                            key={it.id}
                            onClick={() => setActive(it.id)}
                            className={`w-full group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                                ? "bg-indigo-500/10 text-indigo-300 shadow-sm border border-indigo-500/20"
                                : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 cursor-pointer"
                                }`}>
                            <Icon className={`w-5 h-5 transition-colors ${isActive ? "text-indigo-400" : "text-slate-500 group-hover:text-slate-300"}`} />
                            <span className="font-medium text-sm">{it.label}</span>
                            {isActive && (
                                <motion.div
                                    layoutId="active-indicator"
                                    className="ml-auto w-1.5 h-1.5 bg-indigo-400 rounded-full shadow-[0_0_8px_rgba(129,140,248,0.5)]"
                                />
                            )}
                        </button>
                    );
                })}
            </nav>

            <footer className="px-4 py-4 border-t border-slate-800/50 text-xs text-slate-500">
                <div className="flex items-center justify-between opacity-60 hover:opacity-100 transition-opacity cursor-default">
                    <span>v0.1.2</span>
                    <span>Local Mode</span>
                </div>
            </footer>
        </aside>
    );
}