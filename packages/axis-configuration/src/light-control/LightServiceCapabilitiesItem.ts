export type LightServiceCapabilitiesItem = {
    /**
     * The ID of the LEDgroup.
     */
    lightId?: string;
    /**
     * Indicates that `setAutomaticIntensityMode` is supported.
     */
    automaticIntensitySupport?: boolean;
    /**
     * Indicates that `getManualIntensity` and `setManualIntensity` are
     * supported.
     */
    manualIntensitySupport?: boolean;
    /**
     * Indicates that `getIndividualIntensity` and `setIndividualIntensity` are
     * supported.
     */
    individualIntensitySupport?: boolean;
    /**
     * Indicates that `getCurrentIntensity` is supported.
     */
    getCurrentIntensitySupport?: boolean;
    /**
     * Indicates that `setManualAngleOfIllumination` is supported.
     */
    manualAngleOfIlluminationSupport?: boolean;
    /**
     * Indicates that `setAutomaticAngleOfIlluminationMode` is supported.
     */
    automaticAngleOfIlluminationSupport?: boolean;
    /**
     * Indicates that `setLightSynchronizeDayNightMode` is supported.
     */
    dayNightSynchronizeSupport?: boolean;
    /**
     * Indicates that `getValidIRWavelengths`, `setIRWavelength` and
     * `getIRWavelength` are supported.
     */
    multiIrWaveLengthSupport?: boolean;
};
