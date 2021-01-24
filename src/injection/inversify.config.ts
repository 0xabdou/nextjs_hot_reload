import 'reflect-metadata';
import {Container} from "inversify";
import createStore, {AppStore} from "../store/store";
import TYPES from "./types";
import {GoogleAuth} from "../features/auth/google-auth";
import IAuthRepository, {AuthRepository} from "../features/auth/auth-repository";
import {Services} from "./services";

const container = new Container();

// Initialize the DI container here
const initDependencies = async () => {
  // Google auth
  container.bind<GoogleAuth>(TYPES.GoogleAuth).to(GoogleAuth);
  // Auth repo
  container.bind<IAuthRepository>(TYPES.IAuthRepository).to(AuthRepository);

  // Services needed by the redux store
  const services: Services = {
    authRepository: container.get<IAuthRepository>(TYPES.IAuthRepository),
  };
  // Redux store
  container.bind<AppStore>(TYPES.AppStore).toConstantValue(
    createStore(services),
  );
};

export {initDependencies};
export default container;