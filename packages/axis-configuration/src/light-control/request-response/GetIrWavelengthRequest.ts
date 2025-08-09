import { Connection, DeviceRequest } from 'axis-core';
import { GetIrWavelengthResponse } from './GetIrWavelengthResponse';

export class GetIrWavelengthRequest extends DeviceRequest {
    constructor(
        connection: Connection,
        private readonly lightId: string,
    ) {
        super(connection);
    }

    public async send(opts?: { signal?: AbortSignal }): Promise<GetIrWavelengthResponse> {
        const response = await this.post(this.relativePath, {
            apiVersion: '1.0',
            method: 'getIrWavelength',
            params: {
                lightID: this.lightId,
            },
        }, { signal: opts?.signal });

        return new GetIrWavelengthResponse(response.toString());
    }

    public readonly relativePath = '/axis-cgi/lightcontrol.cgi';
}
