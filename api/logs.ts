import axios from "axios";
import { LogEntry } from "@/types/log";
import { generateMockLogs } from "@/mock-logs";
import { formatResponse } from "@/utils/formatResponse";

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BETTER_STUDIO_URL,
    headers: {
        "Content-Type": "application/json",
        "x-log-key": process.env.NEXT_PUBLIC_BETTER_STUDIO_KEY
    },
});

export const fetchLogs = async (): Promise<{ logs: LogEntry[], isMockData: boolean }> => {
    try {
        const { data } = await instance.get<string[]>('/logs')
        return {
            logs: formatResponse(data),
            isMockData: false
        }
    } catch (error) {
        console.warn('API request failed, using mock data instead:', error);

        const mockData = generateMockLogs(100);
        return {
            logs: formatResponse(mockData),
            isMockData: true
        }
    }
}