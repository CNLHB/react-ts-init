import React, { LazyExoticComponent, lazy } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Team from "@/view/team/team"
import NoMatch from '@/view/no-match/no-match'
import PersonCenter from "@/view/person-center/person-center";
import PersonWork from "@/view/person-work/person-work";
import Project from "@/view/project/project";
import Grade from "@/view/person-work/grade/grade";

export interface RouteType {
    pathname?: string;
    component: LazyExoticComponent<any> | any;
    exact: boolean;
    auth?: boolean
    title?: string;
    icon?: string;
    children?: RouteType[];
}
export const prefix = "/user/account"
export const AppRoutes: RouteType[] = [
    {
        pathname: "/center",
        component: lazy(() => import("@/view/person-center/person-center")),
        auth: false,
        exact: false,
        children: [{
            pathname: "/center/account",
            component: lazy(() => import("@/view/person-center/account/account")),
            auth: false,
            exact: true,
        }, {
            pathname: "/center/account1",
            component: lazy(() => import("@/view/person-center/account/account")),
            auth: false,
            exact: false,
        }]
    },
    {
        pathname: "/work",
        component: lazy(() => import("@/view/person-work/person-work")),
        auth: false,
        exact: false,
        children: [{
            pathname: "/work/grade",
            component: lazy(() => import("@/view/person-work/grade/grade")),
            auth: false,
            exact: true,
        }]
    },
    {
        pathname: "/project",
        component: lazy(() => import("../view/project/project")),
        auth: false,
        exact: true,
    },
    {
        pathname: "/404",
        exact: true,
        auth: false,
        component: lazy(() => import("../view/no-match/no-match")),
    }, {
        pathname: "/",
        exact: true,
        auth: true,
        component: Team,
    },
];
//
export const ContentRoutes: RouteType[] = [

    {
        pathname: "/",
        exact: true,
        auth: true,
        component: lazy(() => import("../view/no-match/no-match")),
    }

];

export const renderRouter = (router: RouteType[]) => {

    const routers = (router: RouteType[]) => {
        return router.map((item: RouteType) => {
            return (
                <Route
                    path={prefix + item.pathname}
                    exact={item.exact}
                    key={item.pathname}
                    render={
                        () => {
                            return <item.component>
                                {item.children ? routers(item.children) : null}
                            </item.component>
                        }
                    }
                >

                </Route>
            );
        })
    }
    return <Switch>
        {routers(router)}
        <Redirect exact path="/eda" to={{ pathname: '/eda/log' }}></Redirect>
        <Route component={NoMatch}></Route>
    </Switch>
};

export const routeConfig = [
    {
        path: '/work',
        component: PersonWork,
        indexRoute: { component: Team },
        childRoutes: [
            { path: 'team', component: Team },
            {
                path: 'project',
                component: Project,
                childRoutes: [
                    { path: '/grade', component: Grade },
                    // { path: 'messages/:id',
                    //   onEnter: function (nextState, replaceState) {
                    //     replaceState(null, '/messages/' + nextState.params.id)
                    //   }
                    // }
                ]
            }
        ]
    }
]