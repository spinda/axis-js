import { JsonDeviceResponse, UnknownError } from 'axis-core';
import { ManualAngleOfIlluminationData } from '../ManualAngleOfIlluminationData';

export class GetManualAngleOfIlluminationResponse extends JsonDeviceResponse {
    private internalData?: ManualAngleOfIlluminationData;

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

        throw new UnknownError('Request for manual angle of illumination was not successful');
    }

    public get data(): ManualAngleOfIlluminationData {
        if (!this.internalData) {
            const payload = this.payload;

            if (payload && 'data' in payload && typeof payload.data === 'object' && payload.data) {
                const data = payload.data;
                this.internalData = {
                    ...('angleOfIllumination' in data && typeof data.angleOfIllumination === 'number'
                        ? { angleOfIllumination: data.angleOfIllumination }
                        : null),
                };
            } else {
                this.internalData = {};
            }
        }

        return this.internalData;
    }
}
