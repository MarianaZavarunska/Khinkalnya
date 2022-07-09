import { IUser } from './user.interface';
import { ITokensPair } from './tokens.interface';

export interface IAuthResponseApi {
  user: IUser,
  tokensPair: ITokensPair,
}

export interface IAuthResponse {
  userData: IAuthResponseApi | undefined;
  status: number;
  error: string | undefined;
}
