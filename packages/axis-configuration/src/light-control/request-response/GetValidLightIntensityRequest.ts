import { Connection, DeviceRequest } from 'axis-core';
import { GetValidLightIntensityResponse } from './GetValidLightIntensityResponse';

export class GetValidLightIntensityRequest extends DeviceRequest {
    constructor(
        connection: Connection,
        private readonly lightId: string,
    ) {
        super(connection);
    }

    public async send(opts?: { signal?: AbortSignal }): Promise<GetValidLightIntensityResponse> {
        const response = await this.post(this.relativePath, {
            apiVersion: '1.0',
            method: 'getValidIntensity',
            params: {
                lightID: this.lightId,
            },
        }, { signal: opts?.signal });

        return new GetValidLightIntensityResponse(response.toString());
    }

    public readonly relativePath = '/axis-cgi/lightcontrol.cgi';
}
