import { ApiResponse } from "../../../types/reponse/api-response";
import { BaseService } from "../../../services/base.service";
import { BookingDto } from "../../../validation";
import { ApiClient } from "../../../api/api-client";

jest.mock("../../../api/api-client");

class BaseServiceTest extends BaseService<BookingDto> {
  constructor(public apiClient: ApiClient) {
    super(apiClient, "bookings", BookingDto);
  }
}

const mockApiClient: ApiClient & jest.Mocked<any> = {
  get: jest.fn().mockResolvedValue({ data: [] } as ApiResponse<BookingDto>),
  post: jest.fn().mockResolvedValue({} as BookingDto),
  put: jest.fn().mockResolvedValue({} as BookingDto),
  delete: jest.fn().mockResolvedValue(null),
  handleResponse: jest.fn(),
  handleSuccessResponse: jest.fn(),
  handleErrorResponse: jest.fn(),
};

const MOCKED_BOOKING: BookingDto = {
  id: "testId",
  user: "testName",
  parc: "parcel",
  comments: "This it test",
  bookingdate: new Date().toString(),
};

let baseService: BaseService<BookingDto>;

beforeEach(() => {
  baseService = new BaseServiceTest(mockApiClient as ApiClient);
});

describe("BaseService Tests", () => {
  test("should call get() on ApiClient and return correct response", async () => {
    const result = await baseService.findAll();

    expect(mockApiClient.get).toHaveBeenCalledWith("bookings");

    expect(result).toEqual({ data: [] });
  });

  test("should call create() on ApiClient and return created item", async () => {
    mockApiClient.post.mockResolvedValue(MOCKED_BOOKING);

    const result = await baseService.create(MOCKED_BOOKING);

    expect(mockApiClient.post).toHaveBeenCalledWith("bookings", MOCKED_BOOKING);

    expect(result).toEqual(MOCKED_BOOKING);
  });

  test("should call delete() on ApiClient and not return any value", async () => {
    await baseService.delete("1");

    expect(mockApiClient.delete).toHaveBeenCalledWith("bookings/1");
  });
});
