import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenPair, User } from '@prisma/client';
import { Auth, google } from 'googleapis';
import * as dotenv from "dotenv"

import { UserService } from '../user/user.service';
import { TokenService } from '../auth/tokens/tokens.service';

@Injectable()
export class AuthGoogleService {
  private oauthClient: Auth.OAuth2Client;

  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private tokenService: TokenService,
  ) {
    dotenv.config();
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_SECRET;
    this.oauthClient = new google.auth.OAuth2(clientId, clientSecret);
  }

  async userGoogleLogin(token: string): Promise<Promise<TokenPair> | undefined | Error> {
    try {
      const tokenInfo = await this.oauthClient.getTokenInfo(token);

      const user = await this.userService.getUserByEmail(tokenInfo.email);

      if (user) {
        const { tokensPair } = await this.tokenService.generateTokensPair(user);

        if (!tokensPair) return new HttpException('Bad GoogleLogin', HttpStatus.UNAUTHORIZED,);
        console.log(tokensPair);
        return tokensPair;
      }
    } catch (err) {
      console.log(err);
      return err.message[0];
    }
  }

  async userGoogleLogout(userEmail: string) {
     try {
       const user = await this.userService.getUserByEmail(userEmail);

       if(user){
         await this.tokenService.deleteTokensPair(user.id);
         console.log("logout back service");
       }
     } catch (err) {

       console.log(err);
       return err.message[0];
     }

  }

}
