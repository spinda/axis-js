import { JsonDeviceResponse, UnknownError } from 'axis-core';
import { LightStatus } from '../LightStatus';

export class GetLightStatusResponse extends JsonDeviceResponse {
    private internalData?: LightStatus;

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

        throw new UnknownError('Request for light status was not successful');
    }

    public get data(): LightStatus {
        if (!this.internalData) {
            const payload = this.payload;

            if (payload && 'data' in payload && typeof payload.data === 'object' && payload.data) {
                const data = payload.data;
                this.internalData = {
                    ...('status' in data && typeof data.status === 'boolean' ? { status: data.status } : null),
                };
            } else {
                this.internalData = {};
            }
        }

        return this.internalData;
    }
}
