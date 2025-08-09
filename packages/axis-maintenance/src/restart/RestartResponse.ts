import { HtmlDeviceResponse, UnknownError } from "axis-core";

export class RestartResponse extends HtmlDeviceResponse {
    private static readonly SuccessResponse = /restartMessage/i;

    constructor(response: string) {
        super(response);
    }

    public assertSuccess(): void {
        if (RestartResponse.SuccessResponse.test(this.response)) {
            return;
        }

        let body: string | null = this.body;

        if (body !== null) {
            body = body.trim();
            if (body) {
                throw new UnknownError(body);
            }
        }

        throw new UnknownError('Request to restart device was not successful');
    }
}
