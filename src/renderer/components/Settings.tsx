import React, { useState } from "react";

export default function Settings() {
    const [autoStart, setAutoStart] = useState(true);
    const [useCamera, setUseCamera] = useState(true);
    const [collectKeys, setCollectKeys] = useState(true);

    return (
        <div className="space-y-6">
            <header>
                <h3 className="text-2xl font-semibold">Settings</h3>
                <p className="text-slate-400">Control what DeskBuddy can access and how it behaves</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-800/60 border border-slate-700/40 rounded-2xl p-4">
                    <h4 className="font-medium">General</h4>
                    <div className="mt-3 space-y-5">
                        <label className="flex items-center justify-between">
                            <div>
                                <div className="text-sm mb-1">Start on system boot</div>
                                <div className="text-xs text-slate-400">DeskBuddy will launch automatically</div>
                            </div>
                            <input type="checkbox" checked={autoStart} onChange={() => setAutoStart(!autoStart)} />
                        </label>

                        <label className="flex items-center justify-between">
                            <div>
                                <div className="text-sm mb-1">Use Webcam for focus detection</div>
                                <div className="text-xs text-slate-400">Facial processing stays local</div>
                            </div>
                            <input type="checkbox" checked={useCamera} onChange={() => setUseCamera(!useCamera)} />
                        </label>

                        <label className="flex items-center justify-between">
                            <div>
                                <div className="text-sm mb-1">Collect Keystrokes</div>
                                <div className="text-xs text-slate-400">Used only for activity metrics</div>
                            </div>
                            <input type="checkbox" checked={collectKeys} onChange={() => setCollectKeys(!collectKeys)} />
                        </label>
                    </div>
                </div>

                <div className="bg-slate-800/60 border border-slate-700/40 rounded-2xl p-4">
                    <h4 className="font-medium">Privacy</h4>
                    <div className="mt-3 text-sm text-slate-300">
                        All processing is local. You can disable cameras or keystroke collection anytime. Data is stored locally unless you enable cloud sync.
                    </div>
                </div>
            </div>
        </div>
    );
}
