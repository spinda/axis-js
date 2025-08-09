import { JsonDeviceResponse, UnknownError } from 'axis-core';
import { SystemReadyData } from '../SystemReadyData';

export class SystemReadyResponse extends JsonDeviceResponse {
    private internalData?: SystemReadyData;

    constructor(response: string) {
        super(response);
    }

    public assertSuccess(): void {
        const payload = this.payload;

        if (payload) {
            if (!('error' in payload) || !payload.error) {
                return;
            }

            if (typeof payload.error === 'object' && payload.error && 'message' in payload.error && typeof payload.error.message === 'string') {
                throw new UnknownError(payload.error.message);
            }
        }

        throw new UnknownError('Request for system ready status was not successful');
    }

    public get data(): SystemReadyData {
        if (!this.internalData) {
            const payload = this.payload;

            if (payload && 'data' in payload && typeof payload.data === 'object' && payload.data) {
                const systemReady = 'systemready' in payload.data && typeof payload.data.systemready === 'string' ? payload.data.systemready === 'yes' : null;
                const needSetup = 'needsetup' in payload.data && typeof payload.data.needsetup === 'string' ? payload.data.needsetup === 'yes' : null;
                const uptime = 'uptime' in payload.data && typeof payload.data.uptime === 'string' ? parseInt(payload.data.uptime, 10) : null;
                const previewMode = 'previewmode' in payload.data && typeof payload.data.previewmode === 'string' ? parseInt(payload.data.previewmode, 10) : null;

                this.internalData = {
                    ...(systemReady != null ? { systemReady } : null),
                    ...(needSetup != null ? { needSetup } : null),
                    ...(uptime != null && !isNaN(uptime) ? { uptime } : null),
                    ...('bootid' in payload.data && typeof payload.data.bootid === 'string' ? { bootId: payload.data.bootid } : null),
                    ...(previewMode != null && !isNaN(previewMode) ? { previewMode } : null),
                };
            } else {
                this.internalData = {};
            }
        }

        return this.internalData;
    }
}