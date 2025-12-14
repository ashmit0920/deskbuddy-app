import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import { WeeklyTrends } from "../types";
import { motion } from "framer-motion";

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

    const maxScore = Math.max(...data.weekly_data.map(d => d.productivity_score), 100);

    return (
        <div className="space-y-8">
            <header>
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                    Weekly Trends
                </h2>
                <div className="flex gap-4 mt-4">
                    <div className="bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-700">
                        <span className="text-slate-400 text-sm block">Productivity Trend</span>
                        <span className="text-lg font-semibold capitalize text-emerald-400">{data.trends.productivity}</span>
                    </div>
                </div>
            </header>

            {/* Productivity Chart */}
            <section className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-8 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-8">Productivity Score History</h3>
                <div className="h-64 flex items-end justify-between gap-2">
                    {data.weekly_data.map((day, idx) => (
                        <div key={day.date} className="flex-1 flex flex-col items-center gap-2 group">
                            <div className="relative w-full flex justify-center">
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${(day.productivity_score / maxScore) * 100}%` }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    className={`w-full max-w-[40px] rounded-t-lg transition-colors ${day.productivity_score > 80 ? 'bg-emerald-500' :
                                            day.productivity_score > 50 ? 'bg-indigo-500' : 'bg-slate-600'
                                        }`}
                                />
                                <div className="absolute -top-8 bg-slate-900 border border-slate-700 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                                    {day.productivity_score.toFixed(1)}
                                </div>
                            </div>
                            <div className="text-xs text-slate-400 rotate-0">
                                {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Simple Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {data.weekly_data.slice(-3).map(day => (
                    <div key={day.date} className="bg-slate-800/30 p-4 rounded-xl border border-slate-700/30">
                        <div className="text-sm text-slate-400 mb-2">{day.date}</div>
                        <div className="flex justify-between items-end">
                            <div>
                                <div className="text-2xl font-bold">{day.total_keystrokes}</div>
                                <div className="text-xs text-slate-500 uppercase tracking-wider">Keystrokes</div>
                            </div>
                            <div className="text-right">
                                <div className="text-xl font-medium text-indigo-300">{day.active_time.toFixed(1)}m</div>
                                <div className="text-xs text-slate-500 uppercase tracking-wider">Active</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
