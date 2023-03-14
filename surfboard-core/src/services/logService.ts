import type { ILogger } from '../models/iLogger';
import { LogLevel } from '../models/logLevels';

export class LogService implements ILogger {
    private _loggers: ILogger[] = [];
    private _logLevel: LogLevel;

    constructor(logLevel: LogLevel, disableDefaultLogging = false) {
        if (!disableDefaultLogging) {
            this.addLogger(defaultLogger);
        }

        if (logLevel === null || logLevel === undefined) {
            throw new Error(`Invalid log level '${logLevel}'`);
        }

        this._logLevel = logLevel;
    }

    public writeDebug(message: string, data?: any): void {
        if (this._logLevel <= LogLevel.Debug) {
            this._loggers.forEach(l => l.writeDebug(`SURFBOARD_DEBUG: ${message}`, data));
        }
    }

    public writeInformation(message: string, data?: any): void {
        if (this._logLevel <= LogLevel.Info) {
            this._loggers.forEach(l => l.writeInformation(`SURFBOARD_INFO: ${message}`, data));
        }
    }

    public writeWarning(message: string, data?: any): void {
        if (this._logLevel <= LogLevel.Warn) {
            this._loggers.forEach(l => l.writeWarning(`SURFBOARD_WARN: ${message}`, data));
        }
    }

    public writeError(message: string, data?: any): void {
        if (this._logLevel <= LogLevel.Error) {
            this._loggers.forEach(l => l.writeError(`SURFBOARD_ERROR: ${message}`, data));
        }
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
    writeError(message, data?) {
        if (data !== null && data !== undefined) {
            console.error(message, data);
        } else {
            console.error(message);
        }
    }
}