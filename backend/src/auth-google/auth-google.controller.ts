import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';

import { AuthGoogleService } from './auth-google.service';
import { LoginGoogleTokenDto } from './dto';


@Controller('api/v1/auth/google')
export class AuthGoogleController {
  constructor(private readonly authGoogleService: AuthGoogleService) {}

  @Post('/login')
  async userGoogleLogin(@Body() body: LoginGoogleTokenDto) {
    return await this.authGoogleService.userGoogleLogin(body.info);
  }

  @Post('/logout')
  async userGoogleLogout(@Body() body: any) {
    return await this.authGoogleService.userGoogleLogout(body);
  }
}
