import React, { ReactNode } from 'react';
import './table.less'
import { classNames } from './../utils/index';
import { IPagination, Pagination } from './../pagination/pagination';
interface IColumns {
    title: string,
    dataIndex: string,
    key: string,
    width?: number,
    render?: (item: string) => ReactNode
}
interface IDataSource {
    [key: string]: any
}
interface IRender {
    [key: string]: any
}
interface ITableProps {
    columns: IColumns[];
    dataSource: IDataSource[];
    children?: ReactNode,
    stripe?: boolean,
    loading?: boolean,
    pagination?: IPagination,
    scroll?:{x?:boolean,y?:boolean};
    onRow?: (record: any) => {
        // onClick: event => {}, // 点击行
        // onDoubleClick: event => {},
        // onContextMenu: event => {},
        // onMouseEnter: event => {}, // 鼠标移入行
        // onMouseLeave: event => {},
    }

}

export const Table = (props: ITableProps) => {
    const { columns, dataSource, scroll,stripe, pagination } = props
    let classTr = classNames("", "", {
        "eda-table-row-stripe": stripe
    })

    const renderHeader = (columns: IColumns[]) => {
        let jsxHeader = (<tr>{columns.map((item: IColumns) => {
            return <th className="is-leaf" style={{ width: item.width }} key={item.title}>
                <div className="cell">
                    {item.title}
                </div>
            </th>
        })}</tr>)
        return jsxHeader
    }
    const renderBody = (dataSource: IDataSource[]) => {
        let renderList: IRender = {

        }
        const keys = columns.map((item) => {
            renderList[item.key] = item.render
            return item.key
        })

        return dataSource.map((item: IDataSource, index: number) => {
            return <tr className={classTr} key={item.key}>
                {keys.map((key: string, index: number) => {
                    return <td className="is-leaf" key={index}>
                        <div className="cell margin-cell">{renderList[key] ? renderList[key](item[key]) : item[key]}</div></td>
                })}
            </tr>
        })
    }
    return <div className="eda-table" style={{overflowX:scroll?.x?"scroll":"inherit"}}>
        <table className="eda-table-wrapper" cellSpacing="0" cellPadding="0" >
            <thead className="has-gutter">
                {renderHeader(columns)}
            </thead>
            <tbody>
                {renderBody(dataSource)}
            </tbody>
        </table>
        {dataSource.length === 0 ? <div className="eda-table__empty-block">
            <span className="eda-table__empty-text">
                暂无数据
                </span>
        </div> : null}
        {pagination ? <Pagination {...pagination}></Pagination> : null}

    </div>
}
export default Table