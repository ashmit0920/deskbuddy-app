import React, { useState } from "react";
import { MessageCircle, Plane } from "lucide-react";
import { motion } from "framer-motion";

const DUMMY_RECS = [
    "Try the Pomodoro technique for 25/5 cycles.",
    "Disable social notifications during focus sessions.",
    "Short breathing exercises before deep work increases focus.",
];

export default function AiRecommendations() {
    const [messages, setMessages] = useState<{ id: number; from: "user" | "ai"; text: string }[]>([
        { id: 1, from: "ai", text: "Hi! I'm DeskBuddy AI. Ask me about today's session or request tips." },
    ]);
    const [text, setText] = useState("");

    function send() {
        if (!text.trim()) return;
        const userMsg = { id: Date.now(), from: "user" as const, text: text.trim() };
        setMessages((s) => [...s, userMsg]);
        setText("");

        // dummy AI reply
        setTimeout(() => {
            setMessages((s) => [...s, { id: Date.now() + 1, from: "ai", text: DUMMY_RECS[Math.floor(Math.random() * DUMMY_RECS.length)] }]);
        }, 600 + Math.random() * 800);
    }

    return (
        <div className="space-y-4">
            <header className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold">AI Recommendations</h3>
                <div className="text-slate-400">Try asking: "How can I focus better today?"</div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-slate-800/60 border border-slate-700/40 rounded-2xl p-4 flex flex-col h-96">
                    <div className="flex-1 overflow-auto space-y-3 px-1 pb-2">
                        {messages.map((m) => (
                            <motion.div
                                key={m.id}
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div className={`max-w-[70%] p-3 rounded-lg ${m.from === "user" ? "bg-indigo-500/80 text-white" : "bg-slate-700/60 text-slate-200"}`}>
                                    {m.text}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-2 border-t border-slate-700/30 pt-3">
                        <div className="flex gap-2">
                            <input
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && send()}
                                placeholder="Ask DeskBuddy..."
                                className="flex-1 rounded-lg bg-slate-800/50 border border-slate-700/40 px-4 py-2 focus:outline-none"
                            />
                            <button onClick={send} className="rounded-lg bg-indigo-500 px-4 py-2 flex items-center gap-2">
                                <Plane className="w-4 h-4" /> Send
                            </button>
                        </div>
                    </div>
                </div>

                <aside className="space-y-3">
                    <div className="bg-slate-800/60 border border-slate-700/40 rounded-2xl p-4">
                        <h4 className="font-medium">Quick Tips</h4>
                        <ul className="mt-2 text-sm text-slate-300 space-y-2">
                            <li>• Block distracting sites for 45 mins</li>
                            <li>• Use noise-cancelling or ambient sound</li>
                            <li>• Short walks between sessions</li>
                        </ul>
                    </div>

                    <div className="bg-slate-800/60 border border-slate-700/40 rounded-2xl p-4">
                        <h4 className="font-medium">Session Summary</h4>
                        <p className="text-sm text-slate-300 mt-2">Typing: 7.5k keys • Active: 135m • Focus dips: 6</p>
                    </div>
                </aside>
            </div>
        </div>
    );
}
