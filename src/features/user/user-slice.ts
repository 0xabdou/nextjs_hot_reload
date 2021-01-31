import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import User from "./types/user";
import {AppDispatch, AppState} from "../../store/store";
import {Services} from "../../injection/services";
import UserError from "./types/user-error";
import {isRight} from "fp-ts/Either";

export type UserState = {
  initialized: boolean,
  currentUser: User | null,
  creatingUser: boolean,
  error: UserError | null,
}

const initialState: UserState = {
  initialized: false,
  currentUser: null,
  creatingUser: false,
  error: null,
};

type ThunkApiType = {
  dispatch: AppDispatch,
  state: AppState,
  extra: {
    services: Services,
  },
  rejectValue: UserError,
}

const getCurrentUser = createAsyncThunk<User | null, void, ThunkApiType>(
  'user/getCurrentUser',
  async (_, thunkApi) => {
    const result = await thunkApi.extra.services.userRepository.getCurrentUser();
    if (isRight(result)) {
      return result.right;
    }
    return thunkApi.rejectWithValue(result.left);
  }
);

const handleRejected = (state: UserState, error: UserError | undefined) => {
  if (error != undefined) {
    state.error = error;
  }
  state.error = UserError.general;
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.initialized = true;
        state.currentUser = action.payload;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        handleRejected(state, action.payload);
      });
  },
});

export default userSlice.reducer;

export {getCurrentUser};