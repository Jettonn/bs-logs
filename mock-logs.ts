import { LogLevel } from "@/types/log";

const logLevels: LogLevel[] = ["WARN", "ERROR", "TRACE", "DEBUG", "INFO"];
const messages = [
    "User updated",
    "Login failed: no such user",
    "User deleted",
    "Login failed: Wrong password",
    "User created",
    "Password reset requested",
    "Session expired",
    "Invalid token",
    "Database connection failed",
    "Cache miss"
];

const services = [
    "AuthService",
    "ModelsService",
    "UserService",
    "DatabaseService",
    "CacheService"
];

const controllers = [
    "AuthController",
    "UserController",
    "ModelsController",
    "DatabaseController",
    "CacheController"
];

function generateUUID() {
    return 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[x]/g, function (c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function generateRandomDate(start: Date, end: Date) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

export function generateMockLogs(count: number = 100) {
    const logs: string[] = [];
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - (30 * 24 * 60 * 60 * 1000));

    for (let i = 0; i < count; i++) {
        const timestamp = generateRandomDate(startDate, endDate).toISOString();
        const message = messages[Math.floor(Math.random() * messages.length)];
        const level = logLevels[Math.floor(Math.random() * logLevels.length)];
        const service = services[Math.floor(Math.random() * services.length)];
        const controller = controllers[Math.floor(Math.random() * controllers.length)];
        const trace = `${service}:${controller}`;
        const authorId = generateUUID();

        const logEntry = `${timestamp}|=|${message}|=|${level}|=|${trace}|=|${authorId}`;
        logs.push(logEntry);
    }

    return logs;
}