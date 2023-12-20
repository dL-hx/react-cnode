// 不用thunk中间件的原因
// 因为hooks 本身就包含副作用,(hook将动作和状态做逻辑复用(将这些抽象为hooks)) 用hook做副作用,redux做状态管理

import { createStore, combineReducers } from 'redux'
import topics from './reducers/topics'
import topic from './reducers/topic'
import user from './reducers/user'
export default createStore(combineReducers({
    topics,
    topic,
    user
}))