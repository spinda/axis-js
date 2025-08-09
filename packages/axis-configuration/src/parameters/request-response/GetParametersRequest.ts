import { Connection, DeviceRequest } from 'axis-core';
import { Converter } from './Converter';
import { GetParametersResponse } from './GetParametersResponse';

export class GetParametersRequest extends DeviceRequest {
    private readonly parameterGroups: string[];

    constructor(connection: Connection, ...parameterGroups: string[]) {
        super(connection);
        this.parameterGroups = parameterGroups;
    }

    public async send(opts?: { signal?: AbortSignal }): Promise<GetParametersResponse> {
        const response = await this.get(this.relativePath, { signal: opts?.signal });

        return new GetParametersResponse(response.toString());
    }

    public get relativePath(): string {
        return `/axis-cgi/param.cgi?action=list${Converter.toGroup(this.parameterGroups)}&responseformat=rfc`;
    }
}
