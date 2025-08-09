import { Connection, DeviceRequest } from 'axis-core';
import { GetLightStatusResponse } from './GetLightStatusResponse';

export class GetLightStatusRequest extends DeviceRequest {
    constructor(
        connection: Connection,
        private readonly lightId: string,
    ) {
        super(connection);
    }

    public async send(opts?: { signal?: AbortSignal }): Promise<GetLightStatusResponse> {
        const response = await this.post(this.relativePath, {
            apiVersion: '1.0',
            method: 'getLightStatus',
            params: {
                lightID: this.lightId,
            },
        }, { signal: opts?.signal });

        return new GetLightStatusResponse(response.toString());
    }

    public readonly relativePath = '/axis-cgi/lightcontrol.cgi';
}
