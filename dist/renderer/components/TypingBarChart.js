"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TypingBarChart;
const jsx_runtime_1 = require("react/jsx-runtime");
const recharts_1 = require("recharts");
function TypingBarChart({ data = [] }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: "h-60", children: (0, jsx_runtime_1.jsx)(recharts_1.ResponsiveContainer, { width: "100%", height: "100%", children: (0, jsx_runtime_1.jsxs)(recharts_1.BarChart, { data: data, margin: { top: 10, right: 6, left: -12, bottom: 0 }, children: [(0, jsx_runtime_1.jsx)(recharts_1.CartesianGrid, { strokeDasharray: "3 3", stroke: "#0f172a" }), (0, jsx_runtime_1.jsx)(recharts_1.XAxis, { dataKey: "hour", tick: { fill: "#94a3b8" } }), (0, jsx_runtime_1.jsx)(recharts_1.YAxis, { tick: { fill: "#94a3b8" } }), (0, jsx_runtime_1.jsx)(recharts_1.Tooltip, { contentStyle: { backgroundColor: '#1e293b', borderColor: '#334155' }, itemStyle: { color: '#e2e8f0' } }), (0, jsx_runtime_1.jsx)(recharts_1.Bar, { dataKey: "keystrokes", radius: [6, 6, 6, 6], fill: "#60a5fa" })] }) }) }));
}
