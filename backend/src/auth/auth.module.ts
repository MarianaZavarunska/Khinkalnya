import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from '../core/prisma.service';
import { UserService } from '../user/user.service';
import { TokenModule } from './tokens/tokens.module';
import { UserModule } from '../user/user.module';
import { TokenService } from './tokens/tokens.service';

@Module({
  imports: [UserModule, TokenModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    JwtService,
    UserService,
    TokenService,
  ],
})
export class AuthModule {}
