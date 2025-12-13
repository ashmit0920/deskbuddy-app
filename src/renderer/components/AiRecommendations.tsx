import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, Plane, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { api } from "../services/api";
import { gemini, ChatMessage } from "../services/gemini";
import { ProductivityStats } from "../types";

export default function AiRecommendations() {
    const [messages, setMessages] = useState<{ id: number; from: "user" | "ai"; text: string }[]>([
        { id: 1, from: "ai", text: "Hi! I'm DeskBuddy AI. I've analyzed your session data. How can I help you improve your productivity today?" },
    ]);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [stats, setStats] = useState<ProductivityStats | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Fetch stats for context
        api.analytics.getProductivityStats().then(setStats).catch(console.error);
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    async function send() {
        if (!text.trim() || loading) return;

        const userText = text.trim();
        const userMsg = { id: Date.now(), from: "user" as const, text: userText };
        setMessages((s) => [...s, userMsg]);
        setText("");
        setLoading(true);

        try {
            // Prepare history for Gemini
            const history: ChatMessage[] = messages.map(m => ({
                role: m.from === "user" ? "user" : "model",
                parts: [{ text: m.text }]
            }));
            history.push({ role: "user", parts: [{ text: userText }] });

            // Prepare context
            const context = stats
                ? `Current Session Stats:
                   - Total Keystrokes: ${stats.total_keystrokes}
                   - Typing Speed: ${stats.avg_typing_speed.toFixed(1)} WPM
                   - Active Periods: ${stats.active_periods}
                   - Avg Attention: ${(stats.avg_attention * 100).toFixed(1)}%
                   - Blink Rate: ${stats.avg_blink_rate.toFixed(1)}/min`
                : "No session data available yet.";

            const replyText = await gemini.chat(history, context);

            setMessages((s) => [...s, { id: Date.now() + 1, from: "ai", text: replyText }]);
        } catch (error) {
            setMessages((s) => [...s, { id: Date.now() + 1, from: "ai", text: "Sorry, I encountered an error. Please check your API key." }]);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="space-y-4">
            <header className="flex items-center justify-between">
                <div>
                    <h3 className="text-2xl font-semibold flex items-center gap-2">
                        <Sparkles className="w-6 h-6 text-indigo-400" />
                        DeskBuddy AI
                    </h3>
                    <div className="text-slate-400 text-sm mt-1">Your personal productivity & wellbeing assistant</div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-slate-800/60 border border-slate-700/40 rounded-2xl p-4 flex flex-col h-[600px]">
                    <div ref={scrollRef} className="flex-1 overflow-auto space-y-4 px-2 pb-4" style={{ scrollbarWidth: 'thin', scrollbarColor: '#475569 transparent' }}>
                        {messages.map((m) => (
                            <motion.div
                                key={m.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div className={`max-w-[80%] p-4 rounded-2xl ${m.from === "user"
                                    ? "bg-indigo-600 text-white rounded-br-none"
                                    : "bg-slate-700/80 text-slate-100 rounded-bl-none"
                                    }`}>
                                    <div className="text-sm leading-relaxed whitespace-pre-wrap">{m.text}</div>
                                </div>
                            </motion.div>
                        ))}
                        {loading && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                                <div className="bg-slate-700/80 p-4 rounded-2xl rounded-bl-none flex gap-2">
                                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                                </div>
                            </motion.div>
                        )}
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-700/30">
                        <div className="flex gap-3">
                            <input
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && send()}
                                placeholder="Ask about your productivity, stress, or request tips..."
                                disabled={loading}
                                className="flex-1 rounded-xl bg-slate-900/50 border border-slate-700 px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors disabled:opacity-50"
                            />
                            <button
                                onClick={send}
                                disabled={loading || !text.trim()}
                                className="rounded-xl bg-indigo-600 px-5 py-3 flex items-center gap-2 font-medium hover:bg-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Plane className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                <aside className="space-y-4">
                    <div className="bg-slate-800/60 border border-slate-700/40 rounded-2xl p-5">
                        <h4 className="font-medium text-indigo-300 mb-4">Quick Actions</h4>
                        <div className="space-y-2">
                            {["Analyze my focus session", "Give me a destress tip", "How is my typing rhythm?", "Suggest a break schedule"].map(suggestion => (
                                <button
                                    key={suggestion}
                                    onClick={() => { setText(suggestion); }}
                                    className="w-full text-left p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 text-sm text-slate-300 transition-colors border border-slate-700/30 hover:border-indigo-500/30"
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-slate-800/60 border border-slate-700/40 rounded-2xl p-5">
                        <h4 className="font-medium text-indigo-300 mb-3">Live Context</h4>
                        {stats ? (
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between pb-2 border-b border-slate-700/30">
                                    <span className="text-slate-400">Typing Speed</span>
                                    <span className="font-mono text-slate-200">{stats.avg_typing_speed.toFixed(1)} WPM</span>
                                </div>
                                <div className="flex justify-between pb-2 border-b border-slate-700/30">
                                    <span className="text-slate-400">Total Keystrokes</span>
                                    <span className="font-mono text-slate-200">{stats.total_keystrokes.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between pb-2 border-b border-slate-700/30">
                                    <span className="text-slate-400">Attention</span>
                                    <span className="font-mono text-slate-200">{(stats.avg_attention * 100).toFixed(0)}%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Sessions</span>
                                    <span className="font-mono text-slate-200">{stats.active_periods}</span>
                                </div>
                            </div>
                        ) : (
                            <div className="text-slate-500 text-sm italic">Loading session data...</div>
                        )}
                    </div>
                </aside>
            </div>
        </div>
    );
}
