import { Connection } from 'axis-core';
import { CalibrationTarget } from './CalibrationTarget';
import { CompensationTarget } from './CompensationTarget';
import { FocusTarget } from './FocusTarget';
import { FocusWindow } from './FocusWindow';
import { IrCutFilterTarget } from './IrCutFilterTarget';
import { MagnificationTarget } from './MagnificationTarget';
import { OpticsCapabilitiesData } from './OpticsCapabilitiesData';
import { OpticsData } from './OpticsData';
import { RelativeTarget } from './RelativeTarget';
import { CalibrateRequest } from './request-response/CalibrateRequest';
import { GetOpticsCapabilitiesRequest } from './request-response/GetOpticsCapabilitiesRequest';
import { GetOpticsRequest } from './request-response/GetOpticsRequest';
import { PerformAutoFocusRequest } from './request-response/PerformAutoFocusRequest';
import { ResetCalibrationRequest } from './request-response/ResetCalibrationRequest';
import { SetFocusRequest } from './request-response/SetFocusRequest';
import { SetFocusWindowsRequest } from './request-response/SetFocusWindowsRequest';
import { SetIrCompensationRequest } from './request-response/SetIrCompensationRequest';
import { SetIrCutFilterStateRequest } from './request-response/SetIrCutFilterStateRequest';
import { SetMagnificationRequest } from './request-response/SetMagnificationRequest';
import { SetRelativeFocusRequest } from './request-response/SetRelativeFocusRequest';
import { SetRelativeMagnificationRequest } from './request-response/SetRelativeMagnificationRequest';
import { SetTemperatureCompensationRequest } from './request-response/SetTemperatureCompensationRequest';

/**
 * Class responsible for controlling the optics in your Axis device, including
 * zoom, focus and IR cut filter hardware.
 */
export class OpticsControl {
    /**
     * Initializes a new instance of the class.
     * @param connection The connection to the device.
     */
    constructor(private readonly connection: Connection) {}

    /**
     * Retrieve all optics along with their status and abilities.
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     * @throws {UnknownError} Error cause is unknown.
     */
    public async getOptics(opts?: { signal?: AbortSignal }): Promise<OpticsData> {
        const request = new GetOpticsRequest(this.connection);
        const response = await request.send({ signal: opts?.signal });

        response.assertSuccess();

        return response.data;
    }

    /**
     * Retrieve information about the optics capabilities on your device.
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     * @throws {UnknownError} Error cause is unknown.
     */
    public async getCapabilities(opts?: { signal?: AbortSignal }): Promise<OpticsCapabilitiesData> {
        const request = new GetOpticsCapabilitiesRequest(this.connection);
        const response = await request.send({ signal: opts?.signal });

        response.assertSuccess();

        return response.data;
    }

    /**
     * Sets a focus position for one or more of the optics. Please note that
     * this is only available on products with the capability `focus`. See
     * `getCapabilities` to find out if your product supports specific
     * capabilities.
     * @param focusTargets Array of focus targets to set.
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     * @throws {UnknownError} Error cause is unknown.
     */
    public async setFocus(focusTargets: FocusTarget[], opts?: { signal?: AbortSignal }): Promise<void> {
        const request = new SetFocusRequest(this.connection, focusTargets);
        const response = await request.send({ signal: opts?.signal });

        response.assertSuccess();
    }

    /**
     * Change the current focus with relative focus movement. Please note that
     * this is only available on products with the capability `focus`. See
     * `getCapabilities` to find out if your product supports specific
     * capabilities.
     *
     * This method doesn’t return an error if any optics reaches its maximum or
     * minimum focus. The current focus offset is clamped to make sure it is
     * always within the valid range.
     * @param relativeFocusTargets Array of relative focus targets to set.
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     * @throws {UnknownError} Error cause is unknown.
     */
    public async setRelativeFocus(relativeFocusTargets: RelativeTarget[], opts?: { signal?: AbortSignal }): Promise<void> {
        const request = new SetRelativeFocusRequest(this.connection, relativeFocusTargets);
        const response = await request.send({ signal: opts?.signal });

        response.assertSuccess();
    }

    /**
     * Set the magnification for one or more optics. Please note that this
     * is only available on products with the capability `zoom`. See
     * `getCapabilities` to find out if your product supports specific
     * capabilities.
     * @param magnificationTargets Array of magnification targets to set.
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     * @throws {UnknownError} Error cause is unknown.
     */
    public async setMagnification(magnificationTargets: MagnificationTarget[], opts?: { signal?: AbortSignal }): Promise<void> {
        const request = new SetMagnificationRequest(this.connection, magnificationTargets);
        const response = await request.send({ signal: opts?.signal });

        response.assertSuccess();
    }

