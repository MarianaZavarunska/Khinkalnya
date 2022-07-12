import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {  GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

import { IUser, IAuthResponse, ITokensPair } from '../../models';
import { userService } from '../../services/user.service';



interface IInitialState {
  user: Partial<IUser>;
  accessToken?: string;
  refreshToken?: string;
  status?: number;
  isModalActive: boolean;
}

const initialState: IInitialState = {
  user: {},
  accessToken: '',
  refreshToken: '',
  status: 200,
  isModalActive: false,
}

export const userRegistration = createAsyncThunk<IAuthResponse, IUser>('userSlice/userRegistration',
  async (user) => {
    try{
      const res =  await userService.registration(user);
      const { data, status } = res;

      return { userData: data, status: status, error: undefined };

    } catch (error) {
      return { userData: undefined, status: 401, error: `${error}` };
    }
})



export const userLogin = createAsyncThunk<IAuthResponse, Partial<IUser>>('userLogin/userSlice',
  async(user) => {
  try{
    const {data, status} =  await userService.login(user);

    return { userData: data, status: status, error: undefined };
  } catch (error) {
    return { userData: undefined, status: 401, error: `${error}` };
  }
  })

export const userLogout = createAsyncThunk<void, Partial<IUser>>
('userSlice/userLogout', async (user) => {

  try {
    await userService.logout(user);
  } catch (error) {
    return undefined
  }
})


export const googleLogin = createAsyncThunk<ITokensPair | undefined, GoogleLoginResponse | GoogleLoginResponseOffline >
('googleLogin/userSlice', async (response) => {
  if("accessToken" in response) {
    try{
      const token = response.accessToken;
      const {data} =  await userService.googleLogin(token);
      return data;

    }catch (e) {
      return undefined;
    }

  } else {
    return undefined;
  }
})

const userSlice = createSlice({
  name:'userSlice',
  initialState,
  reducers:{
    setModalActive:(state) => {
      state.isModalActive = !state.isModalActive;
    }
  },
  extraReducers: (builder) => {

    builder.addCase(userRegistration.fulfilled, (state, action) => {
      state.accessToken = action.payload.userData?.tokensPair?.accessToken;
      state.refreshToken = action.payload?.userData?.tokensPair?.refreshToken;
      state.user = {...action.payload?.userData?.user};
      state.status = action.payload?.status;

      localStorage.setItem('accessToken', action.payload.userData?.tokensPair.accessToken || '');
      localStorage.setItem('refreshToken', action.payload.userData?.tokensPair.refreshToken || '');
    });

    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.accessToken = action.payload.userData?.tokensPair.accessToken;
      state.refreshToken = action.payload?.userData?.tokensPair.refreshToken;
      state.user = {...action.payload?.userData?.user};
      state.status = action.payload?.status;

      localStorage.setItem('accessToken', action.payload.userData?.tokensPair.accessToken || '');
      localStorage.setItem('refreshToken', action.payload.userData?.tokensPair.refreshToken || '');
    });

    builder.addCase(userLogout.fulfilled, (state, action) => {
      localStorage.clear();
    })

    builder.addCase(googleLogin.fulfilled, (state, action) => {

      localStorage.setItem('accessToken', action.payload?.accessToken || '');
      localStorage.setItem('refreshToken', action.payload?.refreshToken || '');
    })
  }

})

const userReducer = userSlice.reducer;
export const {setModalActive} = userSlice.actions;
export {userReducer};
