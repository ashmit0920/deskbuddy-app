export interface KeystrokeLog {
    id: number;
    timestamp: string;
    typing_speed: number;
    key_count: number;
    active_window: string | null;
    is_active: boolean;
}

export interface WindowActivity {
    id: number;
    timestamp: string;
    window_title: string | null;
    application_name: string | null;
    category: string | null;
    duration_seconds: number;
}

export interface AppUsageStats {
    application_name: string;
    category: string;
    total_duration: number;
    session_count: number;
}

export interface AttentionData {
    id: number;
    timestamp: string;
    face_detected: boolean;
    attention_score: number;
    blink_rate: number;
    looking_at_screen: boolean;
}

export interface ProductivityStats {
    date: string;
    total_keystrokes: number;
    avg_typing_speed: number;
    active_periods: number;
    avg_attention: number;
    avg_blink_rate: number;
    face_detection_rate: number;
}

export interface SystemStatus {
    status: string;
    processes: {
        data_collector: boolean;
        keystroke_logger: boolean;
        window_tracker: boolean;
        webcam_monitor: boolean;
    };
}

export interface MouseActivity {
    timestamp: string;
    active_window: string;
    application_name: string;
    move_distance: number;
    avg_velocity: number;
    click_count: number;
    scroll_count: number;
    scroll_direction: string;
    idle_ratio: number;
}

export interface KeystrokeSummary {
    total_keystrokes: number;
    avg_typing_speed: number;
    active_time_minutes: number;
    activity_percentage: number;
    avg_error_rate: number;
    rhythm_variability: number;
    avg_pause_duration: number;
    long_pauses_count: number;
    stress_score: number;
    productivity_score: number;
}

export interface WindowSummary {
    total_applications: number;
    total_time_minutes: number;
    app_usage: Record<string, number>;
    category_breakdown: Record<string, number>;
    most_used_app: string;
    productivity_apps_time: number;
    distraction_apps_time: number;
    context_switches: number;
    switch_rate_per_hour: number;
    avg_dwell_time_minutes: number;
    productivity_ratio: number;
}

export interface MouseSummary {
    total_clicks: number;
    total_scrolls: number;
    total_distance_px: number;
    avg_velocity_px_s: number;
    idle_ratio_percent: number;
    doomscrolling_detected: boolean;
}

export interface ProductivityMetrics {
    overall_productivity_score: number;
    stress_metrics: {
        stress_level: string;
        error_rate: number;
    };
    productivity_components: {
        application_productivity: number;
        activity_productivity: number;
    };
}

export interface DailySummary {
    date: string;
    keystroke_summary: KeystrokeSummary;
    window_summary: WindowSummary;
    attention_summary: Record<string, any>;
    mouse_summary: MouseSummary;
    productivity_metrics: ProductivityMetrics;
    insights: string[];
    generated_at: string;
}

export interface WeeklyDataPoint {
    date: string;
    productivity_score: number;
    total_keystrokes: number;
    active_time: number;
    avg_attention: number;
    focus_sessions: number;
}

export interface WeeklyTrends {
    weekly_data: WeeklyDataPoint[];
    trends: {
        productivity: string;
        attention: string;
        activity: string;
    };
    week_start: string;
    week_end: string;
}
