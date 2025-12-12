"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Dashboard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const MetricCard_1 = __importDefault(require("./MetricCard"));
const TypingBarChart_1 = __importDefault(require("./TypingBarChart"));
const TimePieChart_1 = __importDefault(require("./TimePieChart"));
const framer_motion_1 = require("framer-motion");
const api_1 = require("../services/api");
function Dashboard() {
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [productivity, setProductivity] = (0, react_1.useState)(null);
    const [keystrokes, setKeystrokes] = (0, react_1.useState)([]);
    const [appUsage, setAppUsage] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        const fetchData = async () => {
            try {
                const [prodData, keyData, appData] = await Promise.all([
                    api_1.api.analytics.getProductivityStats(),
                    api_1.api.activity.getKeystrokes(),
                    api_1.api.activity.getAppUsage()
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
    const typingChartData = react_1.default.useMemo(() => {
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
    const appChartData = react_1.default.useMemo(() => {
        return appUsage.map(app => ({
            name: app.application_name,
            value: app.total_duration
        })).sort((a, b) => b.value - a.value).slice(0, 5); // Top 5 apps
    }, [appUsage]);
    if (loading) {
        return (0, jsx_runtime_1.jsx)("div", { className: "p-8 text-center text-slate-400", children: "Loading dashboard data..." });
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-6", children: [(0, jsx_runtime_1.jsxs)("header", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-3xl font-bold", children: "Dashboard" }), (0, jsx_runtime_1.jsx)("p", { className: "text-slate-400", children: "Overview of your focus and activity" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-sm text-slate-400", children: ["Last synced: ", new Date().toLocaleTimeString()] })] }), (0, jsx_runtime_1.jsxs)(framer_motion_1.motion.section, { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.35 }, className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [(0, jsx_runtime_1.jsx)(MetricCard_1.default, { title: "Active Periods", value: (0, jsx_runtime_1.jsx)("span", { className: "text-indigo-300", children: productivity?.active_periods || 0 }), note: "Sessions" }), (0, jsx_runtime_1.jsx)(MetricCard_1.default, { title: "Avg Attention", value: (0, jsx_runtime_1.jsx)("span", { children: (productivity?.avg_attention || 0).toFixed(2) }), note: "Score (0-1)" }), (0, jsx_runtime_1.jsx)(MetricCard_1.default, { title: "Blink Rate", value: (0, jsx_runtime_1.jsx)("span", { children: (productivity?.avg_blink_rate || 0).toFixed(1) }), note: "Per minute" }), (0, jsx_runtime_1.jsx)(MetricCard_1.default, { title: "Typing Speed", value: (0, jsx_runtime_1.jsx)("span", { children: (productivity?.avg_typing_speed || 0).toFixed(1) }), note: "WPM" })] }), (0, jsx_runtime_1.jsxs)(framer_motion_1.motion.section, { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.45 }, className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "lg:col-span-2 space-y-4", children: [(0, jsx_runtime_1.jsx)(MetricCard_1.default, { title: "Typing Analysis", value: (0, jsx_runtime_1.jsx)("span", { className: "text-3xl", children: productivity?.total_keystrokes.toLocaleString() || 0 }), note: "Total Keystrokes", children: (0, jsx_runtime_1.jsx)("div", { className: "mt-4", children: (0, jsx_runtime_1.jsx)(TypingBarChart_1.default, { data: typingChartData }) }) }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [(0, jsx_runtime_1.jsx)(MetricCard_1.default, { title: "Face Detection", value: (0, jsx_runtime_1.jsxs)("span", { children: [((productivity?.face_detection_rate || 0) * 100).toFixed(1), "%"] }) }), (0, jsx_runtime_1.jsx)(MetricCard_1.default, { title: "Active Time", value: (0, jsx_runtime_1.jsxs)("span", { children: [((productivity?.active_periods || 0) * 5 / 60).toFixed(1), " hrs"] }), note: "Est. based on sessions" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [(0, jsx_runtime_1.jsx)(MetricCard_1.default, { title: "Application Usage", value: (0, jsx_runtime_1.jsx)("span", { className: "text-3xl", children: appUsage.length }), note: "Total Apps", children: (0, jsx_runtime_1.jsx)("div", { className: "mt-4", children: (0, jsx_runtime_1.jsx)(TimePieChart_1.default, { data: appChartData }) }) }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-slate-800/60 border border-slate-700/40 rounded-2xl p-5 shadow-md", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-slate-300 text-sm mb-3", children: "Top Applications" }), (0, jsx_runtime_1.jsx)("div", { className: "space-y-2", children: appChartData.map((app, idx) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between text-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-slate-400", children: app.name }), (0, jsx_runtime_1.jsxs)("span", { className: "text-slate-200", children: [(app.value / 60).toFixed(0), " min"] })] }, idx))) })] })] })] }), (0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.2 }, children: (0, jsx_runtime_1.jsx)("div", { className: "text-slate-400 text-sm", children: "Data fetched from local DeskBuddy backend." }) })] }));
}
