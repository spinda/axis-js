import { Connection, DeviceRequest } from 'axis-core';
import { SetIndividualLightIntensityResponse } from './SetIndividualLightIntensityResponse';

export class SetIndividualLightIntensityRequest extends DeviceRequest {
    constructor(
        connection: Connection,
        private readonly lightId: string,
        private readonly ledId: number,
        private readonly intensity: number,
    ) {
        super(connection);
    }

    public async send(opts?: { signal?: AbortSignal }): Promise<SetIndividualLightIntensityResponse> {
        const response = await this.post(this.relativePath, {
            apiVersion: '1.0',
            method: 'setIndividualIntensity',
            params: {
                lightID: this.lightId,
                LEDID: this.ledId,
                intensity: this.intensity,
            },
        }, { signal: opts?.signal });

        return new SetIndividualLightIntensityResponse(response.toString());
    }

    public readonly relativePath = '/axis-cgi/lightcontrol.cgi';
}
