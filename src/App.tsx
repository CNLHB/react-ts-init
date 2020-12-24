import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { AppRoutes, renderRouter, routeConfig } from './router/router'
import './App.less';
import Header from '@/layout/header/header';
import Main from '@/layout/main/main';
import { Route } from 'react-router-dom';

function App() {
  return (
    <div className="user">
      <Suspense fallback={<div>loading</div>}>

        <Router >
          <Header></Header>
          <Main>
            {renderRouter(AppRoutes)}
          </Main>
        </Router>
      </Suspense>

    </div>
  );
}

export default App;
