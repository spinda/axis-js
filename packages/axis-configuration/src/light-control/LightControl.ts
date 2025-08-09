import { Connection } from 'axis-core';
import { CurrentAngleOfIlluminationData } from './CurrentAngleOfIlluminationData';
import { CurrentLightIntensityData } from './CurrentLightIntensityData';
import { IndividualLightIntensityData } from './IndividualLightIntensityData';
import { IrWavelengthData } from './IrWavelengthData';
import { LightInfo } from './LightInfo';
import { LightServiceCapabilities } from './LightServiceCapabilities';
import { LightStatus } from './LightStatus';
import { LightSynchronizeDayNightModeData } from './LightSynchronizeDayNightModeData';
import { ManualAngleOfIlluminationData } from './ManualAngleOfIlluminationData';
import { ManualLightIntensityData } from './ManualLightIntensityData';
import { ValidAngleOfIlluminationData } from './ValidAngleOfIlluminationData';
import { ValidIrWavelengthsData } from './ValidIrWavelengthsData';
import { ValidLightIntensityData } from './ValidLightIntensityData';
import { ActivateLightRequest } from './request-response/ActivateLightRequest';
import { DeactivateLightRequest } from './request-response/DeactivateLightRequest';
import { DisableLightRequest } from './request-response/DisableLightRequest';
import { EnableLightRequest } from './request-response/EnableLightRequest';
import { GetCurrentAngleOfIlluminationRequest } from './request-response/GetCurrentAngleOfIlluminationRequest';
import { GetCurrentLightIntensityRequest } from './request-response/GetCurrentLightIntensityRequest';
import { GetIndividualLightIntensityRequest } from './request-response/GetIndividualLightIntensityRequest';
import { GetIrWavelengthRequest } from './request-response/GetIrWavelengthRequest';
import { GetLightInfoRequest } from './request-response/GetLightInfoRequest';
import { GetLightServiceCapabilitiesRequest } from './request-response/GetLightServiceCapabilitiesRequest';
import { GetLightStatusRequest } from './request-response/GetLightStatusRequest';
import { GetLightSynchronizeDayNightModeRequest } from './request-response/GetLightSynchronizeDayNightModeRequest';
import { GetManualAngleOfIlluminationRequest } from './request-response/GetManualAngleOfIlluminationRequest';
import { GetManualLightIntensityRequest } from './request-response/GetManualLightIntensityRequest';
import { GetValidAngleOfIlluminationRequest } from './request-response/GetValidAngleOfIlluminationRequest';
import { GetValidIrWavelengthsRequest } from './request-response/GetValidIrWavelengthsRequest';
import { GetValidLightIntensityRequest } from './request-response/GetValidLightIntensityRequest';
import { SetAutomaticAngleOfIlluminationModeRequest } from './request-response/SetAutomaticAngleOfIlluminationModeRequest';
import { SetAutomaticLightIntensityModeRequest } from './request-response/SetAutomaticLightIntensityModeRequest';
import { SetIndividualLightIntensityRequest } from './request-response/SetIndividualLightIntensityRequest';
import { SetIrWavelengthRequest } from './request-response/SetIrWavelengthRequest';
import { SetLightSynchronizeDayNightModeRequest } from './request-response/SetLightSynchronizeDayNightModeRequest';
import { SetManualAngleOfIlluminationRequest } from './request-response/SetManualAngleOfIlluminationRequest';
import { SetManualLightIntensityRequest } from './request-response/SetManualLightIntensityRequest';

/**
 * Class responsible for controlling the behavior and functionality of IR and
 * white light LEDs.
 */
export class LightControl {
    /**
     * Initializes a new instance of the class.
     * @param connection The connection to the device.
     */
    constructor(private readonly connection: Connection) {}

    /**
     * List the light service capabilities.
     *
     * Please note that the global capabilities have been deprecated and the
     * capabilities array should be used instead.
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     * @throws {UnknownError} Error cause is unknown.
     */
    public async getServiceCapabilities(opts?: { signal?: AbortSignal }): Promise<LightServiceCapabilities> {
        const request = new GetLightServiceCapabilitiesRequest(this.connection);
        const response = await request.send({ signal: opts?.signal });

        response.assertSuccess();

        return response.data;
    }

    /**
     * List the light control information.
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     * @throws {UnknownError} Error cause is unknown.
     */
    public async getLightInfo(opts?: { signal?: AbortSignal }): Promise<LightInfo> {
        const request = new GetLightInfoRequest(this.connection);
        const response = await request.send({ signal: opts?.signal });

        response.assertSuccess();

        return response.data;
    }

    /**
     * Activate the light.
     * @param lightId The light ID.
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     * @throws {UnknownError} Error cause is unknown.
     */
    public async activateLight(lightId: string, opts?: { signal?: AbortSignal }): Promise<void> {
        const request = new ActivateLightRequest(this.connection, lightId);
        const response = await request.send({ signal: opts?.signal });

        response.assertSuccess();
    }

