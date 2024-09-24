import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { registerUser, loginUser, updateUser } from './actions';
import { logoutUser } from './actions';

export interface TUserState {
  // флаг для статуса проверки токена пользователя
  isAuthChecked: boolean;
  // данные текущего пользователя
  user: TUser | null;
  // ошибка авторизации если есть
  error: string | null;
}

export const initialState: TUserState = {
  isAuthChecked: false,
  user: null,
  error: null
};

export const users = createSlice({
  name: 'users',
  initialState,
  selectors: {
    getUser: (state) => state.user,
    getAuthChecked: (state) => state.isAuthChecked,
    getError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      // Регистрация
      .addCase(registerUser.rejected, (state, action) => {
        state.user = null;
        state.error = action.error.message ?? null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      // Логин
      .addCase(loginUser.rejected, (state, action) => {
        state.user = null;
        state.error = action.error.message ?? null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      // Логаут
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.user = null;
      })
      // Обновление данных пользователя
      .addCase(updateUser.pending, (state) => {
        state.error = '';
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error = action.error.message!;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
      });
  },
  reducers: {
    setAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
    }
  }
});

export const usersReducer = users.reducer;
export const { setAuthChecked, setUser } = users.actions;
export const { getUser, getAuthChecked, getError } = users.selectors;
