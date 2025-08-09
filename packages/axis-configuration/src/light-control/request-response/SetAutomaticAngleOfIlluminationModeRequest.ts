import { Connection, DeviceRequest } from 'axis-core';
import { SetAutomaticAngleOfIlluminationModeResponse } from './SetAutomaticAngleOfIlluminationModeResponse';

export class SetAutomaticAngleOfIlluminationModeRequest extends DeviceRequest {
    constructor(
        connection: Connection,
        private readonly lightId: string,
        private readonly enabled: boolean,
    ) {
        super(connection);
    }

    public async send(opts?: { signal?: AbortSignal }): Promise<SetAutomaticAngleOfIlluminationModeResponse> {
        const response = await this.post(this.relativePath, {
            apiVersion: '1.0',
            method: 'setAutomaticAngleOfIlluminationMode',
            params: {
                lightID: this.lightId,
                enabled: this.enabled,
            },
        }, { signal: opts?.signal });

        return new SetAutomaticAngleOfIlluminationModeResponse(response.toString());
    }

    public readonly relativePath = '/axis-cgi/lightcontrol.cgi';
}
