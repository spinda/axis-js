import { Connection, DeviceRequest } from 'axis-core';
import { MagnificationTarget } from '../MagnificationTarget';
import { SetMagnificationResponse } from './SetMagnificationResponse';

export class SetMagnificationRequest extends DeviceRequest {
    public readonly relativePath = '/axis-cgi/opticscontrol.cgi';

    constructor(
        connection: Connection,
        private readonly magnificationTargets: MagnificationTarget[],
    ) {
        super(connection);
    }

    async send(opts?: { signal?: AbortSignal }): Promise<SetMagnificationResponse> {
        const body = {
            apiVersion: '1.2',
            method: 'setMagnification',
            params: {
                optics: this.magnificationTargets,
            },
        };

        const response = await this.post(this.relativePath, JSON.stringify(body), { signal: opts?.signal });
        return new SetMagnificationResponse(response.toString());
    }
}
