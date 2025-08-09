export type LightInfoItem = {
    /**
     * Unique ID of the light.
     */
    lightId?: string;
    /**
     * Type identifier of the light.
     */
    lightType?: string;
    /**
     * Indicates if the light is enabled.
     */
    enabled?: boolean;
    /**
     * Indicates if the light is synchronized with day/night.
     */
    synchronizeDayNightMode?: boolean;
    /**
     * Indicates if the light is ON or OFF.
     */
    lightState?: boolean;
    /**
     * Indicates if the mode for automatic intensity is active.
     */
    automaticIntensityMode?: boolean;
    /**
     * Indicates if the mode for automatic angle of illumination is active.
     */
    automaticAngleOfIlluminationMode?: boolean;
    /**
     * Number of configurable LEDs in a light group. The light groups are
     * identified by their light ID.
     */
    nrOfLEDs?: number;
    /**
     * An error has occurred.
     */
    error?: boolean;
    /**
     * Error description.
     */
    errorInfo?: string;
};
