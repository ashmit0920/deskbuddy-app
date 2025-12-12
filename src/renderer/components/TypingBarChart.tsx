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
                    <CartesianGrid strokeDasharray="3 3" stroke="#0f172a" />
                    <XAxis dataKey="hour" tick={{ fill: "#94a3b8" }} />
                    <YAxis tick={{ fill: "#94a3b8" }} />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }}
                        itemStyle={{ color: '#e2e8f0' }}
                    />
                    <Bar dataKey="keystrokes" radius={[6, 6, 6, 6]} fill="#60a5fa" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
