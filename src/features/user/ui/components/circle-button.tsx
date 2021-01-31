import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import styles from "./circle-button.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";

type TopBarActionProps = {
  icon: IconDefinition,
  onClick: () => void,
};

const CircleButton = (props: TopBarActionProps) => {
  return (
    <button className={styles.circleButton} onClick={props.onClick}>
      <FontAwesomeIcon className={styles.circleButtonIcon} icon={props.icon}/>
    </button>
  );
};

export default CircleButton;
