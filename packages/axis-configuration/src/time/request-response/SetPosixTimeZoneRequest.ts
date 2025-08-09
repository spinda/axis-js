import { Connection, DeviceRequest } from 'axis-core';
import { SetPosixTimeZoneResponse } from './SetPosixTimeZoneResponse';

export class SetPosixTimeZoneRequest extends DeviceRequest {
    constructor(
        connection: Connection,
        private readonly posixTimeZone: string,
        private readonly enableDst: boolean,
    ) {
        super(connection);
    }

    public async send(opts?: { signal?: AbortSignal }): Promise<SetPosixTimeZoneResponse> {
        const response = await this.post(this.relativePath, {
            apiVersion: '1.0',
            method: 'setPosixTimeZone',
            params: {
                posixTimeZone: this.posixTimeZone,
                enableDst: this.enableDst,
            },
        }, { signal: opts?.signal });

        return new SetPosixTimeZoneResponse(response.toString());
    }

    public readonly relativePath = '/axis-cgi/time.cgi';
}
