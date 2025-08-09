import { OpticsCapabilities } from './OpticsCapabilities';

export type OpticsCapabilitiesData = {
    /**
     * The number of optics available on the device.
     */
    numberOfOptics?: number;
    /**
     * Omitted if `numberOfOptics` is zero.
     */
    optics?: OpticsCapabilities[];
};
