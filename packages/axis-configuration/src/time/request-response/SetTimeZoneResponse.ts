import { JsonDeviceResponse, UnknownError } from 'axis-core';
import { SetTimeZoneData } from '../SetTimeZoneData';

export class SetTimeZoneResponse extends JsonDeviceResponse {
    private internalData?: SetTimeZoneData;

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

        throw new UnknownError('Request to set time zone was not successful');
    }

    public get data(): SetTimeZoneData {
        if (!this.internalData) {
            const payload = this.payload;

            if (payload && 'data' in payload && typeof payload.data === 'object' && payload.data) {
                this.internalData = {
                    ...('timeZone' in payload.data && typeof payload.data.timeZone === 'string' ? { timeZone: payload.data.timeZone } : null),
                };
            } else {
                this.internalData = {};
            }
        }

        return this.internalData;
    }
}
