import { Connection, DeviceRequest } from 'axis-core';
import { DisableLightResponse } from './DisableLightResponse';

export class DisableLightRequest extends DeviceRequest {
    constructor(
        connection: Connection,
        private readonly lightId: string,
    ) {
        super(connection);
    }

    public async send(opts?: { signal?: AbortSignal }): Promise<DisableLightResponse> {
        const response = await this.post(this.relativePath, {
            apiVersion: '1.0',
            method: 'disableLight',
            params: {
                lightID: this.lightId,
            },
        }, { signal: opts?.signal });

        return new DisableLightResponse(response.toString());
    }

    public readonly relativePath = '/axis-cgi/lightcontrol.cgi';
}
