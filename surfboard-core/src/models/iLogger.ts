export interface ILogger {
    writeDebug(message: string, data?: any): void;
    writeInformation(message: string, data?: any): void;
    writeWarning(message: string, data?: any): void;
    writeError(message: string, error?: Error, data?: any): void;
}