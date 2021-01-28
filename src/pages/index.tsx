import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {AppState} from "../store/store";
import React from "react";
import {signInWithGoogle} from "../features/auth/auth-slice";
import AuthError from "../features/auth/types/auth-error";

const Home = () => {
  const state = useSelector((state: AppState) => state.auth, shallowEqual);
  console.log(state);
  if (state.authUser)
    return <LoggedInScreen userId={state.authUser.accessToken}/>;
  return <LoginScreen error={state.authError}/>;
};

const LoginScreen = ({error}: { error?: AuthError | null }) => {
  const dispatch = useDispatch();

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(signInWithGoogle());
  };

  return (
    <>
      <button onClick={onClick}>Login</button>
      {error && <p>Error</p>}
    </>
  );
};

const LoggedInScreen = ({userId}: { userId: string }) => {
  return (
    <p>Logged in as: {userId}</p>
  );
};

export default Home;

