import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

interface PieData {
    name: string;
    value: number;
}

interface Props {
    data?: PieData[];
}

const COLORS = ["#a855f7", "#3b82f6", "#f43f5e", "#facc15", "#4ade80", "#94a3b8"];

export default function TimePieChart({ data = [] }: Props) {
    return (
        <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                    >
                        {data.map((_, idx) => (
                            <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }}
                        itemStyle={{ color: '#e2e8f0' }}
                    />
                    <Legend verticalAlign="top" align="center" height={36} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
