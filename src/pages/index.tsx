import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {AppState} from "../store/store";
import React, {useEffect} from "react";
import LoginScreen from "../features/auth/ui/login-screen";
import {getAuthUser} from "../features/auth/auth-slice";
import LoggedInScreen from "../features/user/ui/logged-in-screen";

const Home = () => {
  const state = useSelector((state: AppState) => state.auth, shallowEqual);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAuthUser());
  }, []);

  if (!state.initialized)
    return <p>Loading...</p>;
  if (state.authUser)
    return <LoggedInScreen/>;
  return <LoginScreen/>;
};


export default Home;

