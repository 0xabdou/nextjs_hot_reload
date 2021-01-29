import TYPES from "../../../injection/types";
import {inject, injectable} from "inversify";
import {GoogleAuth} from "./services/google-auth";
import {Either, left, right} from "fp-ts/Either";
import AuthUser from "../types/auth-user";
import {IAuthApi} from "./services/auth-api";
import AuthError from "../types/auth-error";
import {ILocalStorage} from "./services/local-storage";

export default interface IAuthRepository {
  getAuthUser(): Promise<Either<AuthError, AuthUser | null>>

  signInWithGoogle(): Promise<Either<AuthError, AuthUser>>;

  signOut(): Promise<Either<AuthError, null>>;
}

@injectable()
export class AuthRepository implements IAuthRepository {
  public static ERROR_COOKIES = 'idpiframe_initialization_failed';
  public static ERROR_ABORTED = 'popup_closed_by_user';
  public static ERROR_NETWORK = 'network_error';

  private _authApi: IAuthApi;
  private _googleAuth: GoogleAuth;
  private _localStorage: ILocalStorage;

  constructor(
    @inject(TYPES.IAuthApi) authApi: IAuthApi,
    @inject(TYPES.GoogleAuth) googleAuth: GoogleAuth,
    @inject(TYPES.ILocalStorage) localStorage: ILocalStorage,
  ) {
    this._authApi = authApi;
    this._googleAuth = googleAuth;
    this._localStorage = localStorage;
  }

  getAuthUser(): Promise<Either<AuthError, AuthUser | null>> {
    return this.leftOrRight<AuthUser | null>(async () => {
      const token = await this._localStorage.read('accessToken');
      if (token) {
        const authUser: AuthUser = {accessToken: token};
        return authUser;
      }
      return null;
    });
  }

  async signInWithGoogle(): Promise<Either<AuthError, AuthUser>> {
    return this.leftOrRight<AuthUser>(async () => {
      const token = await this._googleAuth.signIn();
      const authUser = await this._authApi.signInWihGoogle(token);
      await this._localStorage.write('accessToken', authUser.accessToken);
      return authUser;
    });
  }

  async signOut(): Promise<Either<AuthError, null>> {
    return this.leftOrRight<null>(async () => {
      await this._localStorage.deleteAll();
      return null;
    });
  }

  async leftOrRight<R>(work: () => Promise<R>): Promise<Either<AuthError, R>> {
    try {
      const result = await work();
      return right(result);
    } catch (e) {
      console.log('AuthRepo THREW: ', e);
      if (typeof e.error === 'string') {
        switch (e.error) {
          case AuthRepository.ERROR_COOKIES:
            return left(AuthError.cookiesDisabled);
          case AuthRepository.ERROR_ABORTED:
            return left(AuthError.abortedByUser);
          case AuthRepository.ERROR_NETWORK:
            return left(AuthError.network);
        }
      }
      return left(AuthError.general);
    }
  }
}

