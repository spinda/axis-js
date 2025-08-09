export type CalibrationTarget = {
    /**
     * The optics ID to calibrate.
     */
    opticsId: string;
    /**
     * Whether to calibrate focus in optics `opticsId` (optional). Default
     * value is false if this parameter does not get set.
     */
    focus?: boolean;
    /**
     * Whether to calibrate zoom in optics `opticsId` (optional). Default
     * value is false if this parameter does not get set and ignored if no
     * zoom is available on the device.
     */
    zoom?: boolean;
};
