import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import { DailySummary } from "../types";
import MetricCard from "./MetricCard";
import { motion } from "framer-motion";

export default function AnalyticsDaily() {
    const [data, setData] = useState<DailySummary | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const today = new Date().toISOString();
                const result = await api.analytics.getDailyAnalysis(today);
                setData(result);
            } catch (err: any) {
                setError("No data available for today yet.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div className="p-8 text-center text-slate-400 animate-pulse">Loading daily analysis...</div>;
    if (error) return <div className="p-8 text-center text-red-400">{error}</div>;
    if (!data) return null;

    return (
        <div className="space-y-8">
            <header>
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-slate-700 dark:bg-gradient-to-r dark:from-indigo-400 dark:to-cyan-400">
                    Daily Analysis
                </h2>
                <p className="text-slate-400 mt-2">Detailed breakdown for {data.date}</p>
            </header>

            {/* Insight Pills */}
            <div className="flex flex-wrap gap-3">
                {data.insights.map((insight, idx) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        key={idx}
                        className="bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-700 dark:text-indigo-200 px-4 py-2 rounded-full text-sm font-medium">
                        {insight}
                    </motion.div>
                ))}
            </div>

            {/* Productivity Score */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                    title="Productivity Score"
                    value={data.productivity_metrics.overall_productivity_score.toFixed(1)}
                    trend={data.productivity_metrics.productivity_components.activity_productivity > 80 ? "+High" : "Normal"}
                    icon="Activity"
                />
                <MetricCard
                    title="Active Time"
                    value={`${data.keystroke_summary.active_time_minutes.toFixed(0)} min`}
                    trend="Today"
                    icon="Clock"
                />
                <MetricCard
                    title="Typing Speed"
                    value={`${data.keystroke_summary.avg_typing_speed.toFixed(1)} WPM`}
                    trend={`Error Rate: ${data.keystroke_summary.avg_error_rate.toFixed(1)}%`}
                    icon="Type"
                />
                <MetricCard
                    title="Context Switches"
                    value={data.window_summary.context_switches.toString()}
                    trend={`${data.window_summary.switch_rate_per_hour.toFixed(0)}/hr`}
                    icon="Repeat"
                />
            </div>

            {/* Mouse Activity Section */}
            <section className="bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-6 backdrop-blur-sm shadow-sm dark:shadow-none">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-slate-800 dark:text-slate-100">
                    <span className="w-8 h-8 rounded-lg bg-pink-100 dark:bg-pink-500/20 flex items-center justify-center text-pink-500 dark:text-pink-400">🖱️</span>
                    Mouse Activity
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div>
                        <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">Total Clicks</div>
                        <div className="text-2xl font-mono text-pink-500 dark:text-pink-300 font-bold">{data.mouse_summary.total_clicks}</div>
                    </div>
                    <div>
                        <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">Scroll Velocity</div>
                        <div className="text-2xl font-mono text-cyan-600 dark:text-cyan-300 font-bold">{data.mouse_summary.avg_velocity_px_s.toFixed(0)} px/s</div>
                    </div>
                    <div>
                        <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">Movement</div>
                        <div className="text-2xl font-mono text-emerald-600 dark:text-emerald-300 font-bold">{(data.mouse_summary.total_distance_px / 1000).toFixed(1)}k px</div>
                    </div>
                    <div>
                        <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">Idle Ratio</div>
                        <div className="text-2xl font-mono text-orange-500 dark:text-orange-300 font-bold">{data.mouse_summary.idle_ratio_percent.toFixed(1)}%</div>
                    </div>
                </div>
            </section>

            {/* Application Usage */}
            <section className="bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-6 backdrop-blur-sm shadow-sm dark:shadow-none">
                <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">Application Usage Breakdown</h3>
                <div className="space-y-3">
                    {Object.entries(data.window_summary.app_usage)
                        .sort(([, a], [, b]) => b - a)
                        .slice(0, 5)
                        .map(([app, time], idx) => (
                            <div key={app} className="flex items-center gap-4">
                                <div className="w-8 h-8 rounded bg-slate-100 dark:bg-slate-700 text-xs flex items-center justify-center text-slate-500 dark:text-slate-300">{idx + 1}</div>
                                <div className="flex-1">
                                    <div className="flex justify-between mb-1">
                                        <span className="font-medium text-slate-700 dark:text-slate-200">{app}</span>
                                        <span className="text-slate-500 dark:text-slate-400 text-sm">{time.toFixed(1)} min</span>
                                    </div>
                                    <div className="h-2 bg-slate-200 dark:bg-slate-700/50 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-indigo-500 rounded-full"
                                            style={{ width: `${(time / data.window_summary.total_time_minutes) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </section>
        </div>
    );
}
