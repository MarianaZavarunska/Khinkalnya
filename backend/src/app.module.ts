import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AuthGoogleModule } from './auth-google/auth-google.module';

@Module({
  imports: [AuthModule, UserModule, AuthGoogleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
