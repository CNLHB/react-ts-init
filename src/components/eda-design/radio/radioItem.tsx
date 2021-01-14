import React,{useContext} from 'react'

import './radio.less'
import { classNames } from './../utils/index';
import {RadioContext} from './radio'
export interface IRadioItemProps{
    value:string,
    disabled?:boolean,
    children:React.ReactNode
}

export const RadioItem = (props:IRadioItemProps)=>{
    const {disabled,value,children} = props
    const context = useContext(RadioContext);
    let classes = classNames("eda-radio-button-wrapper","",{
        "eda-radio-button-wrapper-checked": context.value===value,
        "eda-radio-button-wrapper-disabled": disabled,
    })
    let classesSpan = classNames("eda-radio-button","",{
        "eda-radio-button-checked": context.value===value,
        "eda-radio-button-disabled": disabled,
    })
    return <label className={classes} onClick={()=>{
        context.onSelect&&context.value!==value&&context.onSelect(value)
    }}>
            <span className={classesSpan}>
                <input type="radio" className="eda-radio-button-input" defaultChecked={context.value===value} value={value} />
            <span className="eda-radio-button-inner"></span>
            </span><span>{children}</span>
        </label>
}
export default RadioItem