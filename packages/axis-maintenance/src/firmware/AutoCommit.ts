export enum AutoCommit {
    /**
     * The firmware is never committed automatically and must be committed via the commit method.
     */
    Never = 'never',
    /**
     * The firmware is committed when it starts booting.
     */
    Boot = 'boot',
    /**
     * The firmware is comitted when the device has finished booting.
     */
    Started = 'started',
}
