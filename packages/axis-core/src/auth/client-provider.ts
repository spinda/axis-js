import { IncomingMessage } from 'node:http';
import got, { Agents, Got } from 'got-cjs-compat';
import * as http from 'http';
import * as https from 'https';
import * as basic from './basic';
import { parse } from './challenge';
import * as digest from './digest';

export const clientProvider = (
    method: string,
    url: string,
    username: string,
    password: string,
    agent?: http.Agent | https.Agent,
): Got => {
    const agents = createAgents(agent);
    return got.extend({
        agent: agents,
        hooks: {
            beforeRequest: [
                async (options) => {
                    // For non-GET requests which don't already have an authorization header
                    // attached and aren't retriable, send up a pre-flight HEAD request to try and
                    // grab an auth challenge ahead of time. For GET requests, this wouldn't be
                    // safe, as the HEAD request may have side-effects. Ideally we would send an
                    // OPTIONS request here instead of a HEAD, but Axis devices seems to block
                    // that for "brute-force protection".
                    if (
                        options.headers.authorization !== undefined ||
                        options.method === 'GET' ||
                        (options.retry.limit !== undefined && options.retry.limit > 0)
                    ) {
                        return;
                    }

                    const res = await got.head(url, {
                        agent: agents,
                        throwHttpErrors: false,
                    });

                    const authorization =
                        generateAuthorization(method, url, username, password, res);
                    if (authorization !== undefined) {
                        options.headers = {
                            ...options.headers,
                            authorization,
                        };
                    }
                },
            ],

            afterResponse: [
                (res, retryWithMergedOptions) => {
                    // Some requests are non-retriable, in which case we skip this logic for
                    // safety.
                    if (
                        res.request.options.retry.limit !== undefined &&
                        res.request.options.retry.limit < 1
                    ) {
                        return res;
                    }

                    const authorization =
                        generateAuthorization(method, url, username, password, res);
                    return authorization === undefined ? res : retryWithMergedOptions({
                        headers: { authorization },
                    });
                },
            ],
        },
    });
};

const generateAuthorization = (
    method: string,
    url: string,
    username: string,
    password: string,
    res: IncomingMessage,
): string | undefined => {
    if (res.statusCode !== 401) {
        return;
    }

    const wwwAuthenticate = res.headers['www-authenticate'];
    if (wwwAuthenticate === undefined) {
        return;
    }

    const challenge = parse(wwwAuthenticate);
    switch (challenge.type) {
        case basic.BASIC:
            return basic.createHeader(username, password, challenge);

        case digest.DIGEST:
            return digest.createHeader(
                method,
                url,
                username,
                password,
                challenge,
                challenge.qop === 'auth' ? digest.createCnonce() : undefined
            );
    }
};

const createAgents = (agent?: http.Agent | https.Agent): Agents => {
    return {
        http: agent instanceof http.Agent ? agent : undefined,
        https: agent instanceof https.Agent ? agent : undefined,
    };
};