    /**
     * Deactivate the light.
     * @param lightId The light ID.
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     * @throws {UnknownError} Error cause is unknown.
     */
    public async deactivateLight(lightId: string, opts?: { signal?: AbortSignal }): Promise<void> {
        const request = new DeactivateLightRequest(this.connection, lightId);
        const response = await request.send({ signal: opts?.signal });

        response.assertSuccess();
    }

    /**
     * Enable the light functionality.
     * @param lightId The light ID.
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     * @throws {UnknownError} Error cause is unknown.
     */
    public async enableLight(lightId: string, opts?: { signal?: AbortSignal }): Promise<void> {
        const request = new EnableLightRequest(this.connection, lightId);
        const response = await request.send({ signal: opts?.signal });

        response.assertSuccess();
    }

    /**
     * Disable the light functionality.
     * @param lightId The light ID.
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     * @throws {UnknownError} Error cause is unknown.
     */
    public async disableLight(lightId: string, opts?: { signal?: AbortSignal }): Promise<void> {
        const request = new DisableLightRequest(this.connection, lightId);
        const response = await request.send({ signal: opts?.signal });

        response.assertSuccess();
    }

    /**
     * Get the status of a given light ID.
     * @param lightId The light ID.
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     * @throws {UnknownError} Error cause is unknown.
     */
    public async getLightStatus(lightId: string, opts?: { signal?: AbortSignal }): Promise<LightStatus> {
        const request = new GetLightStatusRequest(this.connection, lightId);
        const response = await request.send({ signal: opts?.signal });

        response.assertSuccess();

        return response.data;
    }

    /**
     * Enable the automatic light intensity control.
     * @param lightId The light ID.
     * @param enabled Enables automatic light intensity control.
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     * @throws {UnknownError} Error cause is unknown.
     */
    public async setAutomaticIntensityMode(lightId: string, enabled: boolean, opts?: { signal?: AbortSignal }): Promise<void> {
        const request = new SetAutomaticLightIntensityModeRequest(this.connection, lightId, enabled);
        const response = await request.send({ signal: opts?.signal });

        response.assertSuccess();
    }

    /**
     * List the valid light intensity values.
     * @param lightId The light ID.
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     * @throws {UnknownError} Error cause is unknown.
     */
    public async getValidIntensity(lightId: string, opts?: { signal?: AbortSignal }): Promise<ValidLightIntensityData> {
        const request = new GetValidLightIntensityRequest(this.connection, lightId);
        const response = await request.send({ signal: opts?.signal });

        response.assertSuccess();

        return response.data;
    }

    /**
     * Set the light intensity manually.
     * @param lightId The light ID.
     * @param intensity The intensity level of the light.
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     * @throws {UnknownError} Error cause is unknown.
     */
    public async setManualIntensity(lightId: string, intensity: number, opts?: { signal?: AbortSignal }): Promise<void> {
        const request = new SetManualLightIntensityRequest(this.connection, lightId, intensity);
        const response = await request.send({ signal: opts?.signal });

        response.assertSuccess();
    }

    /**
     * Get the intensity that was set in the `setManualIntensity` request.
     * @param lightId The light ID.
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     * @throws {UnknownError} Error cause is unknown.
     */
    public async getManualIntensity(lightId: string, opts?: { signal?: AbortSignal }): Promise<ManualLightIntensityData> {
        const request = new GetManualLightIntensityRequest(this.connection, lightId);
        const response = await request.send({ signal: opts?.signal });

        response.assertSuccess();

        return response.data;
    }

    /**
     * Manually set the intensity of an individual LED light.
     * @param lightId The light ID.
     * @param ledId The ID of the LED.
     * @param intensity The intensity level of the light.
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     * @throws {UnknownError} Error cause is unknown.
     */
    public async setIndividualIntensity(lightId: string, ledId: number, intensity: number, opts?: { signal?: AbortSignal }): Promise<void> {
        const request = new SetIndividualLightIntensityRequest(this.connection, lightId, ledId, intensity);
        const response = await request.send({ signal: opts?.signal });

        response.assertSuccess();
    }

    /**
     * Get the intensity that was set in the `setIndividualIntensity` request.
     * @param lightId The light ID.
     * @param ledId The ID of the LED.
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     * @throws {UnknownError} Error cause is unknown.
     */
    public async getIndividualIntensity(lightId: string, ledId: number, opts?: { signal?: AbortSignal }): Promise<IndividualLightIntensityData> {
        const request = new GetIndividualLightIntensityRequest(this.connection, lightId, ledId);
        const response = await request.send({ signal: opts?.signal });

        response.assertSuccess();

        return response.data;
    }

    /**
     * Get the current intensity.
     * @param lightId The light ID.
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     * @throws {UnknownError} Error cause is unknown.
     */
    public async getCurrentIntensity(lightId: string, opts?: { signal?: AbortSignal }): Promise<CurrentLightIntensityData> {
        const request = new GetCurrentLightIntensityRequest(this.connection, lightId);
        const response = await request.send({ signal: opts?.signal });

        response.assertSuccess();

        return response.data;
    }

