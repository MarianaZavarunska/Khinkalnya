import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  public email: string;

  @IsNumber()
  public age: number;

  @IsString()
  public city: string;

  @IsBoolean()
  public status?: boolean;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
