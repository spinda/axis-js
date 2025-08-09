import { Connection, DeviceRequest } from 'axis-core';
import { RelativeTarget } from '../RelativeTarget';
import { SetRelativeMagnificationResponse } from './SetRelativeMagnificationResponse';

export class SetRelativeMagnificationRequest extends DeviceRequest {
    public readonly relativePath = '/axis-cgi/opticscontrol.cgi';

    constructor(
        connection: Connection,
        private readonly relativeMagnificationTargets: RelativeTarget[],
    ) {
        super(connection);
    }

    async send(opts?: { signal?: AbortSignal }): Promise<SetRelativeMagnificationResponse> {
        const body = {
            apiVersion: '1.2',
            method: 'setRelativeMagnification',
            params: {
                optics: this.relativeMagnificationTargets,
            },
        };

        const response = await this.post(this.relativePath, JSON.stringify(body), { signal: opts?.signal });
        return new SetRelativeMagnificationResponse(response.toString());
    }
}
