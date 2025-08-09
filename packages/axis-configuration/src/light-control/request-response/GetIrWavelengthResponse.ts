import { JsonDeviceResponse, UnknownError } from 'axis-core';
import { IrWavelengthData } from '../IrWavelengthData';

export class GetIrWavelengthResponse extends JsonDeviceResponse {
    private internalData?: IrWavelengthData;

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

        throw new UnknownError('Request for IR wavelength was not successful');
    }

    public get data(): IrWavelengthData {
        if (!this.internalData) {
            const payload = this.payload;

            if (payload && 'data' in payload && typeof payload.data === 'object' && payload.data) {
                const data = payload.data;
                this.internalData = {
                    ...('irWavelength' in data && typeof data.irWavelength === 'string' ? { irWavelength: data.irWavelength } : null),
                };
            } else {
                this.internalData = {};
            }
        }

        return this.internalData;
    }
}
