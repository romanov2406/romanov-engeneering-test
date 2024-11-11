import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserDto {
  @IsNotEmpty()
  @IsEmail()
  public email!: string;

  @IsNotEmpty()
  public id!: string;

  @IsNotEmpty()
  @IsString()
  public name!: string;
}
