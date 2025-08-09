import { Connection } from 'axis-core';
import { SystemReadyData } from './SystemReadyData';
import { SystemReadyParams } from './SystemReadyParams';
import { SystemReadyRequest } from './request-response/SystemReadyRequest';

/**
 * Class responsible for checking whether a device is ready to handle external
 * communication.
 */
export class SystemReady {
    /**
     * Initializes a new instance of the class.
     * @param connection The connection to the device.
     */
    constructor(private readonly connection: Connection) { }

    /**
     * Check if the system is ready for operation.
     * @returns Promise resolving to system ready status data.
     * @throws {RequestError} Request failed.
     * @throws {UnknownError} Error cause is unknown.
     */
    public async checkSystemReady(
        params?: SystemReadyParams,
        opts?: { signal?: AbortSignal },
    ): Promise<SystemReadyData> {
        const request = new SystemReadyRequest(this.connection, params);
        const response = await request.send({ signal: opts?.signal });

        response.assertSuccess();

        return response.data;
    }
}
