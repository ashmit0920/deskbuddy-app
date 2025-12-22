import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import AiRecommendations from "./components/AiRecommendations";
import Settings from "./components/Settings";
import AnalyticsDaily from "./components/AnalyticsDaily";
import AnalyticsWeekly from "./components/AnalyticsWeekly";
import WelcomeScreen from "./components/WelcomeScreen";
import LoginModal from "./components/LoginModal";

export type Tab = "dashboard" | "analytics_daily" | "analytics_weekly" | "ai" | "settings";

export default function App() {
    const [activeTab, setActiveTab] = useState<Tab>("dashboard");
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [view, setView] = useState<"welcome" | "login" | "app">("welcome");

    // Persist login state for demo ease (optional, but good for refresh)
    useEffect(() => {
        // Add theme class to html/body
        document.documentElement.className = theme;
        // Also handle the dark blue requirement for sidebar vs light main
    }, [theme]);

    const handleLogin = () => {
        setIsLoggedIn(true);
        setView("app");
    };

    if (view === "welcome") {
        return <WelcomeScreen onGetStarted={() => setView("login")} />;
    }

    if (view === "login") {
        return (
            <>
                <WelcomeScreen onGetStarted={() => { }} />
                <LoginModal onLogin={handleLogin} onBack={() => setView("welcome")} />
            </>
        );
    }

    return (
        <div className={`min-h-screen flex transition-colors duration-300 ${theme === 'light' ? 'bg-slate-50 text-slate-800' : 'bg-slate-900 text-slate-100'
            }`}>
            <Sidebar active={activeTab} setActive={setActiveTab} />

            <main className="flex-1 p-8 overflow-auto">
                <div className="max-w-7xl mx-auto">
                    {activeTab === "dashboard" && <Dashboard />}
                    {activeTab === "analytics_daily" && <AnalyticsDaily />}
                    {activeTab === "analytics_weekly" && <AnalyticsWeekly />}
                    {activeTab === "ai" && <AiRecommendations />}
                    {activeTab === "settings" && <Settings theme={theme} setTheme={setTheme} />}
                </div>
            </main>
        </div>
    );
}
