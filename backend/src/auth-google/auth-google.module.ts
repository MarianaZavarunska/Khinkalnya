import { Module } from '@nestjs/common';

import { AuthGoogleController } from './auth-google.controller';
import { AuthGoogleService } from './auth-google.service';
import { GoogleStrategy } from '../google.strategy';

@Module({
  controllers: [AuthGoogleController],
  providers: [AuthGoogleService, GoogleStrategy],
})
export class AuthGoogleModule {}
