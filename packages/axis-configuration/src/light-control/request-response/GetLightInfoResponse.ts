import { JsonDeviceResponse, UnknownError } from 'axis-core';
import { LightInfo } from '../LightInfo';

export class GetLightInfoResponse extends JsonDeviceResponse {
    private internalData?: LightInfo;

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

        throw new UnknownError('Request for light information was not successful');
    }

    public get data(): LightInfo {
        if (!this.internalData) {
            const payload = this.payload;

            if (
                payload &&
                'data' in payload &&
                typeof payload.data === 'object' &&
                payload.data &&
                'items' in payload.data &&
                Array.isArray(payload.data.items)
            ) {
                this.internalData = {
                    items: payload.data.items
                        .filter((item: unknown): item is object => typeof item === 'object' && !!item)
                        .map((item) => ({
                            ...('lightID' in item && typeof item.lightID === 'string' ? { lightId: item.lightID } : null),
                            ...('lightType' in item && typeof item.lightType === 'string' ? { lightType: item.lightType } : null),
                            ...('enabled' in item && typeof item.enabled === 'boolean' ? { enabled: item.enabled } : null),
                            ...('synchronizeDayNightMode' in item && typeof item.synchronizeDayNightMode === 'boolean'
                                ? { synchronizeDayNightMode: item.synchronizeDayNightMode }
                                : null),
                            ...('lightState' in item && typeof item.lightState === 'boolean' ? { lightState: item.lightState } : null),
                            ...('automaticIntensityMode' in item && typeof item.automaticIntensityMode === 'boolean'
                                ? { automaticIntensityMode: item.automaticIntensityMode }
                                : null),
                            ...('automaticAngleOfIlluminationMode' in item && typeof item.automaticAngleOfIlluminationMode === 'boolean'
                                ? { automaticAngleOfIlluminationMode: item.automaticAngleOfIlluminationMode }
                                : null),
                            ...('nrOfLEDs' in item && typeof item.nrOfLEDs === 'number' ? { nrOfLEDs: item.nrOfLEDs } : null),
                            ...('error' in item && typeof item.error === 'boolean' ? { error: item.error } : null),
                            ...('errorInfo' in item && typeof item.errorInfo === 'string' ? { errorInfo: item.errorInfo } : null),
                        })),
                };
            } else {
                this.internalData = {};
            }
        }

        return this.internalData;
    }
}
