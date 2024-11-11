import { IsNotEmpty, IsString } from "class-validator";

export class BookingDto {
  @IsString()
  @IsNotEmpty()
  public id!: string;

  @IsString()
  @IsNotEmpty()
  public user!: string;

  @IsString()
  @IsNotEmpty()
  public parc!: string;

  @IsString()
  @IsNotEmpty()
  public bookingdate!: string;

  @IsString()
  @IsNotEmpty()
  public comments!: string;
}
