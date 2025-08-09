import { Connection, DeviceRequest } from 'axis-core';
import { SetIrWavelengthResponse } from './SetIrWavelengthResponse';

export class SetIrWavelengthRequest extends DeviceRequest {
    constructor(
        connection: Connection,
        private readonly lightId: string,
        private readonly irWavelength: string,
    ) {
        super(connection);
    }

    public async send(opts?: { signal?: AbortSignal }): Promise<SetIrWavelengthResponse> {
        const response = await this.post(this.relativePath, {
            apiVersion: '1.0',
            method: 'setIrWavelength',
            params: {
                lightID: this.lightId,
                IRWavelength: this.irWavelength,
            },
        }, { signal: opts?.signal });

        return new SetIrWavelengthResponse(response.toString());
    }

    public readonly relativePath = '/axis-cgi/lightcontrol.cgi';
}
