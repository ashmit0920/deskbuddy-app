import React from "react";
import { Activity, Clock, Type, Repeat, ArrowUpRight } from "lucide-react";

const icons: Record<string, any> = {
    Activity,
    Clock,
    Type,
    Repeat
};

export default function MetricCard({
    title,
    value,
    trend,
    icon,
    children,
}: {
    title: string;
    value: React.ReactNode;
    trend?: string;
    icon?: string;
    children?: React.ReactNode;
}) {
    const Icon = icon ? icons[icon] : null;

    return (
        <div className="bg-slate-800/60 border border-slate-700/40 rounded-2xl p-5 shadow-lg backdrop-blur-sm hover:bg-slate-800/80 transition-all group">
            <div className="flex items-start justify-between mb-4">
                <div className="p-2 bg-indigo-500/10 rounded-lg group-hover:bg-indigo-500/20 transition-colors">
                    {Icon && <Icon className="w-5 h-5 text-indigo-400" />}
                </div>
                {trend && (
                    <div className="flex items-center gap-1 text-xs font-medium bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full">
                        <ArrowUpRight className="w-3 h-3" />
                        {trend}
                    </div>
                )}
            </div>

            <div>
                <div className="text-slate-400 text-sm font-medium mb-1">{title}</div>
                <div className="text-2xl font-bold text-slate-100">{value}</div>
            </div>
            {children}
        </div>
    );
}