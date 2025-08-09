import { Connection, DeviceRequest } from 'axis-core';
import { GetLightSynchronizeDayNightModeResponse } from './GetLightSynchronizeDayNightModeResponse';

export class GetLightSynchronizeDayNightModeRequest extends DeviceRequest {
    constructor(
        connection: Connection,
        private readonly lightId: string,
    ) {
        super(connection);
    }

    public async send(opts?: { signal?: AbortSignal }): Promise<GetLightSynchronizeDayNightModeResponse> {
        const response = await this.post(this.relativePath, {
            apiVersion: '1.0',
            method: 'getLightSynchronizeDayNightMode',
            params: {
                lightID: this.lightId,
            },
        }, { signal: opts?.signal });

        return new GetLightSynchronizeDayNightModeResponse(response.toString());
    }

    public readonly relativePath = '/axis-cgi/lightcontrol.cgi';
}
