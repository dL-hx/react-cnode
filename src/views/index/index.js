import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import TopicList from "../../components/TopicList";
import { useTopicsList } from "../../store/actions";
import IndexNav from './indexNav';
// 使用qs模块,关联路由数据依赖
import qs from 'qs';
import { useLocation } from "react-router-dom";
import IndexPagination from './indexPagination'

function IndexPage(props) {
    //   console.log(props);
    let { data, loading } = useSelector(state => state.topics)
    let getData = useTopicsList()
    let { search } = useLocation()
    let { tab='all', page=1 } = qs.parse(search.substr(1));
    useEffect(() => {
        getData(tab, page)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tab, page]);
    return (
        <div>
            <IndexNav />
            <TopicList
                data={data}
                loading={loading}
            />
            {loading ? "": <IndexPagination />}
        </div>
    );
}

export default IndexPage;
