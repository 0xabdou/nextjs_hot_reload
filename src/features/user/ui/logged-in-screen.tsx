import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {AppState} from "../../../store/store";
import {getCurrentUser} from "../user-slice";
import MainScreen from "./main-screen";
import RegistrationScreen from "./registraion-screen";

const LoggedInScreen = () => {
  const state = useSelector((state: AppState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);


  if (!state.initialized) {
    if (state.error != null) {
      return <p>Error bro....</p>;
    }
    return <p>Loading bro...</p>;
  }
  if (!state.currentUser)
    return <RegistrationScreen/>;
  return <MainScreen/>;
};

export default LoggedInScreen;
