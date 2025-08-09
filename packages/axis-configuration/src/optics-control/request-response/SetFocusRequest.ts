import { Connection, DeviceRequest } from 'axis-core';
import { FocusTarget } from '../FocusTarget';
import { SetFocusResponse } from './SetFocusResponse';

export class SetFocusRequest extends DeviceRequest {
    public readonly relativePath = '/axis-cgi/opticscontrol.cgi';

    constructor(
        connection: Connection,
        private readonly focusTargets: FocusTarget[],
    ) {
        super(connection);
    }

    async send(opts?: { signal?: AbortSignal }): Promise<SetFocusResponse> {
        const body = {
            apiVersion: '1.2',
            method: 'setFocus',
            params: {
                optics: this.focusTargets,
            },
        };

        const response = await this.post(this.relativePath, JSON.stringify(body), { signal: opts?.signal });
        return new SetFocusResponse(response.toString());
    }
}
