import React from "react";
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom'
import {indexNav, types} from '../../router/index'
import qs from 'qs';
function IndexNav(props) {
    const { search } = useLocation();
    const { tab } = qs.parse(search.substr(1))
    let activeIndex = tab === undefined ? 0 : (types.indexOf(tab))
    
    return (<Menu
        mode="horizontal"
        defaultSelectedKeys={[activeIndex + '']}
        selectedKeys={[activeIndex + '']}
        className='index_nav'
    >
        {
            indexNav.map((navData, index) => {
                return <Menu.Item key={index}>
                    <Link to={navData.to}>{navData.txt}</Link>
                </Menu.Item>
            })
        }
    </Menu>)
}

export default IndexNav;