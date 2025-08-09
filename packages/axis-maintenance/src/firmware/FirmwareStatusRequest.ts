import { Connection, DeviceRequest } from 'axis-core';
import { FirmwareStatusResponse } from './FirmwareStatusResponse';

export class FirmwareStatusRequest extends DeviceRequest {
    constructor(connection: Connection) {
        super(connection);
    }

    public async send(opts?: { signal?: AbortSignal }): Promise<FirmwareStatusResponse> {
        const response = await this.post(this.relativePath, {
            apiVersion: '1.0',
            method: 'status',
        }, { signal: opts?.signal });

        return new FirmwareStatusResponse(response.toString());
    }

    public get relativePath(): string {
        return '/axis-cgi/firmwaremanagement.cgi';
    }
}
