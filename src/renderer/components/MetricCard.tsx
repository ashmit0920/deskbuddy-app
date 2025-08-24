import React from "react";

export default function MetricCard({
    title,
    value,
    note,
    children,
}: {
    title: string;
    value: React.ReactNode;
    note?: string;
    children?: React.ReactNode;
}) {
    return (
        <div className="bg-slate-800/60 border border-slate-700/40 rounded-2xl p-5 shadow-md">
            <div className="flex items-center justify-between">
                <div>
                    <div className="text-slate-300 text-sm">{title}</div>
                    <div className="text-2xl font-semibold mt-1">{value}</div>
                </div>
                <div className="text-slate-400 text-sm">{note}</div>
            </div>
            {children}
        </div>
    );
}