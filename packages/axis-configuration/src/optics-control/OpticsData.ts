import { Optics } from './Optics';

export type OpticsData = {
    /**
     * The number of optics available on the device.
     */
    numberOfOptics?: number;
    /**
     * Omitted if `numberOfOptics` is zero.
     */
    optics?: Optics[];
};
