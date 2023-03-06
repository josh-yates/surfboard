import type { ILogger } from '../models/iLogger';

export class LogService implements ILogger {
    private _loggers: ILogger[] = [];

    constructor(disableDefaultLogging = false) {
        if (!disableDefaultLogging) {
            this.addLogger(defaultLogger);
        }
    }

    public writeDebug(message: string, data?: any): void {
        this._loggers.forEach(l => l.writeDebug(`SURFBOARD_DEBUG: ${message}`, data));
    }

    public writeInformation(message: string, data?: any): void {
        this._loggers.forEach(l => l.writeInformation(`SURFBOARD_INFO: ${message}`, data));
    }

    public writeWarning(message: string, data?: any): void {
        this._loggers.forEach(l => l.writeWarning(`SURFBOARD_WARN: ${message}`, data));
    }

    public writeError(message: string, error?: Error, data?: any): void {
        this._loggers.forEach(l => l.writeError(`SURFBOARD_ERROR: ${message}`, data));
    }

    public addLogger(logger: ILogger) {
        if (!this._loggers.find(l => l === logger)) {
            this._loggers.push(logger);
        }
    }
}

const defaultLogger: ILogger = {
    writeDebug(message, data?) {
        if (data !== null && data !== undefined) {
            console.debug(message, data);
        } else {
            console.debug(message);
        }
    },
    writeInformation(message, data?) {
        if (data !== null && data !== undefined) {
            console.log(message, data);
        } else {
            console.log(message);
        }
    },
    writeWarning(message, data?) {
        if (data !== null && data !== undefined) {
            console.warn(message, data);
        } else {
            console.warn(message);
        }
    },
    writeError(message, error?, data?) {
        if (data !== null && data !== undefined) {
            console.error(message, data);
        } else {
            console.error(message);
        }

        if (!!error) console.error(error);
    }
}