"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = App;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Sidebar_1 = __importDefault(require("./components/Sidebar"));
const Dashboard_1 = __importDefault(require("./components/Dashboard"));
const AiRecommendations_1 = __importDefault(require("./components/AiRecommendations"));
const Settings_1 = __importDefault(require("./components/Settings"));
function App() {
    const [activeTab, setActiveTab] = (0, react_1.useState)("dashboard");
    return ((0, jsx_runtime_1.jsxs)("div", { className: "min-h-screen flex bg-slate-900 text-slate-100", children: [(0, jsx_runtime_1.jsx)(Sidebar_1.default, { active: activeTab, setActive: setActiveTab }), (0, jsx_runtime_1.jsx)("main", { className: "flex-1 p-8 overflow-auto", children: (0, jsx_runtime_1.jsxs)("div", { className: "max-w-7xl mx-auto", children: [activeTab === "dashboard" && (0, jsx_runtime_1.jsx)(Dashboard_1.default, {}), activeTab === "ai" && (0, jsx_runtime_1.jsx)(AiRecommendations_1.default, {}), activeTab === "settings" && (0, jsx_runtime_1.jsx)(Settings_1.default, {})] }) })] }));
}
