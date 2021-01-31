import React from "react";
import styles from "./registration-screen.module.scss";
import ProfilePhotoPicker from "./components/profile-photo-picker";

const RegistrationScreen = () => {
  const photoPicked = (photo: File) => {
    console.log('GOT PHOTO: ', photo);
  };

  return (
    <div className={styles.registrationScreen}>
      <ProfilePhotoPicker onPhotoPicked={photoPicked}/>
    </div>
  );
};

export default RegistrationScreen;
