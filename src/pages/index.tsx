import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {AppState} from "../store/store";
import React, {useEffect} from "react";
import LoginScreen from "../features/auth/ui/login-screen";
import {getAuthUser, signOut} from "../features/auth/auth-slice";

const Home = () => {
  const state = useSelector((state: AppState) => state.auth, shallowEqual);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAuthUser());
  }, []);

  if (!state.initialized)
    return <p>Loading...</p>;
  if (state.authUser)
    return <LoggedInScreen userId={state.authUser.accessToken}/>;
  return <LoginScreen/>;
};

const LoggedInScreen = ({userId}: { userId: string }) => {
  const dispatch = useDispatch();
  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(signOut());
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = new File([''], 'hole');
    console.log(file);
    if (e.target.files) {
      const image: File = e.target.files[0];
      console.log('Got image: ', image);
    }
  };

  return (
    <>
      <p>Logged in as: {userId}</p>
      <button onClick={onClick}>Logout</button>
      <input type='file' onChange={onChange}/>
    </>
  );
};

export default Home;

