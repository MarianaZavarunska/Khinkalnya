import { IUser } from '../models/user.interface';
import { axiosService } from './axios.service';
import { urls } from '../constants';
import { IAuthResponseApi } from '../models/auth.response.interface';
import googleLogin from '../utils/google-login';
import { ITokensPair } from '../models';


export const userService = {
  registration: (data: IUser) => axiosService.post<IAuthResponseApi>(urls.registration,data),
  login:(data: Partial<IUser>) => axiosService.post<IAuthResponseApi>(urls.login,data),
  googleLogin:(data:string) => axiosService.post<ITokensPair>(urls.googleLogin,{info: data})
}
