/**
 * The source of the server list.
 */
export enum NtpServersSource {
    /**
     * Uses NTP servers listed in a DHCP lease. Falls back to
     * static if none were obtained.
     */
    Dhcp = 'DHCP',
    /**
     * Uses a static list of NTP servers set by the user.
     */
    Static = 'static',
}
