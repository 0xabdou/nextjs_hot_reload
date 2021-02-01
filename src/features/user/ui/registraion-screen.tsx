import React, {useState} from "react";
import styles from "./registration-screen.module.scss";
import ProfilePhotoPicker from "./components/profile-photo-picker";
import ReactCrop, {Crop} from "react-image-crop";
import styled from "styled-components";

const RegistrationScreen = () => {
  const defaultSrc = '/images/default-pp.png';
  const [src, setSrc] = useState(defaultSrc);
  const [v, setV] = useState(false);

  const photoPicked = (photo: File) => {
    const x = URL.createObjectURL(photo);
    setSrc(x);
    setV(true);
  };

  return (
    <div className={styles.registrationScreen}>
      <ProfilePhotoPicker src={src} onPhotoPicked={photoPicked}/>
      <Div visible={v}>
        <ImageCropper src={src} visible={true}/>
      </Div>
    </div>
  );
};

const Div = styled.div<{ visible: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  background: black;
  opacity: ${props => props.visible ? 1 : 0};
  transform: translateY(${props => props.visible ? '0%' : '100%'});
  transition: all 1s ease;
`;

type ImageCropperProps = {
  src: string,
  visible: boolean,
}

const ImageCropper = (props: ImageCropperProps) => {
  const [crop, setCrop] = useState<Crop>({aspect: 1});

  const onChange = (c: Crop) => {
    setCrop(c);
  };

  return (
    <ReactCrop src={props.src} crop={crop} onChange={onChange}/>
  );
};

export default RegistrationScreen;
