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
