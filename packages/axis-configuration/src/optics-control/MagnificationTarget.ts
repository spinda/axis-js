export type MagnificationTarget = {
    /**
     * The optics ID to set magnification on.
     */
    opticsId: string;
    /**
     * The new magnification value. Can be a value between 1 and
     * `maxMagnification` in the `getOptics` call.
     */
    magnification: number;
};
