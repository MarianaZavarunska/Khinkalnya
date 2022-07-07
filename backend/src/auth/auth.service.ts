import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from '../user/user.service';
import { TokenService } from './tokens/tokens.service';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private tokenService: TokenService,
  ) {}

  async userRegistration(userDto: CreateUserDto) {
    try {
      const userFromDB = await this.userService.getUserByEmail(userDto.email);
      if (userFromDB) {
        return new HttpException(
          'Email are taken',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
      const hashedPassword = await this._hashPassword(userDto.password);

      const createdUser = await this.userService.createUser({
        ...userDto,
        password: hashedPassword,
        age: Number(userDto.age),
      });

      return this.tokenService.generateTokensPair(createdUser);
    } catch (err) {
      console.log(err);
      return err.message[0];
    }
  }

  async userLogin(userDto: LoginUserDto) {
    try {
      const userFromDB = await this.userService.getUserByEmail(userDto.email);
      const isValidPassword = await this._validatePassword(
        userDto.password,
        userFromDB.password,
      );

      if (!isValidPassword) {
        return new HttpException(
          'Email or password is invalid',
          HttpStatus.UNAUTHORIZED,
        );
      }

      await this.tokenService.deleteTokensPair(userFromDB.id);
      return this.tokenService.generateTokensPair(userFromDB);
    } catch (err) {
      console.log(err);
    }
  }

  private async _hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  private async _validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
