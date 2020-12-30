
import React, { HTMLAttributes, ReactNode,useEffect } from 'react'
import './modal.less'
import { classNames } from './../utils/index';
import { Mask } from './../mask/mask';
import Button from './../button/button';
import { useState } from 'react';
import { Icon } from './../icon/Icon';
enum ClickType {
    oK = "ok",
    onCancel = "onCancel"
}
type IPosition = 'center' | 'top'| 'bottom'| 'left'| 'right'
type changeCallBack = () => void;
interface IModal {
    visible: boolean,
    title: ReactNode,
    className?: string,
    showClose?:boolean,
    onCancel: changeCallBack,
    onCancelText?:string;
    onOkText?:string;
    onOk: changeCallBack,
    position:IPosition,
    mask?: boolean
}
//交叉类型
type NativeModalProps = IModal & Partial<HTMLAttributes<HTMLElement>>;

export const Modal = (props: NativeModalProps) => {
    
    const { className,visible,showClose,onCancelText,onOkText, title,position, children,onOk,onCancel, ...restProps } = props
    
    const [isShow,setVisible] = useState(false)
    const classes = classNames("eda-modal", className, {
        ["eda-modal-"+position]: position

    })
    const classesWrap = classNames("eda-modal-wrap", className, {
        "eda-modal-show": visible,
        "eda-modal-hidden": visible&&isShow,

    })
    useEffect(() => {
        setVisible(false)
    },[visible]);
    const clickHandle = (type:string)=>{
        if(type === ClickType.oK){
            onOk&&onOk()
        }else{
            onCancel&&onCancel()
        }
    }
    return (<div className={classesWrap}>
            <Mask>
            <div className={classes} {...restProps}>
            <div className="eda-modal-header">
                <div className="eda-modal-title" >
                     {title}
                 </div>
                {showClose? <span onClick={()=>{
                      clickHandle(ClickType.onCancel)
                 }}>
                    <Icon className="eda-icon-close" type="" iconType="webicon309"></Icon>
                 </span>:null}

            </div>
                <div className="eda-modal-body">
                    {children} 
               </div>
                    
                <div className="eda-message-box__btns">
                    <Button onClick={()=>{
                        clickHandle(ClickType.onCancel)
                    }} className="modal-btn" btnType="primary">{onCancelText?onCancelText:"取消"}</Button>
                    <Button onClick={()=>{
                        clickHandle(ClickType.oK)
                    }}
                      className="modal-btn">{onOkText?onOkText:"确认"}</Button>
                </div>    
           </div>
       </Mask>

    </div>)
}
Modal.defaultProps = {
    position: "center",
    showClose: false
  };
export default Modal