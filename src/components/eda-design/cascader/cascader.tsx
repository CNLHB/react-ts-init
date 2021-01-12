import React, { useState, useEffect, useRef } from 'react'
import Icon from '../icon/Icon';
import { Input } from './../input/input';
import { classNames } from './../utils/index';
import './cascader.less'
interface IOption {
    value: string,
    label: string,
    children?: IOption[]
}
interface IChangeResult{
    path: string[],
    val: string
}

interface ICascaderProps {
    defaultValue?: Array<string>
    className?: string,
    placeholder?: string
    separator?: string,
    options?: Array<IOption>
    onChange?: (obj: IChangeResult) => void,
    onFocus?:()=>void
}

export const Cascader = (props: ICascaderProps) => {
    const { className, defaultValue = [], placeholder, separator = "-",
        options = [], onChange } = props
    const [val, setVal] = useState("");
    const [content, setContent] = useState<Array<string>>([]);
    const divRef = useRef<HTMLDivElement>(null)
    const finderContent = (defaultV: Array<string>, opts: IOption[]) => {
        let item: string[] = [];
        defaultV.forEach((itemValue, index) => {
            opts.forEach((itemContent: IOption) => {
                if (itemContent.value === itemValue) {
                    item.push(itemContent.label)
                    opts = itemContent.children ? itemContent.children : []
                }
            })
        })
        return item
    }
    const setInputVal = () => {
        let item = finderContent(defaultValue, options)
        setContent(item)
        setVal(item.join(separator))

    }
    const [num, setNum] = useState(defaultValue.length > 0 ? defaultValue.length : 1);
    const [optionList, setOptionList] = useState(options)
    let [reverse, setReverse] = useState("");
    let [defaultVal, setDefaultVal] = useState(defaultValue);
    const classes = classNames("eda-cascader", className, {
    })
    useEffect(() => {
        setOptionList(options)
        setInputVal()
    }, [options]);
    useEffect(() => {

    }, [num]);
    const focusHandle = () => {
        divRef.current?.focus()
        setReverse("is-reverse");
    }
    const blurHandle = () => {
        setReverse("");
    }
    const clickItem = (val: string, label: string, ind: number, child: IOption[] = []) => {
        let newVal = [...defaultVal]
        newVal[ind] = val
        newVal.length = ++ind
        setDefaultVal(newVal);
        let conList = [...content]
        conList[ind] = label
        conList.length = ++ind
        setContent(conList)
        if (child.length !== 0) {
            setNum(ind)
        }
        if (child.length === 0) {
            setVal(conList.join(separator))
            onChange && onChange({
                path: newVal,
                val: conList.join(separator)
            })
            setReverse("");
        }


    }
    const renderOption = (list: IOption[], ind: number = 0) => {
        return <div className="eda-cascader-menu">{
            list.map((item) => {
                return <div key={item.value}><div onMouseDown={() => {
                    clickItem(item.value, item.label, ind, item.children)
                }} className={`eda-cascader-dropdown__item ${item.value === defaultVal[ind] ? " eda-cascader-item-active" : ""}`}>
                    <span className="eda-cascader-node__label">{item.label}</span>
                    {item.children ? <span className="eda-cascader-node__postfix">&gt;</span> : null}
                </div>
                    {item.children ? <div className={`eda-cascader-sub-menu ${item.value === defaultVal[ind] ? "eda-cascader-item-open" : ""}`}>{renderOption(item.children, ind + 1)}</div> : null}
                </div>
            })
        }
        </div>
    }
    return (
        <div className={classes}
            tabIndex={1}
            ref={divRef}
            onBlur={
                () => {
                    blurHandle()
                }
            }>
            <Input value={val} onFocus={() => [
                focusHandle()
            ]}

                placeholder={placeholder}></Input>
            <span
                className={`eda-input__base eda-input__suffix ${reverse}`}
            >
                <Icon type={`icon-jiantou`} iconType="jiantou"></Icon>
            </span>
            <div className={`eda-cascader-dropdown ${reverse}`} >
                <div className="eda-dropdown__list" style={{ width: num * 180 }}>
                    {
                        options.length>0?renderOption(optionList):<div className="eda-cas__empty-block">
                        <span className="eda-cas__empty-text">
                            暂无数据
                            </span>
                    </div> 
                    }
                </div>
            </div>
        </div>
    )
}