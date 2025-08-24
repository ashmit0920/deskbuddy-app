"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Sidebar;
const jsx_runtime_1 = require("react/jsx-runtime");
const lucide_react_1 = require("lucide-react");
const framer_motion_1 = require("framer-motion");
function Sidebar({ active, setActive, }) {
    const items = [
        { id: "dashboard", label: "Dashboard", icon: lucide_react_1.Grid },
        { id: "ai", label: "AI Recommendations", icon: lucide_react_1.MessageSquare },
        { id: "settings", label: "Settings", icon: lucide_react_1.Settings },
    ];
    return ((0, jsx_runtime_1.jsxs)("aside", { className: "w-72 bg-gradient-to-b from-slate-800/60 via-slate-900 to-slate-900/80 border-r border-slate-700/40 p-6 flex flex-col gap-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-10 h-10 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-xl flex items-center justify-center text-lg font-bold", children: "DB" }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-xl font-semibold", children: "DeskBuddy" }), (0, jsx_runtime_1.jsx)("p", { className: "text-slate-400 text-sm", children: "Your productivity companion" })] })] }), (0, jsx_runtime_1.jsx)("nav", { className: "flex-1", children: (0, jsx_runtime_1.jsx)("ul", { className: "flex flex-col gap-2", children: items.map((it) => {
                        const Icon = it.icon;
                        const isActive = active === it.id;
                        return ((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsxs)("button", { onClick: () => setActive(it.id), className: `w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive
                                    ? "bg-slate-700/60 text-white shadow-inner"
                                    : "text-slate-300 hover:bg-slate-700/20"}`, children: [(0, jsx_runtime_1.jsx)(Icon, { className: `w-5 h-5 ${isActive ? "text-indigo-300" : "text-slate-400"}` }), (0, jsx_runtime_1.jsx)("span", { className: "font-medium", children: it.label }), isActive && ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.span, { layoutId: "active-dot", className: "ml-auto w-2 h-2 bg-indigo-400 rounded-full" }))] }) }, it.id));
                    }) }) }), (0, jsx_runtime_1.jsxs)("footer", { className: "text-slate-400 text-xs", children: [(0, jsx_runtime_1.jsx)("div", { children: "v0.1 \u2022 local-only" }), (0, jsx_runtime_1.jsx)("div", { className: "mt-2", children: "Made with \u2764\uFE0F \u2014 lightweight & private" })] })] }));
}
