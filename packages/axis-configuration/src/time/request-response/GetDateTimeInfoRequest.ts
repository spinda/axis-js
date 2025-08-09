import { Connection, DeviceRequest } from 'axis-core';
import { GetDateTimeInfoResponse } from './GetDateTimeInfoResponse';

export class GetDateTimeInfoRequest extends DeviceRequest {
    constructor(connection: Connection) {
        super(connection);
    }

    public async send(opts?: { signal?: AbortSignal }): Promise<GetDateTimeInfoResponse> {
        const response = await this.post(this.relativePath, {
            apiVersion: '1.1',
            method: 'getAll',
        }, { signal: opts?.signal });

        return new GetDateTimeInfoResponse(response.toString());
    }

    public readonly relativePath = '/axis-cgi/time.cgi';
}
