import { JsonDeviceResponse, UnknownError } from 'axis-core';
import { LightSynchronizeDayNightModeData } from '../LightSynchronizeDayNightModeData';

export class GetLightSynchronizeDayNightModeResponse extends JsonDeviceResponse {
    private internalData?: LightSynchronizeDayNightModeData;

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

        throw new UnknownError('Request for light synchronize day night mode was not successful');
    }

    public get data(): LightSynchronizeDayNightModeData {
        if (!this.internalData) {
            const payload = this.payload;

            if (payload && 'data' in payload && typeof payload.data === 'object' && payload.data) {
                const data = payload.data;
                this.internalData = {
                    ...('enabled' in data && typeof data.enabled === 'boolean' ? { enabled: data.enabled } : null),
                };
            } else {
                this.internalData = {};
            }
        }

        return this.internalData;
    }
}
