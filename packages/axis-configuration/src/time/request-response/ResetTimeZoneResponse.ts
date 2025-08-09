import { JsonDeviceResponse, UnknownError } from 'axis-core';

export class ResetTimeZoneResponse extends JsonDeviceResponse {
    constructor(response: string) {
        super(response);
    }

    public assertSuccess(): void {
        const payload = this.payload;

        if (payload) {
            if ('error' in payload && payload.error) {
                if (typeof payload.error === 'object' && payload.error && 'message' in payload.error && typeof payload.error.message === 'string') {
                    throw new UnknownError(payload.error.message);
                }
            }

            if ('data' in payload && typeof payload.data === 'object' && payload.data && 'status' in payload.data && payload.data.status === 'success') {
                return;
            }
        }

        throw new UnknownError('Request to reset time zone was not successful');
    }
}
