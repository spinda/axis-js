import { JsonDeviceResponse, UnknownError } from 'axis-core';
import { FirmwareStatusData } from './FirmwareStatusData';

export class FirmwareStatusResponse extends JsonDeviceResponse {
    private internalData?: FirmwareStatusData;

    constructor(response: string) {
        super(response);
    }

    public assertSuccess(): void {
        const payload = this.payload;

        if (payload) {
            if (!('error' in payload) || !payload.error) {
                return;
            }

            if (
                typeof payload.error === 'object' &&
                payload.error &&
                'message' in payload.error &&
                typeof payload.error.message === 'string'
            ) {
                throw new UnknownError(payload.error.message);
            }
        }

        throw new UnknownError('Request for firmware status was not successful');
    }

    public get data(): FirmwareStatusData {
        if (!this.internalData) {
            const payload = this.payload;

            if (
                payload &&
                'data' in payload &&
                typeof payload.data === 'object' &&
                payload.data
            ) {
                this.internalData = {
                    ...(
                        'activeFirmwareVersion' in payload.data &&
                        typeof payload.data.activeFirmwareVersion === 'string'
                            ? { activeFirmwareVersion: payload.data.activeFirmwareVersion }
                            : null
                    ),
                    ...(
                        'activeFirmwarePart' in payload.data &&
                        typeof payload.data.activeFirmwarePart === 'string'
                            ? { activeFirmwarePart: payload.data.activeFirmwarePart }
                            : null
                    ),
                    ...(
                        'inactiveFirmwareVersion' in payload.data &&
                        typeof payload.data.inactiveFirmwareVersion === 'string'
                            ? { inactiveFirmwareVersion: payload.data.inactiveFirmwareVersion }
                            : null
                    ),
                    ...(
                        'isCommitted' in payload.data &&
                        typeof payload.data.isCommitted === 'boolean'
                            ? { isCommitted: payload.data.isCommitted }
                            : null
                    ),
                    ...(
                        'pendingCommit' in payload.data &&
                        payload.data.pendingCommit === 'started'
                            ? { pendingCommit: 'started' }
                            : null
                    ),
                    ...(
                        'timeToRollback' in payload.data &&
                        typeof payload.data.timeToRollback === 'number'
                            ? { timeToRollback: payload.data.timeToRollback }
                            : null
                    ),
                    ...(
                        'lastUpgradeAt' in payload.data &&
                        typeof payload.data.lastUpgradeAt === 'string'
                            ? { lastUpgradeAt: payload.data.lastUpgradeAt }
                            : null
                    ),
                };
            } else {
                this.internalData = {};
            }
        }

        return this.internalData;
    }
}
