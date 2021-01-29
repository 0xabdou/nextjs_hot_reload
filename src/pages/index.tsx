import {shallowEqual, useSelector} from "react-redux";
import {AppState} from "../store/store";
import React from "react";
import LoginScreen from "../features/auth/ui/login-screen";

const Home = () => {
  const state = useSelector((state: AppState) => state.auth, shallowEqual);
  console.log(state);
  if (state.authUser)
    return <LoggedInScreen userId={state.authUser.accessToken}/>;
  return <LoginScreen/>;
};

const LoggedInScreen = ({userId}: { userId: string }) => {
  return (
    <p>Logged in as: {userId}</p>
  );
};

export default Home;

