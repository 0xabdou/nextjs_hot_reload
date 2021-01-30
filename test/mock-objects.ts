import User, {UserCreation} from "../src/features/user/types/user";
import {instance, mock} from "ts-mockito";
import {AppDispatch, AppState} from "../src/store/store";
import createMockStore from "redux-mock-store";

export const MockFile = mock<File>();

export const mockUser: User = {
  id: 'id',
  username: 'username',
  name: 'name',
  photoUrl: 'photoUrl',
};

export const mockUserCreation: UserCreation = {
  username: 'username',
  photo: instance(MockFile),
};

export const mockStore = () => createMockStore<AppState, AppDispatch>()();