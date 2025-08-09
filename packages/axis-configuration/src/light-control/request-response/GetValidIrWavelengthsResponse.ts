import { JsonDeviceResponse, UnknownError } from 'axis-core';
import { ValidIrWavelengthsData } from '../ValidIrWavelengthsData';

export class GetValidIrWavelengthsResponse extends JsonDeviceResponse {
    private internalData?: ValidIrWavelengthsData;

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

        throw new UnknownError('Request for valid IR wavelengths was not successful');
    }

    public get data(): ValidIrWavelengthsData {
        if (!this.internalData) {
            const payload = this.payload;

            if (payload && 'data' in payload && typeof payload.data === 'object' && payload.data) {
                const data = payload.data;
                this.internalData = {
                    ...('wavelength' in data && Array.isArray(data.wavelength)
                        ? {
                              wavelengths: data.wavelength.filter((wavelength: unknown) => typeof wavelength === 'string'),
                          }
                        : null),
                };
            } else {
                this.internalData = {};
            }
        }

        return this.internalData;
    }
}
