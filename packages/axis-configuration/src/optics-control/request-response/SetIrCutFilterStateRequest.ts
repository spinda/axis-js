import { Connection, DeviceRequest } from 'axis-core';
import { IrCutFilterTarget } from '../IrCutFilterTarget';
import { SetIrCutFilterStateResponse } from './SetIrCutFilterStateResponse';

export class SetIrCutFilterStateRequest extends DeviceRequest {
    public readonly relativePath = '/axis-cgi/opticscontrol.cgi';

    constructor(
        connection: Connection,
        private readonly irCutFilterTargets: IrCutFilterTarget[],
    ) {
        super(connection);
    }

    async send(opts?: { signal?: AbortSignal }): Promise<SetIrCutFilterStateResponse> {
        const body = {
            apiVersion: '1.2',
            method: 'setIrCutFilterState',
            params: {
                optics: this.irCutFilterTargets,
            },
        };

        const response = await this.post(this.relativePath, JSON.stringify(body), { signal: opts?.signal });
        return new SetIrCutFilterStateResponse(response.toString());
    }
}
