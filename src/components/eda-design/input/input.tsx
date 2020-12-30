import React, { FC, InputHTMLAttributes } from 'react'
import { classNames } from '../utils'
import './input.less'
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
        value,
        type,
        disabled,
        onChangeInput,
        ...restProps
    } = props;
    const classes = classNames("eda-input-inner", className, {
        'eda-input-disabled': disabled
    });
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
