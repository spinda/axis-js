export interface SystemReadyData {
    /**
     * The system ready status.
     */
    systemReady?: boolean;

    /**
     * Setup related parameter. If true, an initial admin user must first be 
     * created using pwdgrp.cgi.
     */
    needSetup?: boolean;

    /**
     * The device boot uptime, presented in seconds.
     */
    uptime?: number;

    /**
     * The device boot id string.
     */
    bootId?: string;

    /**
     * Included when preview mode is enabled. Shows previewmode duration in seconds.
     */
    previewMode?: number;
}
