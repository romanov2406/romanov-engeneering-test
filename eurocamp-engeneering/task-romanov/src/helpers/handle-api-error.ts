export class ApiError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    public url: string,
    public reason: string,
  ) {
    super(message);

    this.name = "ApiError";

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }
}
