import { JsonDeviceResponse, UnknownError } from 'axis-core';
import { ManualLightIntensityData } from '../ManualLightIntensityData';

export class GetManualLightIntensityResponse extends JsonDeviceResponse {
    private internalData?: ManualLightIntensityData;

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

        throw new UnknownError('Request for manual intensity was not successful');
    }

    public get data(): ManualLightIntensityData {
        if (!this.internalData) {
            const payload = this.payload;

            if (payload && 'data' in payload && typeof payload.data === 'object' && payload.data) {
                const data = payload.data;
                this.internalData = {
                    ...('intensity' in data && typeof data.intensity === 'number' ? { intensity: data.intensity } : null),
                };
            } else {
                this.internalData = {};
            }
        }

        return this.internalData;
    }
}
