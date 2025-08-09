import { Connection, DeviceRequest } from 'axis-core';
import { GetIndividualLightIntensityResponse } from './GetIndividualLightIntensityResponse';

export class GetIndividualLightIntensityRequest extends DeviceRequest {
    constructor(
        connection: Connection,
        private readonly lightId: string,
        private readonly ledId: number,
    ) {
        super(connection);
    }

    public async send(opts?: { signal?: AbortSignal }): Promise<GetIndividualLightIntensityResponse> {
        const response = await this.post(this.relativePath, {
            apiVersion: '1.0',
            method: 'getIndividualIntensity',
            params: {
                lightID: this.lightId,
                LEDID: this.ledId,
            },
        }, { signal: opts?.signal });

        return new GetIndividualLightIntensityResponse(response.toString());
    }

    public readonly relativePath = '/axis-cgi/lightcontrol.cgi';
}
