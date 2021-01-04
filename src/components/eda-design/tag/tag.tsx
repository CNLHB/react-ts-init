import React, { FC, useState } from "react";
import { classNames } from "../utils";
import "./tag.less";
import Icon from "../icon/Icon";
export type TagType = "success" | "default" | "info" | "warning"|"danger";
export type sizeType = "sm" | "lg" | "md"

// success/info/warning/danger

interface BaseMessageProps {
    className?: string;
    message?: React.ReactNode;
    type?: TagType;
    closable: boolean;
    children: React.ReactNode;
    color:string
    size:sizeType,
    close:()=>void
    click:()=>void
}
//交叉类型
type NativeMessageProps = BaseMessageProps;

//Partial 设置为可选属性
export type MessageProps = Partial<NativeMessageProps>;

export const Tag: FC<MessageProps> = (props) => {
    const [visibility, setVisibility] = useState(true);
    const {
        type = "default",
        message,
        close,
        click,
        className,
        children,
        closable,
        ...restProps
    } = props;
    // btn, btn-lg, btn-primary
    const classes = classNames("eda-tag", className, {
        [`eda-tag-${type}`]: type,
        [`eda-tag-none`]: !visibility,
    });
    
    return (
        <span onClick={()=>{
            click&&click()
        }} className={classes} {...restProps}>
            {children}
            {
                closable ?
                            <Icon onClick={() => {
                                close&&close()
                                setVisibility(false);
                            }} className="font-size eda-tag-close" type="" iconType="webicon309"></Icon>
                    : null
            }

        </span>
    );
};

Tag.defaultProps = {
    type: "default",
};

export default Tag;
