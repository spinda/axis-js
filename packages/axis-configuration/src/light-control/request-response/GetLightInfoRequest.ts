import { Connection, DeviceRequest } from 'axis-core';
import { GetLightInfoResponse } from './GetLightInfoResponse';

export class GetLightInfoRequest extends DeviceRequest {
    constructor(connection: Connection) {
        super(connection);
    }

    public async send(opts?: { signal?: AbortSignal }): Promise<GetLightInfoResponse> {
        const response = await this.post(this.relativePath, {
            apiVersion: '1.0',
            method: 'getLightInformation',
            params: {},
        }, { signal: opts?.signal });

        return new GetLightInfoResponse(response.toString());
    }

    public readonly relativePath = '/axis-cgi/lightcontrol.cgi';
}
