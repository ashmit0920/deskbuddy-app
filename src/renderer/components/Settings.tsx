import React, { useState } from "react";

interface SettingsProps {
    theme: "light" | "dark";
    setTheme: (t: "light" | "dark") => void;
}

export default function Settings({ theme, setTheme }: SettingsProps) {
    const [autoStart, setAutoStart] = useState(true);
    const [useCamera, setUseCamera] = useState(true);
    const [collectKeys, setCollectKeys] = useState(true);

    return (
        <div className="space-y-6 max-w-4xl animate-fade-in">
            <header className="mb-8">
                <h3 className={`text-2xl font-bold ${theme === 'light' ? 'text-slate-800' : 'text-slate-100'}`}>Settings</h3>
                <p className={theme === 'light' ? 'text-slate-500' : 'text-slate-400'}>
                    Control appearance, permissions, and app behavior
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Appearance Section */}
                <div className={`rounded-2xl p-6 border transition-colors ${theme === 'light'
                        ? 'bg-white border-slate-200 shadow-sm'
                        : 'bg-slate-800/60 border-slate-700/40'
                    }`}>
                    <h4 className={`font-semibold mb-4 flex items-center gap-2 ${theme === 'light' ? 'text-slate-800' : 'text-slate-200'}`}>
                        <span>Appearance</span>
                    </h4>

                    <div className={`p-4 rounded-xl border ${theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/50 border-slate-700/50'}`}>
                        <label className="flex items-center justify-between cursor-pointer">
                            <div>
                                <div className={`text-sm font-medium ${theme === 'light' ? 'text-slate-700' : 'text-slate-200'}`}>Theme Mode</div>
                                <div className="text-xs text-slate-500 mt-0.5">
                                    {theme === 'light' ? 'Light mode active' : 'Dark mode active'}
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-slate-200/20 p-1 rounded-lg border border-slate-200/10">
                                <button
                                    onClick={() => setTheme("light")}
                                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${theme === "light"
                                            ? "bg-white text-indigo-600 shadow-sm"
                                            : "text-slate-500 hover:text-slate-700"
                                        }`}
                                >
                                    Light
                                </button>
                                <button
                                    onClick={() => setTheme("dark")}
                                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${theme === "dark"
                                            ? "bg-slate-700 text-white shadow-sm"
                                            : "text-slate-400 hover:text-slate-600"
                                        }`}
                                >
                                    Dark
                                </button>
                            </div>
                        </label>
                    </div>
                </div>

                {/* General Section */}
                <div className={`rounded-2xl p-6 border transition-colors ${theme === 'light'
                        ? 'bg-white border-slate-200 shadow-sm'
                        : 'bg-slate-800/60 border-slate-700/40'
                    }`}>
                    <h4 className={`font-semibold mb-4 ${theme === 'light' ? 'text-slate-800' : 'text-slate-200'}`}>General</h4>
                    <div className="space-y-6">
                        <label className="flex items-center justify-between cursor-pointer group">
                            <div>
                                <div className={`text-sm font-medium mb-1 transition-colors ${theme === 'light' ? 'text-slate-700' : 'text-slate-200'}`}>Start on system boot</div>
                                <div className="text-xs text-slate-500">Launch automatically</div>
                            </div>
                            <div className="relative">
                                <input type="checkbox" className="sr-only peer" checked={autoStart} onChange={() => setAutoStart(!autoStart)} />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                            </div>
                        </label>

                        <label className="flex items-center justify-between cursor-pointer group">
                            <div>
                                <div className={`text-sm font-medium mb-1 transition-colors ${theme === 'light' ? 'text-slate-700' : 'text-slate-200'}`}>Use Webcam</div>
                                <div className="text-xs text-slate-500">For focus detection</div>
                            </div>
                            <div className="relative">
                                <input type="checkbox" className="sr-only peer" checked={useCamera} onChange={() => setUseCamera(!useCamera)} />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                            </div>
                        </label>
                    </div>
                </div>

                {/* Privacy Section */}
                <div className={`md:col-span-2 rounded-2xl p-6 border transition-colors ${theme === 'light'
                        ? 'bg-white border-slate-200 shadow-sm'
                        : 'bg-slate-800/60 border-slate-700/40'
                    }`}>
                    <h4 className={`font-semibold mb-2 ${theme === 'light' ? 'text-slate-800' : 'text-slate-200'}`}>Privacy Note</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">
                        DeskBuddy processes all video and keystroke data locally on your machine. No sensitive personal data is sent to the cloud.
                        You can revoke permissions at any time for specific sensors.
                    </p>
                </div>
            </div>
        </div>
    );
}
