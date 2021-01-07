import React from 'react'
import './pagination.less'
import { Icon } from './../icon/Icon';
interface IPagination {
    current?: number
    defaultCurrent?: number
    defaultPageSize?: number
    pageSize?: number
    total: number
    onChange?: (page: number, pageSize: number) => void
}
export const Pagination = (props: IPagination) => {
    const { defaultCurrent, current, defaultPageSize, pageSize, total, onChange } = props

    return (<div className="eda-pagination-box">
        <span className="demonstration">每页显示数量：20</span>
        <div className="eda-pagination">
            <button type="button" disabled className="btn-prev">
                <Icon type="" iconType="arrow-left"></Icon>
            </button>

            <ul className="eda-pager">
                <li className="number active">1</li>
                <li className="number ">2</li>
                <li className="number ">3</li>
                <li className="number ">4</li>
            </ul>
            <button type="button" className="btn-next">
                <Icon type="" iconType="arrow-right"></Icon>
             </button>
     
        </div>
        </div>)
}
export default Pagination