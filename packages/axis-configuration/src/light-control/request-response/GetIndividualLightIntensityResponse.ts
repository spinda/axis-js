import { JsonDeviceResponse, UnknownError } from 'axis-core';
import { IndividualLightIntensityData } from '../IndividualLightIntensityData';

export class GetIndividualLightIntensityResponse extends JsonDeviceResponse {
    private internalData?: IndividualLightIntensityData;

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

        throw new UnknownError('Request for individual intensity was not successful');
    }

    public get data(): IndividualLightIntensityData {
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
