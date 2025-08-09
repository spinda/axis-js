import { Connection, DeviceRequest } from 'axis-core';
import { GetOpticsResponse } from './GetOpticsResponse';

export class GetOpticsRequest extends DeviceRequest {
    public readonly relativePath = '/axis-cgi/opticscontrol.cgi';

    constructor(connection: Connection) {
        super(connection);
    }

    async send(opts?: { signal?: AbortSignal }): Promise<GetOpticsResponse> {
        const body = {
            apiVersion: '1.2',
            method: 'getOptics',
        };

        const response = await this.post(this.relativePath, JSON.stringify(body), { signal: opts?.signal });
        return new GetOpticsResponse(response.toString());
    }
}
