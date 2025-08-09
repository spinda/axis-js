import { OpticsCapability } from './OpticsCapability';

export type OpticsCapabilities = {
    /**
     * The optics ID.
     */
    opticsId?: string;
    /**
     * An array containing supported capabilities.
     */
    capabilities?: OpticsCapability[];
    /**
     * The largest value that can be set in `magnification`. Note that this is
     * only present on products where zoom is available.
     */
    maxMagnification?: number;
};
