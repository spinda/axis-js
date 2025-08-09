import { Connection, DeviceRequest } from 'axis-core';
import { ResetTimeZoneResponse } from './ResetTimeZoneResponse';

export class ResetTimeZoneRequest extends DeviceRequest {
    constructor(connection: Connection) {
        super(connection);
    }

    public async send(opts?: { signal?: AbortSignal }): Promise<ResetTimeZoneResponse> {
        const response = await this.post(this.relativePath, {
            apiVersion: '1.0',
            method: 'resetTimeZone',
        }, { signal: opts?.signal });

        return new ResetTimeZoneResponse(response.toString());
    }

    public readonly relativePath = '/axis-cgi/time.cgi';
}
