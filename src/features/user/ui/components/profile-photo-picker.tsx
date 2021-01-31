import styled from "styled-components";
import React, {ChangeEvent, useRef} from "react";
import MenuButton from "./menu-button";
import {faPen} from "@fortawesome/free-solid-svg-icons";


type ProfilePhotoPickerStyle = {
  size?: number,
}

const _defaultSize = 150;
const PhotoWrapper = styled.div<ProfilePhotoPickerStyle>`
  position: relative;
  width: ${props => props.size ?? _defaultSize}px;
  height: ${props => props.size ?? _defaultSize}px;
`;

const Photo = styled.img<ProfilePhotoPickerStyle>`
  border-radius: 50%;
  width: ${props => props.size ?? _defaultSize}px;
  height: ${props => props.size ?? _defaultSize}px;
`;

const EditButtonWrapper = styled.div`
  position: absolute;
  bottom: 5%;
  right: 5%;
`;

type ProfilePhotoPickerProps = {
  onPhotoPicked: (photo: File) => void,
} & ProfilePhotoPickerStyle;

const ProfilePhotoPicker = (props: ProfilePhotoPickerProps) => {
  const ref = useRef<HTMLInputElement>(null);

  const onClick = () => {
    if (ref.current) {
      ref.current.click();
    }
  };

  const onPhotoPicked = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      props.onPhotoPicked(e.target.files[0]);
    }
  };

  return (
    <PhotoWrapper size={props.size}>
      <Photo size={props.size} src={'/images/default-pp.png'} alt='profile photo'/>
      <EditButtonWrapper>
        <MenuButton
          size={props.size ? props.size * 0.2 : undefined}
          icon={faPen}
          items={[{icon: faPen, label: 'faPen', onClick: onClick}]}
          elevated
        />
      </EditButtonWrapper>
      <input
        ref={ref}
        onChange={onPhotoPicked}
        type='file' accept='image/jpeg,image/x-png'
        hidden
      />
    </PhotoWrapper>
  );
};

export default ProfilePhotoPicker;
