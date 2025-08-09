import { JsonDeviceResponse, UnknownError } from 'axis-core';
import { LightServiceCapabilities } from '../LightServiceCapabilities';

export class GetLightServiceCapabilitiesResponse extends JsonDeviceResponse {
    private internalData?: LightServiceCapabilities;

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

        throw new UnknownError('Request for service capabilities was not successful');
    }

    public get data(): LightServiceCapabilities {
        if (!this.internalData) {
            const payload = this.payload;

            if (payload && 'data' in payload && typeof payload.data === 'object' && payload.data) {
                const data = payload.data;
                this.internalData = {
                    ...this.parseServiceCapabilities(data),
                    ...('capabilities' in data && Array.isArray(data.capabilities)
                        ? {
                              capabilities: data.capabilities
                                  .filter((item: unknown): item is object => typeof item === 'object' && !!item)
                                  .map((item) => ({
                                      ...('lightID' in item && typeof item.lightID === 'string' ? { lightId: item.lightID } : null),
                                      ...this.parseServiceCapabilities(item),
                                  })),
                          }
                        : null),
                };
            } else {
                this.internalData = {};
            }
        }

        return this.internalData;
    }

    private parseServiceCapabilities(data: object) {
        return {
            ...('automaticIntensitySupport' in data && typeof data.automaticIntensitySupport === 'boolean'
                ? { automaticIntensitySupport: data.automaticIntensitySupport }
                : null),
            ...('manualIntensitySupport' in data && typeof data.manualIntensitySupport === 'boolean'
                ? { manualIntensitySupport: data.manualIntensitySupport }
                : null),
            ...('individualIntensitySupport' in data && typeof data.individualIntensitySupport === 'boolean'
                ? { individualIntensitySupport: data.individualIntensitySupport }
                : null),
            ...('getCurrentIntensitySupport' in data && typeof data.getCurrentIntensitySupport === 'boolean'
                ? { getCurrentIntensitySupport: data.getCurrentIntensitySupport }
                : null),
            ...('manualAngleOfIlluminationSupport' in data && typeof data.manualAngleOfIlluminationSupport === 'boolean'
                ? { manualAngleOfIlluminationSupport: data.manualAngleOfIlluminationSupport }
                : null),
            ...('automaticAngleOfIlluminationSupport' in data && typeof data.automaticAngleOfIlluminationSupport === 'boolean'
                ? { automaticAngleOfIlluminationSupport: data.automaticAngleOfIlluminationSupport }
                : null),
            ...('dayNightSynchronizeSupport' in data && typeof data.dayNightSynchronizeSupport === 'boolean'
                ? { dayNightSynchronizeSupport: data.dayNightSynchronizeSupport }
                : null),
            ...('multiIRWaveLengthSupport' in data && typeof data.multiIRWaveLengthSupport === 'boolean'
                ? { multiIrWaveLengthSupport: data.multiIRWaveLengthSupport }
                : null),
        };
    }
}
