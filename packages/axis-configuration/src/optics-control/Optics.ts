import { IrCutFilterState } from './IrCutFilterState';

export type Optics = {
    /**
     * The optics ID.
     */
    opticsId?: string;
    /**
     * The current position of the focus shown as a value between 0 and 1.
     */
    focusPosition?: number;
    /**
     * Shows if the focus is moving.
     */
    focusMoving?: boolean;
    /**
     * The distance from the upper left corner of the image to the upper left
     * corner of the focus window on the X-plane. Has a value between 0 and 1,
     * with 0 being the top edge of the image and 1 being the bottom.
     */
    focusWindowUpperLeftX?: number;
    /**
     * The distance from the upper left corner of the image to the upper left
     * corner of the focus window on the Y-plane. Has a value between 0 and 1,
     * with 0 being the top edge of the image and 1 being the bottom.
     */
    focusWindowUpperLeftY?: number;
    /**
     * The width of the focus window in a value between 0 and 1. represents
     * the window having 100% width of the image. Please note that
     * `focusWindowUpperLeftX+focusWindowWidth` can not exceed 1.
     */
    focusWindowWidth?: number;
    /**
     * The height of the focus window in a value between 0 and 1. 1
     * represents the window having 100% height of the image. Please not that
     * `focusWindowUpperLeftY+focusWindowHeight` can not exceed 1.
     */
    focusWindowHeight?: number;
    /**
     * The current magnification of the zoom lens. This is omitted if the
     * optics doesn't support zoom.
     */
    magnification?: number;
    /**
     * Shows if the zoom lens is moving. This is omitted if the optics
     * doesn't support zoom.
     */
    zoomMoving?: boolean;
    /**
     * Shows if the temperature compensation is enabled.
     */
    temperatureCompensation?: boolean;
    /**
     * Shows the current IR cut filter setting.
     */
    irCutFilterState?: IrCutFilterState;
    /**
     * Shows if the IR compensation is enabled.
     */
    irCompensation?: boolean;
};
