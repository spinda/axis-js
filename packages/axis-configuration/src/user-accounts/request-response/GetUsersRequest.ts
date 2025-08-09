import { Connection, DeviceRequest } from 'axis-core';
import { GetUsersResponse } from './GetUsersResponse';

export class GetUsersRequest extends DeviceRequest {
    constructor(connection: Connection) {
        super(connection);
    }

    public async send(opts?: { signal?: AbortSignal }): Promise<GetUsersResponse> {
        const response = await this.get(this.relativePath, { signal: opts?.signal });

        return new GetUsersResponse(response.toString());
    }

    public get relativePath(): string {
        return '/axis-cgi/pwdgrp.cgi?action=get';
    }
}
