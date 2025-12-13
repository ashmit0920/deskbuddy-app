import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
const COLORS = ["#a855f7", "#3b82f6", "#f43f5e", "#facc15", "#4ade80", "#94a3b8"];
export default function TimePieChart({ data = [] }) {
    return (_jsx("div", { className: "h-60", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(PieChart, { children: [_jsx(Pie, { data: data, dataKey: "value", nameKey: "name", cx: "50%", cy: "50%", outerRadius: 80, label: ({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`, children: data.map((_, idx) => (_jsx(Cell, { fill: COLORS[idx % COLORS.length] }, `cell-${idx}`))) }), _jsx(Tooltip, { contentStyle: { backgroundColor: '#1e293b', borderColor: '#334155' }, itemStyle: { color: '#e2e8f0' } }), _jsx(Legend, { verticalAlign: "top", align: "center", height: 36 })] }) }) }));
}
