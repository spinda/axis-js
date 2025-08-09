import { JsonDeviceResponse, UnknownError } from 'axis-core';
import { OpticsCapabilitiesData } from '../OpticsCapabilitiesData';
import { OpticsCapability } from '../OpticsCapability';

export class GetOpticsCapabilitiesResponse extends JsonDeviceResponse {
    private internalData?: OpticsCapabilitiesData;

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

        throw new UnknownError('Request for optics capabilities was not successful');
    }

    public get data(): OpticsCapabilitiesData {
        if (!this.internalData) {
            const payload = this.payload;

            if (payload && 'data' in payload && typeof payload.data === 'object' && payload.data) {
                const data = payload.data;
                this.internalData = {
                    ...('numberOfOptics' in data && typeof data.numberOfOptics === 'number' ? { numberOfOptics: data.numberOfOptics } : null),
                    ...('optics' in data && Array.isArray(data.optics)
                        ? {
                              optics: data.optics
                                  .filter((item: unknown): item is object => typeof item === 'object' && !!item)
                                  .map((item) => ({
                                      ...('opticsId' in item && typeof item.opticsId === 'string' ? { opticsId: item.opticsId } : null),
                                      ...('capabilities' in item && Array.isArray(item.capabilities)
                                          ? {
                                                capabilities: item.capabilities.filter((cap: unknown): cap is OpticsCapability =>
                                                    Object.values(OpticsCapability).includes(cap as OpticsCapability),
                                                ),
                                            }
                                          : null),
                                      ...('maxMagnification' in item && typeof item.maxMagnification === 'number'
                                          ? { maxMagnification: item.maxMagnification }
                                          : null),
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
