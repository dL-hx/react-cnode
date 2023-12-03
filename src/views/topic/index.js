import React, { useEffect } from 'react';
import { Alert } from 'antd';
import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { useTopic } from '../../store/actions';
import Details from './details';

function TopicPage() {
  let { id } = useParams()
  let getData = useTopic()
  let history = useHistory()
  let { loading, data, isError, err_msg } = useSelector(state => state.topic)
  useEffect(() => {
    getData(id)
  }, [id])
  return (
    <div
      id="topic"
    >
      {/* 主题详情 */}
      {isError ?
        <Alert
          message="请求出错"
          description={
            <>
              <p>{err_msg}</p>
              <p>点击关闭按钮返回上一步</p>
            </>
          }
          type="error"
          closable
          afterClose={()=>{
            history.goBack()
          }}
        /> : <>
          <Details 
            loading={loading}
            data={data}
          />
        </>
      }
    </div>
  );
}

export default TopicPage;
