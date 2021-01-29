import {Services} from "../src/injection/services";
import {instance, mock, reset} from "ts-mockito";
import IAuthRepository from "../src/features/auth/data/auth-repository";

const mocks: Services = {
  authRepository: mock<IAuthRepository>(),
};

const instances: Services = {
  authRepository: instance(mocks.authRepository),
};

const mockServices = {
  mocks,
  instances,
};

export const resetMocks = () => {
  for (const mock of Object.values(mocks))
    reset(mock);
};

export default mockServices;