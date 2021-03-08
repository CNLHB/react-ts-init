interface StringIndex {
    [key: string]: any
}
export function classNames(basicClass: string = "", custonClass: string = "", options: StringIndex) {
    let className = `${basicClass} ${custonClass}`
    Object.keys(options).map((item: string) => {
        if (options[item]) {
            className += ` ${item}`
        }
        return ''
    })
    return className.trim()
}

export const getFullYear = () => {
    return
}
/**获取时间 */
export const getDateQuery = (time?: string) => {
    const date = time ? new Date(time) : new Date()
    /**获取年份 */
    const year = date.getFullYear();
    /**获取月份 */
    const month = date.getMonth() + 1;
    /**获取星期几 */
    const weekday = date.getDay();
    /**获取当前第几号 ，日*/
    const day = date.getDate();
    /**获取时 */
    const hours = date.getHours();
    /**获取分 */
    const minutes = date.getMinutes();
    /**获取秒 */
    const seconds = date.getSeconds();
    return {
        year, month, weekday, hours, minutes, seconds, day
    }
}
/**当前月 */
export const currentMonthLast = (time?: string) => {
    var date = time ? new Date(time) : new Date()
    var currentMonth = date.getMonth();
    var nextMonth = ++currentMonth;
    var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
    var oneDay = 1000 * 60 * 60 * 24;
    return new Date(nextMonthFirstDay.getTime() - oneDay);
}
export const currentMonthFirst = (time?: string) => {
    var date = time ? new Date(time) : new Date()
    date.setDate(1);
    return date.getDay();
}
/**上个月第一天和最后一天的日期对象 */
export const getPrevDay = (time?: string) => {
    let nowdays = time ? new Date(time) : new Date()
    let year = nowdays.getFullYear();
    let month: any = nowdays.getMonth();
    if (month == 0) {
        month = 12;
        year = year - 1;
    }
    if (month < 10) {
        month = "0" + month;
    }
    let firstDayOfPreMonth = year + "-" + month + "-" + "01";
    let lastDay = new Date(year, month, 0);
    let lastDayOfPreMonth = year + "-" + month + "-" + lastDay.getDate();
    firstDayOfPreMonth = firstDayOfPreMonth.toString();
    lastDayOfPreMonth = lastDayOfPreMonth.toString();
    return {
        firstDay: new Date(firstDayOfPreMonth),
        lastDay: new Date(lastDayOfPreMonth)
    };
}

export function getMonthDay(time?: string) {
    let date = time ? new Date(time) : new Date()
    let days = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    return days
}

/*获取下个月的第一天*/
export function nextMonthFirstDay(timeStr?: string) {
    var time = timeStr ? new Date(timeStr) : new Date()
    var year = time.getFullYear();
    var month = time.getMonth() + 2;
    if (month > 12) {
        month = month - 12;
        year = year + 1;
    }
    var day = 1;
    return year + '-' + month + '-' + day;
}
/*获取下个月的最后一天*/
export function nextMonthLastDay() {
    var time = new Date();
    var year = time.getFullYear();
    var month = time.getMonth() + 2;
    if (month > 12) {
        month = month - 12;
        year = year + 1;
    }
    var day = nextMonthDay(year, month);
    return year + ',' + month + ',' + day;
}
export function nextMonthDay(year: any, month: any) {//判断每月多少天
    var day31 = [1, 3, 5, 7, 8, 10, 12];
    var day30 = [4, 6, 9, 11];
    if (day31.indexOf(month) > -1) {
        return 31;
    } else if (day30.indexOf(month) > -1) {
        return 30;
    } else {
        if (isLeapYear(year)) {
            return 29;
        } else {
            return 28;
        }
    }
}

export function isLeapYear(year: any) {//判断是否为闰年
    return (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0);
}

export const compareDateByStr = (a: string, b: string) => {
    return +new Date(a) > +new Date(b)
}

export function getViewPort(){
    if(!document)return {width:0,height:0}
    if(document.compatMode==="BackCompat"){
        return {
            width: document.body.clientWidth,
            height:document.body.clientHeight
        }
    }else{
        return {
            width:document.documentElement.clientWidth,
            height:document.documentElement.clientHeight
        }
    }
}


/**
 * 
 * @param element 
 */
export function getElementViewOverflow(element:any){
    let current = element.parentElement
    while(current!==null){
        if(current.style){
            if(current.style.overflow||current.style.overflowY){
                return current
            }else{
                current = current.parentElement
            }
        }
    }
    return null
}