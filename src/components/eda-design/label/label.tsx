import React, { LabelHTMLAttributes } from 'react'
import { classNames } from '../utils'
import './label.less'
type PositionType = "top"|"left"
export interface BaseLabelProps {
    width?: number,
    name?: string,
    position?: PositionType
    children: React.ReactNode
    required?: boolean
    className?: string;
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
    } = props;
    const classesContainer = classNames("eda-label", className, {
        ["eda-label-" + position+"-inner"]: position,
    });
    const classes = classNames("eda-label-inner", className, {
        "eda-label-required": required,
        ["eda-label-" + position]: position,
    });
    return <div className={classesContainer}>
        <label style={{width:width}} className={classes}>{name}</label>
        {children}
    </div>
}
Label.defaultProps = {
    position: "top"
}
export default Label
