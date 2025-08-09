import { FactoryDefaultType } from '../factory-default/FactoryDefaultType';
import { AutoCommit } from './AutoCommit';
import { AutoRollback } from './AutoRollback';

export type UpgradeFirmwareParams = {
    /**
     * Reset parameters to their factory default values. The default behavior is to upgrade and
     * preserve the current settings.
     */
    factoryDefaultMode?: FactoryDefaultType;
    /**
     * Controls when the new firmware will be automatically committed by the device. The default
     * behavior is as follows:
     *
     * - If `autoRollback` is not set to default, then the same as `AutoCommit.Never`.
     * - Otherwise, if `factoryDefaultMode` is not set to default, then the same as
     *   `AutoCommit.Boot`.
     * - Otherwise, the same as `AutoCommit.Started`.
     *
     * Note: This parameter is ignored if the new firmware doesn't support automatic rollback.
     */
    autoCommit?: AutoCommit;
    /**
     * Controls when the new firmware will automatically consider the upgrade failed and revert to
     * the previous firmware. A numeric value specifies the number of minutes after boot until the
     * system automatically performs a rollback unless a commit (automatic or externally requested)
     * has been performed. The default behavior is as follows:
     *
     * - If `autoCommit` is not set to default, then the same as `AutoRollback.Never`.
     * - Otherwise, automatically roll back after 10 minutes.
     *
     * Note: This parameter is ignored if the new firmware doesn't support automatic rollback.
     */
    autoRollback?: AutoRollback | number;
};
