import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { ApiError } from "../helpers/handle-api-error";

export class ApiClient {
  private axios!: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: process.env.API_CLIENT + '/api/1/',
    });
  }

  public get<T>(endpoint: string, params = {}): Promise<T> {
    return this.handleResponse<T>(this.axios.get<T>(endpoint, params));
  }

  public post<T>(endpoint: string, data: T): Promise<T> {
    return this.handleResponse<T>(this.axios.post<T>(endpoint, data));
  }

  public put<T>(endpoint: string, data: Partial<T>): Promise<T> {
    return this.handleResponse<T>(this.axios.put<T>(endpoint, data));
  }

  public delete<T>(endpoint: string, params = {}): Promise<T> {
    return this.handleResponse<T>(this.axios.delete<T>(endpoint, params));
  }

  private async handleResponse<T>(
    response: Promise<AxiosResponse<T>>,
  ): Promise<T> {
    return response
      .then(this.handleSuccessResponse)
      .catch(this.handleErrorResponse);
  }

  private handleSuccessResponse = <T>(response: AxiosResponse<T>): T => {
    return response.data;
  };
  private handleErrorResponse = (error: AxiosError): never => {
    const { status = 500, config, statusText = "" } = error?.response || {};

    const { url = "", method = "UNKNOWN METHOD" } = config || {};

    const errorMessage = `ERROR: METHOD=${method?.toUpperCase()} URL=${url} REASON=${statusText}`;

    throw new ApiError(errorMessage, status, url, statusText);
  };
}
