import { JsonDeviceResponse, UnknownError } from 'axis-core';
import { CurrentAngleOfIlluminationData } from '../CurrentAngleOfIlluminationData';

export class GetCurrentAngleOfIlluminationResponse extends JsonDeviceResponse {
    private internalData?: CurrentAngleOfIlluminationData;

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

        throw new UnknownError('Request for current angle of illumination was not successful');
    }

    public get data(): CurrentAngleOfIlluminationData {
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
