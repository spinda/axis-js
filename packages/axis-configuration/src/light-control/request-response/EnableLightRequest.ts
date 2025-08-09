import { Connection, DeviceRequest } from 'axis-core';
import { EnableLightResponse } from './EnableLightResponse';

export class EnableLightRequest extends DeviceRequest {
    constructor(
        connection: Connection,
        private readonly lightId: string,
    ) {
        super(connection);
    }

    public async send(opts?: { signal?: AbortSignal }): Promise<EnableLightResponse> {
        const response = await this.post(this.relativePath, {
            apiVersion: '1.0',
            method: 'enableLight',
            params: {
                lightID: this.lightId,
            },
        }, { signal: opts?.signal });

        return new EnableLightResponse(response.toString());
    }

    public readonly relativePath = '/axis-cgi/lightcontrol.cgi';
}
