import {  GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

import { userService } from '../services/user.service';

export default async (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
 if("accessToken" in response) {
   try{
     const token = response.accessToken;

     const result = await userService.googleLogin(token);
     return result;
   }catch (e) {
   return undefined;
   }

 } else {
   return undefined;
 }
}
