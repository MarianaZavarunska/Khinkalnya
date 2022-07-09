import { IsNotEmpty, IsString } from 'class-validator';

export class LoginGoogleTokenDto {
  @IsString()
  @IsNotEmpty()
  info: string;
}
