import React, { useEffect, useState } from "react";
import MetricCard from "./MetricCard";
import TypingBarChart from "./TypingBarChart";
import TimePieChart from "./TimePieChart";
import { motion } from "framer-motion";
import { api } from "../services/api";
import { AppUsageStats, KeystrokeLog, ProductivityStats } from "../types";
import { Activity, Play } from "lucide-react";

export default function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [productivity, setProductivity] = useState<ProductivityStats | null>(null);
    const [keystrokes, setKeystrokes] = useState<KeystrokeLog[]>([]);
    const [appUsage, setAppUsage] = useState<AppUsageStats[]>([]);
    const [isMonitoring, setIsMonitoring] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const handleStartMonitoring = () => {
        setIsMonitoring(true);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

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
        <div className="space-y-8 relative">
            {/* Toast Notification */}
            {showToast && (
                <div className="absolute top-8 right-1/3 transform -translate-y-full animate-slide-in bg-emerald-500/90 backdrop-blur text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 z-50">
                    <div className="p-1 bg-white/20 rounded-full">
                        <Activity className="w-4 h-4" />
                    </div>
                    <div>
                        <div className="font-semibold text-sm">Monitoring Started</div>
                        <div className="text-xs opacity-90">DeskBuddy is now tracking your activity</div>
                    </div>
                </div>
            )}

            <header className="flex items-end justify-between border-b border-slate-300 pb-6">
                <div>
                    <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-slate-800 dark:bg-gradient-to-r dark:from-indigo-400 dark:to-cyan-400">Dashboard</h2>
                    <p className="text-slate-400 mt-2">Overview of your focus and activity</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="text-sm text-slate-500 dark:text-slate-500 bg-slate-100 dark:bg-slate-800/50 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
                        Synced: {new Date().toLocaleTimeString()}
                    </div>

                    {!isMonitoring ? (
                        <button
                            onClick={handleStartMonitoring}
                            className="group flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
                        >
                            <Play className="w-4 h-4 fill-current" />
                            Start Monitoring
                        </button>
                    ) : (
                        <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 px-4 py-2 rounded-xl border border-emerald-500/20">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                            </span>
                            <span className="text-sm font-medium">Monitoring Active</span>
                        </div>
                    )}
                </div>
            </header>

            <motion.section
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-4 gap-6"
            >
                <MetricCard
                    title="Active Periods"
                    value={productivity?.active_periods || 0}
                    note="Sessions"
                    icon="Activity"
                />
                <MetricCard
                    title="Avg Attention"
                    value={(productivity?.avg_attention || 0).toFixed(2)}
                    note="Score"
                    icon="Repeat" // Using Repeat as a placeholder for Attention
                />
                <MetricCard
                    title="Blink Rate"
                    value={(productivity?.avg_blink_rate || 0).toFixed(1)}
                    note="/ min"
                    icon="Clock" // Eye icon would be better
                />
                <MetricCard
                    title="Typing Speed"
                    value={(productivity?.avg_typing_speed || 0).toFixed(1)}
                    note="WPM"
                    icon="Type"
                    trend={productivity && productivity.avg_typing_speed > 40 ? "Good" : undefined}
                />
            </motion.section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-2 space-y-6"
                >
                    <MetricCard
                        title="Typing Analysis"
                        value={productivity?.total_keystrokes.toLocaleString() || 0}
                        note="Total Keystrokes"
                        icon="Type"
                    >
                        <div className="mt-6 h-64">
                            <TypingBarChart data={typingChartData} />
                        </div>
                    </MetricCard>

                    <div className="grid grid-cols-2 gap-6">
                        <MetricCard
                            title="Face Detection"
                            value={`${((productivity?.face_detection_rate || 0) * 100).toFixed(0)}%`}
                            icon="Activity"
                            trend="Reliability"
                        />
                        <MetricCard
                            title="Active Time"
                            value={`${((productivity?.active_periods || 0) * 5 / 60).toFixed(1)}h`}
                            note="Estimated"
                            icon="Clock"
                        />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-6"
                >
                    <MetricCard
                        title="Application Usage"
                        value={appUsage.length}
                        note="Active Apps"
                        icon="Activity"
                    >
                        <div className="mt-6 h-64">
                            <TimePieChart data={appChartData} />
                        </div>
                    </MetricCard>

                    <div className="bg-white dark:bg-slate-800/40 backdrop-blur-md border border-slate-200 dark:border-slate-700/50 rounded-2xl p-6 shadow-sm dark:shadow-none">
                        <h3 className="text-slate-700 dark:text-slate-200 font-semibold mb-4 text-sm uppercase tracking-wider">Top Applications</h3>
                        <div className="space-y-3">
                            {appChartData.map((app, idx) => (
                                <div key={idx} className="flex items-center justify-between group">
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded bg-slate-100 dark:bg-slate-700/50 text-xs flex items-center justify-center text-slate-500 dark:text-slate-400 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-500/20 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                            {idx + 1}
                                        </div>
                                        <span className="text-slate-700 dark:text-slate-300 font-medium text-sm">{app.name}</span>
                                    </div>
                                    <span className="text-slate-500 dark:text-slate-400 text-sm font-mono bg-slate-50 dark:bg-slate-900/40 px-2 py-0.5 rounded">
                                        {(app.value / 60).toFixed(0)}m
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>

            <div className="text-center text-slate-600 text-xs pt-8">
                DeskBuddy Analytics System • v1.0
            </div>
        </div>
    );
}
