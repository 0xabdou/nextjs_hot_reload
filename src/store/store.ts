import {combineReducers, configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import authReducer from '../features/auth/auth-slice';
import userReducer from '../features/user/user-slice';

import {Services} from "../injection/services";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});


const createStore = (services: Services) => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware({
      thunk: {extraArgument: {services}}
    })
  });
};

export type AppStore = ReturnType<typeof createStore>;

export type AppState = ReturnType<typeof rootReducer>;

export type AppDispatch = AppStore['dispatch'];

export default createStore;

