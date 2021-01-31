import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../../../store/store";
import styles from './top-bar.module.scss';
import {faEdit, faEllipsisH, faSignOutAlt, faUser} from "@fortawesome/free-solid-svg-icons";
import MenuButton from "./menu-button";
import CircleButton from "./circle-button";
import {signOut} from "../../../auth/auth-slice";

const TopBar = () => {
  const state = useSelector((state: AppState) => state.user);
  const dispatch = useDispatch();

  if (!state.currentUser)
    return <div/>;
  return (
    <div className={styles.topBar}>
      <img className={styles.profilePhoto} src={state.currentUser.photoUrl} alt='profile photo'/>
      <span className={styles.title}>Chats</span>
      <div className={styles.spacer}/>
      <MenuButton
        icon={faEllipsisH}
        items={[
          {icon: faUser, label: 'Profile', onClick: () => null},
          {icon: faSignOutAlt, label: 'Sign out', onClick: () => dispatch(signOut())}
        ]}
      />
      <CircleButton icon={faEdit} onClick={() => null}/>
    </div>
  );
};

export default TopBar;
