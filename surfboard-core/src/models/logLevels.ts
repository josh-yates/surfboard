export enum LogLevel {
    Debug = 0,
    Info,
    Warn,
    Error
}

export function parseLogLevel(level: string): LogLevel {
    const formattedLevel = level?.trim().toLocaleLowerCase();

    switch (formattedLevel) {
        case 'dbg':
        case 'debug':
            return LogLevel.Debug;
        case 'info':
        case 'information':
            return LogLevel.Info;
        case 'warn':
        case 'warning':
            return LogLevel.Warn;
        case 'err':
        case 'error':
            return LogLevel.Error;
        default:
            return undefined;
    }
}