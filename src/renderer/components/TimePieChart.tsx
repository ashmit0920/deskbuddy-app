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
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={0} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'var(--chart-tooltip-bg)',
                            borderColor: 'var(--chart-tooltip-border)',
                            borderRadius: '0.75rem',
                            color: 'var(--chart-tooltip-text)'
                        }}
                        itemStyle={{ color: 'var(--chart-tooltip-text)' }}
                        formatter={(value: number, name: string) => {
                            const total = data.reduce((acc, curr) => acc + curr.value, 0);
                            const percent = ((value / total) * 100).toFixed(1);
                            return [`${(value / 60).toFixed(0)}m (${percent}%)`, name];
                        }}
                    />
                    <Legend verticalAlign="top" align="center" height={36} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