    /**
     * Control the automatic angle of illumination.
     * @param lightId The light ID.
     * @param enabled Activate or deactivate automatic angle of illumination
     * mode for a selected light.
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     * @throws {UnknownError} Error cause is unknown.
     */
    public async setAutomaticAngleOfIlluminationMode(lightId: string, enabled: boolean, opts?: { signal?: AbortSignal }): Promise<void> {
        const request = new SetAutomaticAngleOfIlluminationModeRequest(this.connection, lightId, enabled);
        const response = await request.send({ signal: opts?.signal });

        response.assertSuccess();
    }

    /**
     * Get a list of supported angle of illumination ranges for a light.
     * @param lightId The light ID.
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     * @throws {UnknownError} Error cause is unknown.
     */
    public async getValidAngleOfIllumination(lightId: string, opts?: { signal?: AbortSignal }): Promise<ValidAngleOfIlluminationData> {
        const request = new GetValidAngleOfIlluminationRequest(this.connection, lightId);
        const response = await request.send({ signal: opts?.signal });

        response.assertSuccess();

        return response.data;
    }

    /**
     * Set the manual angle of illumination.
     * @param lightId The light ID.
     * @param angleOfIllumination The angle of illumination.
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     * @throws {UnknownError} Error cause is unknown.
     */
    public async setManualAngleOfIllumination(lightId: string, angleOfIllumination: number, opts?: { signal?: AbortSignal }): Promise<void> {
        const request = new SetManualAngleOfIlluminationRequest(this.connection, lightId, angleOfIllumination);
        const response = await request.send({ signal: opts?.signal });

        response.assertSuccess();
    }

    /**
     * Get the angle of illumination set by the `setManualAngleOfIllumination`
     * request.
     * @param lightId The light ID.
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     * @throws {UnknownError} Error cause is unknown.
     */
    public async getManualAngleOfIllumination(lightId: string, opts?: { signal?: AbortSignal }): Promise<ManualAngleOfIlluminationData> {
        const request = new GetManualAngleOfIlluminationRequest(this.connection, lightId);
        const response = await request.send({ signal: opts?.signal });

        response.assertSuccess();

        return response.data;
    }

    /**
     * Get the current angle of illumination.
     * @param lightId The light ID.
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     * @throws {UnknownError} Error cause is unknown.
     */
    public async getCurrentAngleOfIllumination(lightId: string, opts?: { signal?: AbortSignal }): Promise<CurrentAngleOfIlluminationData> {
        const request = new GetCurrentAngleOfIlluminationRequest(this.connection, lightId);
        const response = await request.send({ signal: opts?.signal });

        response.assertSuccess();

        return response.data;
    }

    /**
     * Enable or disable the automatic day/night synchronization mode.
     * @param lightId The light ID.
     * @param enabled Activate or deactivate automatic angle of illumination
     * mode for a selected light.
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     * @throws {UnknownError} Error cause is unknown.
     */
    public async setLightSynchronizeDayNightMode(lightId: string, enabled: boolean, opts?: { signal?: AbortSignal }): Promise<void> {
        const request = new SetLightSynchronizeDayNightModeRequest(this.connection, lightId, enabled);
        const response = await request.send({ signal: opts?.signal });

        response.assertSuccess();
    }

    /**
     * Check if the automatic synchronization with the day/night mode is enabled.
     * @param lightId The light ID.
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     * @throws {UnknownError} Error cause is unknown.
     */
    public async getLightSynchronizeDayNightMode(lightId: string, opts?: { signal?: AbortSignal }): Promise<LightSynchronizeDayNightModeData> {
        const request = new GetLightSynchronizeDayNightModeRequest(this.connection, lightId);
        const response = await request.send({ signal: opts?.signal });

        response.assertSuccess();

        return response.data;
    }

    /**
     * List the valid infrared wavelengths.
     * @param lightId The light ID.
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     * @throws {UnknownError} Error cause is unknown.
     */
    public async getValidIrWavelengths(lightId: string, opts?: { signal?: AbortSignal }): Promise<ValidIrWavelengthsData> {
        const request = new GetValidIrWavelengthsRequest(this.connection, lightId);
        const response = await request.send({ signal: opts?.signal });

        response.assertSuccess();

        return response.data;
    }

    /**
     * Set the infrared wavelength.
     * @param lightId The light ID.
     * @param irWavelength The infrared wavelength.
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     * @throws {UnknownError} Error cause is unknown.
     */
    public async setIrWavelength(lightId: string, irWavelength: string, opts?: { signal?: AbortSignal }): Promise<void> {
        const request = new SetIrWavelengthRequest(this.connection, lightId, irWavelength);
        const response = await request.send({ signal: opts?.signal });

        response.assertSuccess();
    }

    /**
     * Get the current wavelength setting.
     * @param lightId The light ID.
     * @throws {UnauthorizedError} User is not authorized to perform operation.
     * @throws {RequestError} Request failed.
     * @throws {UnknownError} Error cause is unknown.
     */
    public async getIrWavelength(lightId: string, opts?: { signal?: AbortSignal }): Promise<IrWavelengthData> {
        const request = new GetIrWavelengthRequest(this.connection, lightId);
        const response = await request.send({ signal: opts?.signal });

        response.assertSuccess();

        return response.data;
    }
}
