import { ApiClient } from "./api/api-client";
import { BookingService } from "./services/booking.service";
import { UserService } from "./services/user.service";
import { ParcelService } from "./services/parcel.service";

async function main(): Promise<void> {
  const apiClient = new ApiClient();

  const userService = new UserService(apiClient);
  const parcService = new ParcelService(apiClient);
  const bookingService = new BookingService(apiClient);

  const allUsers = await userService.findAll();
  const allParcels= await parcService.findAll();
  const allBookings= await bookingService.findAll();

  console.log(allUsers);
}

void main();
