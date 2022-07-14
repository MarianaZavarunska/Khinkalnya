import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {  GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

import { IUser, IAuthResponse, ITokensPair, ILogoutRequest } from '../../models';
import { userService } from '../../services/user.service';

interface IInitialState {
  user: Partial<IUser>;
  accessToken?: string;
  refreshToken?: string;
  status?: number;
  isLoginActive:  boolean,
  isRegisterActive: boolean,
}

const initialState: IInitialState = {
  user: {},
  accessToken: undefined,
  refreshToken: undefined,
  status: 200,
  isLoginActive: false,
  isRegisterActive: false,
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

export const userLogout = createAsyncThunk<void, ILogoutRequest>
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
      state.isLoginActive = false;
      state.isRegisterActive = false;
    },

    setLoginActive:(state) => {
      state.isLoginActive= !state.isLoginActive;
    },

    setRegisterActive:(state) => {
      state.isRegisterActive= !state.isRegisterActive;
      state.isLoginActive = false;
    },
  },
  extraReducers: (builder) => {

    builder.addCase(userRegistration.fulfilled, (state, action) => {
      state.accessToken = action.payload.userData?.tokensPair?.accessToken;
      state.refreshToken = action.payload?.userData?.tokensPair?.refreshToken;
      state.user = {...action.payload?.userData?.user};
      state.status = action.payload?.status;

      state.isRegisterActive = false;
      localStorage.setItem('accessToken', action.payload.userData?.tokensPair.accessToken || '');
      localStorage.setItem('refreshToken', action.payload.userData?.tokensPair.refreshToken || '');
    });

    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.accessToken = action.payload.userData?.tokensPair.accessToken;
      state.refreshToken = action.payload?.userData?.tokensPair.refreshToken;
      state.user = {...action.payload?.userData?.user};
      state.status = action.payload?.status;

      state.isLoginActive = false;
      localStorage.setItem('accessToken', action.payload.userData?.tokensPair.accessToken || '');
      localStorage.setItem('refreshToken', action.payload.userData?.tokensPair.refreshToken || '');
    });

    builder.addCase(userLogout.fulfilled, (state, action) => {
      state.accessToken = undefined;
      state.refreshToken = undefined;
      state.user = {};
      state.status = undefined;

      state.isLoginActive = false;
      state.isRegisterActive = false;
      localStorage.clear();
    })

    builder.addCase(googleLogin.fulfilled, (state, action) => {
      state.accessToken = action.payload?.accessToken;
      state.refreshToken = action.payload?.refreshToken;

      // TODO: add userData response
      localStorage.setItem('accessToken', action.payload?.accessToken || '');
      localStorage.setItem('refreshToken', action.payload?.refreshToken || '');
    })
  }

})

const userReducer = userSlice.reducer;
export const {setModalActive, setLoginActive, setRegisterActive} = userSlice.actions;
export {userReducer};
