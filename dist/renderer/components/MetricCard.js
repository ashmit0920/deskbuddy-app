import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function MetricCard({ title, value, note, children, }) {
    return (_jsxs("div", { className: "bg-slate-800/60 border border-slate-700/40 rounded-2xl p-5 shadow-md", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("div", { className: "text-slate-300 text-sm", children: title }), _jsx("div", { className: "text-2xl font-semibold mt-1", children: value })] }), _jsx("div", { className: "text-slate-400 text-sm", children: note })] }), children] }));
}
