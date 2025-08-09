import { JsonDeviceResponse, UnknownError } from 'axis-core';
import { SetPosixTimeZoneData } from '../SetPosixTimeZoneData';

export class SetPosixTimeZoneResponse extends JsonDeviceResponse {
    private internalData?: SetPosixTimeZoneData;

    constructor(response: string) {
        super(response);
    }

    public assertSuccess(): void {
        const payload = this.payload;

        if (payload) {
            if (!('error' in payload) || !payload.error) {
                return;
            }

            if (typeof payload.error === 'object' && payload.error && 'message' in payload.error && typeof payload.error.message === 'string') {
                throw new UnknownError(payload.error.message);
            }
        }

        throw new UnknownError('Request to set POSIX time zone was not successful');
    }

    public get data(): SetPosixTimeZoneData {
        if (!this.internalData) {
            const payload = this.payload;

            if (payload && 'data' in payload && typeof payload.data === 'object' && payload.data) {
                this.internalData = {
                    ...('posixTimeZone' in payload.data && typeof payload.data.posixTimeZone === 'string'
                        ? { posixTimeZone: payload.data.posixTimeZone }
                        : null),
                    ...('dstEnabled' in payload.data && typeof payload.data.dstEnabled === 'boolean' ? { dstEnabled: payload.data.dstEnabled } : null),
                };
            } else {
                this.internalData = {};
            }
        }

        return this.internalData;
    }
}
