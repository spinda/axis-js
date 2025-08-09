import { Connection, DeviceRequest } from 'axis-core';
import { PerformAutoFocusResponse } from './PerformAutoFocusResponse';

export class PerformAutoFocusRequest extends DeviceRequest {
    public readonly relativePath = '/axis-cgi/opticscontrol.cgi';

    constructor(
        connection: Connection,
        private readonly opticsIds: string[],
    ) {
        super(connection);
    }

    async send(opts?: { signal?: AbortSignal }): Promise<PerformAutoFocusResponse> {
        const body = {
            apiVersion: '1.2',
            method: 'performAutofocus',
            params: {
                optics: this.opticsIds.map((opticsId) => ({ opticsId })),
            },
        };

        const response = await this.post(this.relativePath, JSON.stringify(body), { signal: opts?.signal });
        return new PerformAutoFocusResponse(response.toString());
    }
}
