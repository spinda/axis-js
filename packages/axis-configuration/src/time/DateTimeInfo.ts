export type DateTimeInfo = {
    /**
     * The system date and time in UTC, presented in the ISO 8601 format.
     */
    dateTime?: string;
    /**
     * The latest year that the date can be set to.
     */
    maxYearSupported?: number;
    /**
     * The local date and time in the ISO 8601 format.
     */
    localDateTime?: string;
    /**
     * The system time zone in IANA format, for example `Europe/Stockholm`.
     * Omitted if the IANA time zone isn't available.
     */
    timeZone?: string;
    /**
     * The system time zone in the POSIX format, for example
     * `EST5EDT,M3.2.0,M11.1.0`. Omitted if the POSIX time zone isn't available.
     */
    posixTimeZone?: string;
    /**
     * The DST flag for controlling the POSIX time zone string: Always true if
     * the IANA time zone format is present. Omitted if the POSIX time zone
     * isn't available. true means it will activate the DST settings of the
     * POSIX time zone string. false means it will ignore the DST settings of
     * the POSIX time zone string.
     */
    dstEnabled?: boolean;
    /**
     * The DHCP time zone that can be in either the IANA or POSIX format.
     * Omitted if the DHCP time zone isn’t available. Introduced in API version
     * 1.1.
     */
    dhcpTimeZone?: string;
    /**
     * The DHCP time zone utilization flag. It will indicate if the DHCP time
     * zone is used by the system. Omitted if DHCP time zone isn't available.
     * Introduced in API version 1.1. `true` means that DHCP time zone is used
     * by the system. `false` means that DHCP time zone is not used by the
     * system.
     */
    dhcpTimeZoneUtilized?: boolean;
    /**
     * Contains an array of time zones in the IANA format.
     */
    timeZones?: string[];
};
