import { JsonDeviceResponse, UnknownError } from 'axis-core';
import { SetDateTimeData } from '../SetDateTimeData';

export class SetDateTimeResponse extends JsonDeviceResponse {
    private internalData?: SetDateTimeData;

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

        throw new UnknownError('Request to set date/time was not successful');
    }

    public get data(): SetDateTimeData {
        if (!this.internalData) {
            const payload = this.payload;

            if (payload && 'data' in payload && typeof payload.data === 'object' && payload.data) {
                this.internalData = {
                    ...('dateTime' in payload.data && typeof payload.data.dateTime === 'string' ? { dateTime: payload.data.dateTime } : null),
                };
            } else {
                this.internalData = {};
            }
        }

        return this.internalData;
    }
}
