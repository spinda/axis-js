export type FocusWindow = {
    /**
     * The optics ID to set the focus window on.
     */
    opticsId: string;
    /**
     * Specifies the upper windows upper left corner distance from the full
     * image upper left corner along the X-plane and given as a number between
     * 0 to 1, representing the percentage of the whole image.
     */
    upperLeftX: number;
    /**
     * Specifies the upper windows upper left corner distance from the full
     * image upper left corner along the Y-plane and given as a number between
     * 0 to 1, representing the percentage of the whole image.
     */
    upperLeftY: number;
    /**
     * Specifies the upper windows width and is given as a number between 0
     * and 1, representing the percentage of the whole image width. This means
     * that `upperLeftX+width` can't be more than 1 or it will be truncated.
     */
    width: number;
    /**
     * Specifies the upper windows height and is given as a number between 0
     * and 1, representing the percentage of the whole image height. This
     * means that `upperLeftY+height` can't be more than 1 or it will be
     * truncated.
     */
    height: number;
};
