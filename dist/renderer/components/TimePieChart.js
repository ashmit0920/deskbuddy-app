"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TimePieChart;
const jsx_runtime_1 = require("react/jsx-runtime");
const recharts_1 = require("recharts");
const pieData = [
    { name: "Other", value: 36.7 },
    { name: "Browser", value: 32.8 },
    { name: "Social", value: 24.7 },
    { name: "Education", value: 4.99 },
    { name: "Utility", value: 0.76 },
];
const COLORS = ["#075985", "#1E3A8A", "#DC2626", "#FB923C", "#10B981"];
function TimePieChart() {
    return ((0, jsx_runtime_1.jsx)("div", { className: "h-56", children: (0, jsx_runtime_1.jsx)(recharts_1.ResponsiveContainer, { width: "100%", height: "100%", children: (0, jsx_runtime_1.jsxs)(recharts_1.PieChart, { children: [(0, jsx_runtime_1.jsx)(recharts_1.Pie, { data: pieData, dataKey: "value", nameKey: "name", cx: "50%", cy: "50%", outerRadius: 80, label: true, children: pieData.map((_, idx) => ((0, jsx_runtime_1.jsx)(recharts_1.Cell, { fill: COLORS[idx % COLORS.length] }, `cell-${idx}`))) }), (0, jsx_runtime_1.jsx)(recharts_1.Legend, { verticalAlign: "bottom", align: "center" })] }) }) }));
}
