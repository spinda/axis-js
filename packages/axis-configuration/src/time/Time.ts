import { Connection } from 'axis-core';
import { DateTimeInfo } from './DateTimeInfo';
import { SetDateTimeData } from './SetDateTimeData';
import { SetPosixTimeZoneData } from './SetPosixTimeZoneData';
import { SetTimeZoneData } from './SetTimeZoneData';
import { GetDateTimeInfoRequest } from './request-response/GetDateTimeInfoRequest';
import { ResetTimeZoneRequest } from './request-response/ResetTimeZoneRequest';
import { SetDateTimeRequest } from './request-response/SetDateTimeRequest';
import { SetPosixTimeZoneRequest } from './request-response/SetPosixTimeZoneRequest';
import { SetTimeZoneRequest } from './request-response/SetTimeZoneRequest';

/**
 * Class responsible for managing date, time, and time zone settings.
 */
export class Time {
    /**
     * Initializes a new instance of the class.
     * @param connection The connection to the device.
     */
    constructor(private readonly connection: Connection) {}

    /**
     * Retrieve all date and time related properties provided by the Time API,
     * including a list of supported time zones.
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     * @throws {UnknownError} Error cause is unknown.
     */
    public async getDateTimeInfo(opts?: { signal?: AbortSignal }): Promise<DateTimeInfo> {
        const request = new GetDateTimeInfoRequest(this.connection);
        const response = await request.send({ signal: opts?.signal });

        response.assertSuccess();

        return response.data;
    }

    /**
     * Set the date and time.
     * @param dateTime The date and time in UTC. Should be formatted as
     * `[YYYY]-[MM]-[DD]T[hh]:[mm]:[ss]Z` and be between the epoch and the last
     * second of the year declared by `maxYearSupported`. (Example:
     * `2018-12-24T20:30:45Z`).
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     * @throws {UnknownError} Error cause is unknown.
     */
    public async setDateTime(dateTime: string, opts?: { signal?: AbortSignal }): Promise<SetDateTimeData> {
        const request = new SetDateTimeRequest(this.connection, dateTime);
        const response = await request.send({ signal: opts?.signal });

        response.assertSuccess();

        return response.data;
    }

    /**
     * Set the time zone. This will set a new IANA time zone, clearing any
     * previous POSIX time zones, although its string in the Time Zone Database
     * will not be affected.
     *
     * This is the preferred way of setting a time zone on the device, since it
     * uses a uniform naming convention, such as `Europe/Stockholm`, which is
     * easier to understand than the POSIX style. The Time Zone Database is
     * commonly used in Linux distributions.
     * @param timeZone Which IANA time zone should be set.
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     * @throws {UnknownError} Error cause is unknown.
     */
    public async setTimeZone(timeZone: string, opts?: { signal?: AbortSignal }): Promise<SetTimeZoneData> {
        const request = new SetTimeZoneRequest(this.connection, timeZone);
        const response = await request.send({ signal: opts?.signal });

        response.assertSuccess();

        return response.data;
    }

    /**
     * Set the POSIX time zone. This will set a new POSIX time zone and clear
     * the previous IANA time zones.
     *
     * This method is not the recommend way of setting the time zone, as the
     * POSIX style format has a complex structure and DST requires manual
     * configuration. Instead, `setTimeZone` is preferred.
     * @param posixTimeZone The POSIX time zone that should be set, for example
     * `EST5EDT,M3.2.0,M11.1.0`.
     * @param enableDst Set to `true` to activate the DST settings of the POSIX
     * time zone string. Set to `false` to ignore the DST setting of the POSIX
     * time zone string.
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     * @throws {UnknownError} Error cause is unknown.
     */
    public async setPosixTimeZone(posixTimeZone: string, enableDst: boolean, opts?: { signal?: AbortSignal }): Promise<SetPosixTimeZoneData> {
        const request = new SetPosixTimeZoneRequest(this.connection, posixTimeZone, enableDst);
        const response = await request.send({ signal: opts?.signal });

        response.assertSuccess();

        return response.data;
    }

    /**
     * Reset time zones back to the device default value. The DHCP time zone
     * will be used when available.
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     * @throws {UnknownError} Error cause is unknown.
     */
    public async resetTimeZone(opts?: { signal?: AbortSignal }): Promise<void> {
        const request = new ResetTimeZoneRequest(this.connection);
        const response = await request.send({ signal: opts?.signal });

        response.assertSuccess();
    }
}
