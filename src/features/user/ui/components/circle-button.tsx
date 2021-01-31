import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import styled from 'styled-components';
import {darken, getLuminance, lighten} from "polished";


export type CircleButtonStyle = {
  color?: string,
  iconColor?: string,
  size?: number,
  elevated?: boolean,
}

const _buttonDefaultColor = '#E9E9E9';
const _iconDefaultColor = 'black';
const circleButtonDefaultSize = 30;
const _hovered = (color: string) => {
  const l = getLuminance(color);
  if (l > 0.5) return darken(0.1, color);
  return lighten(0.2, color);
};
const _active = (color: string) => {
  const l = getLuminance(color);
  if (l > 0.5) return darken(0.2, color);
  return lighten(0.3, color);
};

const Button = styled.button<CircleButtonStyle>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: none;
  outline: none;
  width: ${props => props.size ?? circleButtonDefaultSize}px;
  height: ${props => props.size ?? circleButtonDefaultSize}px;
  cursor: pointer;
  background: ${props => props.color ?? _buttonDefaultColor};
  margin: auto 5px;
  padding: 0;
  box-shadow: ${props => props.elevated ? '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2)' : 'none'};
  
  &:hover {
    background: ${props => _hovered(props.color ?? _buttonDefaultColor)};
  }
  
  &:active {
    background: ${props => _active(props.color ?? _buttonDefaultColor)};
    box-shadow: none;
  }
  
  .circleButtonIcon {
    color: ${props => props.iconColor ?? _iconDefaultColor};
    font-size: ${props => (props.size ?? circleButtonDefaultSize) / 2}px; 
  } 
`;

type CircleButtonProps = {
  icon: IconDefinition,
  onClick: () => void,
} & CircleButtonStyle;

const CircleButton = (props: CircleButtonProps) => {
  return (
    <Button {...props}>
      <FontAwesomeIcon className='circleButtonIcon' icon={props.icon}/>
    </Button>
  );
};

export default CircleButton;
export {circleButtonDefaultSize};
