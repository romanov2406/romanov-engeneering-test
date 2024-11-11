import { IsNotEmpty, IsString } from "class-validator";

export class ParcelDto {
  @IsString()
  @IsNotEmpty()
  public id!: string;

  @IsString()
  @IsNotEmpty()
  public name!: string;

  @IsString()
  @IsNotEmpty()
  public description!: string;
}
