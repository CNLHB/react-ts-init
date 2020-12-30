import React,{CSSProperties} from 'react'
import { classNames } from './../utils/index';
import './icon.less'
interface IProps{
    type: string,
    className?: string,
    iconType?:string,
    color?:string,
    style?:CSSProperties
}

export function Icon(props: IProps){
    const {className,type,color,style,iconType} = props
    const classes = classNames("eda-icon", className,{})
    return ( iconType?<i className={`iconfont icon-${iconType} ${classes}`}></i>:<svg className={classes}  color={color} style={style} aria-hidden="true">
            <use xlinkHref={`#${type}`}></use>
    </svg>)
}
export default Icon