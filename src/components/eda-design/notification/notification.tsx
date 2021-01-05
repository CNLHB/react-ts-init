
import ReactDOM from 'react-dom';
import React from 'react'
import './notification.less'
import Message from '../message/message';


interface IMessage{
    type?:string,
    message:string
    duration?:number,
    close?:()=>void
}
export const Notification = (function() {
  let list:any[] = []
  let notification:HTMLDivElement = document.createElement("div")

  notification.classList.add("notification")
  document.body.appendChild(notification)
  /**
     * notice类型弹窗
     * @param {config}  object 通知框配置属性
     *   @param {type} string 通知窗类型
     *   @param {btn}  ReactNode 自定义关闭按钮
     *   @param {bottom}  number 消息从底部弹出时，距离底部的位置，单位像素
     *   @param {className}  string 自定义 CSS class
     *   @param {description}  string|ReactNode 通知提醒内容，必选
     *   @param {duration}  number 默认 4.5 秒后自动关闭，配置为 null 则不自动关闭
     *   @param {getContainer}  HTMLNode 配置渲染节点的输出位置
     *   @param {icon}  ReactNode 自定义图标
     *   @param {key}  string 当前通知唯一标志
     *   @param {message}  string|ReactNode 通知提醒标题，必选
     *   @param {onClose}  func 点击默认关闭按钮时触发的回调函数
     *   @param {onClick}  func 点击通知时触发的回调函数
     *   @param {top}  number 消息从顶部弹出时，距离顶部的位置，单位像素
     *   @param {closeIcon}  ReactNode 自定义关闭图标
     */

  const open = (config:IMessage) => {
    const {
    //   type,message,
       duration = 3*1000,
    //   key, message, onClose, onClick, top, closable = true, closeIcon
    } = config
    list.push(config)
    let messageList = list.map((item,index:number)=>{
        return <Message key={item.message+index} type={item.type} close  message={item.message}></Message>
    })
    ReactDOM.render( messageList, notification)
    if(duration!==0){
        let timer = setTimeout(()=>{
            list = list.filter((item)=>{
                if(item.message === config.message){
                    return false
                }else{
                    return true
                }
            })
            let messageList = list.map((item,index:number)=>{
                return <Message key={item.message+index} type={item.type} close  message={item.message}></Message>
            })
            ReactDOM.render( messageList, notification)
            clearTimeout(timer)
        }, duration*1000)
    }

     return null;
  }


  if(notification) {
    return {
      open
    }
  }else{
    return {
        open
      }
  }
  // 如果为创建实例，则创建默认实例

})()

export default Notification