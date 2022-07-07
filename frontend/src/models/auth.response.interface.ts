import { IUser } from './user.interface';

export interface IAuthResponseApi {
  user: IUser,
  tokensPair: {
    id: number,
    accessToken: string,
    refreshToken: string,
    authorId: number,
  }
}

export interface IAuthResponse {
  userData: IAuthResponseApi | undefined;
  status: number;
  error: string | undefined;
}
