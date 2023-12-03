import React, { useEffect } from 'react';
import { Card } from 'antd';
import {  Link } from 'react-router-dom';
import { useTopic } from '../../store/actions';
import TopicTag from './../../components/TopicTag'
import FromNow from '../../components/FromNow';

function Details(props) {
  let { data, loading } = props
  let {
    author,
    content,
    create_at,
    good,
    top,
    tab,
    title,
    visit_count
  } = data
  return (
    <Card
      bordered
      loading={loading}
      title={
        <>
          <h1>
            <TopicTag tab={top ? "top" : (good ? "good" : tab)} />
            {title}
          </h1>
          <p>-作者: <Link to={`/user/${author.loginname}`}>{author.loginname}</Link>
              -创建时间: <FromNow date={create_at}/> - 浏览人数: {visit_count}
          </p>
        </>
      }
      type='inner'
    >
      <div
        dangerouslySetInnerHTML={{
          __html: content
        }}
      >

      </div>
    </Card>
  );
}

export default Details;
