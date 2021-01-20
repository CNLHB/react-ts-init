import React, { ReactNode, useContext } from 'react'
import './form.less'
import { FormContext } from './form'
import { useState } from 'react';
import { Label } from './../label/label';
import { classNames } from './../utils/index';
export interface IFormItem {
    className?: string,
    tooltip?: any;
    required?: boolean;
    label?: ReactNode;
    colon?: boolean
    children?: React.ReactNode;
    style?: React.CSSProperties
    name?: string
}

export const FormItem = (props: IFormItem) => {
    const { label, name = "", className, style, required, colon, children } = props
    const context = useContext(FormContext);
    const [layout, setLayout] = useState(context.formLayout)
    const classes = classNames("eda-form-item", className, {

    })
    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<
                any
            >;
            const { displayName } = childElement.type;
            if (displayName === "Radio") {
                return React.cloneElement(childElement, {
                    index: index.toString(),
                    name,
                    value:context.formData[name]?context.formData[name]:"",
                    onChange: (value: any) => {
                        context.onChange && context.onChange(name, value)
                    }
                });
            }
            return React.cloneElement(childElement, {
                index: index.toString(),
                name,
                value:context.formData[name]
            });

        });
    };
    return (
        <div className={classes} style={style}>
            {label ? <Label algin="left" position={context.formLayout === "horizontal" ? "left" : "top"} required={required} colon={colon} name={label}>{renderChildren()}</Label> : renderChildren()}
        </div>
    )

}

export default FormItem