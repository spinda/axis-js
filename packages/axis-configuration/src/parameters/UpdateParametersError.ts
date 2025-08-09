/**
 * Error thrown when updating parameters fails.
 */
export class UpdateParametersError extends Error {
    /**
     * Initializes a new instance of the class.
     * @param parameterNames The names of parameters that couldn't be updated.
     */
    constructor(
        /**
         * Gets the names of parameters that couldn't be updated.
         */
        public readonly parameterNames: string[],
    ) {
        const humanReadableParameterNames = parameterNames.map((parameterName) =>
            JSON.stringify(parameterName)
        ).join(', ');
        const parameterNamesPlural = parameterNames.length > 1 ? 's' : '';
        super(
            `Failed to set parameter${parameterNamesPlural} ${humanReadableParameterNames}`,
        );
        Object.setPrototypeOf(this, UpdateParametersError.prototype);
    }
}
