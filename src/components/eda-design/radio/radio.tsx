import React, { createContext, useEffect } from 'react'
import './radio.less'
import { IRadioItemProps, RadioItem } from './radioItem';
import { useState } from 'react';
import { classNames } from './../utils/index';
type buttonStyle = "outline" | "solid"
type selectCallBack = (value: string) => void;
interface IRadioProps {
    className?: string,
    buttonStyle?: buttonStyle,
    value?: string,
    defaultValue?: any,
    onChange?: (value: string) => void,
    children?: React.ReactNode

}
interface ParentRadio extends React.FC<IRadioProps> {
    Group?: React.FC<any>;
    Item: React.FC<IRadioItemProps>;
}
interface IRadioContext {
    value: string;
    onSelect?: selectCallBack;
}
export const RadioContext = createContext<IRadioContext>({ value: "" });
export const Radio: ParentRadio = (props) => {
    const { className, defaultValue, value, buttonStyle, children, onChange } = props
    const [val, setVal] = useState(defaultValue ? defaultValue : "")
    const classes = classNames("eda-radio-group", className, {
        [" eda-radio-group-" + buttonStyle]: buttonStyle
    })
    useEffect(() => {
        setVal(value ? value : defaultValue)
    }, [value, defaultValue])
    const handleClick = (value: string) => {
        setVal(value)
        if (onChange) {
            onChange(value)
        }
    };
    const passedContext: IRadioContext = {
        value: val,
        onSelect: handleClick,
    };

    return <div className={classes}>
        <RadioContext.Provider value={passedContext}>
            {children}
        </RadioContext.Provider>
    </div>
}
Radio.Item = RadioItem
Radio.defaultProps = {
    buttonStyle: "outline"
}
export default Radio