import React from 'react'
import { Avatar, Col, List } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { Link } from "react-router-dom";
import TopicTag from "../TopicTag";
import dayjs from 'dayjs';
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
require('dayjs/locale/zh-cn')
dayjs.locale('zh-cn')

function TopicList(props) {
    let { loading, data } = props;
    return <List
        className="topics_list"
        loading={loading}
        dataSource={data}
        renderItem={(data) => {
            // console.log('data')
            // console.log(data)
            const {
                author,
                last_reply_at,
                good,
                top,
                tab,
                title,
                id,
            } = data

            const {
                avatar_url,
                loginname
            } = author
            // console.log(data);

            return <List.Item>
                <Col
                    xs={24}
                    md={20}>
                    <Link to={`/user/${loginname}`}>
                        <Avatar
                            icon={<UserOutlined />}
                            size='normal'
                            src={avatar_url}
                            title={title}
                            onError={(error) => {
                                // 响应识别,可以在这里设置(展示默认头像)
                                console.log(error)
                            }}
                        />
                    </Link>
                    <TopicTag tab={top ? "top" : (good ? "good" : tab)} />
                    <Link to={`/topics/${id}`} style={{ marginLeft: 10 }}>{title}</Link>
                </Col>

                <Col
                    xs={0}
                    md={4}
                    className='from-now'
                >
                    {/* 日期内容 */}
                    {/* 返回现在到当前实例的相对时间。 */}
                    {dayjs(last_reply_at).fromNow()}
                </Col>
            </List.Item>
        }}
    />
}

export default TopicList