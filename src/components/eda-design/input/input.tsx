import React, {  InputHTMLAttributes,useEffect } from 'react'
import { classNames } from '../utils'
import './input.less'
import { useState } from 'react';
type changeCallBack = (value: string) => void;
export interface BaseInputProps {
    value?: string,
    type?: string,
    disabled?: true,
    className?: string;
    onChangeInput?:changeCallBack
}

type NativeInputProps = InputHTMLAttributes<HTMLInputElement>& BaseInputProps;
//Partial 设置为可选属性
export type InputProps = Partial<NativeInputProps>;
export const Input: React.FC<InputProps> = (props) => {
    const {
        className,
        value="",
        type,
        disabled,
        onChangeInput,
        ...restProps
    } = props;
    let [val, setVal] = useState(value)
    const classes = classNames("eda-input-inner", className, {
        'eda-input-disabled': disabled
    });
    useEffect(()=>{
        setVal(value)
    },[value])
    const changHandle = (event:React.ChangeEvent<HTMLInputElement>)=>{
        let value:string = event.target.value
        if(onChangeInput){
            onChangeInput(value)
        }
    }
    return <div className="eda-input">
        <input value={value}  onChange={changHandle} className={classes} type={type ? type : "text"} {...restProps} />
    </div>
}
export default Input
