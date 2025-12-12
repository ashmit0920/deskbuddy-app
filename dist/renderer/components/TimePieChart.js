"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TimePieChart;
const jsx_runtime_1 = require("react/jsx-runtime");
const recharts_1 = require("recharts");
const COLORS = ["#a855f7", "#3b82f6", "#f43f5e", "#facc15", "#4ade80", "#94a3b8"];
function TimePieChart({ data = [] }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: "h-60", children: (0, jsx_runtime_1.jsx)(recharts_1.ResponsiveContainer, { width: "100%", height: "100%", children: (0, jsx_runtime_1.jsxs)(recharts_1.PieChart, { children: [(0, jsx_runtime_1.jsx)(recharts_1.Pie, { data: data, dataKey: "value", nameKey: "name", cx: "50%", cy: "50%", outerRadius: 80, label: ({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`, children: data.map((_, idx) => ((0, jsx_runtime_1.jsx)(recharts_1.Cell, { fill: COLORS[idx % COLORS.length] }, `cell-${idx}`))) }), (0, jsx_runtime_1.jsx)(recharts_1.Tooltip, { contentStyle: { backgroundColor: '#1e293b', borderColor: '#334155' }, itemStyle: { color: '#e2e8f0' } }), (0, jsx_runtime_1.jsx)(recharts_1.Legend, { verticalAlign: "top", align: "center", height: 36 })] }) }) }));
}
