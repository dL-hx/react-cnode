import React, { useEffect } from 'react';
import { Card } from "antd";
import { useParams } from 'react-router-dom';
import { useUser } from '../../store/actions';
import { useSelector } from 'react-redux';
import TopicList from "../../components/TopicList";

function UserPage() {
  let { username: loginname } = useParams()
  let getData = useUser()

  let {data, loading} = useSelector(state=>state.user)

  const {recent_topics = [], recent_replies=[] } = data

  useEffect(() => {
    getData(loginname)
  }, [loginname])


  return (
    <div className='user_page'>
      <Card
        loading={loading}
      >

      </Card>
      <Card
        loading={loading}
        title='最近创建的话题'
        type='inner'
      >
        <TopicList 
          loading={loading}
          data={recent_topics}
        />
      </Card>
      <Card
        loading={loading}
        title='最近参与的话题'
        type='inner'
      >
       <TopicList 
          loading={loading}
          data={recent_replies}
        />
      </Card>
    </div>
  );
}

export default UserPage;
