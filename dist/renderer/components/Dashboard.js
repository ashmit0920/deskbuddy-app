import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useState } from "react";
import MetricCard from "./MetricCard";
import TypingBarChart from "./TypingBarChart";
import TimePieChart from "./TimePieChart";
import { motion } from "framer-motion";
import { api } from "../services/api";
export default function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [productivity, setProductivity] = useState(null);
    const [keystrokes, setKeystrokes] = useState([]);
    const [appUsage, setAppUsage] = useState([]);
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
            }
            catch (error) {
                console.error("Failed to fetch dashboard data:", error);
            }
            finally {
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
        const hourlyData = new Map();
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
        return _jsx("div", { className: "p-8 text-center text-slate-400", children: "Loading dashboard data..." });
    }
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("header", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-3xl font-bold", children: "Dashboard" }), _jsx("p", { className: "text-slate-400", children: "Overview of your focus and activity" })] }), _jsxs("div", { className: "text-sm text-slate-400", children: ["Last synced: ", new Date().toLocaleTimeString()] })] }), _jsxs(motion.section, { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.35 }, className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [_jsx(MetricCard, { title: "Active Periods", value: _jsx("span", { className: "text-indigo-300", children: productivity?.active_periods || 0 }), note: "Sessions" }), _jsx(MetricCard, { title: "Avg Attention", value: _jsx("span", { children: (productivity?.avg_attention || 0).toFixed(2) }), note: "Score (0-1)" }), _jsx(MetricCard, { title: "Blink Rate", value: _jsx("span", { children: (productivity?.avg_blink_rate || 0).toFixed(1) }), note: "Per minute" }), _jsx(MetricCard, { title: "Typing Speed", value: _jsx("span", { children: (productivity?.avg_typing_speed || 0).toFixed(1) }), note: "WPM" })] }), _jsxs(motion.section, { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.45 }, className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsxs("div", { className: "lg:col-span-2 space-y-4", children: [_jsx(MetricCard, { title: "Typing Analysis", value: _jsx("span", { className: "text-3xl", children: productivity?.total_keystrokes.toLocaleString() || 0 }), note: "Total Keystrokes", children: _jsx("div", { className: "mt-4", children: _jsx(TypingBarChart, { data: typingChartData }) }) }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsx(MetricCard, { title: "Face Detection", value: _jsxs("span", { children: [((productivity?.face_detection_rate || 0) * 100).toFixed(1), "%"] }) }), _jsx(MetricCard, { title: "Active Time", value: _jsxs("span", { children: [((productivity?.active_periods || 0) * 5 / 60).toFixed(1), " hrs"] }), note: "Est. based on sessions" })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx(MetricCard, { title: "Application Usage", value: _jsx("span", { className: "text-3xl", children: appUsage.length }), note: "Total Apps", children: _jsx("div", { className: "mt-4", children: _jsx(TimePieChart, { data: appChartData }) }) }), _jsxs("div", { className: "bg-slate-800/60 border border-slate-700/40 rounded-2xl p-5 shadow-md", children: [_jsx("h3", { className: "text-slate-300 text-sm mb-3", children: "Top Applications" }), _jsx("div", { className: "space-y-2", children: appChartData.map((app, idx) => (_jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { className: "text-slate-400", children: app.name }), _jsxs("span", { className: "text-slate-200", children: [(app.value / 60).toFixed(0), " min"] })] }, idx))) })] })] })] }), _jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.2 }, children: _jsx("div", { className: "text-slate-400 text-sm", children: "Data fetched from local DeskBuddy backend." }) })] }));
}