    /**
     * Changes the current focus with relative focus movement. Please note that
     * this is only available on products with the capability `zoom`. See
     * `getCapabilities` to find out if your product supports specific
     * capabilities.
     *
     * This method doesn’t return an error if any optics reaches its maximum or
     * minimum focus. The current focus offset is clamped to make sure it is
     * always within the valid range.
     * @param relativeMagnificationTargets Array of relative magnification
     * targets to set.
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     * @throws {UnknownError} Error cause is unknown.
     */
    public async setRelativeMagnification(relativeMagnificationTargets: RelativeTarget[], opts?: { signal?: AbortSignal }): Promise<void> {
        const request = new SetRelativeMagnificationRequest(this.connection, relativeMagnificationTargets);
        const response = await request.send({ signal: opts?.signal });

        response.assertSuccess();
    }

    /**
     * Calibrate the optics for both zoom and focus, which is useful for optics
     * that end up in an undefined state asnd need a re-calibration. This is only
     * available on devices where either of the `calibrateFocus` or
     * `calibrateZoom` capabilities are present. See `getCapabilities` to find
     * out if your product supports specific capabilities.
     * @param calibrationTargets Array of calibration targets.
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     * @throws {UnknownError} Error cause is unknown.
     */
    public async calibrate(calibrationTargets: CalibrationTarget[], opts?: { signal?: AbortSignal }): Promise<void> {
        const request = new CalibrateRequest(this.connection, calibrationTargets);
        const response = await request.send({ signal: opts?.signal });

        response.assertSuccess();
    }

    /**
     * Perform auto focus on one or more of your optics.
     * @param opticsIds Array of optics IDs to perform auto focus on.
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     * @throws {UnknownError} Error cause is unknown.
     */
    public async performAutoFocus(opticsIds: string[], opts?: { signal?: AbortSignal }): Promise<void> {
        const request = new PerformAutoFocusRequest(this.connection, opticsIds);
        const response = await request.send({ signal: opts?.signal });

        response.assertSuccess();
    }

    /**
     * Reset the optics back to their default position.
     * @param calibrationTargets Array of calibration targets to reset.
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     * @throws {UnknownError} Error cause is unknown.
     */
    public async resetCalibration(calibrationTargets: CalibrationTarget[], opts?: { signal?: AbortSignal }): Promise<void> {
        const request = new ResetCalibrationRequest(this.connection, calibrationTargets);
        const response = await request.send({ signal: opts?.signal });

        response.assertSuccess();
    }

    /**
     * Set the windows where the automatic focus search should optimize the
     * focus.
     * @param focusWindows Array of focus windows to set.
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     * @throws {UnknownError} Error cause is unknown.
     */
    public async setFocusWindows(focusWindows: FocusWindow[], opts?: { signal?: AbortSignal }): Promise<void> {
        const request = new SetFocusWindowsRequest(this.connection, focusWindows);
        const response = await request.send({ signal: opts?.signal });

        response.assertSuccess();
    }

    /**
     * Set whether active temperature compensation should be used for each
     * optics. This method is only available if the `compensateTemperature`
     * capability is present. See `getCapabilities` to find out if your product
     * supports specific capabilities.
     *
     * Please note that the active focus compensation might not work as well if
     * your device has a non-standard lens.
     * @param temperatureCompensationTargets Array of temperature compensation
     * targets.
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     * @throws {UnknownError} Error cause is unknown.
     */
    public async setTemperatureCompensation(temperatureCompensationTargets: CompensationTarget[], opts?: { signal?: AbortSignal }): Promise<void> {
        const request = new SetTemperatureCompensationRequest(this.connection, temperatureCompensationTargets);
        const response = await request.send({ signal: opts?.signal });

        response.assertSuccess();
    }

    /**
     * Set the desired state of the IR cut filter. The settings `on` and `off`
     * reflect manual states, while `auto` leaves the decision of the IR cut
     * filter state to the software algorithms.
     * @param irCutFilterTargets Array of IR cut filter targets.
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     * @throws {UnknownError} Error cause is unknown.
     */
    public async setIrCutFilterState(irCutFilterTargets: IrCutFilterTarget[], opts?: { signal?: AbortSignal }): Promise<void> {
        const request = new SetIrCutFilterStateRequest(this.connection, irCutFilterTargets);
        const response = await request.send({ signal: opts?.signal });

        response.assertSuccess();
    }

    /**
     * Sets the state for the active IR compensation.
     * @param irCompensationTargets Array of IR compensation targets.
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     * @throws {UnknownError} Error cause is unknown.
     */
    public async setIrCompensation(irCompensationTargets: CompensationTarget[], opts?: { signal?: AbortSignal }): Promise<void> {
        const request = new SetIrCompensationRequest(this.connection, irCompensationTargets);
        const response = await request.send({ signal: opts?.signal });

        response.assertSuccess();
    }
}
