import { JsonDeviceResponse, UnknownError } from 'axis-core';
import { ValidLightIntensityData } from '../ValidLightIntensityData';

export class GetValidLightIntensityResponse extends JsonDeviceResponse {
    private internalData?: ValidLightIntensityData;

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

        throw new UnknownError('Request for valid intensity was not successful');
    }

    public get data(): ValidLightIntensityData {
        if (!this.internalData) {
            const payload = this.payload;

            if (payload && 'data' in payload && typeof payload.data === 'object' && payload.data) {
                const data = payload.data;
                this.internalData = {
                    ...('ranges' in data && Array.isArray(data.ranges)
                        ? {
                              ranges: data.ranges
                                  .filter((range: unknown): range is object => typeof range === 'object' && !!range)
                                  .map((range) => ({
                                      ...('low' in range && typeof range.low === 'number' ? { low: range.low } : null),
                                      ...('high' in range && typeof range.high === 'number' ? { high: range.high } : null),
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
}
