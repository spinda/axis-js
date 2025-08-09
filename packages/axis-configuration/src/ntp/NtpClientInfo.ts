import { NtpServersSource } from './NtpServersSource';

export type NtpClientInfo = {
    /**
     * The desired enabled state of the NTP client.
     * - `true`: The client is enabled and running.
     * - `false`: The client is disabled and not running.
     */
    enabled?: boolean;
    /**
     * Whether NTS should be used.
     * - `true`: The NTP client uses NTS instead of regular NTP.
     * - `false`: NTS is disabled.
     */
    ntsEnabled?: boolean;
    /**
     * Specifies a list of CA certificates to trust for certification
     * validation. Optional.
     */
    ntskeServerCaCerts?: string[];
    /**
     * The source of the server list. Synchronizes time with the NTP client.
     */
    serversSource?: NtpServersSource;
    /**
     * The maximum number of static servers that the client can use for time
     * synchronization.
     */
    maxSupportedStaticServers?: number;
    /**
     * A list of static NTP servers. Should be used if `serversSource` is set to
     * `NtpServersSource.Static` and NTS is disabled.
     */
    staticServers?: string[];
    /**
     * A list of NTP servers received in a DHCP lease. Should be used if
     * `serversSource` is set to `NtpServersSource.Dhcp` and if NTS is disabled.
     */
    advertisedServers?: string[];
    /**
     * A static list of NTS Key Establishment servers used by the NTS and
     * validated by system trusted CA certificates if not specified by
     * `ntkseServerCaCerts`.
     */
    staticNtkseServers?: string[];
    /**
     * Indicates that time has been synced with NTP after a reboot.
     */
    synced?: boolean;
    /**
     * The remaining time (in seconds) until the next synchronization attempt.
     * If no NTP servers are used, the value will be `0`.
     */
    timeToNextSync?: number;
    /**
     * The time offset between local and server time (in milliseconds). Only
     * used if `synced` is set to true.
     */
    timeOffset?: number;
    /**
     * The minimum interval between synchronization attempts sent to the server,
     * where the value is represented as a power of 2 in seconds. For example,
     * a `minPoll` of `6` would mean that the poll interval should not drop
     * below 64 seconds. The default value is `6`.
     */
    minPoll?: number;
    /**
     * The maximum interval between synchronization attempts sent to the server,
     * where the value is represented as a power of 2 in seconds. For example,
     * a `maxPoll` of `10` would mean that the poll interval should not rise
     * above 1024 seconds. The default value is `10`.
     */
    maxPoll?: number;
};
