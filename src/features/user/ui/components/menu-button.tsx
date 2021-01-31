import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import React, {useEffect, useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import CircleButton from "./circle-button";
import styles from "./menu-button.module.scss";

type MenuButtonProps = {
  icon: IconDefinition,
  items: MenuItemProps[],
}

type MenuItemProps = {
  icon: IconDefinition,
  label: string,
  onClick: () => void,
};

const MenuButton = (props: MenuButtonProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current) {
        if (ref.current.contains(e.target as Node)) {
          console.log('inside');
        } else {
          console.log('outside');
          setOpen(false);
        }
      }
    };
    document.addEventListener('mouseup', handleClick);
    return () => {
      document.removeEventListener('mouseup', handleClick);
    };
  }, [ref]);

  const toggleMenu = () => {
    setOpen(!open);
  };

  const items = props.items.map((item, idx) => <MenuItem key={idx} {...item}/>);

  return (
    <div ref={ref} className={styles.menuWrapper}>
      <CircleButton icon={props.icon} onClick={toggleMenu}/>
      <div className={styles.dropDown + (open ? '' : ` ${styles.hidden}`)}>
        {items}
      </div>
    </div>
  );
};

const MenuItem = (props: MenuItemProps) => {
  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    props.onClick();
  };

  return (
    <a className={styles.menuItem} href='#' onClick={onClick}>
      <FontAwesomeIcon className={styles.itemIcon} icon={props.icon}/>
      {props.label}
    </a>
  );
};


export default MenuButton;
