import React from "react";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

interface TypingData {
    hour: string;
    keystrokes: number;
}

interface Props {
    data?: TypingData[];
}

export default function TypingBarChart({ data = [] }: Props) {
    return (
        <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 10, right: 6, left: -12, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
                    <XAxis
                        dataKey="hour"
                        stroke="var(--chart-text)"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke="var(--chart-text)"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value}`}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'var(--chart-tooltip-bg)',
                            borderColor: 'var(--chart-tooltip-border)',
                            borderRadius: '0.75rem',
                            color: 'var(--chart-tooltip-text)'
                        }}
                        itemStyle={{ color: 'var(--chart-tooltip-text)' }}
                        cursor={{ fill: 'var(--chart-cursor)', opacity: 0.6 }}
                    /><Bar dataKey="keystrokes" radius={[6, 6, 6, 6]} fill="#60a5fa" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
