import { Connection, DeviceRequest } from 'axis-core';
import { SnapshotOptions } from '../SnapshotOptions';
import { toQueryString } from './convert';

export class JpegRequest extends DeviceRequest {
    constructor(connection: Connection, private readonly snapshotOpts?: SnapshotOptions) {
        super(connection);
    }

    public async send(opts?: { signal?: AbortSignal }): Promise<Buffer> {
        const response = await this.get(this.relativePath, { signal: opts?.signal });

        return response;
    }

    public get relativePath(): string {
        let url = '/axis-cgi/jpg/image.cgi';

        const queryString = toQueryString(this.snapshotOpts);
        if (queryString !== null) {
            url += '?' + queryString;
        }

        return url;
    }
}
