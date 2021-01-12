import React, { InputHTMLAttributes, useEffect } from 'react'
import { classNames } from '../utils'
import './input.less'
import { useState } from 'react';
type changeCallBack = (value: string) => void;
export interface BaseInputProps {
    value?: string,
    type?: string,
    disabled?: true,
    className?: string;
    inputTextNullTip?: string,
    showTip?: boolean,
    onFocus?:((event: React.FocusEvent<HTMLInputElement>) => void) | undefined;
    onBlur?:((event: React.FocusEvent<HTMLInputElement>) => void) | undefined;
    onChangeInput?: changeCallBack
}

type NativeInputProps = InputHTMLAttributes<HTMLInputElement> & BaseInputProps;
//Partial 设置为可选属性
export type InputProps = Partial<NativeInputProps>;
export const Input: React.FC<InputProps> = (props) => {
    const {
        className,
        value = "",
        type,
        disabled,
        showTip,
        onFocus,
        onBlur,
        inputTextNullTip = "输入框不能为空",
        onChangeInput,
        ...restProps
    } = props;
    let [val, setVal] = useState(value)
    let [textNull, setTextNull] = useState(false)
    const classes = classNames("eda-input-inner", className, {
        'eda-input-disabled': disabled,
        'eda-input-null': showTip&&textNull
    });
    useEffect(() => {
        setVal(value)
    }, [value])
    const changHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value: string = event.target.value
        setVal(value)
        if (onChangeInput) {
            onChangeInput(value)
        }
    }
    const focusHandle = (event:React.FocusEvent<HTMLInputElement>) => {
        if (onFocus) {
          onFocus(event)
        }
      }
      const blurHandle = (event: React.FocusEvent<HTMLInputElement>) => {
        if (val === "") {
            setTextNull(true)
        } else {
            setTextNull(false)
        }
        if (onBlur) {
          onBlur(event)
        }
        
      }
    return <div className="eda-input">
        <input value={val} onChange={changHandle}
            className={classes} type={type ? type : "text"}
            onBlur={blurHandle}
            onFocus={focusHandle}
            {...restProps} />
        {(showTip && textNull) ? <div className="inputTextNullTip">{inputTextNullTip}</div> : null}
    </div>
}
export default Input
