import { Connection, DeviceRequest } from 'axis-core';
import { CommitFirmwareResponse } from './CommitFirmwareResponse';

export class CommitFirmwareRequest extends DeviceRequest {
    constructor(connection: Connection) {
        super(connection);
    }

    public async send(opts?: { signal?: AbortSignal }): Promise<CommitFirmwareResponse> {
        const response = await this.post(this.relativePath, {
            apiVersion: '1.0',
            method: 'commit',
        }, { signal: opts?.signal });

        return new CommitFirmwareResponse(response.toString());
    }

    public get relativePath(): string {
        return '/axis-cgi/firmwaremanagement.cgi';
    }
}
