import React from 'react'
import {Avatar, Card, List, Comment} from "antd";
import {UserOutlined} from "@ant-design/icons";
import FromNow from "../../components/FromNow";
import {Link} from "react-router-dom";

export default function Replies(props) {
    let {data=[], loading} = props
    return <Card
        title="评论列表"
        loading={loading}
        id='replies'
    >
        <List
            dataSource={data}
            renderItem={(itemData) => {
                // console.log(itemData)
                return <List.Item>
                    <Comment
                        author={<Link to={`/user/${itemData.author.loginname}`}>{itemData.author.loginname}</Link>}
                        avatar={<Avatar
                            icon={<UserOutlined/>}
                            src={itemData.author.avatar_url}
                            title={itemData.author.loginname}
                        />}
                        content={<div
                            dangerouslySetInnerHTML={{
                                __html: itemData.content
                            }}
                        />
                        }
                        datetime={<time>发布于: <FromNow data={itemData.create_at}/></time>}
                    />
                </List.Item>
            }}
            pagination={{
                simple: true
            }}
        />
    </Card>
}