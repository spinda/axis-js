import * as cheerio from 'cheerio';
import { DeviceResponse } from './DeviceResponse';

/**
 * Abstract class describing an HTML HTTP response.
 */
export abstract class HtmlDeviceResponse extends DeviceResponse {
    private internalBody?: string | null;

    /**
     * Initializes a new instance of the class.
     * @param response The HTML HTTP response.
     */
    protected constructor(response: string) {
        super(response);
    }

    /**
     * Returns the body of the HTML response.
     */
    protected get body(): string | null {
        if (this.internalBody === undefined) {
            try {
                this.internalBody = cheerio.load(this.response).html('body');
            } catch {
                this.internalBody = null;
            }
        }

        return this.internalBody;
    }
}
