import {googleLogin, googleLogout} from "../utils/google-login";

const baseURL = 'http://localhost:8080/api/v1'

export default baseURL;

export const urls={
  registration: '/auth/registration',
  login: '/auth/login',
  googleLogin: '/auth/google/login',
  googleLogout: '/auth/google/logout',
  logout: '/auth/logout',
}
