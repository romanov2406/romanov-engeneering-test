import { ApiClient } from "../api/api-client";
import { BaseService } from "./base.service";
import { BookingDto } from "../validation";

export class BookingService extends BaseService<BookingDto> {
  constructor(public apiClient: ApiClient) {
    super(apiClient, "bookings", BookingDto);
  }
}
