import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import userReducer, { loginUserThunk, registerUserThunk, logoutUserThunk, updateUserThunk, forgotPasswordThunk, resetPasswordThunk, getUserThunk } from './userSlice';

const setupStore = () =>
  configureStore({
    reducer: {
      user: userReducer
    }
  });

describe('Тесты экшенов клиента', () => {
  const mockSet = jest.fn();

  describe('Тесты экшена запроса логина', () => {
    test('Тест экшена ожидания ответ после запроса логина', () => {
      const store = setupStore();
      store.dispatch({ type: loginUserThunk.pending.type });
      const state = store.getState();
      expect(state.user.isLoadong).toBeTruthy();
      expect(state.user.error).toBeNull();
    });
    test('Тест экшена ошибки после запроса логина', () => {
      const store = setupStore();
      const error = 'mocked error';
      store.dispatch({
        type: loginUserThunk.rejected.type,
        error: { message: error }
      });
      const state = store.getState();
      expect(state.user.isLoadong).toBeFalsy();
      expect(state.user.error).toBe(error);
    });
    test('Тест экшена успешного логина', () => {
      const mockedPayload = {
        accessToken:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZjBhMDAyOTdlZGUwMDAxZDA2MDg1NCIsImlhdCI6MTcxMjIyODc2MywiZXhwIjoxNzEyMjI5OTYzfQ.NnIdUkIZ8gHHicj86d2Xrxxz5wxTqJyghFfyU9ZQ6E0',
        refreshToken:
          'cae7fbb0ce188f2c244e611b328ae4869b892902b1ba10c81cee99194854b1d3c192e0bfc9b90b06',
        user: {
          email: 'lleksiv@gmail.com',
          name: 'Georg Shakillow'
        }
      };
      const store = setupStore();
      store.dispatch({
        type: loginUserThunk.fulfilled.type,
        payload: mockedPayload
      });
      const state = store.getState();
      expect(state.user.isLoadong).toBeFalsy();
      expect(state.user.error).toBeNull();
      expect(state.user.user).toEqual(mockedPayload.user);
      expect(state.user.isAuthorized).toBeTruthy();
    });
  });

  describe('Тест экшена запроса регистрации', () => {
    test('Тест экшена ожидания ответ после запроса регистрации', () => {
      const store = setupStore();
      store.dispatch({ type: registerUserThunk.pending.type });
      const state = store.getState();
      expect(state.user.isLoadong).toBeTruthy();
      expect(state.user.error).toBeNull();
    });
    test('Тест экшена ошибки после запроса регистрации', () => {
      const store = setupStore();
      const error = 'mocked error';
      store.dispatch({
        type: registerUserThunk.rejected.type,
        error: { message: error }
      });
      const state = store.getState();
      expect(state.user.isLoadong).toBeFalsy();
      expect(state.user.error).toBe(error);
    });
    test('Тест экшена успешной регистрации', () => {
      const mockedPayload = {
        accessToken:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZjBhMDAyOTdlZGUwMDAxZDA2MDg1NCIsImlhdCI6MTcxMjIyODc2MywiZXhwIjoxNzEyMjI5OTYzfQ.NnIdUkIZ8gHHicj86d2Xrxxz5wxTqJyghFfyU9ZQ6E0',
        refreshToken:
          'cae7fbb0ce188f2c244e611b328ae4869b892902b1ba10c81cee99194854b1d3c192e0bfc9b90b06',
        user: {
          email: 'lleksiv@gmail.com',
          name: 'Georg Shakillow'
        }
      };
      const store = setupStore();
      store.dispatch({
        type: registerUserThunk.fulfilled.type,
        payload: mockedPayload
      });
      const state = store.getState();
      expect(state.user.isLoadong).toBeFalsy();
      expect(state.user.error).toBeNull();
      expect(state.user.user).toEqual(mockedPayload.user);
      expect(state.user.isAuthorized).toBeTruthy();
    });
  });

  describe('Тест экшена запроса логаута', () => {
    test('Тест экшена ожидания ответ после запроса логаута', () => {
      const store = setupStore();
      store.dispatch({ type: logoutUserThunk.pending.type });
      const state = store.getState();
      expect(state.user.isLoadong).toBeTruthy();
      expect(state.user.error).toBeNull();
    });
    test('Тест экшена ошибки после запроса логаута', () => {
      const store = setupStore();
      const error = 'mocked error';
      store.dispatch({
        type: logoutUserThunk.rejected.type,
        error: { message: error }
      });
      const state = store.getState();
      expect(state.user.isLoadong).toBeFalsy();
      expect(state.user.error).toBe(error);
    });
    test('Тест экшена успешного логаута', () => {
      const mockedPayload = {
        message: 'Successful logout'
      };
      const store = setupStore();
      store.dispatch({
        type: logoutUserThunk.fulfilled.type,
        payload: mockedPayload
      });
      const state = store.getState();
      expect(state.user.isLoadong).toBeFalsy();
      expect(state.user.error).toBeNull();
      expect(state.user.user).toBeNull();
      expect(state.user.isAuthorized).toBeFalsy();
    });
  });

  describe('Тест экшена запроса изменения данных клиента', () => {
    test('Тест экшена ожидания ответ после запроса изменения данных клиента', () => {
      const store = setupStore();
      store.dispatch({ type: updateUserThunk.pending.type });
      const state = store.getState();
      expect(state.user.isLoadong).toBeTruthy();
      expect(state.user.error).toBeNull();
    });
    test('Тест экшена ошибки после запроса изменения данных клиента', () => {
      const store = setupStore();
      const error = 'mocked error';
      store.dispatch({
        type: updateUserThunk.rejected.type,
        error: { message: error }
      });
      const state = store.getState();
      expect(state.user.isLoadong).toBeFalsy();
      expect(state.user.error).toBe(error);
    });
    test('Тест экшена успешного изменения данных клиента', () => {
      const mockedPayload = {
        user: {
          email: 'lleksiv@gmail.com',
          name: 'Georg Shakillow'
        }
      };
      const store = setupStore();
      store.dispatch({
        type: updateUserThunk.fulfilled.type,
        payload: mockedPayload
      });
      const state = store.getState();
      expect(state.user.isLoadong).toBeFalsy();
      expect(state.user.error).toBeNull();
      expect(state.user.user).toEqual(mockedPayload.user);
      expect(state.user.isAuthorized).toBeTruthy();
    });
  });

  describe('Тест экшена запроса восстановления пароля', () => {
    test('Тест экшена ожидания ответ после запроса восстановления пароля', () => {
      const store = setupStore();
      store.dispatch({ type: forgotPasswordThunk.pending.type });
      const state = store.getState();
      expect(state.user.isLoadong).toBeTruthy();
      expect(state.user.error).toBeNull();
    });
    test('Тест экшена ошибки после запроса восстановления пароля', () => {
      const store = setupStore();
      const error = 'mocked error';
      store.dispatch({
        type: forgotPasswordThunk.rejected.type,
        error: { message: error }
      });
      const state = store.getState();
      expect(state.user.isLoadong).toBeFalsy();
      expect(state.user.error).toBe(error);
    });
    test('Тест экшена успешного восстановления пароля', () => {
      const mockedPayload = {
        message: 'Reset email sent'
      };
      const store = setupStore();
      store.dispatch({
        type: forgotPasswordThunk.fulfilled.type,
        payload: mockedPayload
      });
      const state = store.getState();
      expect(state.user.isLoadong).toBeFalsy();
      expect(state.user.error).toBeNull();
      expect(state.user.user).toBeNull();
      expect(state.user.isAuthorized).toBeFalsy();
    });
  });

  describe('Тест экшена запроса изменения пароля', () => {
    test('Тест экшена ожидания ответ после запроса изменения пароля', () => {
      const store = setupStore();
      store.dispatch({ type: resetPasswordThunk.pending.type });
      const state = store.getState();
      expect(state.user.isLoadong).toBeTruthy();
      expect(state.user.error).toBeNull();
    });
    test('Тест экшена ошибки после запроса изменения пароля', () => {
      const store = setupStore();
      const error = 'mocked error';
      store.dispatch({
        type: resetPasswordThunk.rejected.type,
        error: { message: error }
      });
      const state = store.getState();
      expect(state.user.isLoadong).toBeFalsy();
      expect(state.user.error).toBe(error);
    });
    test('Тест экшена успешного изменения пароля', () => {
      const mockedPayload = {
        message: 'Password successfully reset'
      };
      const store = setupStore();
      store.dispatch({
        type: resetPasswordThunk.fulfilled.type,
        payload: mockedPayload
      });
      const state = store.getState();
      expect(state.user.isLoadong).toBeFalsy();
      expect(state.user.error).toBeNull();
      expect(state.user.user).toBeNull();
      expect(state.user.isAuthorized).toBeFalsy();
    });
  });

  describe('Тест экшена запроса данных пользователя', () => {
    test('Тест экшена ожидания ответ после запроса данных пользователя', () => {
      const store = setupStore();
      store.dispatch({ type: getUserThunk.pending.type });
      const state = store.getState();
      expect(state.user.isLoadong).toBeTruthy();
      expect(state.user.error).toBeNull();
    });
    test('Тест экшена ошибки после запроса данных пользователя', () => {
      const store = setupStore();
      const error = 'mocked error';
      store.dispatch({
        type: getUserThunk.rejected.type,
        error: { message: error }
      });
      const state = store.getState();
      expect(state.user.isLoadong).toBeFalsy();
      expect(state.user.error).toBe(error);
    });
    test('Тест экшена успешного запроса данных пользователя', () => {
      const mockedPayload = {
        user: {
          email: 'lleksiv@gmail.com',
          name: 'Georg Shakillow'
        }
      };
      const store = setupStore();
      store.dispatch({
        type: getUserThunk.fulfilled.type,
        payload: mockedPayload
      });
      const state = store.getState();
      expect(state.user.isLoadong).toBeFalsy();
      expect(state.user.error).toBeNull();
      expect(state.user.user).toEqual(mockedPayload.user);
      expect(state.user.isAuthorized).toBeTruthy();
    });
  });
});
