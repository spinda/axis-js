import { Connection, DeviceRequest } from 'axis-core';
import { RelativeTarget } from '../RelativeTarget';
import { SetRelativeFocusResponse } from './SetRelativeFocusResponse';

export class SetRelativeFocusRequest extends DeviceRequest {
    public readonly relativePath = '/axis-cgi/opticscontrol.cgi';

    constructor(
        connection: Connection,
        private readonly relativeFocusTargets: RelativeTarget[],
    ) {
        super(connection);
    }

    async send(opts?: { signal?: AbortSignal }): Promise<SetRelativeFocusResponse> {
        const body = {
            apiVersion: '1.2',
            method: 'setRelativeFocus',
            params: {
                optics: this.relativeFocusTargets,
            },
        };

        const response = await this.post(this.relativePath, JSON.stringify(body), { signal: opts?.signal });
        return new SetRelativeFocusResponse(response.toString());
    }
}
