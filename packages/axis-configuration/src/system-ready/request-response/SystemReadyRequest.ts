import { Connection, DeviceRequest } from 'axis-core';
import { SystemReadyParams } from '../SystemReadyParams';
import { SystemReadyResponse } from './SystemReadyResponse';

export class SystemReadyRequest extends DeviceRequest {
    constructor(connection: Connection, private readonly params?: SystemReadyParams) {
        super(connection);
    }

    public async send(opts?: { signal?: AbortSignal }): Promise<SystemReadyResponse> {
        const response = await this.post(this.relativePath, {
            apiVersion: '1.1',
            method: 'systemready',
            params: {
                ...(this.params?.timeout != null ? { timeout: this.params.timeout } : null),
            },
        }, { signal: opts?.signal });

        return new SystemReadyResponse(response.toString());
    }

    public readonly relativePath = '/axis-cgi/systemready.cgi';
}
