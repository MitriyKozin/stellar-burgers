import { initialState, setAuthChecked, setUser, usersReducer } from './slice';
import { loginUser, logoutUser, registerUser, updateUser } from './actions';
import { TUser } from '@utils-types';

describe('users tests', () => {
  test('registerUser rejected', () => {
    const messageError = 'error';
    const newState = usersReducer(initialState, {
      type: registerUser.rejected.type,
      error: {
        message: messageError
      }
    });
    expect(newState.error).toEqual(messageError);
    expect(newState.user).toBeNull();
  });

  test('registerUser fulfilled', () => {
    const testData: TUser = {
      name: 'name',
      email: 'email'
    };

    const newState = usersReducer(initialState, {
      type: registerUser.fulfilled.type,
      payload: {
        user: testData
      }
    });
    expect(newState.error).toBeNull();
    expect(newState.user).toEqual(testData);
    expect(newState.isAuthChecked).toEqual(true);
  });

  test('loginUser rejected', () => {
    const messageError = 'error';
    const newState = usersReducer(initialState, {
      type: loginUser.rejected.type,
      error: {
        message: messageError
      }
    });
    expect(newState.error).toEqual(messageError);
    expect(newState.user).toBeNull();
  });

  test('loginUser fulfilled', () => {
    const testData: TUser = {
      name: 'name',
      email: 'email'
    };

    const newState = usersReducer(initialState, {
      type: loginUser.fulfilled.type,
      payload: testData
    });
    expect(newState.error).toBeNull();
    expect(newState.user).toEqual(testData);
    expect(newState.isAuthChecked).toEqual(true);
  });

  test('loginOut fulfilled', () => {
    const newState = usersReducer(initialState, {
      type: logoutUser.fulfilled.type
    });
    expect(newState.user).toBeNull();
  });

  test('updateUser rejected', () => {
    const messageError = 'error';
    const newState = usersReducer(initialState, {
      type: updateUser.rejected.type,
      error: {
        message: messageError
      }
    });
    expect(newState.error).toEqual(messageError);
    expect(newState.isAuthChecked).toEqual(false);
  });

  test('updateUser fulfilled', () => {
    const testData: TUser = {
      name: 'name',
      email: 'email'
    };

    const newState = usersReducer(initialState, {
      type: updateUser.fulfilled.type,
      payload: {
        user: testData
      }
    });
    expect(newState.error).toBeNull();
    expect(newState.user).toEqual(testData);
    expect(newState.isAuthChecked).toEqual(true);
  });

  test('setUser', () => {
    const testData: TUser = {
      name: 'name',
      email: 'email'
    };

    const newState = usersReducer(initialState, {
      type: setUser.type,
      payload: testData
    });
    expect(newState.user).toEqual(testData);
  });

  test('setAuthChecked', () => {
    const authChecked = true;
    const newState = usersReducer(initialState, {
      type: setAuthChecked.type,
      payload: authChecked
    });
    expect(newState.isAuthChecked).toEqual(authChecked);
  });
});
