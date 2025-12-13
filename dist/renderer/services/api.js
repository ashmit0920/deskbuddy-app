const BASE_URL = "http://localhost:8000/api";
async function fetchJson(endpoint) {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
    }
    return response.json();
}
export const api = {
    activity: {
        getKeystrokes: (startDate, endDate) => {
            const params = new URLSearchParams();
            if (startDate)
                params.append("start_date", startDate);
            if (endDate)
                params.append("end_date", endDate);
            return fetchJson(`/activity/keystrokes?${params.toString()}`);
        },
        getWindows: (startDate, endDate) => {
            const params = new URLSearchParams();
            if (startDate)
                params.append("start_date", startDate);
            if (endDate)
                params.append("end_date", endDate);
            return fetchJson(`/activity/windows?${params.toString()}`);
        },
        getAppUsage: (startDate, endDate) => {
            const params = new URLSearchParams();
            if (startDate)
                params.append("start_date", startDate);
            if (endDate)
                params.append("end_date", endDate);
            return fetchJson(`/activity/app-usage?${params.toString()}`);
        },
    },
    attention: {
        getLogs: (startDate, endDate) => {
            const params = new URLSearchParams();
            if (startDate)
                params.append("start_date", startDate);
            if (endDate)
                params.append("end_date", endDate);
            return fetchJson(`/attention/logs?${params.toString()}`);
        },
    },
    analytics: {
        getProductivityStats: (date) => {
            const params = new URLSearchParams();
            if (date)
                params.append("date", date);
            return fetchJson(`/analytics/productivity/stats?${params.toString()}`);
        },
    },
    system: {
        getStatus: () => fetchJson("/system/status"),
    },
};
