import TYPES from "../../injection/types";
import {inject, injectable} from "inversify";
import {GoogleAuth} from "./google-auth";
import {Either, left, right} from "fp-ts/Either";

export default interface IAuthRepository {
  signInWithGoogle(): Promise<Either<AuthError, string>>;
}

@injectable()
export class AuthRepository implements IAuthRepository {
  private _googleAuth: GoogleAuth;

  constructor(@inject(TYPES.GoogleAuth) googleAuth: GoogleAuth) {
    this._googleAuth = googleAuth;
  }

  async signInWithGoogle(): Promise<Either<AuthError, string>> {
    try {
      const token = await this._googleAuth.signIn();
      return right(token);
    } catch (e) {
      if (typeof e.error == 'string') {
        if (e.error == 'idpiframe_initialization_failed') {
          return left(AuthError.cookiesDisabled);
        }
      }
      return left(AuthError.general);
    }
  }
}

export enum AuthError {
  general,
  cookiesDisabled
}

