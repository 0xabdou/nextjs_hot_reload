import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AppDispatch, AppState} from "../../store/store";
import {Services} from "../../injection/services";
import {AuthError} from "./auth-repository";
import {isRight} from "fp-ts/Either";

type AuthState = {
  userId: string | null,
  authError: AuthError | null,
};

const initialState: AuthState = {
  userId: null,
  authError: null,
};

const signInWithGoogle = createAsyncThunk<string,
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
        state.userId = action.payload;
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
