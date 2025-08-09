import { Connection, DeviceRequest } from 'axis-core';
import { SetTimeZoneResponse } from './SetTimeZoneResponse';

export class SetTimeZoneRequest extends DeviceRequest {
    constructor(
        connection: Connection,
        private readonly timeZone: string,
    ) {
        super(connection);
    }

    public async send(opts?: { signal?: AbortSignal }): Promise<SetTimeZoneResponse> {
        const response = await this.post(this.relativePath, {
            apiVersion: '1.0',
            method: 'setTimeZone',
            params: {
                timeZone: this.timeZone,
            },
        }, { signal: opts?.signal });

        return new SetTimeZoneResponse(response.toString());
    }

    public readonly relativePath = '/axis-cgi/time.cgi';
}
