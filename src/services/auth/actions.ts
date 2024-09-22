import { TLoginData, loginUserApi, TRegisterData, registerUserApi, logoutApi, getUserApi, updateUserApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setAuthChecked, setUser } from './slice';
import { AppDispatch } from '../store';
import { deleteCookie, setCookie } from '../../utils/cookie';

export const loginUser = createAsyncThunk(
  'user/login',
  async ({ email, password }: TLoginData) => {
    const result = await loginUserApi({ email, password });
    setCookie('accessToken', result.accessToken);
    localStorage.setItem('accessToken', result.accessToken);
    localStorage.setItem('refreshToken', result.refreshToken);
    return result.user;
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async ({ email, name, password }: TRegisterData) => {
    const result = await registerUserApi({ email, name, password });
    if (result.success) {
      setCookie('accessToken', result.accessToken);
      localStorage.setItem('accessToken', result.accessToken);
      localStorage.setItem('refreshToken', result.refreshToken);
    }
    return result;
  }
);

export const logoutUser = createAsyncThunk('user/logout', async () => {
  const result = await logoutApi();
  deleteCookie('accessToken');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
});

export const checkUserAuth = createAsyncThunk<
  void,
  void,
  { dispatch: AppDispatch }
>('user/checkAuth', async (_, { dispatch }) => {
  if (localStorage.getItem('accessToken')) {
    getUserApi()
      .then((res) => {
        dispatch(setUser(res.user));
      })
      .catch(() => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      })
      .finally(() => {
        dispatch(setAuthChecked(true));
      });
  } else {
    dispatch(setAuthChecked(true));
  }
});

export const updateUser = createAsyncThunk(
  'user/update',
  async ({ email, name, password }: TRegisterData) => {
    const result = await updateUserApi({ email, name, password });
    return result;
  }
);
