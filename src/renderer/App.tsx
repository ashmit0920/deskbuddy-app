import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import AiRecommendations from "./components/AiRecommendations";
import Settings from "./components/Settings";
import AnalyticsDaily from "./components/AnalyticsDaily";
import AnalyticsWeekly from "./components/AnalyticsWeekly";

export type Tab = "dashboard" | "analytics_daily" | "analytics_weekly" | "ai" | "settings";

export default function App() {
    const [activeTab, setActiveTab] = useState<Tab>("dashboard");

    return (
        <div className="min-h-screen flex bg-slate-900 text-slate-100">
            <Sidebar active={activeTab} setActive={setActiveTab} />

            <main className="flex-1 p-8 overflow-auto">
                <div className="max-w-7xl mx-auto">
                    {activeTab === "dashboard" && <Dashboard />}
                    {activeTab === "analytics_daily" && <AnalyticsDaily />}
                    {activeTab === "analytics_weekly" && <AnalyticsWeekly />}
                    {activeTab === "ai" && <AiRecommendations />}
                    {activeTab === "settings" && <Settings />}
                </div>
            </main>
        </div>
    );
}
