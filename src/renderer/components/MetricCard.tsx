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
    note,
    icon,
    children,
}: {
    title: string;
    value: React.ReactNode;
    trend?: string;
    note?: string;
    icon?: string;
    children?: React.ReactNode;
}) {
    const Icon = icon ? icons[icon] : null;

    return (
        <div className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/40 rounded-2xl p-5 shadow-sm dark:shadow-lg dark:backdrop-blur-sm hover:shadow-md dark:hover:bg-slate-800/80 transition-all group">
            <div className="flex items-start justify-between mb-4">
                <div className="p-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-lg group-hover:bg-indigo-100 dark:group-hover:bg-indigo-500/20 transition-colors">
                    {Icon && <Icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
                </div>
                {trend && (
                    <div className="flex items-center gap-1 text-xs font-medium bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-1 rounded-full">
                        <ArrowUpRight className="w-3 h-3" />
                        {trend}
                    </div>
                )}
            </div>

            <div>
                <div className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">{title}</div>
                <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">{value}</div>
                {note && <div className="text-xs text-slate-400 dark:text-slate-500 mt-1 font-medium">{note}</div>}
            </div>
            {children}
        </div>
    );
}