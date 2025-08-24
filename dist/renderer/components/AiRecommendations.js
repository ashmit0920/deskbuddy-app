"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AiRecommendations;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const lucide_react_1 = require("lucide-react");
const framer_motion_1 = require("framer-motion");
const DUMMY_RECS = [
    "Try the Pomodoro technique for 25/5 cycles.",
    "Disable social notifications during focus sessions.",
    "Short breathing exercises before deep work increases focus.",
];
function AiRecommendations() {
    const [messages, setMessages] = (0, react_1.useState)([
        { id: 1, from: "ai", text: "Hi! I'm DeskBuddy AI. Ask me about today's session or request tips." },
    ]);
    const [text, setText] = (0, react_1.useState)("");
    function send() {
        if (!text.trim())
            return;
        const userMsg = { id: Date.now(), from: "user", text: text.trim() };
        setMessages((s) => [...s, userMsg]);
        setText("");
        // dummy AI reply
        setTimeout(() => {
            setMessages((s) => [...s, { id: Date.now() + 1, from: "ai", text: DUMMY_RECS[Math.floor(Math.random() * DUMMY_RECS.length)] }]);
        }, 600 + Math.random() * 800);
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("header", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-2xl font-semibold", children: "AI Recommendations" }), (0, jsx_runtime_1.jsx)("div", { className: "text-slate-400", children: "Try asking: \"How can I focus better today?\"" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "lg:col-span-2 bg-slate-800/60 border border-slate-700/40 rounded-2xl p-4 flex flex-col h-96", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex-1 overflow-auto space-y-3 px-1 pb-2", children: messages.map((m) => ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 }, className: `flex ${m.from === "user" ? "justify-end" : "justify-start"}`, children: (0, jsx_runtime_1.jsx)("div", { className: `max-w-[70%] p-3 rounded-lg ${m.from === "user" ? "bg-indigo-500/80 text-white" : "bg-slate-700/60 text-slate-200"}`, children: m.text }) }, m.id))) }), (0, jsx_runtime_1.jsx)("div", { className: "mt-2 border-t border-slate-700/30 pt-3", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2", children: [(0, jsx_runtime_1.jsx)("input", { value: text, onChange: (e) => setText(e.target.value), onKeyDown: (e) => e.key === "Enter" && send(), placeholder: "Ask DeskBuddy...", className: "flex-1 rounded-lg bg-slate-800/50 border border-slate-700/40 px-4 py-2 focus:outline-none" }), (0, jsx_runtime_1.jsxs)("button", { onClick: send, className: "rounded-lg bg-indigo-500 px-4 py-2 flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Plane, { className: "w-4 h-4" }), " Send"] })] }) })] }), (0, jsx_runtime_1.jsxs)("aside", { className: "space-y-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "bg-slate-800/60 border border-slate-700/40 rounded-2xl p-4", children: [(0, jsx_runtime_1.jsx)("h4", { className: "font-medium", children: "Quick Tips" }), (0, jsx_runtime_1.jsxs)("ul", { className: "mt-2 text-sm text-slate-300 space-y-2", children: [(0, jsx_runtime_1.jsx)("li", { children: "\u2022 Block distracting sites for 45 mins" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Use noise-cancelling or ambient sound" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Short walks between sessions" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-slate-800/60 border border-slate-700/40 rounded-2xl p-4", children: [(0, jsx_runtime_1.jsx)("h4", { className: "font-medium", children: "Session Summary" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-slate-300 mt-2", children: "Typing: 7.5k keys \u2022 Active: 135m \u2022 Focus dips: 6" })] })] })] })] }));
}
