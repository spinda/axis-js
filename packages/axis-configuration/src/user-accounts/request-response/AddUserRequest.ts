import { Connection, DeviceRequest } from 'axis-core';
import { User } from '../..';
import { AddUserResponse } from './AddUserResponse';
import { Converter } from './Converter';

export class AddUserRequest extends DeviceRequest {
  constructor(
    connection: Connection,
    private readonly user: User,
    private readonly group: string = 'users',
  ) {
    super(connection);
  }

  public async send(opts?: { signal?: AbortSignal }): Promise<AddUserResponse> {
    const response = await this.get(this.relativePath, { signal: opts?.signal });

    return new AddUserResponse(response.toString());
  }

  public get relativePath(): string {
    return '/axis-cgi/pwdgrp.cgi?action=add'
      + `&user=${encodeURIComponent(this.user.name)}`
      + (this.user.password != null ? `&pwd=${encodeURIComponent(this.user.password)}` : '')
      + `&grp=${encodeURIComponent(this.group)}`
      + `&sgrp=${
        Converter.toUserGroups(
          this.user.accessRights,
          this.user.ptz,
        )
      }`;
  }
}
