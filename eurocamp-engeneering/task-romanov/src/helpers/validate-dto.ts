import { plainToInstance } from "class-transformer";

import { validate, ValidationError } from "class-validator";

export async function ValidateDto<T extends object>(
  dto: new () => T,
  dataToValidate: T,
): Promise<ValidationError[] | null> {
  const userInstance = plainToInstance(dto, dataToValidate);

  const error = await validate(userInstance);

  if (error.length) {
    return error;
  }

  return null;
}
