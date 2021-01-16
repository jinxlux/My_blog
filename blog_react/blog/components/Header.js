import React ,{useState,useEffect} from 'react'
import Router from 'next/router'
import '../static/style/components/header.css'
import {Row,Col, Menu} from 'antd'
import {HomeOutlined,ToolOutlined,CoffeeOutlined} from '@ant-design/icons';

/*
toppest head component for every papge, including brand & navigator links
**/
const Header = () => {

    // go to list page
    const handleClick = (e)=>{
        if(e.key==0){
            Router.push('/')
        }else{
            Router.push('/list?id='+e.key)
        }

    }

    return(
        <div className="header">
            <Row type="flex" justify="center">
                {/*xs;sm ~ phone/pad screen; >=md ~ computer*/}
                <Col className="logo-txt" xs={24} sm={24} md={10} lg={15} xl={12}>
                    <span className="header-logo">Xudong's Blog</span>
                    <span className="header-txt">Share everyday</span>
                </Col>
                {/*xs;sm ~ phone/pad screen; >=md ~ computer*/}
                <Col className="memu-div" xs={0} sm={0} md={14} lg={8} xl={6}>
                    <Menu  mode="horizontal" onClick={handleClick}>
                        <Menu.Item key="0">
                            <HomeOutlined />
                            home
                        </Menu.Item>
                        <Menu.Item key="1">
                            <ToolOutlined />
                            Technology
                        </Menu.Item>
                        <Menu.Item key="2">
                            <CoffeeOutlined />
                            life
                        </Menu.Item>
                    </Menu>
                </Col>
            </Row>
        </div>
)}

export default Header