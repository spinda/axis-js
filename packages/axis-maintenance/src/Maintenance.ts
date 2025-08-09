import { Connection } from 'axis-core';
import { FactoryDefaultType } from './factory-default';
import { FactoryDefaultRequest } from './factory-default/FactoryDefaultRequest';
import { CommitFirmwareRequest } from './firmware/CommitFirmwareRequest';
import { CommitFirmwareData } from './firmware/CommitFirmwareData';
import { FirmwareStatusRequest } from './firmware/FirmwareStatusRequest';
import { FirmwareStatusData } from './firmware/FirmwareStatusData';
import { PurgeFirmwareRequest } from './firmware/PurgeFirmwareRequest';
import { StopAutoFirmwareRollbackRequest } from './firmware/StopAutoFirmwareRollbackRequest';
import { UpgradeFirmwareParams } from './firmware/UpgradeFirmwareParams';
import { UpgradeFirmwareRequest } from './firmware/UpgradeFirmwareRequest';
import { UpgradeFirmwareData } from './firmware/UpgradeFirmwareData';
import { RestartRequest } from './restart/RestartRequest';

export { CommitFirmwareData, FirmwareStatusData, UpgradeFirmwareData };

/**
 * Class responsible for running maintenance operations on devices from Axis Communication.
 */
export class Maintenance {
    /**
     * Initializes a new instance of the class.
     * @param connection The connection to the device.
     */
    constructor(private readonly connection: Connection) {}

    /**
     * Restarts the Axis device.
     *
     * The returned promise is resolved when the device accepts the restart request, before
     * disconnecting from the network.
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     * @throws {UnknownError} Error cause is unknown.
     */
    public async restart(opts?: { signal?: AbortSignal }): Promise<void> {
        const request = new RestartRequest(this.connection);
        const response = await request.send({ signal: opts?.signal });

        response.assertSuccess();
    }

    /**
     * Resets the Axis device to factory default.
     *
     * The returned promise is resolved when the device accepts the factory default request, before
     * disconnecting from the network.
     * @param type The type of factory default.
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     * @throws {UnknownError} Error cause is unknown.
     */
    public async factoryDefault(type: FactoryDefaultType, opts?: { signal?: AbortSignal }): Promise<void> {
        const request = new FactoryDefaultRequest(this.connection, type);
        const response = await request.send({ signal: opts?.signal });

        response.assertSuccess();
    }

    /**
     * Retrieve the current firmware status of the Axis product.
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     * @throws {UnknownError} Error cause is unknown.
     */
    public async firmwareStatus(opts?: { signal?: AbortSignal }): Promise<FirmwareStatusData> {
        const request = new FirmwareStatusRequest(this.connection);
        const response = await request.send({ signal: opts?.signal });

        response.assertSuccess();
        return response.data;
    }

    /**
     * Upgrade the firmware. After the Axis product has been upgraded with a new firmware, it is
     * rebooted as part of this method.
     *
     * The returned promise is resolved when the device accepts the firmware upgrade request,
     * before disconnecting from the network.
     * @param firmware The firmware to upload to the camera.
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     * @throws {UnknownError} Error cause is unknown.
     */
    public async upgradeFirmware(
        firmwarePath: string | Buffer | URL,
        params?: UpgradeFirmwareParams,
        opts?: { signal?: AbortSignal },
    ):
        Promise<UpgradeFirmwareData>
    {
        const request = new UpgradeFirmwareRequest(this.connection, firmwarePath, params);
        const response = await request.send({ signal: opts?.signal });

        response.assertSuccess();
        return response.data;
    }

    /**
     * Commit the current firmware and stops automatic firmware rollback if it was pending.
     *
     * This method does nothing if the firmware is already committed.
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     * @throws {UnknownError} Error cause is unknown.
     */
    public async commitFirmware(opts?: { signal?: AbortSignal }): Promise<CommitFirmwareData> {
        const request = new CommitFirmwareRequest(this.connection);
        const response = await request.send({ signal: opts?.signal });

        response.assertSuccess();
        return response.data;
    }

    /**
     * Purge previous firmware to prevent rollback.
     *
     * This can only be done when the current firmware is committed and no upgrade is in progress.
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     * @throws {UnknownError} Error cause is unknown.
     */
    public async purgeFirmware(opts?: { signal?: AbortSignal }): Promise<void> {
        const request = new PurgeFirmwareRequest(this.connection);
        const response = await request.send({ signal: opts?.signal });

        response.assertSuccess();
    }

    /**
     * Stop pending auto rollback timer. This method will not commit the firmware.
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     * @throws {UnknownError} Error cause is unknown.
     */
    public async stopAutoFirmwareRollback(opts?: { signal?: AbortSignal }): Promise<void> {
        const request = new StopAutoFirmwareRollbackRequest(this.connection);
        const response = await request.send({ signal: opts?.signal });

        response.assertSuccess();
    }
}
