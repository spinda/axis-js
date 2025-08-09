import { JsonDeviceResponse, UnknownError } from 'axis-core';
import { IrCutFilterState } from '../IrCutFilterState';
import { OpticsData } from '../OpticsData';

export class GetOpticsResponse extends JsonDeviceResponse {
    private internalData?: OpticsData;

    constructor(response: string) {
        super(response);
    }

    public assertSuccess(): void {
        const payload = this.payload;

        if (payload) {
            if (!('error' in payload) || !payload.error) {
                return;
            }

            if (
                typeof payload.error === 'object' && payload.error && 'message' in payload.error
                && typeof payload.error.message === 'string'
            ) {
                throw new UnknownError(payload.error.message);
            }
        }

        throw new UnknownError('Request for optics information was not successful');
    }

    public get data(): OpticsData {
        if (!this.internalData) {
            const payload = this.payload;

            if (payload && 'data' in payload && typeof payload.data === 'object' && payload.data) {
                const data = payload.data;
                this.internalData = {
                    ...('numberOfOptics' in data && typeof data.numberOfOptics === 'number'
                        ? { numberOfOptics: data.numberOfOptics }
                        : null),
                    ...('optics' in data && Array.isArray(data.optics)
                        ? {
                            optics: data.optics
                                .filter((item: unknown): item is object => typeof item === 'object' && !!item)
                                .map((item) => ({
                                    ...('opticsId' in item && typeof item.opticsId === 'string'
                                        ? { opticsId: item.opticsId }
                                        : null),
                                    ...('focusPosition' in item && typeof item.focusPosition === 'number'
                                        ? { focusPosition: item.focusPosition }
                                        : null),
                                    ...('focusMoving' in item && typeof item.focusMoving === 'boolean'
                                        ? { focusMoving: item.focusMoving }
                                        : null),
                                    ...('focusWindowUpperLeftX' in item
                                        && typeof item.focusWindowUpperLeftX === 'number'
                                        ? { focusWindowUpperLeftX: item.focusWindowUpperLeftX }
                                        : null),
                                    ...('focusWindowUpperLeftY' in item
                                        && typeof item.focusWindowUpperLeftY === 'number'
                                        ? { focusWindowUpperLeftY: item.focusWindowUpperLeftY }
                                        : null),
                                    ...('focusWindowWidth' in item && typeof item.focusWindowWidth === 'number'
                                        ? { focusWindowWidth: item.focusWindowWidth }
                                        : null),
                                    ...('focusWindowHeight' in item && typeof item.focusWindowHeight === 'number'
                                        ? { focusWindowHeight: item.focusWindowHeight }
                                        : null),
                                    ...('magnification' in item && typeof item.magnification === 'number'
                                        ? { magnification: item.magnification }
                                        : null),
                                    ...('zoomMoving' in item && typeof item.zoomMoving === 'boolean'
                                        ? { zoomMoving: item.zoomMoving }
                                        : null),
                                    ...('temperatureCompensation' in item
                                        && typeof item.temperatureCompensation === 'boolean'
                                        ? { temperatureCompensation: item.temperatureCompensation }
                                        : null),
                                    ...('irCutFilterState' in item && typeof item.irCutFilterState === 'string'
                                        && Object.values(IrCutFilterState).includes(
                                            item.irCutFilterState as IrCutFilterState,
                                        )
                                        ? { irCutFilterState: item.irCutFilterState as IrCutFilterState }
                                        : null),
                                    ...('irCompensation' in item && typeof item.irCompensation === 'boolean'
                                        ? { irCompensation: item.irCompensation }
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
