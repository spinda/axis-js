import { Connection, DeviceRequest } from 'axis-core';
import { GetManualLightIntensityResponse } from './GetManualLightIntensityResponse';

export class GetManualLightIntensityRequest extends DeviceRequest {
    constructor(
        connection: Connection,
        private readonly lightId: string,
    ) {
        super(connection);
    }

    public async send(opts?: { signal?: AbortSignal }): Promise<GetManualLightIntensityResponse> {
        const response = await this.post(this.relativePath, {
            apiVersion: '1.0',
            method: 'getManualIntensity',
            params: {
                lightID: this.lightId,
            },
        }, { signal: opts?.signal });

        return new GetManualLightIntensityResponse(response.toString());
    }

    public readonly relativePath = '/axis-cgi/lightcontrol.cgi';
}
