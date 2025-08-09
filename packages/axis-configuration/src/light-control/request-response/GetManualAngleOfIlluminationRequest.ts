import { Connection, DeviceRequest } from 'axis-core';
import { GetManualAngleOfIlluminationResponse } from './GetManualAngleOfIlluminationResponse';

export class GetManualAngleOfIlluminationRequest extends DeviceRequest {
    constructor(
        connection: Connection,
        private readonly lightId: string,
    ) {
        super(connection);
    }

    public async send(opts?: { signal?: AbortSignal }): Promise<GetManualAngleOfIlluminationResponse> {
        const response = await this.post(this.relativePath, {
            apiVersion: '1.0',
            method: 'getManualAngleOfIllumination',
            params: {
                lightID: this.lightId,
            },
        }, { signal: opts?.signal });

        return new GetManualAngleOfIlluminationResponse(response.toString());
    }

    public readonly relativePath = '/axis-cgi/lightcontrol.cgi';
}
