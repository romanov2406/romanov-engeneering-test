import { ApiClient } from "../api/api-client";
import { ApiResponse } from "../types/reponse/api-response";
import { ValidationError } from "class-validator";
import { ValidateDto } from "../helpers/validate-dto";

export abstract class BaseService<T extends object> {
  protected constructor(
    protected readonly apiClient: ApiClient,
    protected readonly prefix: string,
    private dtoClass: new () => T,
  ) {}

  public findAll(): Promise<ApiResponse<T>> {
    return this.apiClient.get<ApiResponse<T>>(this.prefix);
  }

  public findOne(id: string): Promise<T> {
    return this.apiClient.get<T>(this.prefix + "/" + id);
  }

  public async create(item: T): Promise<T | ValidationError[]> {
    const userInstance = await ValidateDto<T>(this.dtoClass, item);

    if (userInstance) {
      return userInstance;
    }

    return this.apiClient.post<T>(this.prefix, item);
  }

  // public update(user: Partial<T>): Promise<T> {
  //   return this.apiClient.put<T>(this.prefix, user);
  // }

  public delete(id: string): Promise<void> {
    return this.apiClient.delete<void>(this.prefix + "/" + id);
  }
}
