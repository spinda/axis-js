import { Connection, DeviceRequest } from 'axis-core';
import { FactoryDefaultResponse } from './FactoryDefaultResponse';
import { FactoryDefaultType } from './FactoryDefaultType';

export class FactoryDefaultRequest extends DeviceRequest {
    constructor(connection: Connection, private readonly type: FactoryDefaultType) {
        super(connection);
    }

    public async send(opts?: { signal?: AbortSignal }): Promise<FactoryDefaultResponse> {
        const response = await this.get(this.relativePath, { signal: opts?.signal });

        return new FactoryDefaultResponse(response.toString(), this.type);
    }

    public get relativePath(): string {
        return this.type === FactoryDefaultType.Partial ? '/axis-cgi/factorydefault.cgi' : '/axis-cgi/hardfactorydefault.cgi';
    }
}
