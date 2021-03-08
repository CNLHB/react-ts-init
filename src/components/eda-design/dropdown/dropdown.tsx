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
        type = "hover",
        ...restProps
    } = props;
    let [dropOpen, setDropOpen] = useState(false)
    let [left, setLeft] = useState(0)
    let [right, setRight] = useState(0)
    let [bottom, setBottom] = useState(0)
    let [top, setTop] = useState(0)
    let [pConfig, setPConfig] = useState<any>({})
    let [posionTop, setPosionTop] = useState(false)
    const { height } = getViewPort()
    const classes = classNames("eda-dropdown", className, {

    });
    useEffect(() => {
        let obj: any = {}
        left !== -1 && (obj["left"] = left)
        right !== -1 && (obj["right"] = right)
        bottom !== -1 && (obj["bottom"] = bottom)
        top !== -1 && (obj["left"] = top)
        setPConfig(obj)
    }, [left, right, bottom, top]);
    const ref = useRef<any>(null)
    const refDiv = useRef<HTMLDivElement>(null)
    const isFoucs = useRef<any>(null)
    const Events =
        type === "hover"
            ? {
                onMouseEnter: (e: React.MouseEvent) => {
                    setDropOpen(true)
                    timer && clearTimeout(timer)
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
                    const el = e.target as any
                    const p = getElementViewOverflow(el)

                    const pBottom = p && p.getBoundingClientRect().bottom
                    console.log(el.getBoundingClientRect());
                    const B = el.getBoundingClientRect().bottom;
                    const X = el.getBoundingClientRect().left;
                    const Y = el.getBoundingClientRect().top + el.getBoundingClientRect().height;
                    setLeft(X)
                    setTop(Y)
                    if (height - Y < 300 || pBottom - B < 120) {
                        setPosionTop(true)
                    } else {
                        setPosionTop(false)

                    }
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
        ["eda-dropdown-" + position]: position,
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
            <div onFocus={() => {

            }}
                ref={refDiv}
                style={{ height: '100%' }}
                {...(type === "click" ? Events : {})}
            >
                {children}
            </div>
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
