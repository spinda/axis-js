import { Connection, DeviceRequest } from 'axis-core';
import { CompensationTarget } from '../CompensationTarget';
import { SetTemperatureCompensationResponse } from './SetTemperatureCompensationResponse';

export class SetTemperatureCompensationRequest extends DeviceRequest {
    public readonly relativePath = '/axis-cgi/opticscontrol.cgi';

    constructor(
        connection: Connection,
        private readonly temperatureCompensationTargets: CompensationTarget[],
    ) {
        super(connection);
    }

    async send(opts?: { signal?: AbortSignal }): Promise<SetTemperatureCompensationResponse> {
        const body = {
            apiVersion: '1.2',
            method: 'setTemperatureCompensation',
            params: {
                optics: this.temperatureCompensationTargets,
            },
        };

        const response = await this.post(this.relativePath, JSON.stringify(body), { signal: opts?.signal });
        return new SetTemperatureCompensationResponse(response.toString());
    }
}
