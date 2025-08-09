import { IrCutFilterState } from './IrCutFilterState';

export type IrCutFilterTarget = {
    /**
     * The optics ID to set the IR cut filter on.
     */
    opticsId: string;
    /**
     * Specifies the state for the IR cut filter.
     */
    irCutFilterState: IrCutFilterState;
};
