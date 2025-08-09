import { Connection, DeviceRequest } from 'axis-core';
import { GetCurrentAngleOfIlluminationResponse } from './GetCurrentAngleOfIlluminationResponse';

export class GetCurrentAngleOfIlluminationRequest extends DeviceRequest {
    constructor(
        connection: Connection,
        private readonly lightId: string,
    ) {
        super(connection);
    }

    public async send(opts?: { signal?: AbortSignal }): Promise<GetCurrentAngleOfIlluminationResponse> {
        const response = await this.post(this.relativePath, {
            apiVersion: '1.0',
            method: 'getCurrentAngleOfIllumination',
            params: {
                lightID: this.lightId,
            },
        }, { signal: opts?.signal });

        return new GetCurrentAngleOfIlluminationResponse(response.toString());
    }

    public readonly relativePath = '/axis-cgi/lightcontrol.cgi';
}
