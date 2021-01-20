import React, { LabelHTMLAttributes } from 'react'
import { classNames } from '../utils'
import './label.less'
import { BaseInputProps } from './../input/input';
type PositionType = "top" | "left"
export interface BaseLabelProps {
    width?: number,
    name?: React.ReactNode,
    position?: PositionType
    children: React.ReactNode
    required?: boolean
    className?: string;
    colon?: boolean,
    algin?:string
}

type NativeLabelProps = LabelHTMLAttributes<HTMLLabelElement> & BaseLabelProps;
//Partial 设置为可选属性
export type LabelProps = Partial<NativeLabelProps>;
export const Label: React.FC<LabelProps> = (props) => {
    const {
        className,
        width,
        name,
        required,
        children,
        position,
        colon,
        algin="left",
    } = props;
    const classesContainer = classNames("eda-label", className, {
        ["eda-label-" + position + "-inner"]: position,
    });
    const classes = classNames("eda-label-inner", className, {
        "eda-label-required": required,
        ["eda-label-" + position]: position,
        ["eda-label-" + algin]: algin,
    });
    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<
                BaseInputProps
            >;
            const { displayName } = childElement.type;
            if(displayName==="Input"){
                return React.cloneElement(childElement, {
                    showTip: required,
                });
            }
            return React.cloneElement(childElement, {
            });
            if (displayName === "Input") {
                return React.cloneElement(childElement, {
                    showTip: required,
                });
            } else {
                console.error("Warning: Label  has a child whick is not a Input");
            }
        });
    };
    return <div className={classesContainer}>
        <label style={{ width: width }} className={classes}>{name}{colon ? ":" : null}</label>
        {renderChildren()}
    </div>
}
Label.defaultProps = {
    position: "top"
}
export default Label
