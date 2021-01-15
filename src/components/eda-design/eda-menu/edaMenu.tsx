import React, { createContext, useState } from "react";
import './edaMenu.less'
import { classNames } from "../utils/index";
import MenuItem, { MenuItemProps } from "./edaMenuItem";
import { SubMenu } from './edaSubMenu';
import { SubMenuProps } from './edaSubMenu';

type MenuMode = "horizontal" | "vertical";
type selectCallBack = (selectedIndex: string) => void;
interface ParentMenu extends React.FC<MenuProps> {
    MenuItem: React.FC<MenuItemProps>;
    SubItem: React.FC<SubMenuProps>;
}
export interface MenuProps {
    defaultIndex?: string;
    className?: string;
    mode?: MenuMode;
    style?: React.CSSProperties;
    onSelect?: selectCallBack;
    activeClass?: string,
    hoverClass?: string;
    defaultOpenSubMenus?: string[];
}
interface IMenuContext {
    index: string;
    subIndex?: string;
    onSelect?: selectCallBack;
    onSubClick?: selectCallBack;
    mode?: MenuMode;
    defaultOpenSubMenus?: string[];
}
export const MenuContext = createContext<IMenuContext>({ index: "0" });


export const EdaMenu: ParentMenu = (props) => {
    const {
        className,
        mode,
        style,
        children,
        defaultIndex,
        onSelect,
        activeClass,
        hoverClass,
        defaultOpenSubMenus,
    } = props;
    const [currentActive, setActive] = useState(defaultIndex);
    const [currentSubActive, setSubActive] = useState('-1');
    const classes = classNames("eda-eda-menu", className, {
        "menu-vertical": mode === "vertical",
        "menu-horizontal": mode !== "vertical",
    });
    const handleClick = (index: string) => {
        setActive(index);
        if (onSelect) {
            onSelect(index);
        }
    };
    const subClick = (index: string) => {
        setSubActive(index)
        console.log(index);

        if (onSelect) {
            //   onSelect(index);
        }
    };
    const passedContext: IMenuContext = {
        index: currentActive ? currentActive : "0",
        subIndex: currentSubActive,
        onSelect: handleClick,
        onSubClick: subClick,
        mode: mode,
        defaultOpenSubMenus,
    };
    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<
                MenuItemProps
            >;
            const { displayName } = childElement.type;
            if (displayName === "MenuItem" || displayName === "SubMenu") {
                return React.cloneElement(childElement, {
                    index: index.toString(),
                });
            } else {
                console.error("Warning: Menu has a child whick is not a MenuItem");
            }
        });
    };
    return (
        <div className="eda-menu-container">
            <ul className={classes} style={style} data-testid="test-menu">
                <MenuContext.Provider value={passedContext}>
                    {renderChildren()}
                </MenuContext.Provider>
            </ul>
        </div>
    );
};
EdaMenu.defaultProps = {
    defaultIndex: "0",
    mode: "horizontal",
    defaultOpenSubMenus: [],
};

EdaMenu.MenuItem = MenuItem;
EdaMenu.SubItem = SubMenu;
export default EdaMenu;