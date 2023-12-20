import React from "react";
import { Pagination } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import qs from 'qs'

// 获取分类,点击分页时,修改地址栏参数(关联)
export default function IndexPagination() {
    // 通过qs获取分类
    let { search } = useLocation();
    let { tab = "all", page = 1 } = qs.parse(search.substr(1));
    return <div className="index-pagination">
        <Pagination
            current={page-0}
            defaultPageSize={20}
            total={1000}
            showSizeChanger={false}
            itemRender={(page, type) => {
                switch (type) {
                    case 'page':
                        return <Link to={`/?tab=${tab}&page=${page}`}>{page}</Link>
                    case 'prev':
                        return <Link to={`/?tab=${tab}&page=${page}`}> {"<"} </Link>

                    case 'next':
                        return <Link to={`/?tab=${tab}&page=${page}`}> {">"}</Link>
                    default:
                        return <Link to={`/?tab=${tab}&page=${page}`}> {"..."}</Link>

                }
            }}
        />
    </div>
}