import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MessageSquare, Grid, Settings as Cog } from "lucide-react";
import { motion } from "framer-motion";
export default function Sidebar({ active, setActive, }) {
    const items = [
        { id: "dashboard", label: "Dashboard", icon: Grid },
        { id: "ai", label: "AI Recommendations", icon: MessageSquare },
        { id: "settings", label: "Settings", icon: Cog },
    ];
    return (_jsxs("aside", { className: "w-72 bg-gradient-to-b from-slate-800/60 via-slate-900 to-slate-900/80 border-r border-slate-700/40 p-6 flex flex-col gap-6", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-xl flex items-center justify-center text-lg font-bold", children: "DB" }), _jsxs("div", { children: [_jsx("h1", { className: "text-xl font-semibold", children: "DeskBuddy" }), _jsx("p", { className: "text-slate-400 text-sm", children: "Your productivity companion" })] })] }), _jsx("nav", { className: "flex-1", children: _jsx("ul", { className: "flex flex-col gap-2", children: items.map((it) => {
                        const Icon = it.icon;
                        const isActive = active === it.id;
                        return (_jsx("li", { children: _jsxs("button", { onClick: () => setActive(it.id), className: `w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive
                                    ? "bg-slate-700/60 text-white shadow-inner"
                                    : "text-slate-300 hover:bg-slate-700/20"}`, children: [_jsx(Icon, { className: `w-5 h-5 ${isActive ? "text-indigo-300" : "text-slate-400"}` }), _jsx("span", { className: "font-medium", children: it.label }), isActive && (_jsx(motion.span, { layoutId: "active-dot", className: "ml-auto w-2 h-2 bg-indigo-400 rounded-full" }))] }) }, it.id));
                    }) }) }), _jsxs("footer", { className: "text-slate-400 text-xs", children: [_jsx("div", { children: "Version 0.1 \u2022 local-only" }), _jsx("div", { className: "mt-2", children: "Made with \u2764\uFE0F by CPG-186" })] })] }));
}
