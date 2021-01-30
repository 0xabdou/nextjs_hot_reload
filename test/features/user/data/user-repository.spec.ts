import {IUserApi} from "../../../../src/features/user/data/user-api";
import {instance, mock, reset, verify, when} from "ts-mockito";
import {IUserRepository, UserRepository} from "../../../../src/features/user/data/user-repository";
import {beforeEach, describe, expect, it} from "@jest/globals";
import {right} from "fp-ts/Either";
import {mockUser, mockUserCreation} from "../../../mock-objects";

const MockUserApi = mock<IUserApi>();
const userRepo: IUserRepository = new UserRepository(instance(MockUserApi));


beforeEach(() => {
  reset(MockUserApi);
});

describe('error catching', () => {
  //TODO: test this when you implement a real IUserApi
});

describe('getCurrentUser()', () => {
  it('should return a user on success', async () => {
    when(MockUserApi.getCurrentUser()).thenResolve(mockUser);
    const result = await userRepo.getCurrentUser();
    expect(result).toStrictEqual(right(mockUser));
    verify(MockUserApi.getCurrentUser()).once();
  });
});

describe('createUser()', () => {

  it('should return a user on success',
    async () => {
      when(MockUserApi.createUser(mockUserCreation)).thenResolve(mockUser);
      const result = await userRepo.createUser(mockUserCreation);
      expect(result).toStrictEqual(right(mockUser));
      verify(MockUserApi.createUser(mockUserCreation)).once();
    }
  );
});