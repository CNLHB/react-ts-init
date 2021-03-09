import React, { FC, useState, useEffect, useRef } from "react";
import { classNames, getElementViewOverflow, getViewPort } from '../utils'
import ReactDOM from 'react-dom';
import './dropdown.less'
type IPosition = "center" | "left" | "right"
type IType = "click" | "hover"
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
    showArrow?: boolean,
    position?: IPosition;
    custom?: boolean,
    type?: IType
}
//交叉类型

export const DropDown: FC<BaseDropDownProps> = (props) => {
    const {
        className,
        disabled,
        children,
        overlay,
        positionClass = "",
        position = "center",
        showArrow,
        custom,
        type = "hover",
        ...restProps
    } = props;
    let [dropOpen, setDropOpen] = useState(false)
    let [left, setLeft] = useState(-1)
    let [right, setRight] = useState(-1)
    let [bottom, setBottom] = useState(-1)
    let [top, setTop] = useState(-1)
    let [pConfig, setPConfig] = useState<any>({})
    let [posionTop, setPosionTop] = useState(false)
    let [_position, set_Position] = useState(position)
    const { height, width } = getViewPort()
    const classes = classNames("eda-dropdown", className, {

    });
    useEffect(() => {
        set_Position(position)
    }, [position]);
    useEffect(() => {
        let obj: any = {}
        left !== -1 && (obj["left"] = left)
        right !== -1 && (obj["right"] = right)
        bottom !== -1 && (obj["bottom"] = bottom)
        top !== -1 && (obj["top"] = top)
        setPConfig(obj)
    }, [left, right, bottom, top]);
    const ref = useRef<any>(null)
    const refDiv = useRef<HTMLDivElement>(null)
    const isFoucs = useRef<any>(null)

    const setfixed = (e: React.MouseEvent) => {
        const el = e.target as any
        console.log(el);
        console.log(el.getBoundingClientRect());
        
        const p = getElementViewOverflow(el)
        const pBottom = p && p.getBoundingClientRect().bottom
        const B = el.getBoundingClientRect().bottom;
        const r = el.getBoundingClientRect().right;
        const X = el.getBoundingClientRect().left;
        const Y = el.getBoundingClientRect().top + el.getBoundingClientRect().height;
        switch (_position) {
            case "left":
                if (width - X < 150) {
                    set_Position("right")
                    setRight(0)
                    setLeft(-1)
                } else {
                    setLeft(X)
                    setRight(-1)

                }
                break;
            case "right":
                if (r < 150) {
                    set_Position("left")
                    setLeft(0)
                    setRight(-1)

                } else {
                    setRight(width - r)
                    setLeft(-1)

                }
                break;
            case "center":
                if (width - X < 120) {
                    set_Position("right")
                    setRight(0)
                    setLeft(-1)
                } else if (r < 150) {
                    set_Position("left")
                    setLeft(0)
                    setRight(-1)
                } else {
                    set_Position("center")
                    setLeft(Math.floor((r + X) / 2))
                    setRight(-1)
                }
                break;
        }
        // setLeft(X)
        setTop(Y)
        if (height - Y < 300 || pBottom - B < 120) {
            setPosionTop(true)
        } else {
            setPosionTop(false)

        }
    }
    const Events =
        type === "hover"
            ? {
                onMouseEnter: (e: React.MouseEvent) => {
                    if (dropOpen) return
                    setDropOpen(!dropOpen)
                    timer && clearTimeout(timer)
                    if (custom) return
                    setfixed(e)
                },
                onMouseLeave: (e: React.MouseEvent) => {
                    timer = setTimeout(() => {
                        setDropOpen(false)
                        clearTimeout(timer)
                    }, 50)
                },
            }
            : {
                onClick: (e: React.MouseEvent<Element, MouseEvent>) => {
                    setDropOpen(!dropOpen)
                    setfixed(e)
                }
            };
    const drapEvent = {
        onClick: (e: React.MouseEvent<Element, MouseEvent>) => {
            isFoucs.current = null
            setDropOpen(!dropOpen)
        }
    }
    const classesMenu = classNames("eda-dropdown-list", positionClass, {
        "eda-dropdown-open": dropOpen,
        ["eda-dropdown-" + _position]: _position,
        "eda-dropdown-top": posionTop,
    });
    let timer: NodeJS.Timeout;
    const Child = ReactDOM.createPortal(<>
        <ul
            tabIndex={0}
            ref={(refs) => {
                ref.current = refs
            }}
            style={{ ...pConfig }}
            onMouseDown={() => {
                isFoucs.current = true
                type === "click" && ref && ref.current.focus()
            }}
            {...(type === "click" ? drapEvent : {})}
            className={classesMenu}>
            {overlay}
        </ul>
    </>, document.body)
    return (
        <div
            onBlur={() => {
                !isFoucs.current && setDropOpen(false)
            }}
            className={classes}  {...restProps} {...(type === "hover" ? Events : {})}>
            <div
                onFocus={() => {

                }}
                ref={refDiv}
                style={{ height: '100%' }}
                {...(type === "click" ? Events : {})}
            >
                {children}
            </div>
            {/* {dropOpen ? Child : null} */}
            {Child}
            {/* <ul
                tabIndex={0}
                ref={(refs) => {
                    ref.current = refs
                }}
                onMouseDown={() => {
                    isFoucs.current = true
                    type === "click" && ref && ref.current.focus()
                }}
                {...(type === "click" ? drapEvent : {})}
                className={classesMenu}>
                {overlay}
            </ul> */}
        </div>
    );
};

DropDown.defaultProps = {
};

export default DropDown;
