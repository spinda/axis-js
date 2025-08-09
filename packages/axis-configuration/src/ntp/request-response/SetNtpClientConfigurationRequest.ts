import { Connection, DeviceRequest } from 'axis-core';
import { NtpClientConfiguration } from '../NtpClientConfiguration';
import { SetNtpClientConfigurationResponse } from './SetNtpClientConfigurationResponse';

export class SetNtpClientConfigurationRequest extends DeviceRequest {
    constructor(
        connection: Connection,
        private readonly configuration: NtpClientConfiguration,
    ) {
        super(connection);
    }

    public async send(opts?: { signal?: AbortSignal }): Promise<SetNtpClientConfigurationResponse> {
        const response = await this.post(this.relativePath, {
            apiVersion: '1.0',
            method: 'setNTPClientConfiguration',
            params: {
                enabled: this.configuration.enabled,
                NTSEnabled: this.configuration.ntsEnabled,
                ...(this.configuration.ntskeServerCaCerts !== undefined ? { NTSKEServerCACerts: this.configuration.ntskeServerCaCerts } : null),
                serversSource: this.configuration.serversSource,
                staticServers: this.configuration.staticServers,
                staticNTSKEServers: this.configuration.staticNtkseServers,
                ...(this.configuration.minPoll !== undefined ? { minpoll: this.configuration.minPoll } : null),
                ...(this.configuration.maxPoll !== undefined ? { maxpoll: this.configuration.maxPoll } : null),
            },
        }, { signal: opts?.signal });

        return new SetNtpClientConfigurationResponse(response.toString());
    }

    public readonly relativePath = '/axis-cgi/ntp.cgi';
}
