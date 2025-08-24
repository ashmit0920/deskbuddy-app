"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TypingBarChart;
const jsx_runtime_1 = require("react/jsx-runtime");
const recharts_1 = require("recharts");
const sample = Array.from({ length: 12 }).map((_, i) => ({
    hour: `${i}
  `,
    keystrokes: Math.round(Math.max(0, Math.sin(i / 2) * 1200 + 200 + Math.random() * 400)),
}));
function TypingBarChart() {
    return ((0, jsx_runtime_1.jsx)("div", { className: "h-56", children: (0, jsx_runtime_1.jsx)(recharts_1.ResponsiveContainer, { width: "100%", height: "100%", children: (0, jsx_runtime_1.jsxs)(recharts_1.BarChart, { data: sample, margin: { top: 10, right: 6, left: -12, bottom: 0 }, children: [(0, jsx_runtime_1.jsx)(recharts_1.CartesianGrid, { strokeDasharray: "3 3", stroke: "#0f172a" }), (0, jsx_runtime_1.jsx)(recharts_1.XAxis, { dataKey: "hour", tick: { fill: "#94a3b8" } }), (0, jsx_runtime_1.jsx)(recharts_1.YAxis, { tick: { fill: "#94a3b8" } }), (0, jsx_runtime_1.jsx)(recharts_1.Tooltip, {}), (0, jsx_runtime_1.jsx)(recharts_1.Bar, { dataKey: "keystrokes", radius: [6, 6, 6, 6] })] }) }) }));
}
