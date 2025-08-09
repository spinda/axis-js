import { Connection, DeviceRequest } from 'axis-core';
import { GetValidAngleOfIlluminationResponse } from './GetValidAngleOfIlluminationResponse';

export class GetValidAngleOfIlluminationRequest extends DeviceRequest {
    constructor(
        connection: Connection,
        private readonly lightId: string,
    ) {
        super(connection);
    }

    public async send(opts?: { signal?: AbortSignal }): Promise<GetValidAngleOfIlluminationResponse> {
        const response = await this.post(this.relativePath, {
            apiVersion: '1.0',
            method: 'getValidAngleOfIllumination',
            params: {
                lightID: this.lightId,
            },
        }, { signal: opts?.signal });

        return new GetValidAngleOfIlluminationResponse(response.toString());
    }

    public readonly relativePath = '/axis-cgi/lightcontrol.cgi';
}
