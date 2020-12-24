import React from 'react'
import { Link } from 'react-router-dom';
import './header.less'

export default function Header(){
    return <header className="header">
            <Link to="/user/account/work" style={{marginRight:200}}>work</Link>
            <Link to="/user/account/center"  style={{marginRight:200}}>center</Link>
            <Link to="/user/account/center/account">account</Link>
            <Link to="/user/account/work/grade">work</Link>

    </header>
}