import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import React, {useEffect, useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import CircleButton, {circleButtonDefaultSize, CircleButtonStyle} from "./circle-button";
import styled from "styled-components";
import {darken} from "polished";

type MenuButtonProps = {
  icon: IconDefinition,
  items: MenuItemProps[],
} & CircleButtonStyle;

type MenuItemProps = {
  icon: IconDefinition,
  label: string,
  onClick: () => void,
};

const MenuWrapper = styled.div<{ size?: number }>`
  position: relative;
  width: ${props => props.size ?? circleButtonDefaultSize}px;
  height: ${props => props.size ?? circleButtonDefaultSize}px;

  & > * {
    margin: 0 !important;;
  }
`;

const DropDown = styled.div<{ visible: boolean }>`
  position: absolute;
  display: ${props => props.visible ? 'flex' : 'none'};
  flex-direction: column;
  width: 200px;
  right: calc(-15px + 40%);
  top: calc(10px + 100%);
  border-radius: 10px;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.3);
  padding: 10px 5px;

  &::before {
    position: absolute;
    content: '';
    right: 15px;
    top: -10px;
    border-bottom: 12px solid white;
    border-right: 4px solid transparent;
    border-left: 10px solid transparent;
    z-index: 2;
  }
`;

const MenuButton = (props: MenuButtonProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener('mouseup', handleClick);
    return () => {
      document.removeEventListener('mouseup', handleClick);
    };
  }, [ref]);

  const toggleMenu = () => {
    setOpen(!open);
  };

  const onClickWrapper = (onClick: () => void) => {
    return () => {
      setOpen(false);
      onClick();
    };
  };
  const items = props.items.map((item, idx) => {
    return <MenuItem key={idx} {...item} onClick={onClickWrapper(item.onClick)}/>;
  });

  return (
    <MenuWrapper ref={ref} size={props.size}>
      <CircleButton {...props} onClick={toggleMenu}/>
      <DropDown visible={open}>
        {items}
      </DropDown>
    </MenuWrapper>
  );
};

const Anchor = styled.a`
  padding: 10px;

  &:hover {
    background: ${darken(0.1, 'white')};
  }

  &:active {
    background: ${darken(0.2, 'white')};
  }
  
  .itemIcon {
    margin-right: 10px;
  }
`;

const MenuItem = (props: MenuItemProps) => {
  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    props.onClick();
  };

  return (
    <Anchor href='#' onClick={onClick}>
      <FontAwesomeIcon className='itemIcon' icon={props.icon}/>
      {props.label}
    </Anchor>
  );
};


export default MenuButton;
