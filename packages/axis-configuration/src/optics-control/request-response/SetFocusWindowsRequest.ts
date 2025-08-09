import { Connection, DeviceRequest } from 'axis-core';
import { FocusWindow } from '../FocusWindow';
import { SetFocusWindowsResponse } from './SetFocusWindowsResponse';

export class SetFocusWindowsRequest extends DeviceRequest {
    public readonly relativePath = '/axis-cgi/opticscontrol.cgi';

    constructor(
        connection: Connection,
        private readonly focusWindows: FocusWindow[],
    ) {
        super(connection);
    }

    async send(opts?: { signal?: AbortSignal }): Promise<SetFocusWindowsResponse> {
        const body = {
            apiVersion: '1.2',
            method: 'setFocusWindow',
            params: {
                optics: this.focusWindows,
            },
        };

        const response = await this.post(this.relativePath, JSON.stringify(body), { signal: opts?.signal });
        return new SetFocusWindowsResponse(response.toString());
    }
}
