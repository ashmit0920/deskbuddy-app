import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const pieData = [
    { name: "Other", value: 36.7 },
    { name: "Browser", value: 32.8 },
    { name: "Social", value: 24.7 },
    { name: "Education", value: 4.99 },
    { name: "Utility", value: 7.8 },
];
const COLORS = ["#a855f7", "#3b82f6", "#f43f5e", "#facc15", "#4ade80"];

export default function TimePieChart() {
    return (
        <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                        {pieData.map((_, idx) => (
                            <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                        ))}
                    </Pie>
                    <Legend verticalAlign="top" align="center" height={36} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
