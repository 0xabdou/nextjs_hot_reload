import {beforeEach, describe, expect, it} from "@jest/globals";
import {GoogleAuth} from "../../../src/features/auth/services/google-auth";
import {instance, mock, reset, verify, when} from "ts-mockito";
import {IAuthApi} from "../../../src/features/auth/services/auth-api";
import AuthUser from "../../../src/features/auth/types/auth-user";
import IAuthRepository, {AuthRepository} from "../../../src/features/auth/auth-repository";
import {left, right} from "fp-ts/Either";
import AuthError from "../../../src/features/auth/types/auth-error";


const MockGoogleAuth = mock(GoogleAuth);
const MockAuthApi = mock<IAuthApi>();

const googleAuth: GoogleAuth = instance(MockGoogleAuth);
const authApi: IAuthApi = instance(MockAuthApi);

const authRepo: IAuthRepository = new AuthRepository(authApi, googleAuth);

beforeEach(() => {
  reset(MockGoogleAuth);
  reset(MockAuthApi);
});

describe('leftOrRight', () => {
  it('should return cookies auth error', async () => {
   const result = await (authRepo as AuthRepository).leftOrRight<AuthUser>(() => {
       throw {error: AuthRepository.ERROR_COOKIES};
   });
   expect(result).toStrictEqual(left(AuthError.cookiesDisabled));
  });

  it('should return aborted auth error', async () => {
    const result = await (authRepo as AuthRepository).leftOrRight<AuthUser>(() => {
      throw {error: AuthRepository.ERROR_ABORTED};
    });
    expect(result).toStrictEqual(left(AuthError.abortedByUser));
  });

  it('should return cookies auth error', async () => {
    const result = await (authRepo as AuthRepository).leftOrRight<AuthUser>(() => {
      throw {error: 'yikes'};
    });
    expect(result).toStrictEqual(left(AuthError.general));
  });
});

describe('signInWithGoogle', () => {
  const token = 'token';
  const authUser: AuthUser = {accessToken: 'access-token'};
  beforeEach(() => {
    when(MockGoogleAuth.signIn()).thenResolve(token);
    when(MockAuthApi.signInWihGoogle(token)).thenResolve(authUser);
  });

  it('should return the authUser if all goes well', async () => {
    const result = await authRepo.signInWithGoogle();
    expect(result).toStrictEqual(right(authUser));
    verify(MockGoogleAuth.signIn()).once();
    verify(MockAuthApi.signInWihGoogle(token)).once();
  });
});