import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Activity, Shield, Zap } from "lucide-react";

interface WelcomeScreenProps {
    onGetStarted: () => void;
}

export default function WelcomeScreen({ onGetStarted }: WelcomeScreenProps) {
    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-center p-6 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl translate-y-1/2" />

            <div className="max-w-3xl z-10 space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl mx-auto flex items-center justify-center shadow-2xl shadow-indigo-500/30 mb-8">
                        <span className="text-3xl font-bold text-white">DB</span>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-100 to-slate-400">
                            DeskBuddy
                        </span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Your intelligent productivity companion. Track activity, monitor attention, and boost focus with AI-powered insights.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left"
                >
                    <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm">
                        <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 mb-3">
                            <Activity className="w-5 h-5" />
                        </div>
                        <h3 className="font-semibold text-slate-200">Smart Tracking</h3>
                        <p className="text-sm text-slate-500 mt-1">Automated analysis of your work habits and focus patterns.</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm">
                        <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 mb-3">
                            <Zap className="w-5 h-5" />
                        </div>
                        <h3 className="font-semibold text-slate-200">AI Insights</h3>
                        <p className="text-sm text-slate-500 mt-1">Personalized recommendations to optimize your workflow.</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm">
                        <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center text-pink-400 mb-3">
                            <Shield className="w-5 h-5" />
                        </div>
                        <h3 className="font-semibold text-slate-200">Privacy First</h3>
                        <p className="text-sm text-slate-500 mt-1">All data processing happens locally on your device.</p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="pt-8"
                >
                    <button
                        onClick={onGetStarted}
                        className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white transition-all duration-200 bg-indigo-600 rounded-full hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/25 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 focus:ring-offset-slate-900"
                    >
                        <span>Get Started</span>
                        <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                    </button>
                    <p className="mt-4 text-sm text-slate-500">v1.0.0 • Local Setup</p>
                </motion.div>
            </div>
        </div>
    );
}
