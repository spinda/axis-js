import { Connection, DeviceRequest } from 'axis-core';
import { SetAutomaticLightIntensityModeResponse } from './SetAutomaticLightIntensityModeResponse';

export class SetAutomaticLightIntensityModeRequest extends DeviceRequest {
    constructor(
        connection: Connection,
        private readonly lightId: string,
        private readonly enabled: boolean,
    ) {
        super(connection);
    }

    public async send(opts?: { signal?: AbortSignal }): Promise<SetAutomaticLightIntensityModeResponse> {
        const response = await this.post(this.relativePath, {
            apiVersion: '1.0',
            method: 'setAutomaticIntensityMode',
            params: {
                lightID: this.lightId,
                enabled: this.enabled,
            },
        }, { signal: opts?.signal });

        return new SetAutomaticLightIntensityModeResponse(response.toString());
    }

    public readonly relativePath = '/axis-cgi/lightcontrol.cgi';
}
