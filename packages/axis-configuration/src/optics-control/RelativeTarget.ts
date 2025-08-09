import { RelativeType } from './RelativeType';

export type RelativeTarget = {
    /**
     * The optics ID to change the relative value on.
     */
    opticsId: string;
    /**
     * Possible values: `+bigStep`, `-bigStep`, `+smallStep`, `-smallStep`,
     * `numerical`.
     */
    type: RelativeType;
    /**
     * The desired offset. Use it when `type` is set to `numerical` (optional).
     */
    value?: number;
};
