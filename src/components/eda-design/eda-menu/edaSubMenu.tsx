import React, { useContext, useState, useEffect } from "react";
import { classNames } from "../utils/index";
import { MenuContext } from "./edaMenu";
import { MenuItemProps } from "./edaMenuItem";
export interface SubMenuProps {
    index?: string;
    title: string;
    icon?: React.ReactNode;
    className?: string;
}
export const SubMenu: React.FC<SubMenuProps> = ({
    index = "0",
    title,
    icon,
    children,
    className,
}) => {
    const context = useContext(MenuContext);
    const openedSubMenus = context.defaultOpenSubMenus as Array<string>;
    const [subIndex, setSubIndex] = useState(context.subIndex)
    useEffect(()=>{
        setSubIndex(context.subIndex)
    },[context.subIndex])
    const isOpend =
        index && context.mode === "vertical"
            ? subIndex?.startsWith(index)
            : false;
    const [menuOpen, setOpen] = useState(isOpend);
    const classes = classNames("eda-menu-item eda-submenu-item", className, {
        // "is-active": context.index === index,
    });
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation()
        setOpen(!menuOpen);
        if( context.subIndex!==index){
            context.onSubClick&&context.onSubClick(index)
        }
    };
    let timer: any;
    const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
        clearTimeout(timer);
        e.preventDefault();
        timer = setTimeout(() => {
            setOpen(toggle);
        }, 100);
    };

    const clickEvents =
        context.mode === "vertical"
            ? {
                onClick: handleClick,
            }
            : {};
    const hoverEvents =
        context.mode !== "vertical"
            ? {
                onMouseEnter: (e: React.MouseEvent) => {
                    handleMouse(e, true);
                },
                onMouseLeave: (e: React.MouseEvent) => {
                    handleMouse(e, false);
                },
            }
            : {};
    const triangleClass = classNames("triangle-base", "", {
        "triangle-down": !menuOpen,
        "triangle-up": menuOpen,
    });
    const renderChildren = () => {
        const subMenuClasses = classNames("eda-submenu", "", {
            // menuOpen && 
            "menu-opened": subIndex?.startsWith(index)&&menuOpen
            // ,
        });

        const childrenComponent = React.Children.map(children, (child, i) => {
            const childElement = child as React.FunctionComponentElement<
                MenuItemProps
            >;
            const { displayName } = childElement.type;


            if (displayName === "MenuItem" || displayName === "SubMenu") {
                return React.cloneElement(childElement, {
                    index: `${index}-${i}`,
                });
            } else {
                console.error("Warning: Menu has a child which is not a MenuItem");
            }
        });
        return <ul className={subMenuClasses}>{childrenComponent}</ul>;
    };
    const openTitle = classNames("eda-submenu-title", "", {
        "menu-opened-title": menuOpen,
        "sub-menu-active": context.index.startsWith(index),
    });
    return (
        <li key={index} className={classes} {...hoverEvents}>
            <div className={openTitle} style={{ paddingLeft: index.split("-").length * 25 }} {...clickEvents}>
                {icon ? <span style={{ marginRight: 14 }}>{icon}</span> : null} <span>{title}</span>
                {children ? <div className={triangleClass}></div> : null}
            </div>
            {children ? renderChildren() : null}
        </li>
    );
};

SubMenu.displayName = "SubMenu";
export default SubMenu;