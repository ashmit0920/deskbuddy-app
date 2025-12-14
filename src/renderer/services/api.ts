import { KeystrokeLog, WindowActivity, AppUsageStats, AttentionData, ProductivityStats, SystemStatus, DailySummary, WeeklyTrends } from "../types";

const BASE_URL = "http://localhost:8000/api";

async function fetchJson<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
    }
    return response.json();
}

export const api = {
    activity: {
        getKeystrokes: (startDate?: string, endDate?: string) => {
            const params = new URLSearchParams();
            if (startDate) params.append("start_date", startDate);
            if (endDate) params.append("end_date", endDate);
            return fetchJson<KeystrokeLog[]>(`/activity/keystrokes?${params.toString()}`);
        },
        getWindows: (startDate?: string, endDate?: string) => {
            const params = new URLSearchParams();
            if (startDate) params.append("start_date", startDate);
            if (endDate) params.append("end_date", endDate);
            return fetchJson<WindowActivity[]>(`/activity/windows?${params.toString()}`);
        },
        getAppUsage: (startDate?: string, endDate?: string) => {
            const params = new URLSearchParams();
            if (startDate) params.append("start_date", startDate);
            if (endDate) params.append("end_date", endDate);
            return fetchJson<AppUsageStats[]>(`/activity/app-usage?${params.toString()}`);
        },
    },
    attention: {
        getLogs: (startDate?: string, endDate?: string) => {
            const params = new URLSearchParams();
            if (startDate) params.append("start_date", startDate);
            if (endDate) params.append("end_date", endDate);
            return fetchJson<AttentionData[]>(`/attention/logs?${params.toString()}`);
        },
    },
    analytics: {
        getProductivityStats: (date?: string) => {
            const params = new URLSearchParams();
            if (date) params.append("date", date);
            return fetchJson<ProductivityStats>(`/analytics/productivity/stats?${params.toString()}`);
        },
        getDailyAnalysis: (date: string) => {
            return fetchJson<DailySummary>(`/analytics/daily/${date}`);
        },
        getWeeklyTrends: (endDate?: string) => {
            const params = new URLSearchParams();
            if (endDate) params.append("end_date", endDate);
            return fetchJson<WeeklyTrends>(`/analytics/weekly?${params.toString()}`);
        },
    },
    system: {
        getStatus: () => fetchJson<SystemStatus>("/system/status"),
    },
};
