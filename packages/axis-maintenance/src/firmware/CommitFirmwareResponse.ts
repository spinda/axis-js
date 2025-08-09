import { JsonDeviceResponse, UnknownError } from 'axis-core';
import { CommitFirmwareData } from './CommitFirmwareData';

export class CommitFirmwareResponse extends JsonDeviceResponse {
    private internalData?: CommitFirmwareData;

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

        throw new UnknownError('Request to commit current firmware was not successful');
    }

    public get data(): CommitFirmwareData {
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
                        'firmwareVersion' in payload.data &&
                            typeof payload.data.firmwareVersion === 'string'
                            ? { firmwareVersion: payload.data.firmwareVersion }
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
