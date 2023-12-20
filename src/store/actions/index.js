import axios from 'axios';
import {useDispatch} from "react-redux";
const http = axios.create({
    // baseURL: "https://cnodejs.org/api/v1",
    baseURL: "https://static2.cnodejs.org/api/v1"
})

// 获取主题列表数据
// 返回一个高阶函数
function useTopicsList() {
    const dispatch = useDispatch()
    return function (tab = "dev", page = 1, limit = 20, mdrender = false) {
        dispatch({
            type: 'topics_loading',
        })
        http.get(`/topics?tab=${tab}&page=${page}&limit=${limit}&mdrender=${mdrender}`)
            .then(res => {
                dispatch({// 存入state的数据
                    type: 'topics_loadover',
                    data: res.data.data
                })
            })
    }
}


// 获取主题详情
// 返回一个高阶函数
function useTopic() {
    const dispatch = useDispatch()
    return function (id) {
        dispatch({
            type: 'topic_loading',
        })
        http.get(`/topic/${id}`)
            .then(res => {
                dispatch({// 存入state的数据
                    type: 'topic_loadover',
                    data: res.data.data
                })
            }).catch(res=>{
                dispatch({// 存入error_msg
                    type: 'topic_error',
                    data: res.response.data.err_msg
                })
            })
    }
}


// 获取用户详情
// 返回一个高阶函数
function useUser() {
    const dispatch = useDispatch()
    return function (loginname) {
        dispatch({
            type: 'user_loading',
        })
        http.get(`/user/${loginname}`)
            .then(res => {
                dispatch({// 存入state的数据
                    type: 'user_loadover',
                    data: res.data.data
                })
            })
    }
}

export {useTopicsList, useTopic, useUser}