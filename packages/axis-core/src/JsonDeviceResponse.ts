import { DeviceResponse } from './DeviceResponse';

/**
 * Abstract class describing a JSON HTTP response.
 */
export abstract class JsonDeviceResponse extends DeviceResponse {
    private internalPayload?: object | null;

    /**
     * Initializes a new instance of the class.
     * @param response The JSON HTTP response.
     */
    protected constructor(response: string) {
        super(response);
    }

    /**
     * Returns the parsed payload of the JSON response.
     */
    protected get payload(): object | null {
        if (this.internalPayload === undefined) {
            let payload: unknown;

            try {
                payload = JSON.parse(this.response);
            } catch {
                payload = null;
            }

            if (typeof payload === 'object') {
                this.internalPayload = payload;
            } else {
                this.internalPayload = null;
            }
        }

        return this.internalPayload;
    }
}
