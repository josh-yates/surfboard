import type { LogService } from './logService';

export class NetworkService {
    private _logger: LogService;

    constructor(logger: LogService) {
        this._logger = logger;
    }

    public async getText(url: string, headers?: any): Promise<string> {
        const requestHeaders = new Headers();

        requestHeaders.append('accept', 'text/plain');

        const controller = new AbortController();

        if (!!headers) Object.entries(headers).forEach(o => requestHeaders.append(o[0], o[1] as string));

        try {
            const request = {
                headers: requestHeaders,
                method: 'GET',
                cache: 'no-cache',
                mode: 'cors'
            } as RequestInit;

            this._logger.writeDebug('Beginning request', { url, request });

            const response = await fetch(url, request);

            this._logger.writeDebug('Response received', { url, request, response });

            if (!response.ok) {
                this._logger.writeError('Failed request', { url, response });

                return null;
            }

            const responseBody = await response.text();

            this._logger.writeDebug('Ending request', { url, request, responseBody });

            return responseBody;
        } catch (error) {
            this._logger.writeError('Failed request', { url, error });

            return null;
        } finally {
            controller.abort();
        }
    }

    public async getJson<TResponse>(url: string, headers?: any): Promise<TResponse> {
        const requestHeaders = new Headers();

        requestHeaders.append('accept', 'application/json');

        const controller = new AbortController();

        if (!!headers) Object.entries(headers).forEach(o => requestHeaders.append(o[0], o[1] as string));

        try {
            const request = {
                headers: requestHeaders,
                method: 'GET',
                cache: 'no-cache',
                mode: 'cors'
            } as RequestInit;

            this._logger.writeDebug('Beginning request', { url, request });

            const response = await fetch(url, request);

            this._logger.writeDebug('Response received', { url, request, response });

            if (!response.ok) {
                this._logger.writeError('Failed request', { url, response });

                return null;
            }

            const responseBody = await response.json();

            this._logger.writeDebug('Ending request', { url, request, responseBody });

            return responseBody as TResponse;
        } catch (error) {
            this._logger.writeError('Failed request', { url, error });

            return null;
        } finally {
            controller.abort();
        }
    }
}