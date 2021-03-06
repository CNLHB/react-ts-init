import React,{useState,useEffect} from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { AppRoutes, renderRouter } from './router/router'
import Header from '@/layout/header/header';
import Main from '@/layout/main/main';
import './App.less';
import { useTranslation } from "react-i18next";


function App() {
  const { t } = useTranslation();
  
  return (
    <div className="user">
      {/* 懒加载 */}
      {/* <Suspense fallback={<div>loading</div>}> */}
        <Router >
          <Header></Header>
          <Main>
            {renderRouter(AppRoutes)}
          </Main>
        </Router>
      {/* </Suspense> */}

    </div>
  );
}

export default App;
