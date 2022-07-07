import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../models/user.interface';
import { userService } from '../../services/user.service';
import { IAuthResponse } from '../../models/auth.response.interface';

interface IInitialState {
  user: Partial<IUser>;
  accessToken?: string;
  refreshToken?: string;
  status?: number;
}

const initialState: IInitialState = {
  user: {},
  accessToken: '',
  refreshToken: '',
  status: 200,
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
    const res =  await userService.login(user);
    return { userData: res.data, status: res.status, error: undefined };
  } catch (error) {
    return { userData: undefined, status: 401, error: `${error}` };
  }
  })

// export const userLogout = createAsyncThunk('userSlice/userLogout', async () => {
//
// })

const userSlice = createSlice({
  name:'userSlice',
  initialState,
  reducers:{},
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
  }
})

const userReducer = userSlice.reducer;
export default userReducer;
