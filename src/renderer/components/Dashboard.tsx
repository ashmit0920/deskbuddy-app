import React from "react";
import MetricCard from "./MetricCard";
import TypingBarChart from "./TypingBarChart";
import TimePieChart from "./TimePieChart";
import { motion } from "framer-motion";

export default function Dashboard() {
    return (
        <div className="space-y-6">
            <header className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold">Dashboard</h2>
                    <p className="text-slate-400">Overview of your focus and activity</p>
                </div>
                <div className="text-sm text-slate-400">Last synced: 2 mins ago</div>
            </header>

            <motion.section
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 md:grid-cols-4 gap-4"
            >
                <MetricCard title="Overall Score" value={<span className="text-indigo-300">12.7%</span>} note="Focus + Productivity" />
                <MetricCard title="Focus Quality" value={<span>0.0%</span>} note="Attention" />
                <MetricCard title="Distraction Level" value={<span>50.0%</span>} note="Higher is worse" />
                <MetricCard title="Typing Efficiency" value={<span>0.7</span>} note="WPM-ish" />
            </motion.section>

            <motion.section
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
                <div className="lg:col-span-2 space-y-4">
                    <MetricCard title="Typing Analysis" value={<span className="text-3xl">7,520</span>} note="Total Keystrokes">
                        <div className="mt-4">
                            <TypingBarChart />
                        </div>
                    </MetricCard>

                    <div className="grid grid-cols-2 gap-4">
                        <MetricCard title="Average Speed" value={<span>2.2 WPM</span>} />
                        <MetricCard title="Active Time" value={<span>135 min</span>} note="Activity %: 33%" />
                    </div>
                </div>

                <div className="space-y-4">
                    <MetricCard title="Application Usage" value={<span className="text-3xl">9</span>} note="Total Apps">
                        <div className="mt-4">
                            <TimePieChart />
                        </div>
                    </MetricCard>

                    <MetricCard title="Productive Time" value={<span>0 min</span>} />
                </div>
            </motion.section>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                <div className="text-slate-400 text-sm">More insights & trend analysis coming soon — AI will help summarize sessions.</div>
            </motion.div>
        </div>
    );
}
