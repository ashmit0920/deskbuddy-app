import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import AiRecommendations from "./components/AiRecommendations";
import Settings from "./components/Settings";
export default function App() {
    const [activeTab, setActiveTab] = useState("dashboard");
    return (_jsxs("div", { className: "min-h-screen flex bg-slate-900 text-slate-100", children: [_jsx(Sidebar, { active: activeTab, setActive: setActiveTab }), _jsx("main", { className: "flex-1 p-8 overflow-auto", children: _jsxs("div", { className: "max-w-7xl mx-auto", children: [activeTab === "dashboard" && _jsx(Dashboard, {}), activeTab === "ai" && _jsx(AiRecommendations, {}), activeTab === "settings" && _jsx(Settings, {})] }) })] }));
}
