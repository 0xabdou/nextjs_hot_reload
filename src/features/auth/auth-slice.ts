import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AppDispatch, AppState} from "../../store/store";
import {Services} from "../../injection/services";
import AuthError from "./types/auth-error";
import {isRight} from "fp-ts/Either";
import AuthUser from "./types/auth-user";

export type AuthState = {
  initialized: boolean,
  authUser: AuthUser | null,
  authError: AuthError | null,
  loading: boolean,
};


export type ThunkApiType = {
  dispatch: AppDispatch,
  state: AppState,
  extra: {
    services: Services,
  },
  rejectValue: AuthError,
};

const initialState: AuthState = {
  initialized: false,
  authUser: null,
  authError: null,
  loading: false,
};

const signInWithGoogle = createAsyncThunk<AuthUser, void, ThunkApiType>(
  'auth/signInWithGoogle',
  async (_, thunkApi) => {
    const result = await thunkApi.extra.services.authRepository.signInWithGoogle();
    if (isRight(result)) {
      return result.right;
    }
    return thunkApi.rejectWithValue(result.left);
  },
);

const getAuthUser = createAsyncThunk<AuthUser | null, void, ThunkApiType>(
  'auth/getAuthUser',
  async (_, thunkApi) => {
    const result = await thunkApi.extra.services.authRepository.getAuthUser();
    if (isRight(result)) {
      return result.right;
    }
    return thunkApi.rejectWithValue(result.left);
  },
);

const signOut = createAsyncThunk<null, void, ThunkApiType>(
  'auth/signOut',
  async (_, thunkApi) => {
    const result = await thunkApi.extra.services.authRepository.signOut();
    if (isRight(result)) {
      return result.right;
    }
    return thunkApi.rejectWithValue(result.left);
  },
);


const handlePending = (state: AuthState) => {
  state.authError = null;
  state.loading = true;
};

const handleFulfilled = (state:AuthState, user:AuthUser|null) => {
  state.loading = false;
  state.authUser = user;
};

const handleRejected = (state: AuthState, error: AuthError | undefined) => {
  state.loading = false;
  if (error)
    state.authError = error;
  else
    state.authError = AuthError.general;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // signInWithGoogle
      .addCase(signInWithGoogle.pending, (state) => {
        handlePending(state);
      })
      .addCase(signInWithGoogle.fulfilled, (state, action) => {
        handleFulfilled(state, action.payload);
      })
      .addCase(signInWithGoogle.rejected, (state, action) => {
        handleRejected(state, action.payload);
      })
      // getAuthUser
      .addCase(getAuthUser.pending, (state) => {
        handlePending(state);
      })
      .addCase(getAuthUser.fulfilled, (state, action) => {
        handleFulfilled(state, action.payload);
        state.initialized = true;
      })
      .addCase(getAuthUser.rejected, (state, action) => {
        handleRejected(state, action.payload);
      })
      // signOut
      .addCase(signOut.pending, (state) => {
        handlePending(state);
      })
      .addCase(signOut.fulfilled, (state) => {
        handleFulfilled(state, null);
      })
      .addCase(signOut.rejected, (state, action) => {
        handleRejected(state, action.payload);
      });
  }
});

export {signInWithGoogle, getAuthUser, signOut};
export default authSlice.reducer;
