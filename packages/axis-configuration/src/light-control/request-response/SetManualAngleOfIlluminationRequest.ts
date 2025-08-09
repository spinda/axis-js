import { Connection, DeviceRequest } from 'axis-core';
import { SetManualAngleOfIlluminationResponse } from './SetManualAngleOfIlluminationResponse';

export class SetManualAngleOfIlluminationRequest extends DeviceRequest {
    constructor(
        connection: Connection,
        private readonly lightId: string,
        private readonly angleOfIllumination: number,
    ) {
        super(connection);
    }

    public async send(opts?: { signal?: AbortSignal }): Promise<SetManualAngleOfIlluminationResponse> {
        const response = await this.post(this.relativePath, {
            apiVersion: '1.0',
            method: 'setManualAngleOfIllumination',
            params: {
                lightID: this.lightId,
                angleOfIllumination: this.angleOfIllumination,
            },
        }, { signal: opts?.signal });

        return new SetManualAngleOfIlluminationResponse(response.toString());
    }

    public readonly relativePath = '/axis-cgi/lightcontrol.cgi';
}
