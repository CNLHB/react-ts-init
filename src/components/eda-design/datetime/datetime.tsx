import { useState, useEffect, useRef } from 'react';
import { Input } from './../input/input';
import { classNames, getDateQuery, compareDateByStr, nextMonthFirstDay, currentMonthLast, getMonthDay, currentMonthFirst, getPrevDay } from './../utils/index';
import './datetime.less'
import { Icon } from './../icon/Icon';
import Button from './../button/button';
type SelType = "all" | "before"
// type SHOWTYPE = "LastYear" | "LastMonth" | "NextYear" | "NextMonth"
enum SHOW_TYPE {
    DAY = "DAY",
    YEAR = "YEAR",
    MONTH = "MONTH",
}
enum PageType {
    LastYear = "LastYear",
    LastMonth = "LastMonth",
    NextYear = "NextYear",
    NextMonth = "NextMonth"
}
interface IDateTimePickerProps {
    className?: string;
    selType?: string,
    onSelectChange?: (dataStr?: string) => void
}
const OPEN = "OPEN"
const CLOSE = "CLOSE"
const createBeforeDayByLastDate = (lastDate: number, day: number, dateStr: string) => {
    const tmpArr = new Array(day)
    for (let index = 0; index < tmpArr.length; index++) {
        const tmp = lastDate - index;
        tmpArr[index] = {
            day: tmp,
            key: `${dateStr}${tmp}`,
            disabled: false,
            name: "prev-month"
        };
    }
    return tmpArr.sort((a: any, b: any) => a.day - b.day)
}
const createAfterDayByLastDate = (day: number, dateStr: string) => {
    const tmpArr = new Array(day)
    for (let index = 0; index < tmpArr.length; index++) {
        tmpArr[index] = 1 + index;
        tmpArr[index] = {
            day: 1 + index,
            key: `${dateStr}${1 + index}`,
            disabled: false,
            name: "next-month"
        };
    }
    return tmpArr
}
const createCurrentMonth = (time: string, dateStr: string) => {
    const tmpArr = new Array(getMonthDay(time))
    for (let index = 0; index < tmpArr.length; index++) {
        tmpArr[index] = 1 + index;
        tmpArr[index] = {
            day: 1 + index,
            key: `${dateStr}${1 + index}`,
            disabled: false,
            name: "available"
        };
    }
    return tmpArr
}
/**
 * str  2017-12-11
 * 日    11
 * @param props 
 */
