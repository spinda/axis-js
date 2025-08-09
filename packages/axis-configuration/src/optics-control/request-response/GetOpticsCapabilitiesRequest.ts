import { Connection, DeviceRequest } from 'axis-core';
import { GetOpticsCapabilitiesResponse } from './GetOpticsCapabilitiesResponse';

export class GetOpticsCapabilitiesRequest extends DeviceRequest {
    public readonly relativePath = '/axis-cgi/opticscontrol.cgi';

    constructor(connection: Connection) {
        super(connection);
    }

    async send(opts?: { signal?: AbortSignal }): Promise<GetOpticsCapabilitiesResponse> {
        const body = {
            apiVersion: '1.2',
            method: 'getCapabilities',
        };

        const response = await this.post(this.relativePath, JSON.stringify(body), { signal: opts?.signal });
        return new GetOpticsCapabilitiesResponse(response.toString());
    }
}
