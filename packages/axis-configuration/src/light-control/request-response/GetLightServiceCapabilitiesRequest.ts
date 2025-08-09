import { Connection, DeviceRequest } from 'axis-core';
import { GetLightServiceCapabilitiesResponse } from './GetLightServiceCapabilitiesResponse';

export class GetLightServiceCapabilitiesRequest extends DeviceRequest {
    constructor(connection: Connection) {
        super(connection);
    }

    public async send(opts?: { signal?: AbortSignal }): Promise<GetLightServiceCapabilitiesResponse> {
        const response = await this.post(this.relativePath, {
            apiVersion: '1.0',
            method: 'getServiceCapabilities',
            params: {},
        }, { signal: opts?.signal });

        return new GetLightServiceCapabilitiesResponse(response.toString());
    }

    public readonly relativePath = '/axis-cgi/lightcontrol.cgi';
}