export const DateTimePicker = (props: IDateTimePickerProps) => {
    const { className, onSelectChange, selType = "all" } = props
    const { year, month, weekday, day } = getDateQuery()
    const ref = useRef<HTMLDivElement>(null)
    const [pickStatus, setPickStatus] = useState(CLOSE)
    const [skipYear, setSkipYear] = useState(0)
    const [showType, setShowType] = useState(SHOW_TYPE.DAY)
    /**当前天数 */
    const _currentTime: string = `${year}-${month}-${day}`
    /**选中天数字符串 */
    const [dataStr, setDateStr] = useState('')
    /**选中年月日 */
    const [_year, setYear] = useState(year)
    const [_month, setMonth] = useState(month)
    const [_day, setCurrentDate] = useState(day)
    const _isClickDrap = useRef(false)
    useEffect(() => {
        if (!dataStr) return
        const { year, month, day } = strToNum(dataStr)
        setYear(year)
        setMonth(month)
        setCurrentDate(day)
    }, [dataStr]);
    useEffect(() => {
        createShowYear()
    }, [showType]);
    const classes = classNames("eda-datatime-base", className, {

    })
    const classesPickWrap = classNames("eda-picker-panel_body-wrapper", "", {
        "eda-picker-open": pickStatus === OPEN
    })
    const strToStrInput = (dateStr: string) => {
        if (!dateStr) return dateStr
        //2021-3-1  to 2021-03-01
        const str = dateStr.split("-").map((item) => item.length > 1 ? item : "0" + item).join("-")
        return `${str} 00:00:00`
    }
    /**
     * 选中天数字符串转年月日数字形式
     * @param dateStr 
     */
    const strToNum = (dateStr: string) => {
        //2021-3-1
        const data = dateStr.split("-").map(Number)
        return {
            year: data[0],
            month: data[1],
            day: data[2]
        }
    }
    const getDateStr = () => {
        return `${_year}-${_month}-${_day}`
    }
    const getTimeStr = (date: Date) => {
        return `${date.getFullYear()}-${date.getMonth() + 1}-`
    }
    useEffect(() => {
    }, [year, month, day]);
    /**日期前面的填充 */
    const supplementBefore = () => {
        //当前月当天日期对象：
        //待补天数
        //当前月第一天星期几:
        const date = getPrevDay(getDateStr()).lastDay
        let weekday = currentMonthFirst(getDateStr())
        const prevDate = getPrevDay(getDateStr())
        const prevLastDate = prevDate.lastDay.getDate()
        // 6-weekday
        return createBeforeDayByLastDate(prevLastDate, weekday, getTimeStr(prevDate.lastDay))
    }
    /**日期后面的填充 */
    const supplementAfter = () => {
        //当前月当天日期对象：
        //待补天数
        const date = currentMonthLast(getDateStr())
        const nextDate = new Date(nextMonthFirstDay(getDateStr()))
        //最后一天星期几
        // 6-weekday
        return createAfterDayByLastDate(6 - date.getDay() + 7, getTimeStr(nextDate))
    }
    const createCurrentMonthDate = () => {
        const currentTime = getDateStr()
        return [...supplementBefore(), ...createCurrentMonth(currentTime, getTimeStr(new Date(currentTime))), ...supplementAfter()].slice(0, 42)
    }
    const clickHandle = (day: string, dateString: string) => {
        setDateStr(dateString)
        onSelectChange && onSelectChange(strToStrInput(dateString))
    }
    const pageClick = (type: PageType) => {
        let y = 1970;
        let m = 0
        let min = 1
        let max = 12
        switch (type) {
            case PageType.LastYear:
                y = _year - 1 > y ? _year - 1 : y
                setYear(y)
                break;
            case PageType.LastMonth:
                let flagMin = _month - 1 >= min
                m = flagMin ? _month - 1 : max
                setMonth(m)
                !flagMin && setYear(_year - 1)
                break;
            case PageType.NextYear:
                setYear(_year + 1)
                break;
            case PageType.NextMonth:
                let flagMax = _month + 1 <= max
                m = flagMax ? _month + 1 : min
                setMonth(m)
                !flagMax && setYear(_year + 1)
                break;
        }
    }
    const renderHeader = () => {
        let header = null
        switch (showType) {
            case SHOW_TYPE.DAY:
                header = <>
                    <span onClick={() => {
                        pageClick(PageType.LastYear)
                    }} className="eda-picker-panel__icon-btn eda-date-picker__prev-btn">
                        <Icon type="" iconType="d-arrow-left" ></Icon>
                    </span>
                    <span onClick={() => {
                        pageClick(PageType.LastMonth)
                    }} className="eda-picker-panel__icon-btn eda-date-picker__prev-btn">
                        <Icon type="" iconType="arrow-left"></Icon>
                    </span>
                    <span className="eda-date-picker__header-label" onClick={() => {
                        setShowType(SHOW_TYPE.YEAR)
                    }}>{_year}年</span>
                    <span className="eda-date-picker__header-label" onClick={() => {
                        setShowType(SHOW_TYPE.MONTH)
                    }}>{_month}月</span>
                    <span onClick={() => {
                        pageClick(PageType.NextYear)
                    }} className="eda-picker-panel__icon-btn eda-date-picker__next-btn">
                        <Icon type="" iconType="d-arrow-right"></Icon>
                    </span>
                    <span onClick={() => {
                        pageClick(PageType.NextMonth)
                    }} className="eda-picker-panel__icon-btn eda-date-picker__next-btn">
                        <Icon type="" iconType="arrow-right"></Icon>
                    </span>
                </>
                break;
            case SHOW_TYPE.MONTH:

                break;
            case SHOW_TYPE.YEAR:
                const y = String(_year)
                const prevY = Number((y.slice(0, -1) + 0))
                const nextY = y.slice(0, -1) + 9
                header = <>
                    <span onClick={() => {
                        pageClick(PageType.LastYear)
                    }} className="eda-picker-panel__icon-btn eda-date-picker__prev-btn">
                        <Icon type="" iconType="d-arrow-left" ></Icon>
                    </span>

                    <span className="eda-date-picker__header-label" >{prevY}年 - {nextY}年</span>
                    <span onClick={() => {
                        pageClick(PageType.NextYear)
                    }} className="eda-picker-panel__icon-btn eda-date-picker__next-btn">
                        <Icon type="" iconType="d-arrow-right"></Icon>
                    </span>
                </>
                break;
        }

        return header
    }

    const renderTableBody = () => {
        let body = null
        switch (showType) {
            case SHOW_TYPE.DAY:
                const tmpArr = createCurrentMonthDate()
                const ret: any[] = []
                tmpArr.forEach((item, index: number) => {
                    const ind = Math.floor(index / 7)
                    if (ret[ind]) {
                        ret[ind].push(item)
                    } else {
                        ret[ind] = [item]
                    }
                })
                body =
                    <table cellSpacing="0" cellPadding="0" className="eda-date-table">
                        <tbody>
                            <tr className="eda-pick-number"><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr>
                            {
                                ret.map((item: any[], ind: number) => {
                                    return <tr key={ind}>
                                        {
                                            item.map((timeObj: any, index) => {
   
                                                
                                                const disabled = selType === "before" && compareDateByStr(timeObj.key, _currentTime)
                                                const classTd = classNames(timeObj.name, "", {
                                                    "today": _currentTime === timeObj.key,
                                                    "current": dataStr === timeObj.key,
                                                    "disabled": disabled
                                                })
                                                return <td onClick={() => {
                                                    !disabled && clickHandle(timeObj.day, timeObj.key)
                                                }} className={classTd} key={timeObj.key}>
                                                    <div >
                                                        <span>{timeObj.day}</span>
                                                    </div></td>
                                            })
                                        }
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                break;
            case SHOW_TYPE.MONTH:

                break;
            case SHOW_TYPE.YEAR:
                const yArr = createShowYear()
                const yRet: any[] = []
                yArr.forEach((item, index: number) => {
                    const ind = Math.floor(index / 4)
                    if (yRet[ind]) {
                        yRet[ind].push(item)
                    } else {
                        yRet[ind] = [item]
                    }
                })
                body = <>
                    <table cellSpacing="0" cellPadding="0" className="eda-year-table">
                        <tbody>
                            {
                                yRet.map((item: any[], ind: number) => {
                                    
                                    return <tr key={ind}>
                                        {
                                            item.map((timeObj: any, index) => {
                                                const disabled = selType === "before" && compareDateByStr(String(timeObj.key), _currentTime)
                                                const classTd = classNames(timeObj.name, "", {
                                                    "today": year === timeObj.key,
                                                    // "current": dataStr === timeObj.key,
                                                    "disabled": disabled
                                                })
                                                return <td onClick={() => {
                                                    !disabled && clickHandle(timeObj.day, timeObj.key)
                                                }} className={classTd} key={timeObj.key}>
                                                    <span className="cell">{timeObj.day}</span>
                                                </td>
                                            })
                                        }
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </>
                break;
        }

        return body


    }
    const inputFocus = () => {
        setPickStatus(OPEN)
        _isClickDrap.current = false

    }
    const inputBlur = () => {
        setTimeout(() => {
            (!_isClickDrap.current) && setPickStatus(CLOSE)
        })
    }
    const divBlur = () => {

        setPickStatus(CLOSE)
    }
    const createShowYear = () => {
        const y = String(_year)
        const prevY = Number((y.slice(0, -1) + 0))
        const nextY = y.slice(0, -1) + 9
        let arr = []
        for (let index = 0; index < 10; index++) {
            arr[index] = {
                day: prevY + index,
                key: prevY + index,
                disabled: false,
                name: "available"
            };
        }
        return arr

    }
    return (<div className={classes}>
        <Input value={strToStrInput(dataStr)} onFocus={() => {
            inputFocus()
        }} onBlur={() => {
            inputBlur()
        }} placeholder="选择日期"></Input>

        <div ref={ref} tabIndex={1} onBlur={() => {
            divBlur()
        }} onMouseDown={() => {
            if (ref.current) {
                ref.current.focus()
            }
            _isClickDrap.current = true
        }} className={classesPickWrap}>
            <div className="eda-picker-panel_body">
                <div className={`eda-picker-panel_header ${showType !== SHOW_TYPE.DAY ? 'eda-date-picker__header--bordered' : ""}`}>
                    {renderHeader()}
                </div>
                <div className="eda-picker-panel_content">
                    {renderTableBody()}
                </div>
                {showType === SHOW_TYPE.DAY ? <div className="eda-picker-footer">
                    <span className="eda-picker-footer-text" onClick={() => {
                        setDateStr(_currentTime)
                        setPickStatus(CLOSE)
                    }}>此刻</span>
                    <Button onClick={() => {
                        setPickStatus(CLOSE)
                    }} btnType="action" size="ssm">确认</Button>
                </div> : null}


            </div>
        </div>
    </div>)
}