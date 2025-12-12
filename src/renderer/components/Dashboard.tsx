import React, { useEffect, useState } from "react";
import MetricCard from "./MetricCard";
import TypingBarChart from "./TypingBarChart";
import TimePieChart from "./TimePieChart";
import { motion } from "framer-motion";
import { api } from "../services/api";
import { AppUsageStats, KeystrokeLog, ProductivityStats } from "../types";

export default function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [productivity, setProductivity] = useState<ProductivityStats | null>(null);
    const [keystrokes, setKeystrokes] = useState<KeystrokeLog[]>([]);
    const [appUsage, setAppUsage] = useState<AppUsageStats[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [prodData, keyData, appData] = await Promise.all([
                    api.analytics.getProductivityStats(),
                    api.activity.getKeystrokes(),
                    api.activity.getAppUsage()
                ]);

                setProductivity(prodData);
                setKeystrokes(keyData);
                setAppUsage(appData);
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        // Refresh every minute
        const interval = setInterval(fetchData, 60000);
        return () => clearInterval(interval);
    }, []);

    // Process keystroke data for chart
    const typingChartData = React.useMemo(() => {
        const hourlyData = new Map<string, number>();
        // Initialize 24 hours
        for (let i = 0; i < 24; i++) {
            hourlyData.set(i.toString(), 0);
        }

        keystrokes.forEach(log => {
            const date = new Date(log.timestamp);
            const hour = date.getHours().toString();
            hourlyData.set(hour, (hourlyData.get(hour) || 0) + log.key_count);
        });

        return Array.from(hourlyData.entries()).map(([hour, count]) => ({
            hour,
            keystrokes: count
        }));
    }, [keystrokes]);

    // Process app usage for chart
    const appChartData = React.useMemo(() => {
        return appUsage.map(app => ({
            name: app.application_name,
            value: app.total_duration
        })).sort((a, b) => b.value - a.value).slice(0, 5); // Top 5 apps
    }, [appUsage]);

    if (loading) {
        return <div className="p-8 text-center text-slate-400">Loading dashboard data...</div>;
    }

    return (
        <div className="space-y-6">
            <header className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold">Dashboard</h2>
                    <p className="text-slate-400">Overview of your focus and activity</p>
                </div>
                <div className="text-sm text-slate-400">
                    Last synced: {new Date().toLocaleTimeString()}
                </div>
            </header>

            <motion.section
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 md:grid-cols-4 gap-4"
            >
                <MetricCard
                    title="Active Periods"
                    value={<span className="text-indigo-300">{productivity?.active_periods || 0}</span>}
                    note="Sessions"
                />
                <MetricCard
                    title="Avg Attention"
                    value={<span>{(productivity?.avg_attention || 0).toFixed(2)}</span>}
                    note="Score (0-1)"
                />
                <MetricCard
                    title="Blink Rate"
                    value={<span>{(productivity?.avg_blink_rate || 0).toFixed(1)}</span>}
                    note="Per minute"
                />
                <MetricCard
                    title="Typing Speed"
                    value={<span>{(productivity?.avg_typing_speed || 0).toFixed(1)}</span>}
                    note="WPM"
                />
            </motion.section>

            <motion.section
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
                <div className="lg:col-span-2 space-y-4">
                    <MetricCard
                        title="Typing Analysis"
                        value={<span className="text-3xl">{productivity?.total_keystrokes.toLocaleString() || 0}</span>}
                        note="Total Keystrokes"
                    >
                        <div className="mt-4">
                            <TypingBarChart data={typingChartData} />
                        </div>
                    </MetricCard>

                    <div className="grid grid-cols-2 gap-4">
                        <MetricCard
                            title="Face Detection"
                            value={<span>{((productivity?.face_detection_rate || 0) * 100).toFixed(1)}%</span>}
                        />
                        <MetricCard
                            title="Active Time"
                            value={<span>{((productivity?.active_periods || 0) * 5 / 60).toFixed(1)} hrs</span>}
                            note="Est. based on sessions"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <MetricCard
                        title="Application Usage"
                        value={<span className="text-3xl">{appUsage.length}</span>}
                        note="Total Apps"
                    >
                        <div className="mt-4">
                            <TimePieChart data={appChartData} />
                        </div>
                    </MetricCard>

                    <div className="bg-slate-800/60 border border-slate-700/40 rounded-2xl p-5 shadow-md">
                        <h3 className="text-slate-300 text-sm mb-3">Top Applications</h3>
                        <div className="space-y-2">
                            {appChartData.map((app, idx) => (
                                <div key={idx} className="flex justify-between text-sm">
                                    <span className="text-slate-400">{app.name}</span>
                                    <span className="text-slate-200">{(app.value / 60).toFixed(0)} min</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.section>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                <div className="text-slate-400 text-sm">
                    Data fetched from local DeskBuddy backend.
                </div>
            </motion.div>
        </div>
    );
}
