import { Connection, DeviceRequest } from 'axis-core';
import { SetLightSynchronizeDayNightModeResponse } from './SetLightSynchronizeDayNightModeResponse';

export class SetLightSynchronizeDayNightModeRequest extends DeviceRequest {
    constructor(
        connection: Connection,
        private readonly lightId: string,
        private readonly enabled: boolean,
    ) {
        super(connection);
    }

    public async send(opts?: { signal?: AbortSignal }): Promise<SetLightSynchronizeDayNightModeResponse> {
        const response = await this.post(this.relativePath, {
            apiVersion: '1.0',
            method: 'setLightSynchronizeDayNightMode',
            params: {
                lightID: this.lightId,
                enabled: this.enabled,
            },
        }, { signal: opts?.signal });

        return new SetLightSynchronizeDayNightModeResponse(response.toString());
    }

    public readonly relativePath = '/axis-cgi/lightcontrol.cgi';
}
