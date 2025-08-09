import { Connection, DeviceRequest } from 'axis-core';
import { GetValidIrWavelengthsResponse } from './GetValidIrWavelengthsResponse';

export class GetValidIrWavelengthsRequest extends DeviceRequest {
    constructor(
        connection: Connection,
        private readonly lightId: string,
    ) {
        super(connection);
    }

    public async send(opts?: { signal?: AbortSignal }): Promise<GetValidIrWavelengthsResponse> {
        const response = await this.post(this.relativePath, {
            apiVersion: '1.0',
            method: 'getValidIrWavelengths',
            params: {
                lightID: this.lightId,
            },
        }, { signal: opts?.signal });

        return new GetValidIrWavelengthsResponse(response.toString());
    }

    public readonly relativePath = '/axis-cgi/lightcontrol.cgi';
}
