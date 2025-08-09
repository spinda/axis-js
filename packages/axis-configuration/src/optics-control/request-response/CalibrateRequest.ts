import { Connection, DeviceRequest } from 'axis-core';
import { CalibrationTarget } from '../CalibrationTarget';
import { CalibrateResponse } from './CalibrateResponse';

export class CalibrateRequest extends DeviceRequest {
    public readonly relativePath = '/axis-cgi/opticscontrol.cgi';

    constructor(
        connection: Connection,
        private readonly calibrationTargets: CalibrationTarget[],
    ) {
        super(connection);
    }

    async send(opts?: { signal?: AbortSignal }): Promise<CalibrateResponse> {
        const body = {
            apiVersion: '1.2',
            method: 'calibrate',
            params: {
                optics: this.calibrationTargets,
            },
        };

        const response = await this.post(this.relativePath, JSON.stringify(body), { signal: opts?.signal });
        return new CalibrateResponse(response.toString());
    }
}
