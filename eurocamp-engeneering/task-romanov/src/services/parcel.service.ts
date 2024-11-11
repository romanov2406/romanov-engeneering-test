import { ApiClient } from "../api/api-client";

import { ParcelDto } from "../validation";
import { BaseService } from "./base.service";

export class ParcelService extends BaseService<ParcelDto> {
  constructor(public apiClient: ApiClient) {
    super(apiClient, "parcs", ParcelDto);
  }
}
