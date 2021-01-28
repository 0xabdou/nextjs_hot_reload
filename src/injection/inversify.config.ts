import 'reflect-metadata';
import {Container} from "inversify";
import createStore, {AppStore} from "../store/store";
import TYPES from "./types";
import {GoogleAuth} from "../features/auth/services/google-auth";
import IAuthRepository, {AuthRepository} from "../features/auth/auth-repository";
import {Services} from "./services";
import {FakeAuthApi, IAuthApi} from "../features/auth/services/auth-api";
import {ILocalStorage, LocalStorage} from "../features/auth/services/local-storage";

const container = new Container();

const initDependencies = async () => {
  // Local storage
  container.bind<ILocalStorage>(TYPES.ILocalStorage).to(LocalStorage);
  // Google auth
  container.bind<GoogleAuth>(TYPES.GoogleAuth).to(GoogleAuth);
  // Auth api
  container.bind<IAuthApi>(TYPES.IAuthApi).to(FakeAuthApi);
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