import React, { TextareaHTMLAttributes,useState } from 'react'
import { classNames } from '../utils'
import './textarea.less'
type changeCallBack = (value: string) => void;
export interface BaseTextareaProps {
    value?: string,
    rows?:number;
    cols?:number;
    disabled?: true,
    className?: string;
    resize?:boolean;
    onChangeInput?:changeCallBack
}

type NativeTextareaProps = TextareaHTMLAttributes <HTMLTextAreaElement>& BaseTextareaProps;
//Partial 设置为可选属性
export type TextareaProps = Partial<NativeTextareaProps>;
export const Textarea: React.FC<TextareaProps> = (props) => {
    const {
        className,
        value,
        disabled,
        rows,
        resize,
        cols=3,
        onChangeInput,
        ...restProps
    } = props;
    const [nativeValue,setNativeValue] = useState(value?value:'')
    const classes = classNames("eda-textarea-inner", className, {
        'eda-input-disabled': disabled,
        'eda-resize-disabled': !resize
    });

    const changHandle = (event:React.ChangeEvent<HTMLTextAreaElement>)=>{
        let value:string = event.target.value
        setNativeValue(value)
        if(onChangeInput){
            onChangeInput(value)
        }
    }
    return <div className="eda-input-textarea">
            <textarea  value={nativeValue} onChange={(event:React.ChangeEvent<HTMLTextAreaElement>)=>{
                changHandle(event)
            }} rows={rows} cols={cols} {...restProps} className={classes}/>
    </div>
}
export default Textarea
