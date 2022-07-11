import { IUser, IAuthResponseApi, ITokensPair } from '../models';
import { axiosService } from './axios.service';
import { urls } from '../constants';



export const userService = {
  registration: (data: IUser) => axiosService.post<IAuthResponseApi>(urls.registration,data),
  login:(data: Partial<IUser>) => axiosService.post<IAuthResponseApi>(urls.login,data),
  logout:(data: Partial<IUser>) => axiosService.post<void>(urls.logout,data),
  googleLogin:(data:string) => axiosService.post<ITokensPair>(urls.googleLogin,{info: data}),
  googleLogout: (data:string) => axiosService.post<ITokensPair>(urls.googleLogout,data)
}
