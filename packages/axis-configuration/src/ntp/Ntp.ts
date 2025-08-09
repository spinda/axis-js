import { Connection } from 'axis-core';
import { NtpClientConfiguration } from './NtpClientConfiguration';
import { NtpInfo } from './NtpInfo';
import { GetNtpInfoRequest } from './request-response/GetNtpInfoRequest';
import { SetNtpClientConfigurationRequest } from './request-response/SetNtpClientConfigurationRequest';

/**
 * Class responsible for managing NTP (Network Time Protocol) configuration.
 */
export class Ntp {
    /**
     * Initializes a new instance of the class.
     * @param connection The connection to the device.
     */
    constructor(private readonly connection: Connection) {}

    /**
     * Retrieve the NTP configuration and related information.
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     * @throws {UnknownError} Error cause is unknown.
     */
    public async getNtpInfo(opts?: { signal?: AbortSignal }): Promise<NtpInfo> {
        const request = new GetNtpInfoRequest(this.connection);
        const response = await request.send({ signal: opts?.signal });

        response.assertSuccess();

        return response.data;
    }

    /**
     * Set the NTP client configuration.
     * @param configuration The NTP client configuration to apply.
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     * @throws {UnknownError} Error cause is unknown.
     */
    public async setNtpClientConfiguration(configuration: NtpClientConfiguration, opts?: { signal?: AbortSignal }): Promise<void> {
        const request = new SetNtpClientConfigurationRequest(this.connection, configuration);
        const response = await request.send({ signal: opts?.signal });

        response.assertSuccess();
    }
}
