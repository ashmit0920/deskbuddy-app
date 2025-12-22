import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import { WeeklyTrends } from "../types";
import { motion } from "framer-motion";
import { BarChart2, Clock, Zap, Activity, Keyboard } from "lucide-react";

// Reusable Chart Component
const WeeklyChart = ({
    title,
    data,
    valueKey,
    maxVal,
    colorClass,
    formatValue,
    icon: Icon
}: {
    title: string,
    data: any[],
    valueKey: string,
    maxVal: number,
    colorClass: string,
    formatValue: (v: number) => string,
    icon: any
}) => (
    <div className="bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-6 backdrop-blur-sm shadow-sm dark:shadow-none flex flex-col h-80">
        <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <div className={`p-1.5 rounded-lg ${colorClass.replace("bg-", "bg-opacity-10 bg-").replace("500", "500/10")} ${colorClass.replace("bg-", "text-")}`}>
                    <Icon className="w-4 h-4" />
                </div>
                {title}
            </h3>
        </div>

        <div className="flex-1 flex items-end justify-between gap-2">
            {data.map((day, idx) => {
                const val = day[valueKey];
                const heightPercent = Math.min((val / maxVal) * 100, 100);

                return (
                    <div key={day.date} className="flex-1 h-full flex flex-col justify-end items-center gap-2 group relative">
                        {/* Tooltip */}
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 dark:bg-slate-900 border border-slate-700 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity text-white pointer-events-none whitespace-nowrap z-10 shadow-xl">
                            {formatValue(val)}
                        </div>

                        <div className="relative w-full flex-1 flex items-end justify-center">
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: `${heightPercent}%` }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className={`w-full max-w-[32px] rounded-t-sm ${colorClass} opacity-80 group-hover:opacity-100 transition-opacity`}
                            />
                        </div>
                        <div className="text-[10px] uppercase font-medium text-slate-400 dark:text-slate-500">
                            {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }).slice(0, 1)}
                        </div>
                    </div>
                );
            })}
        </div>
    </div>
);

export default function AnalyticsWeekly() {
    const [data, setData] = useState<WeeklyTrends | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await api.analytics.getWeeklyTrends();
                setData(result);
            } catch (err: any) {
                setError("Failed to load weekly trends.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div className="p-8 text-center text-slate-400 animate-pulse">Loading weekly trends...</div>;
    if (error) return <div className="p-8 text-center text-red-400">{error}</div>;
    if (!data) return null;

    // Calculate maximums for scaling
    const maxProd = 100;
    const maxKeys = Math.max(...data.weekly_data.map(d => d.total_keystrokes)) * 1.1;
    const maxTime = Math.max(...data.weekly_data.map(d => d.active_time)) * 1.1;
    const maxFocus = Math.max(...data.weekly_data.map(d => d.focus_sessions)) * 1.2;

    return (
        <div className="space-y-8 animate-fade-in pb-8">
            <header>
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-slate-700 dark:bg-gradient-to-r dark:from-purple-400 dark:to-pink-400">
                    Weekly Overview
                </h2>
                <div className="flex gap-4 mt-4">
                    <div className="bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-lg">
                        <span className="text-slate-500 text-xs uppercase tracking-wider block mb-1">Productivity Trend</span>
                        <span className="text-lg font-semibold capitalize text-emerald-500 flex items-center gap-2">
                            <BarChart2 className="w-4 h-4" /> {data.trends.productivity}
                        </span>
                    </div>
                    <div className="bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-lg">
                        <span className="text-slate-500 text-xs uppercase tracking-wider block mb-1">Most Active Day</span>
                        <span className="text-lg font-semibold capitalize text-indigo-500 flex items-center gap-2">
                            <Clock className="w-4 h-4" /> {data.trends.most_active_day}
                        </span>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <WeeklyChart
                    title="Productivity Score"
                    data={data.weekly_data}
                    valueKey="productivity_score"
                    maxVal={maxProd}
                    colorClass="bg-emerald-500"
                    formatValue={(v) => v.toFixed(1)}
                    icon={Activity}
                />

                <WeeklyChart
                    title="Keystrokes"
                    data={data.weekly_data}
                    valueKey="total_keystrokes"
                    maxVal={maxKeys}
                    colorClass="bg-indigo-500"
                    formatValue={(v) => v.toLocaleString()}
                    icon={Keyboard}
                />

                <WeeklyChart
                    title="Active Minutes"
                    data={data.weekly_data}
                    valueKey="active_time"
                    maxVal={maxTime}
                    colorClass="bg-fuchsia-500"
                    formatValue={(v) => `${v.toFixed(0)}m`}
                    icon={Clock}
                />

                <WeeklyChart
                    title="Focus Sessions"
                    data={data.weekly_data}
                    valueKey="focus_sessions"
                    maxVal={maxFocus}
                    colorClass="bg-amber-500"
                    formatValue={(v) => v.toString()}
                    icon={Zap}
                />
            </div>

            {/* Attention Stats Bar */}
            <div className="bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-6 flex flex-wrap gap-8 justify-around items-center shadow-sm dark:shadow-none">
                {data.weekly_data.slice(-5).map((d, i) => (
                    <div key={i} className="text-center">
                        <div className="text-xs text-slate-400 mb-1">{new Date(d.date).toLocaleDateString('en-US', { weekday: 'short' })}</div>
                        <div className="relative w-12 h-12 flex items-center justify-center">
                            <svg className="absolute w-full h-full -rotate-90">
                                <circle cx="24" cy="24" r="20" stroke="currentColor" fill="none" className="text-slate-200 dark:text-slate-700" strokeWidth="4" />
                                <circle cx="24" cy="24" r="20" stroke="currentColor" fill="none" className="text-cyan-500" strokeWidth="4" strokeDasharray={`${d.avg_attention * 126} 126`} />
                            </svg>
                            <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300">{(d.avg_attention * 100).toFixed(0)}%</span>
                        </div>
                        <div className="text-[10px] text-slate-400 mt-1">Attention</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
