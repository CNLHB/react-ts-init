import React from 'react'
import { Link } from 'react-router-dom';
import './header.less'
import i18n from '@/locales/i18n'
export default function Header(){
    return <header className="header">
            <Link to="/user/account/work" style={{marginRight:200}}>work</Link>
            <Link to="/user/account/center"  style={{marginRight:200}}>center</Link>
            <Link to="/user/account/center/account"  style={{marginRight:200}}>account</Link>
            <Link to="/user/account/work/grade" style={{marginRight:200}}>grade</Link>
            <button  onClick={()=>{
            i18n.changeLanguage('zh-CN');
          }} style={{marginRight:200}}>changCn</button>
                      <button onClick={()=>{
                          console.log("en");
                          
            i18n.changeLanguage('en');
          }} >changEn</button>
    </header>
}