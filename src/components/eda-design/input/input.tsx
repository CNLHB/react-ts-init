import React, { InputHTMLAttributes, ReactNode, useEffect } from 'react'
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
    inputNull?: boolean;
    showTip?: {
        text: boolean,
        border: boolean
    } | boolean,
    addonBefore?: ReactNode,
    addonAfter?: ReactNode,
    onFocus?: ((event: React.FocusEvent<HTMLInputElement>) => void) | undefined;
    onBlur?: ((event: React.FocusEvent<HTMLInputElement>) => void) | undefined;
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
        addonBefore,
        addonAfter,
        inputTextNullTip = "输入框不能为空",
        onChangeInput,
        inputNull = false,
        ...restProps
    } = props;
    let [val, setVal] = useState(value)
    let [textNull, setTextNull] = useState(false)
    let showBorder = showTip && showTip !== true && showTip.border === true
    
    const classes = classNames("eda-input-inner", className, {
        'eda-input-disabled': disabled,
        'eda-input-group-addon-before': addonAfter,
        'eda-input-group-addon-after': addonBefore,
        'eda-input-null': ((showTip === true) && textNull) || (showBorder && textNull)
    });
    
    useEffect(() => {
        setVal(value)
    }, [value])
    useEffect(() => {
        setTextNull(inputNull)
    }, [inputNull])
    const changHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value: string = event.target.value
        setVal(value)
        if (onChangeInput) {
            onChangeInput(value)
        }
    }
    const focusHandle = (event: React.FocusEvent<HTMLInputElement>) => {
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

        <div className="eda-input-group">
            {addonBefore ? <span className="eda-input-group-addon eda-input-group-addon-before">{addonBefore}</span> : null}
            <input value={val} onChange={changHandle}
                className={classes} type={type ? type : "text"}
                onBlur={blurHandle}
                onFocus={focusHandle}
                {...restProps} />
            {addonAfter ? <span className="eda-input-group-addon eda-input-group-addon-after">{addonAfter}</span> : null}

        </div>
        {(showTip && textNull) ? <div className="inputTextNullTip">{inputTextNullTip}</div> : null}
    </div>
}
Input.displayName = "Input";
export default Input
