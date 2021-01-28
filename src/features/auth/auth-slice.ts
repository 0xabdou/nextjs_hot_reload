import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AppDispatch, AppState} from "../../store/store";
import {Services} from "../../injection/services";
import AuthError from "./types/auth-error";
import {isRight} from "fp-ts/Either";
import AuthUser from "./types/auth-user";

export type AuthState = {
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

const signOut= createAsyncThunk<null, void, ThunkApiType>(
  'auth/signOut',
  async (_, thunkApi) => {
    const result = await thunkApi.extra.services.authRepository.signOut();
    if (isRight(result)) {
      return result.right;
    }
    return thunkApi.rejectWithValue(result.left);
  },
);


const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // signInWithGoogle
      .addCase(signInWithGoogle.pending, (state) => {
        state.loading = true;
      })
      .addCase(signInWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.authUser = action.payload;
      })
      .addCase(signInWithGoogle.rejected, (state, action) => {
        state.loading = false;
        if (action.payload)
          state.authError = action.payload;
        else
          state.authError = AuthError.general;
      })
      // getAuthUser
      .addCase(getAuthUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAuthUser.fulfilled, (state, action) => {
        state.loading = false;
        state.authUser = action.payload;
      })
      .addCase(getAuthUser.rejected, (state, action) => {
        state.loading = false;
        if (action.payload)
          state.authError = action.payload;
        else
          state.authError = AuthError.general;
      })
      // signOut
      .addCase(signOut.pending, (state) => {
        state.loading = true;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.loading = false;
        state.authUser = null;
      })
      .addCase(signOut.rejected, (state) => {
        state.loading = false;
      });
  }
});

export {signInWithGoogle, getAuthUser, signOut};
export default authSlice.reducer;
