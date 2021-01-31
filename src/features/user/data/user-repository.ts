import {Either, left, right} from "fp-ts/Either";
import UserError from "../types/user-error";
import User, {UserCreation} from "../types/user";
import {IUserApi} from "./user-api";
import {inject, injectable} from "inversify";
import TYPES from "../../../injection/types";

export interface IUserRepository {
  getCurrentUser(): Promise<Either<UserError, User>>;

  createUser(creation: UserCreation): Promise<Either<UserError, User>>;
}

@injectable()
export class UserRepository implements IUserRepository {
  private _userApi: IUserApi;

  constructor(@inject(TYPES.IUserApi) userApi: IUserApi) {
    this._userApi = userApi;
  }

  getCurrentUser(): Promise<Either<UserError, User>> {
    return this.leftOrRight(() => this._userApi.getCurrentUser());
  }

  createUser(creation: UserCreation): Promise<Either<UserError, User>> {
    return this.leftOrRight(() => this._userApi.createUser(creation));
  }

  async leftOrRight<R>(work: () => Promise<R>): Promise<Either<UserError, R>> {
    try {
      const result = await work();
      return right(result);
    } catch (e) {
      // TODO: catch them errors
      console.log(e);
      return left(UserError.general);
    }
  }
}