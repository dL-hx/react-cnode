import React from "react";
import IndexPage from "../views/index";
import TopicPage from "../views/topic";
import UserPage from "../views/user";
import GetStartPage from "../views/getstart";
import AboutPage from "../views/about";
import Page404 from "../views/page404";
import qs from 'qs';
const types = ["all", "good", "share", "ask", "job", "dev"];


const route = [
    {
        path: '/',
        exact: true,
        render(props) {
            const { location } = props;
            const { search } = location;
            // 处理search结构
            let { tab, page } = qs.parse(search.substr(1))
            if (
                tab === undefined && page === undefined
                || types.includes(tab) && page === undefined || page > 0) {
                return <IndexPage {...props} />
            }
            return <Page404 {...props} />
        }
    },
    {
        path: '/topics/:id',
        exact: true,
        render(props) {
            return <TopicPage {...props} />
        }
    },
    {
        path: '/user/:username',
        exact: true,
        render(props) {
            return <UserPage {...props} />
        }
    },
    {
        path: '/getstart',
        exact: true,
        render(props) {
            return <GetStartPage {...props} />
        }
    },
    {
        path: '/about',
        exact: true,
        render(props) {
            return <AboutPage {...props} />
        }
    },
    {
        path: '',
        exact: false,
        render(props) {
            return <Page404 {...props} />
        }
    }
]

// 导航
const nav = [
    {
        to: '/',
        txt: '首页',
    },
    {
        to: '/getstart',
        txt: '新手入门',
    },
    {
        to: '/about',
        txt: '关于我们',
    }
]

// 子导航
const indexNav = [
    {
        txt: '全部',
        to: '/?tab=all',
    },
    {
        txt: '精华',
        to: '/?tab=good',
    },
    {
        txt: '分享',
        to: '/?tab=share',
    },
    {
        txt: '问答',
        to: '/?tab=ask',
    },
    {
        txt: '招聘',
        to: '/?tab=job',
    },
    {
        txt: '客户端测试',
        to: '/?tab=dev',
    }
]

export { route, nav, indexNav , types}