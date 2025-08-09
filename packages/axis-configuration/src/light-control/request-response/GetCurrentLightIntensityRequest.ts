import { Connection, DeviceRequest } from 'axis-core';
import { GetCurrentLightIntensityResponse } from './GetCurrentLightIntensityResponse';

export class GetCurrentLightIntensityRequest extends DeviceRequest {
    constructor(
        connection: Connection,
        private readonly lightId: string,
    ) {
        super(connection);
    }

    public async send(opts?: { signal?: AbortSignal }): Promise<GetCurrentLightIntensityResponse> {
        const response = await this.post(this.relativePath, {
            apiVersion: '1.0',
            method: 'getCurrentIntensity',
            params: {
                lightID: this.lightId,
            },
        }, { signal: opts?.signal });

        return new GetCurrentLightIntensityResponse(response.toString());
    }

    public readonly relativePath = '/axis-cgi/lightcontrol.cgi';
}
