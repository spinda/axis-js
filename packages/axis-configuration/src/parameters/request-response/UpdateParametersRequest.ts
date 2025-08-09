import { Connection, DeviceRequest } from 'axis-core';
import { UpdateParametersResponse } from './UpdateParametersResponse';

export class UpdateParametersRequest extends DeviceRequest {
    private readonly parameters: { [name: string]: string };

    constructor(connection: Connection, parameters: { [name: string]: string }) {
        super(connection);
        this.parameters = parameters;
    }

    public async send(opts?: { signal?: AbortSignal }): Promise<UpdateParametersResponse> {
        const response = await this.post(this.relativePath, new URLSearchParams({
            ...this.parameters,
            action: 'update',
        }), { signal: opts?.signal });
        return new UpdateParametersResponse(response.toString());
    }

    public readonly relativePath = '/axis-cgi/param.cgi';
}
