import axios from "axios";
import { ApiClient } from "../../../api/api-client";
import { ApiError } from "../../../helpers/handle-api-error";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios | any>;

describe("ApiClient", () => {
  let apiClient: ApiClient;

  beforeEach(() => {
    mockedAxios.create.mockReturnValue(mockedAxios);
    apiClient = new ApiClient();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("get", () => {
    it("should return data on successful GET request", async () => {
      const responseData = { message: "Success" };
      mockedAxios.get.mockResolvedValue({ data: responseData });

      const result = await apiClient.get("/test-endpoint");

      expect(result).toEqual(responseData);
      expect(mockedAxios.get).toHaveBeenCalledWith("/test-endpoint", {});
    });

    it("should throw ApiError on GET request failure", async () => {
      const error = {
        response: {
          status: 404,
          statusText: "Not Found",
          config: { url: "/test-endpoint", method: "get" },
        },
        message: "Request failed",
      };
      mockedAxios.get.mockRejectedValue(error);

      await expect(apiClient.get("/test-endpoint")).rejects.toThrow(ApiError);
    });
  });

  describe("post", () => {
    it("should return data on successful POST request", async () => {
      const requestData = { name: "John" };
      const responseData = { id: 1, ...requestData };
      mockedAxios.post.mockResolvedValue({ data: responseData });

      const result = await apiClient.post("/test-endpoint", requestData);

      expect(result).toEqual(responseData);
      expect(mockedAxios.post).toHaveBeenCalledWith(
        "/test-endpoint",
        requestData,
      );
    });

    it("should throw ApiError on POST request failure", async () => {
      const error = {
        response: {
          status: 500,
          statusText: "Internal Server Error",
          config: { url: "/test-endpoint", method: "post" },
        },
        message: "Request failed",
      };
      mockedAxios.post.mockRejectedValue(error);

      await expect(apiClient.post("/test-endpoint", {})).rejects.toThrow(
        ApiError,
      );
    });
  });

  describe("put", () => {
    it("should return data on successful PUT request", async () => {
      const requestData = { age: 30 };
      const responseData = { id: 1, age: 30 };
      mockedAxios.put.mockResolvedValue({ data: responseData });

      const result = await apiClient.put("/test-endpoint", requestData);

      expect(result).toEqual(responseData);
      expect(mockedAxios.put).toHaveBeenCalledWith(
        "/test-endpoint",
        requestData,
      );
    });

    it("should throw ApiError on PUT request failure", async () => {
      const error = {
        response: {
          status: 400,
          statusText: "Bad Request",
          config: { url: "/test-endpoint", method: "put" },
        },
        message: "Request failed",
      };
      mockedAxios.put.mockRejectedValue(error);

      await expect(apiClient.put("/test-endpoint", {})).rejects.toThrow(
        ApiError,
      );
    });
  });

  describe("delete", () => {
    it("should return data on successful DELETE request", async () => {
      const responseData = { message: "Deleted" };
      mockedAxios.delete.mockResolvedValue({ data: responseData });

      const result = await apiClient.delete("/test-endpoint");

      expect(result).toEqual(responseData);
      expect(mockedAxios.delete).toHaveBeenCalledWith("/test-endpoint", {});
    });

    it("should throw ApiError on DELETE request failure", async () => {
      const error = {
        response: {
          status: 403,
          statusText: "Forbidden",
          config: { url: "/test-endpoint", method: "delete" },
        },
        message: "Request failed",
      };
      mockedAxios.delete.mockRejectedValue(error);

      await expect(apiClient.delete("/test-endpoint")).rejects.toThrow(
        ApiError,
      );
    });
  });
});
