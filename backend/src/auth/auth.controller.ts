import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/registration')
  userRegistration(@Body() user: CreateUserDto) {
    return this.authService.userRegistration(user);
  }

  @Post('/login')
  userLogin(@Body() user: LoginUserDto) {
    return this.authService.userLogin(user);
  }

  // @Post('/logout')
  // userLogout(@Body() user: LoginUserDto) {
  // return this.authService.userLogout(user);
  // }
}
