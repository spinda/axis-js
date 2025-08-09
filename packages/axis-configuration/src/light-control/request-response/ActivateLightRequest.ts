import { Connection, DeviceRequest } from 'axis-core';
import { ActivateLightResponse } from './ActivateLightResponse';

export class ActivateLightRequest extends DeviceRequest {
    constructor(
        connection: Connection,
        private readonly lightId: string,
    ) {
        super(connection);
    }

    public async send(opts?: { signal?: AbortSignal }): Promise<ActivateLightResponse> {
        const response = await this.post(this.relativePath, {
            apiVersion: '1.0',
            method: 'activateLight',
            params: {
                lightID: this.lightId,
            },
        }, { signal: opts?.signal });

        return new ActivateLightResponse(response.toString());
    }

    public readonly relativePath = '/axis-cgi/lightcontrol.cgi';
}
