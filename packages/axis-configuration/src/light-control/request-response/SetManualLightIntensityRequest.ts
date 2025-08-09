import { Connection, DeviceRequest } from 'axis-core';
import { SetManualLightIntensityResponse } from './SetManualLightIntensityResponse';

export class SetManualLightIntensityRequest extends DeviceRequest {
    constructor(
        connection: Connection,
        private readonly lightId: string,
        private readonly intensity: number,
    ) {
        super(connection);
    }

    public async send(opts?: { signal?: AbortSignal }): Promise<SetManualLightIntensityResponse> {
        const response = await this.post(this.relativePath, {
            apiVersion: '1.0',
            method: 'setManualIntensity',
            params: {
                lightID: this.lightId,
                intensity: this.intensity,
            },
        }, { signal: opts?.signal });

        return new SetManualLightIntensityResponse(response.toString());
    }

    public readonly relativePath = '/axis-cgi/lightcontrol.cgi';
}
