import { Connection, DeviceRequest } from 'axis-core';
import { SetDateTimeResponse } from './SetDateTimeResponse';

export class SetDateTimeRequest extends DeviceRequest {
    constructor(
        connection: Connection,
        private readonly dateTime: string,
    ) {
        super(connection);
    }

    public async send(opts?: { signal?: AbortSignal }): Promise<SetDateTimeResponse> {
        const response = await this.post(this.relativePath, {
            apiVersion: '1.0',
            method: 'setDateTime',
            params: {
                dateTime: this.dateTime,
            },
        }, { signal: opts?.signal });

        return new SetDateTimeResponse(response.toString());
    }

    public readonly relativePath = '/axis-cgi/time.cgi';
}
