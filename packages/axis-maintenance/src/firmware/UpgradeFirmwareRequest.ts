import { randomBytes } from 'node:crypto';
import fs from 'node:fs';
import { Readable } from 'node:stream';
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

        // The firmware management API is very particular about the HTTP request format it will
        // accept across different Axis OS firmware versions, so we construct it manually.
        // See: https://developer.axis.com/vapix/network-video/firmware-management-api/#upgrade-firmware

        const boundary = `axis-firmware-${randomBytes(16).toString('hex')}`;

        // The JSON data *must* be encoded precisely as its presented here, *without* a filename
        // but *with* a content type. Otherwise, some Axis OS versions reject the request with
        // "Only string objects allowed.". This means that we can't use `FormData` to build the
        // request body, since it forces a filename.
        const prefixBytes = Buffer.from(
            `--${boundary}\r\n` +
                'Content-Disposition: form-data; name="json"\r\n' +
                'Content-Type: application/json\r\n\r\n' +
                `${JSON.stringify(data)}\r\n` +
                `--${boundary}\r\n` +
                'Content-Disposition: form-data; name="file"; filename="firmware.bin"\r\n' +
                'Content-Type: application/octet-stream\r\n\r\n',
            'utf8',
        );

        const suffixBytes = Buffer.from(`\r\n--${boundary}--\r\n`, 'utf8');

        const firmwareByteLength = fs.statSync(this.firmwarePath).size;
        const firmwareByteStream = fs.createReadStream(this.firmwarePath);
        firmwareByteStream.on('error', () => {});

        const contentLength = prefixBytes.byteLength + firmwareByteLength + suffixBytes.byteLength;
        const body = Readable.from(
            (async function* () {
                try {
                    yield prefixBytes;
                    yield* firmwareByteStream;
                    yield suffixBytes;
                } finally {
                    firmwareByteStream.destroy();
                }
            })(),
        );
        body.on('error', () => {});

        try {
            const response = await this.post(this.relativePath, body, {
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${boundary}`,
                    'Content-Length': String(contentLength),
                },
                // Disable retries for this request since it has a (large) streaming body.
                retry: false,
                signal: opts?.signal,
            });

            return new UpgradeFirmwareResponse(response.toString());
        } catch (error) {
            body.destroy();
            firmwareByteStream.destroy();
            throw error;
        }
    }

    public get relativePath(): string {
        return '/axis-cgi/firmwaremanagement.cgi';
    }
}
