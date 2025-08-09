/**
 * Abstract class describing a HTTP response.
 */
export abstract class DeviceResponse {
    /**
     * Initializes a new instance of the class.
     * @param response The HTTP response.
     */
    protected constructor(
        /**
         * Gets the raw HTTP response.
         */
        protected readonly response: string
    ) {}

    /**
     * Returns void given valid response, otherwise throws an error.
     */
    public abstract assertSuccess(): void;
}
