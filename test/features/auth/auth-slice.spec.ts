import {beforeEach, describe, expect, it} from "@jest/globals";
import authReducer, {
  AuthState,
  getAuthUser,
  signInWithGoogle,
  signOut,
  ThunkApiType
} from "../../../src/features/auth/auth-slice";
import mockServices, {resetMocks} from "../../mock-services";
import {verify, when} from "ts-mockito";
import AuthUser from "../../../src/features/auth/types/auth-user";
import {left, right} from "fp-ts/Either";
import AuthError from "../../../src/features/auth/types/auth-error";
import {AsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import {mockStore} from "../../mock-objects";


const store = mockStore();
const authUser: AuthUser = {accessToken: 'some_access_token'};
const authError = AuthError.general;
const initialState: AuthState = {
  initialized: false,
  authUser: null,
  authError: null,
  loading: false,
};
const loadingState: AuthState = {...initialState, loading: true};

beforeEach(() => {
  store.clearActions();
  resetMocks();
});

const testReducers = (thunk: AsyncThunk<any, void, ThunkApiType>) => {
  describe('reducers', () => {
    it('should set loading to true if pending', async () => {
      const action: PayloadAction = {type: thunk.pending.type, payload: undefined};
      const result = authReducer(initialState, action);
      expect(result).toStrictEqual({...initialState, loading: true});
    });

    it('should set authUser, and loading to false if fulfilled', async () => {
      const action: PayloadAction<AuthUser> = {
        type: thunk.fulfilled.type,
        payload: authUser,
      };
      const result = authReducer(loadingState, action);
      expect(result).toStrictEqual({...loadingState, loading: false, authUser});
    });

    it('should set authError, and loading to false if rejected', async () => {
      const action: PayloadAction<AuthError> = {
        type: thunk.rejected.type,
        payload: authError,
      };
      const result = authReducer(loadingState, action);
      expect(result).toStrictEqual({...loadingState, loading: false, authError});
    });
  });
};


describe('signInWithGoogle thunk', () => {
  const act = () => signInWithGoogle()(
    store.dispatch,
    store.getState,
    {services: mockServices.instances}
  );

  it('should return the right action when fulfilled', async () => {
    when(mockServices.mocks.authRepository.signInWithGoogle()).thenResolve(right(authUser));
    const result = await act();
    expect(result.payload).toStrictEqual(authUser);
    expect(result.type).toStrictEqual(signInWithGoogle.fulfilled.type);
    verify(mockServices.mocks.authRepository.signInWithGoogle()).once();
  });

  it('should return the right action when rejected', async () => {
    when(mockServices.mocks.authRepository.signInWithGoogle()).thenResolve(left(authError));
    const result = await act();
    expect(result.payload).toStrictEqual(authError);
    expect(result.type).toStrictEqual(signInWithGoogle.rejected.type);
    verify(mockServices.mocks.authRepository.signInWithGoogle()).once();
  });

  testReducers(signInWithGoogle);
});

describe('getAuthUser thunk', () => {
  const act = () => getAuthUser()(
    store.dispatch,
    store.getState,
    {services: mockServices.instances}
  );

  it('should return the right action when fulfilled', async () => {
    when(mockServices.mocks.authRepository.getAuthUser()).thenResolve(right(authUser));
    const result = await act();
    expect(result.payload).toStrictEqual(authUser);
    expect(result.type).toStrictEqual(getAuthUser.fulfilled.type);
    verify(mockServices.mocks.authRepository.getAuthUser()).once();
  });

  it('should return the right action when rejected', async () => {
    when(mockServices.mocks.authRepository.getAuthUser()).thenResolve(left(authError));
    const result = await act();
    expect(result.payload).toStrictEqual(authError);
    expect(result.type).toStrictEqual(getAuthUser.rejected.type);
    verify(mockServices.mocks.authRepository.getAuthUser()).once();
  });

  testReducers(getAuthUser);
});

describe('signOut thunk', () => {
  const act = () => signOut()(
    store.dispatch,
    store.getState,
    {services: mockServices.instances}
  );

  it('should return the right action when fulfilled', async () => {
    when(mockServices.mocks.authRepository.signOut()).thenResolve(right(null));
    const result = await act();
    expect(result.payload).toBe(null);
    expect(result.type).toStrictEqual(signOut.fulfilled.type);
    verify(mockServices.mocks.authRepository.signOut()).once();
  });

  it('should return the right action when rejected', async () => {
    when(mockServices.mocks.authRepository.signOut()).thenResolve(left(authError));
    const result = await act();
    expect(result.payload).toBe(authError);
    expect(result.type).toStrictEqual(signOut.rejected.type);
    verify(mockServices.mocks.authRepository.signOut()).once();
  });

  describe('reducers', () => {
    const loggedInState: AuthState = {...initialState, authUser: authUser};

    it('should set loading to true if pending', () => {
      const action = {type: signOut.pending.type};
      const result = authReducer(loggedInState, action);
      expect(result).toStrictEqual({...loggedInState, loading: true});
    });

    it('should unset authUser and loading if fulfilled', () => {
      const action = {type: signOut.fulfilled};
      const result = authReducer({...loggedInState, loading: true}, action);
      expect(result).toStrictEqual({...loggedInState, authUser: null});
    });

    it('should unset loading and set authError if rejected', () => {
      const action = {type: signOut.rejected.type, payload: authError};
      const result = authReducer({...loggedInState, loading: true}, action);
      expect(result).toStrictEqual({...loggedInState, authError});
    });
  });
});
