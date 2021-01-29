import {shallowEqual, useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {signInWithGoogle} from "../auth-slice";
import {AppState} from "../../../store/store";
import styles from './login-screen.module.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGoogle} from "@fortawesome/free-brands-svg-icons";
import {PulseLoader} from "react-spinners";
import {toast} from "react-toastify";

const LoginScreen = () => {
  const state = useSelector((state: AppState) => state.auth, shallowEqual);
  const dispatch = useDispatch();

  useEffect(() => {
    if (state.authError) {
      toast.error('Something went wrong', {
        position: toast.POSITION.BOTTOM_CENTER,
        hideProgressBar: true,
        closeOnClick: false,
        closeButton: <EmptyComponent/>,
        draggable: false,
        autoClose: 2000,
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [state.authError]);

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(signInWithGoogle());
  };

  let className = styles.loginScreen;
  let spinnerColor = 'transparent';
  let disabled = false;
  if (state.loading) {
    className = className + ' ' + styles.loading;
    spinnerColor = 'white';
    disabled = true;
  }
  console.log(className);
  return (
    <div className={className}>
      <img className={styles.logo} src='/images/vgc_transparent_black.png' alt='logo'/>
      <button className={styles.loginButton} onClick={onClick} disabled={disabled}>
        <FontAwesomeIcon className={styles.loginButtonIcon} icon={faGoogle}/>
        Login with Google
        <div className={styles.spinner}>
          <PulseLoader color={spinnerColor} size='10px'/>
        </div>
      </button>
    </div>
  );
};

const EmptyComponent = () => <div/>;

export default LoginScreen;
