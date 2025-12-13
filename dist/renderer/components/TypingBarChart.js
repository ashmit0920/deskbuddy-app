import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, } from "recharts";
export default function TypingBarChart({ data = [] }) {
    return (_jsx("div", { className: "h-60", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(BarChart, { data: data, margin: { top: 10, right: 6, left: -12, bottom: 0 }, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#0f172a" }), _jsx(XAxis, { dataKey: "hour", tick: { fill: "#94a3b8" } }), _jsx(YAxis, { tick: { fill: "#94a3b8" } }), _jsx(Tooltip, { contentStyle: { backgroundColor: '#1e293b', borderColor: '#334155' }, itemStyle: { color: '#e2e8f0' } }), _jsx(Bar, { dataKey: "keystrokes", radius: [6, 6, 6, 6], fill: "#60a5fa" })] }) }) }));
}
