export interface IUser {
  email: string,
  name: string,
  age: number,
  city: string,
  password: string,
}
export interface ILogoutRequest extends Partial<IUser> {
  accessToken?: string;
}
