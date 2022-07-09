import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthGoogleController } from './auth-google.controller';
import { AuthGoogleService } from './auth-google.service';
import { TokenService } from 'src/auth/tokens/tokens.service';
import { UserService } from '../user/user.service';
import { PrismaService } from '../core/prisma.service';

@Module({
  controllers: [AuthGoogleController],
  providers: [
    AuthGoogleService,
    JwtService,
    TokenService,
    UserService,
    PrismaService,
  ],
})
export class AuthGoogleModule {}
