import {beforeEach, describe, expect, it} from "@jest/globals";
import {reset, when} from "ts-mockito";
import mockServices from "../../mock-services";
import {mockStore, mockUser} from "../../mock-objects";
import {left, right} from "fp-ts/Either";
import userReducer, {getCurrentUser, UserState} from "../../../src/features/user/user-slice";
import UserError from "../../../src/features/user/types/user-error";
import {PayloadAction} from "@reduxjs/toolkit";
import User from "../../../src/features/user/types/user";

const MockUserRepository = mockServices.mocks.userRepository;
const store = mockStore();
const userError = UserError.general;

beforeEach(() => {
  reset(MockUserRepository);
});

describe('getCurrentUser', () => {
  const act = () => getCurrentUser()(
    store.dispatch,
    store.getState,
    {services: mockServices.instances},);

  it('should return the right action if fulfilled', async () => {
    when(MockUserRepository.getCurrentUser()).thenResolve(right(mockUser));
    const result = await act();
    expect(result.payload).toStrictEqual(mockUser);
    expect(result.type).toStrictEqual(getCurrentUser.fulfilled.type);
  });

  it('should return the right action if rejected', async () => {
    when(MockUserRepository.getCurrentUser()).thenResolve(left(userError));
    const result = await act();
    expect(result.payload).toStrictEqual(userError);
    expect(result.type).toStrictEqual(getCurrentUser.rejected.type);
  });

  describe('reducers', () => {
    const initialState: UserState = {
      initialized: false,
      currentUser: null,
      creatingUser: false,
      error: null,
    };

    it('should return the right state if fulfilled', () => {
      const action: PayloadAction<User> = {type: getCurrentUser.fulfilled.type, payload: mockUser};
      const result = userReducer(initialState, action);
      expect(result).toStrictEqual({...initialState, currentUser: mockUser, initialized: true});
    });

    it('should return the right state if rejected with userNotFound error', () => {
      const action: PayloadAction<UserError> = {
        type: getCurrentUser.rejected.type,
        payload: UserError.notFound,
      };
      const result = userReducer(initialState, action);
      expect(result).toStrictEqual({...initialState, initialized: true});
    });

    it('should return the right state if rejected with some other error', () => {
      const action: PayloadAction<UserError> = {type: getCurrentUser.rejected.type, payload: userError};
      const result = userReducer(initialState, action);
      expect(result).toStrictEqual({...initialState, error: userError});
    });
  });
});