import dayjs from 'dayjs';
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
require('dayjs/locale/zh-cn')
dayjs.locale('zh-cn')

// 处理时间的组件
export default function FromNow(props){
    let {date} = props
    return dayjs(date).fromNow()
}