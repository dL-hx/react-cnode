import React from 'react';
import { Link, useLocation } from 'react-router-dom'
import { Affix, Layout, Row, Col, Menu } from 'antd';
import { nav } from './../../router'
function Header() {
    // 获取location中的pathname
    let {pathname} = useLocation()
    // 根据pathname 和 nav 中数据寻找索引值
    let activeIndex = nav.findIndex((navData)=>{
        return pathname == navData.to;
    })
    
    return (
        <Affix offsetTop={0}>
            <Layout.Header id="header">
                <div className='wrap'>
                    <Row>
                        <Col xs={6} sm={4} md={2}>
                            <h1 className='logo'><Link to='/'>logo</Link></h1>
                        </Col>
                        <Col xs={18} sm={20} md={22}>
                            <Menu mode='horizontal' theme='dark' defaultSelectedKeys={[activeIndex + '']}>
                                {
                                    nav.map((navData, index)=>{
                                       return <Menu.Item key={index}>
                                            <Link to={navData.to}>{navData.txt}</Link>
                                        </Menu.Item>
                                    })
                                }
                            </Menu>
                        </Col>
                    </Row>
                </div>
            </Layout.Header>
        </Affix>
    );
}

export default Header;
