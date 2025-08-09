export type FirmwareStatusData = {
    /**
     * Current firmware version.
     */
    activeFirmwareVersion?: string;
    /**
     * Current firmware part number.
     */
    activeFirmwarePart?: string;
    /**
     * Inactive firmware version. This is only present if an inactive firmware exists, which will
     * be reporteed as "UNKNOWN" if the inactive firmware doesn't support the automatic firmware
     * rollback parameters.
     */
    inactiveFirmwareVersion?: string;
    /**
     * True if the current firmware is committed. False if the current firmware is uncommitted and
     * will roll back on reboot. This is only present if an inactive firmware exists.
     */
    isCommitted?: boolean;
    /**
     * Pending auto commit. Has the value "started" if the current firmware will be
     * automatically committed once the device has finished booting. This is only present if the
     * active firmware is uncommitted and an automatic commit is pending.
     */
    pendingCommit?: 'started';
    /**
     * Number of seconds left to automatic rollback. This is only present if active firmware is
     * uncommitted and an automatic rollback is pending.
     */
    timeToRollback?: number;
    /**
     * The date and time when the Axis product was upgraded. This is only present if an inactive
     * firmware exists.
     */
    lastUpgradeAt?: string;
};
