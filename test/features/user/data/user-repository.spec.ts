import {IUserApi} from "../../../../src/features/user/data/user-api";
import {deepEqual, instance, mock, reset, strictEqual, verify, when} from "ts-mockito";
import {IUserRepository, UserRepository} from "../../../../src/features/user/data/user-repository";
import {beforeEach, describe, expect, it} from "@jest/globals";
import User, {UserCreation} from "../../../../src/features/user/types/user";
import {right} from "fp-ts/Either";
import {shallowEqual} from "react-redux";

const MockUserApi = mock<IUserApi>();
const userRepo: IUserRepository = new UserRepository(instance(MockUserApi));

const user: User = {
  id: 'id',
  username: 'username',
  name: 'name',
  photoUrl: 'photoUrl',
};

beforeEach(() => {
  reset(MockUserApi);
});

describe('error catching', () => {
  //TODO: test this when you implement a real IUserApi
});

describe('getCurrentUser()', () => {
  it('should return a user on success', async () => {
    when(MockUserApi.getCurrentUser()).thenResolve(user);
    const result = await userRepo.getCurrentUser();
    expect(result).toStrictEqual(right(user));
    verify(MockUserApi.getCurrentUser()).once();
  });
});

describe('createUser()', () => {
  const MockFile = mock<File>();
  const creation: UserCreation = {
    username: 'username',
    photo: instance(MockFile),
  };
  it('should return a user on success',
    async () => {
      when(MockUserApi.createUser(creation)).thenResolve(user);
      const result = await userRepo.createUser(creation);
      expect(result).toStrictEqual(right(user));
      verify(MockUserApi.createUser(creation)).once();
    }
  );
});