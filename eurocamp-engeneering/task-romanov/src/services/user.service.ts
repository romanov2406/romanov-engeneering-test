import { ApiClient } from "../api/api-client";

import { BaseService } from "./base.service";
import { UserDto } from "../validation";

export class UserService extends BaseService<UserDto> {
  constructor(public apiClient: ApiClient) {
    super(apiClient, "users", UserDto);
  }
}
