import { Connection, DeviceRequest } from 'axis-core';
import { CompensationTarget } from '../CompensationTarget';
import { SetIrCompensationResponse } from './SetIrCompensationResponse';

export class SetIrCompensationRequest extends DeviceRequest {
    public readonly relativePath = '/axis-cgi/opticscontrol.cgi';

    constructor(
        connection: Connection,
        private readonly irCompensationTargets: CompensationTarget[],
    ) {
        super(connection);
    }

    async send(opts?: { signal?: AbortSignal }): Promise<SetIrCompensationResponse> {
        const body = {
            apiVersion: '1.2',
            method: 'setIrCompensation',
            params: {
                optics: this.irCompensationTargets,
            },
        };

        const response = await this.post(this.relativePath, JSON.stringify(body), { signal: opts?.signal });
        return new SetIrCompensationResponse(response.toString());
    }
}
