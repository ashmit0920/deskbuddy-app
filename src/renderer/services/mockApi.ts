import { KeystrokeLog, WindowActivity, AppUsageStats, AttentionData, ProductivityStats, SystemStatus, DailySummary, WeeklyTrends } from "../types";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
    activity: {
        getKeystrokes: async (startDate?: string, endDate?: string): Promise<KeystrokeLog[]> => {
            await delay(500);

            // Start from 5:00 PM today
            const startTime = new Date();
            startTime.setHours(17, 0, 0, 0);

            return Array.from({ length: 350 }, (_, i) => {
                // Realistic variation: High activity first hour, drop (break), then resume
                let minKeys = 30;
                let maxKeys = 150;

                // Simulate break betweeen 60m and 90m (6:00 PM - 6:30 PM)
                if (i > 60 && i < 90) {
                    minKeys = 0;
                    maxKeys = 15; // User went for dinner/break
                }
                // Ramp up period
                else if (i >= 90 && i < 110) {
                    minKeys = 20;
                    maxKeys = 80;
                }

                // Add "flow state" bursts
                const isFlowState = i % 45 > 30; // Every 45 mins, 15 mins of high intensity
                if (isFlowState && i < 60) maxKeys += 50;

                const count = Math.floor(Math.random() * (maxKeys - minKeys)) + minKeys;

                return {
                    id: i,
                    timestamp: new Date(startTime.getTime() + i * 60000).toISOString(),
                    typing_speed: count > 10 ? Math.floor(Math.random() * 40) + 50 : 0,
                    key_count: Math.max(0, count),
                    active_window: i % 3 === 0 ? "VS Code" : i % 3 === 1 ? "Chrome" : "Cursor",
                    is_active: count > 5
                };
            });
        },
        getWindows: async (startDate?: string, endDate?: string): Promise<WindowActivity[]> => {
            await delay(500);
            return Array.from({ length: 20 }, (_, i) => ({
                id: i,
                timestamp: new Date(Date.now() - i * 300000).toISOString(),
                window_title: i % 2 === 0 ? "Project X - VS Code" : "Dashboard Design - Figma",
                application_name: i % 2 === 0 ? "Code" : "Figma",
                category: i % 2 === 0 ? "productivity" : "design",
                duration_seconds: Math.floor(Math.random() * 600) + 60
            }));
        },
        getAppUsage: async (startDate?: string, endDate?: string): Promise<AppUsageStats[]> => {
            await delay(500);
            return [
                { application_name: "VS Code", category: "productivity", total_duration: 12500, session_count: 15 },
                { application_name: "Google Chrome", category: "browsing", total_duration: 5400, session_count: 22 },
                { application_name: "Teams", category: "communication", total_duration: 3200, session_count: 45 },
                { application_name: "Apple Music", category: "entertainment", total_duration: 7200, session_count: 5 },
                { application_name: "Figma", category: "design", total_duration: 4500, session_count: 8 }
            ];
        },
    },
    attention: {
        getLogs: async (startDate?: string, endDate?: string): Promise<AttentionData[]> => {
            await delay(500);
            return Array.from({ length: 30 }, (_, i) => ({
                id: i,
                timestamp: new Date(Date.now() - i * 120000).toISOString(),
                face_detected: Math.random() > 0.1,
                attention_score: Math.random() * 0.5 + 0.5, // 0.5 - 1.0 (Good attention)
                blink_rate: Math.floor(Math.random() * 10) + 10, // 10-20
                looking_at_screen: Math.random() > 0.15
            }));
        },
    },
    analytics: {
        getProductivityStats: async (date?: string): Promise<ProductivityStats> => {
            await delay(600);
            return {
                date: date || new Date().toISOString(),
                total_keystrokes: 15432,
                avg_typing_speed: 68,
                active_periods: 42,
                avg_attention: 0.85,
                avg_blink_rate: 14,
                face_detection_rate: 0.92
            };
        },
        getDailyAnalysis: async (date: string): Promise<DailySummary> => {
            await delay(800);
            return {
                date: date,
                keystroke_summary: {
                    total_keystrokes: 12500,
                    avg_typing_speed: 65,
                    active_time_minutes: 340,
                    activity_percentage: 85,
                    avg_error_rate: 2.5,
                    rhythm_variability: 0.4,
                    avg_pause_duration: 1.2,
                    long_pauses_count: 5,
                    stress_score: 0.3,
                    productivity_score: 88
                },
                window_summary: {
                    total_applications: 8,
                    total_time_minutes: 420,
                    app_usage: {
                        "VS Code": 180,
                        "Chrome": 120,
                        "Slack": 60,
                        "Spotify": 60
                    },
                    category_breakdown: {
                        "productivity": 240,
                        "browsing": 120,
                        "communication": 60
                    },
                    most_used_app: "VS Code",
                    productivity_apps_time: 240,
                    distraction_apps_time: 30,
                    context_switches: 45,
                    switch_rate_per_hour: 6.5,
                    avg_dwell_time_minutes: 15,
                    productivity_ratio: 0.85
                },
                attention_summary: {
                    avg_attention_score: 0.82,
                    focus_sessions: 6,
                    attention_variability: 0.15
                },
                mouse_summary: {
                    total_clicks: 1500,
                    total_scrolls: 4500,
                    total_distance_px: 50000,
                    avg_velocity_px_s: 150,
                    idle_ratio_percent: 12,
                    doomscrolling_detected: false
                },
                productivity_metrics: {
                    overall_productivity_score: 87,
                    stress_metrics: {
                        stress_level: "Low",
                        error_rate: 2.5
                    },
                    productivity_components: {
                        application_productivity: 85,
                        activity_productivity: 90
                    }
                },
                insights: [
                    "🚀 High productivity detected in the morning session.",
                    "💡 You maintain better focus when using VS Code compared to Chrome.",
                    "👀 Attention was highest between 10:00 AM and 11:30 AM."
                ],
                generated_at: new Date().toISOString()
            };
        },
        getWeeklyTrends: async (endDate?: string): Promise<WeeklyTrends> => {
            await delay(700);
            const today = new Date();
            const weekStart = new Date(today);
            weekStart.setDate(today.getDate() - 6);

            return {
                week_start: weekStart.toISOString().split('T')[0],
                week_end: today.toISOString().split('T')[0],
                weekly_data: Array.from({ length: 7 }, (_, i) => ({
                    date: new Date(weekStart.getTime() + i * 86400000).toISOString().split('T')[0],
                    productivity_score: 75 + Math.random() * 20,
                    total_keystrokes: Math.floor(5000 + Math.random() * 4000),
                    active_time: 300 + Math.random() * 120,
                    avg_attention: 0.7 + Math.random() * 0.2,
                    focus_sessions: Math.floor(3 + Math.random() * 5)
                })),
                trends: {
                    productivity: "improving",
                    attention: "stable",
                    activity: "improving"
                }
            };
        },
    },
    system: {
        getStatus: async (): Promise<SystemStatus> => {
            await delay(300);
            return {
                status: "operational",
                processes: {
                    data_collector: true,
                    keystroke_logger: true,
                    window_tracker: true,
                    webcam_monitor: true
                }
            };
        },
    },
};
