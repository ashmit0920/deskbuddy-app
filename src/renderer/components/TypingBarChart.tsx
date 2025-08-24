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

const sample = Array.from({ length: 12 }).map((_, i) => ({
    hour: `${i}
  `,
    keystrokes: Math.round(Math.max(0, Math.sin(i / 2) * 1200 + 200 + Math.random() * 400)),
}));

export default function TypingBarChart() {
    return (
        <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sample} margin={{ top: 10, right: 6, left: -12, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#0f172a" />
                    <XAxis dataKey="hour" tick={{ fill: "#94a3b8" }} />
                    <YAxis tick={{ fill: "#94a3b8" }} />
                    <Tooltip />
                    <Bar dataKey="keystrokes" radius={[6, 6, 6, 6]} fill="#60a5fa" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
