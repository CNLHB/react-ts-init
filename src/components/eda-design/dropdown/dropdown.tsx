import React, { FC, useState } from "react";
import { classNames } from '../utils'
import './dropdown.less'

interface BaseDropDownProps {
    className?: string;
    disabled?: boolean;
    children: React.ReactNode;
    overlayClassName?: string
    overlayStyle?: React.CSSProperties
    overlay?: React.ReactNode
    arrow?: string;
    width?: number;
    positionClass?: string;
    showArrow?: boolean
}
//交叉类型

export const DropDown: FC<BaseDropDownProps> = (props) => {
    const {
        className,
        disabled,
        children,
        overlay,
        positionClass = "",
        showArrow,
        ...restProps
    } = props;
    let [dropOpen, setDropOpen] = useState(false)
    const classes = classNames("eda-dropdown", className, {
    });
    const classesMenu = classNames("eda-dropdown-list",positionClass, {
        "eda-dropdown-open": dropOpen
    });
    let timer: NodeJS.Timeout;
    return (
        <div className={classes}  {...restProps} onMouseEnter={() => {
            setDropOpen(true)
            timer && clearTimeout(timer)
        }} onMouseLeave={() => {
            timer = setTimeout(() => {
                setDropOpen(false)
                clearTimeout(timer)
            }, 50)
        }}>
            {children}
            <ul className={classesMenu}>
                {overlay}
            </ul>
        </div>
    );
};

DropDown.defaultProps = {
};

export default DropDown;
