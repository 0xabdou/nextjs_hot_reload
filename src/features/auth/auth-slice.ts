import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AppDispatch, AppState} from "../../store/store";
import {Services} from "../../injection/services";
import AuthError from "./types/auth-error";
import {isRight} from "fp-ts/Either";
import AuthUser from "./types/auth-user";

type AuthState = {
  authUser: AuthUser | null,
  authError: AuthError | null,
};

const initialState: AuthState = {
  authUser: null,
  authError: null,
};

const signInWithGoogle = createAsyncThunk<AuthUser,
  void,
  {
    dispatch: AppDispatch,
    state: AppState,
    extra: {
      services: Services,
    },
    rejectValue: AuthError,
  }>(
  'auth/signInWithGoogle',
  async (_, thunkApi) => {
    const result = await thunkApi.extra.services.authRepository.signInWithGoogle();
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
      .addCase(signInWithGoogle.pending, (state, action) => {
        console.log(action);
      })
      .addCase(signInWithGoogle.fulfilled, (state, action) => {
        console.log(action);
        state.authUser = action.payload;
      })
      .addCase(signInWithGoogle.rejected, (state, action) => {
        console.log(action);
        if (action.payload)
          state.authError = action.payload;
        else
          state.authError = AuthError.general;
      });
  }
});

export default authSlice.reducer;
export {signInWithGoogle};
