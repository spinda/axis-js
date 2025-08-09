import fs from 'node:fs';
import { Connection, DeviceRequest } from 'axis-core';
import { UpgradeFirmwareParams } from './UpgradeFirmwareParams';
import { UpgradeFirmwareResponse } from './UpgradeFirmwareResponse';

export class UpgradeFirmwareRequest extends DeviceRequest {
    constructor(
        connection: Connection,
        private readonly firmwarePath: string | Buffer | URL,
        private readonly params?: UpgradeFirmwareParams,
    ) {
        super(connection);
    }

    public async send(opts?: { signal?: AbortSignal }): Promise<UpgradeFirmwareResponse> {
        const data = {
            apiVersion: '1.0',
            method: 'upgrade',
            ...(this.params ? { params: this.params } : null),
        };

        const body = new FormData();
        body.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));
        body.append(
            'filename',
            await fs.openAsBlob(this.firmwarePath, { type: 'application/octet-stream' }),
        );

        // Disable retries for this request since it has a (large) streaming body.
        const response = await this.post(this.relativePath, body, { retry: false, signal: opts?.signal });

        return new UpgradeFirmwareResponse(response.toString());
    }

    public get relativePath(): string {
        return '/axis-cgi/firmwaremanagement.cgi';
    }
}
