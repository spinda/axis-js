import { Connection, DeviceRequest } from 'axis-core';
import { StopAutoFirmwareRollbackResponse } from './StopAutoFirmwareRollbackResponse';

export class StopAutoFirmwareRollbackRequest extends DeviceRequest {
    constructor(connection: Connection) {
        super(connection);
    }

    public async send(opts?: { signal?: AbortSignal }): Promise<StopAutoFirmwareRollbackResponse> {
        const response = await this.post(this.relativePath, {
            apiVersion: '1.0',
            method: 'stopAuto',
        }, { signal: opts?.signal });

        return new StopAutoFirmwareRollbackResponse(response.toString());
    }

    public get relativePath(): string {
        return '/axis-cgi/firmwaremanagement.cgi';
    }
}
