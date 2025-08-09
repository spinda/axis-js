export enum OpticsCapability {
    /**
     * Focus control is supported.
     */
    Focus = 'focus',
    /**
     * Zoom control is supported.
     */
    Zoom = 'zoom',
    /**
     * IR Cut Filter control is supported.
     */
    IrCutFilter = 'irCutFilter',
    /**
     * Focus calibration is supported.
     */
    CalibrateFocus = 'calibrateFocus',
    /**
     * Zoom calibration is supported. Please note that this is only present on
     * products where zoom is available.
     */
    CalibrateZoom = 'calibrateZoom',
    /**
     * Temperature compensation for focus is supported.
     */
    CompensateTemperature = 'compensateTemperature',
    /**
     * IR Compensation for focus is supported.
     */
    CompensateIr = 'compensateIr',
}
