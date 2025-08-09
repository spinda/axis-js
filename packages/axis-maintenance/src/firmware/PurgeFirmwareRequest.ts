import { Connection, DeviceRequest } from 'axis-core';
import { PurgeFirmwareResponse } from './PurgeFirmwareResponse';

export class PurgeFirmwareRequest extends DeviceRequest {
    constructor(connection: Connection) {
        super(connection);
    }

    public async send(opts?: { signal?: AbortSignal }): Promise<PurgeFirmwareResponse> {
        const response = await this.post(this.relativePath, {
            apiVersion: '1.0',
            method: 'purge',
        }, { signal: opts?.signal });

        return new PurgeFirmwareResponse(response.toString());
    }

    public get relativePath(): string {
        return '/axis-cgi/firmwaremanagement.cgi';
    }
}
