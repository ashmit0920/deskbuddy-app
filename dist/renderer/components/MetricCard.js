"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MetricCard;
const jsx_runtime_1 = require("react/jsx-runtime");
function MetricCard({ title, value, note, children, }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "bg-slate-800/60 border border-slate-700/40 rounded-2xl p-5 shadow-md", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { className: "text-slate-300 text-sm", children: title }), (0, jsx_runtime_1.jsx)("div", { className: "text-2xl font-semibold mt-1", children: value })] }), (0, jsx_runtime_1.jsx)("div", { className: "text-slate-400 text-sm", children: note })] }), children] }));
}
