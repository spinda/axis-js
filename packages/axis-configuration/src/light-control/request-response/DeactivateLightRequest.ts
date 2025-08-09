import { Connection, DeviceRequest } from 'axis-core';
import { DeactivateLightResponse } from './DeactivateLightResponse';

export class DeactivateLightRequest extends DeviceRequest {
    constructor(
        connection: Connection,
        private readonly lightId: string,
    ) {
        super(connection);
    }

    public async send(opts?: { signal?: AbortSignal }): Promise<DeactivateLightResponse> {
        const response = await this.post(this.relativePath, {
            apiVersion: '1.0',
            method: 'deactivateLight',
            params: {
                lightID: this.lightId,
            },
        }, { signal: opts?.signal });

        return new DeactivateLightResponse(response.toString());
    }

    public readonly relativePath = '/axis-cgi/lightcontrol.cgi';
}
