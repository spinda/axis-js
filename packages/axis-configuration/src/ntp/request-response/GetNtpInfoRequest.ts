import { Connection, DeviceRequest } from 'axis-core';
import { GetNtpInfoResponse } from './GetNtpInfoResponse';

export class GetNtpInfoRequest extends DeviceRequest {
    constructor(connection: Connection) {
        super(connection);
    }

    public async send(opts?: { signal?: AbortSignal }): Promise<GetNtpInfoResponse> {
        const response = await this.post(this.relativePath, {
            apiVersion: '1.0',
            method: 'getNTPInfo',
        }, { signal: opts?.signal });

        return new GetNtpInfoResponse(response.toString());
    }

    public readonly relativePath = '/axis-cgi/ntp.cgi';
}
