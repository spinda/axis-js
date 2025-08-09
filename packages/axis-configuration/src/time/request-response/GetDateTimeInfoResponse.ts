import { JsonDeviceResponse, UnknownError } from 'axis-core';
import { DateTimeInfo } from '../DateTimeInfo';

export class GetDateTimeInfoResponse extends JsonDeviceResponse {
    private internalData?: DateTimeInfo;

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

        throw new UnknownError('Request for date/time info was not successful');
    }

    public get data(): DateTimeInfo {
        if (!this.internalData) {
            const payload = this.payload;

            if (payload && 'data' in payload && typeof payload.data === 'object' && payload.data) {
                this.internalData = {
                    ...('dateTime' in payload.data && typeof payload.data.dateTime === 'string' ? { dateTime: payload.data.dateTime } : null),
                    ...('maxYearSupported' in payload.data && typeof payload.data.maxYearSupported === 'number'
                        ? { maxYearSupported: payload.data.maxYearSupported }
                        : null),
                    ...('localDateTime' in payload.data && typeof payload.data.localDateTime === 'string'
                        ? { localDateTime: payload.data.localDateTime }
                        : null),
                    ...('timeZone' in payload.data && typeof payload.data.timeZone === 'string' ? { timeZone: payload.data.timeZone } : null),
                    ...('posixTimeZone' in payload.data && typeof payload.data.posixTimeZone === 'string'
                        ? { posixTimeZone: payload.data.posixTimeZone }
                        : null),
                    ...('dstEnabled' in payload.data && typeof payload.data.dstEnabled === 'boolean' ? { dstEnabled: payload.data.dstEnabled } : null),
                    ...('dhcpTimeZone' in payload.data && typeof payload.data.dhcpTimeZone === 'string' ? { dhcpTimeZone: payload.data.dhcpTimeZone } : null),
                    ...('dhcpTimeZoneUtilized' in payload.data && typeof payload.data.dhcpTimeZoneUtilized === 'boolean'
                        ? { dhcpTimeZoneUtilized: payload.data.dhcpTimeZoneUtilized }
                        : null),
                    ...('timeZones' in payload.data &&
                    Array.isArray(payload.data.timeZones) &&
                    payload.data.timeZones.every((timeZone) => typeof timeZone === 'string')
                        ? { timeZones: payload.data.timeZones }
                        : null),
                };
            } else {
                this.internalData = {};
            }
        }

        return this.internalData;
    }
}
