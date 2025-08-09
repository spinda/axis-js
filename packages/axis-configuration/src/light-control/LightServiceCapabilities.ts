import { LightServiceCapabilitiesItem } from './LightServiceCapabilitiesItem';

export type LightServiceCapabilities = Omit<LightServiceCapabilitiesItem, 'lightId'> & {
    /**
     * Container for supported capabilities for each LED group.
     */
    capabilities?: LightServiceCapabilitiesItem[];
};
