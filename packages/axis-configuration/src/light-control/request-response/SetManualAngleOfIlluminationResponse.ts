import { JsonDeviceResponse, UnknownError } from 'axis-core';

export class SetManualAngleOfIlluminationResponse extends JsonDeviceResponse {
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

        throw new UnknownError('Request to set manual angle of illumination was not successful');
    }
}
