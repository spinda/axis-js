import { NtpClientInfo } from './NtpClientInfo';

export type NtpClientConfiguration = Required<Pick<NtpClientInfo, 'enabled' | 'ntsEnabled' | 'serversSource' | 'staticServers' | 'staticNtkseServers'>> &
    Pick<NtpClientInfo, 'ntskeServerCaCerts' | 'minPoll' | 'maxPoll'>;
