import React, { useContext } from "react";
import {classNames} from "../utils/index";
import { MenuContext } from "./menu";
import './menu.less'
export interface MenuItemProps {
  index?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onSelect?: (selectedIndex: string) => void;
}

export const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { className, disabled, style, children, index = "0" } = props;
  const context = useContext(MenuContext);
  const classes = classNames("menu-item", className, {
    "is-disabled": disabled,
    "is-active": context.index === index,
  });
  const handleClick = () => {
    if (context.onSelect && !disabled && typeof index === "string") {
      context.onSelect(index);
    }
  };
  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  );
};
MenuItem.defaultProps = {};
MenuItem.displayName = "MenuItem";
export default MenuItem;