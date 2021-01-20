import React from 'react'
import './form.less'
import { IFormItem, FormItem } from './formItem';
import { useState, useEffect } from 'react';


interface IFormContext {
    formLabelAlign: string;
    formLayout: {
        labelCol?: number,
        wrapperCol?: number
    };
    formData?: any,
    onChange?:(key:string, value:string)=>void
    

}

export const FormContext = React.createContext<IFormContext>({
    formLabelAlign: "",
    formLayout: {

    }
    
})
interface ParentForm extends React.FC<IForm> {
    Item: React.FC<IFormItem>;

}

interface IForm {
    children?: React.ReactNode
    className?: string,
    formLayout?: {
        labelCol: number,
        wrapperCol: number
    };
    formLabelAlign?: string
    onValuesChange?: (changedValues: any, allValues: any) => void
    formData?: any
    onFinish?:(data:any)=>void
    

}
export const Form: ParentForm = (props) => {
    const { className, onValuesChange,onFinish, formData, formLabelAlign, formLayout = {}, children } = props
    const [data, setData] = useState(formData)
    useEffect(() => {
        setData(formData)
    }, [formData]);
    const inputChange = (key:string, value:string)=>{
        const newData = { ...data }
        newData[key] = value
        setData(newData)
        onValuesChange && onValuesChange({
            [key]: value
        }, newData)
    }
    const formContext = {
        formLayout: formLayout,
        formData: data,
        formLabelAlign: formLabelAlign ? formLabelAlign : "horizontal",
        onChange:inputChange
    }
    const changeHandle = (e: any) => {
        const name = e.target && e.target.name
        const type = e.target.type
        if (!name||type==="checkbox"||type==="radio") return
        const value = e.target.value
        const newData = { ...data }
        switch (type) {
            default:
                newData[name] = value
        }
        setData(newData)
        onValuesChange && onValuesChange({
            [name]: value
        }, newData)
    }
    return (
        <FormContext.Provider value={formContext}>
            <div className="eda-form-wrap">
                <form
                    onChange={changeHandle}
                    onSubmit={(e:React.FormEvent<HTMLFormElement>)=>{
                        e.stopPropagation()
                        e.preventDefault()
                        onFinish&&onFinish(data)
                    }}
                >
                    {children}
                </form>
            </div>
        </FormContext.Provider>

    )

}
Form.Item = FormItem
export default Form