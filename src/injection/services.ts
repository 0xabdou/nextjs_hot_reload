import IAuthRepository from "../features/auth/data/auth-repository";
import {IUserRepository} from "../features/user/data/user-repository";

export type Services = {
  authRepository: IAuthRepository,
  userRepository: IUserRepository,
};