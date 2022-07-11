import {  GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
//
// import { userService } from '../services/user.service';
//
// export const google = async (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
//  if("accessToken" in response) {
//    try{
//      const token = response.accessToken;
//
//      const result = await userService.googleLogin(token);
//      return result;
//    }catch (e) {
//    return undefined;
//    }
//
//  } else {
//    return undefined;
//  }
// }
//
// export const googleLogout = async (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
//   if ('profileObj' in response) {
//     try{
//       const user = response.profileObj;
//
//       const tokensPair = await userService.googleLogout(user.email);
//
//     } catch (e) {
//       return undefined;
//     }
//
//   } else {
//     return undefined;
//   }
// }
