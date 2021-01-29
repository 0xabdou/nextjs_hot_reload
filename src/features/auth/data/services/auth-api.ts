import AuthUser from "../../types/auth-user";
import {injectable} from "inversify";

export interface IAuthApi {
  signInWihGoogle(token: string): Promise<AuthUser>;
}

@injectable()
export class FakeAuthApi implements IAuthApi {
  signInWihGoogle(token: string): Promise<AuthUser> {
    return new Promise<AuthUser>(resolve => {
      setTimeout(
        () => resolve({accessToken: 'some_access_token'}),
        1000
      );
    });
  }
}