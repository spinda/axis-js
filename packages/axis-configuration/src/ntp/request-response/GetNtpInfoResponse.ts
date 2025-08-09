import { JsonDeviceResponse, UnknownError } from 'axis-core';
import { NtpInfo } from '../NtpInfo';
import { NtpServersSource } from '../NtpServersSource';

export class GetNtpInfoResponse extends JsonDeviceResponse {
    private internalData?: NtpInfo;

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

        throw new UnknownError('Request for NTP info was not successful');
    }

    public get data(): NtpInfo {
        if (!this.internalData) {
            const payload = this.payload;

            if (
                payload &&
                'data' in payload &&
                typeof payload.data === 'object' &&
                payload.data &&
                'client' in payload.data &&
                typeof payload.data.client === 'object' &&
                payload.data.client
            ) {
                const clientData = payload.data.client;
                this.internalData = {
                    client: {
                        ...('enabled' in clientData && typeof clientData.enabled === 'boolean' ? { enabled: clientData.enabled } : null),
                        ...('NTSEnabled' in clientData && typeof clientData.NTSEnabled === 'boolean' ? { ntsEnabled: clientData.NTSEnabled } : null),
                        ...('NTSKEServerCACerts' in clientData &&
                        Array.isArray(clientData.NTSKEServerCACerts) &&
                        clientData.NTSKEServerCACerts.every((cert) => typeof cert === 'string')
                            ? { ntskeServerCaCerts: clientData.NTSKEServerCACerts }
                            : { ntskeServerCaCerts: [] }),
                        ...('serversSource' in clientData && Object.values(NtpServersSource).includes(clientData.serversSource as NtpServersSource)
                            ? { serversSource: clientData.serversSource as NtpServersSource }
                            : null),
                        ...('maxSupportedStaticServers' in clientData && typeof clientData.maxSupportedStaticServers === 'number'
                            ? { maxSupportedStaticServers: clientData.maxSupportedStaticServers }
                            : null),
                        ...('staticServers' in clientData &&
                        Array.isArray(clientData.staticServers) &&
                        clientData.staticServers.every((server) => typeof server === 'string')
                            ? { staticServers: clientData.staticServers }
                            : null),
                        ...('advertisedServers' in clientData &&
                        Array.isArray(clientData.advertisedServers) &&
                        clientData.advertisedServers.every((server) => typeof server === 'string')
                            ? { advertisedServers: clientData.advertisedServers }
                            : null),
                        ...('staticNTSKEServers' in clientData &&
                        Array.isArray(clientData.staticNTSKEServers) &&
                        clientData.staticNTSKEServers.every((server) => typeof server === 'string')
                            ? { staticNtkseServers: clientData.staticNTSKEServers }
                            : null),
                        ...('synced' in clientData && typeof clientData.synced === 'boolean' ? { synced: clientData.synced } : null),
                        ...('timeToNextSync' in clientData && typeof clientData.timeToNextSync === 'number'
                            ? { timeToNextSync: clientData.timeToNextSync }
                            : null),
                        ...('timeOffset' in clientData && typeof clientData.timeOffset === 'number' ? { timeOffset: clientData.timeOffset } : null),
                        ...('minpoll' in clientData && typeof clientData.minpoll === 'number' ? { minPoll: clientData.minpoll } : null),
                        ...('maxpoll' in clientData && typeof clientData.maxpoll === 'number' ? { maxPoll: clientData.maxpoll } : null),
                    },
                };
            } else {
                this.internalData = {};
            }
        }

        return this.internalData;
    }
}
