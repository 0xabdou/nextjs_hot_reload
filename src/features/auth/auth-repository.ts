import TYPES from "../../injection/types";
import {inject, injectable} from "inversify";
import {GoogleAuth} from "./services/google-auth";
import {Either, left, right} from "fp-ts/Either";
import AuthUser from "./types/auth-user";
import {IAuthApi} from "./services/auth-api";
import AuthError from "./types/auth-error";

export default interface IAuthRepository {
  signInWithGoogle(): Promise<Either<AuthError, AuthUser>>;
}

@injectable()
export class AuthRepository implements IAuthRepository {
  public static ERROR_COOKIES = 'idpiframe_initialization_failed';
  public static ERROR_ABORTED = 'popup_closed_by_user';

  private _authApi: IAuthApi;
  private _googleAuth: GoogleAuth;

  constructor(
    @inject(TYPES.IAuthApi) authApi: IAuthApi,
    @inject(TYPES.GoogleAuth) googleAuth: GoogleAuth,
  ) {
    this._authApi = authApi;
    this._googleAuth = googleAuth;
  }

  async signInWithGoogle(): Promise<Either<AuthError, AuthUser>> {
    return this.leftOrRight<AuthUser>(async () => {
      const token = await this._googleAuth.signIn();
      return this._authApi.signInWihGoogle(token);
    });
  }

  async leftOrRight<R>(work: () => Promise<R>): Promise<Either<AuthError, R>> {
    try {
      const result = await work();
      return right(result);
    } catch (e) {
      if (typeof e.error === 'string') {
        switch (e.error) {
          case AuthRepository.ERROR_COOKIES:
            return left(AuthError.cookiesDisabled);
          case AuthRepository.ERROR_ABORTED:
            return left(AuthError.abortedByUser);
        }
      }
      return left(AuthError.general);
    }
  }
}

