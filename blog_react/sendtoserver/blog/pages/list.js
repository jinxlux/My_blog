import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import {Row,Col,List,Breadcrumb} from 'antd'
import {FireOutlined, FolderOutlined,CalendarOutlined} from '@ant-design/icons';

import axios from 'axios'
import  servicePath  from '../config/apiUrl'
import Link from 'next/link'


const Mylist = (list) => {

  const [mylist,setMylist] = useState(list.data)
  useEffect(()=>{
    setMylist(list.data)
   })

  return(
    <div>
      <Head>
        <title>{list.data[0].typeName}</title>
      </Head>
      <Header />
      <Row className = "comm-main" type="flex" justify="center">
        {/* left side of page*/}
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div className="bread-div">
            <Breadcrumb>
              <Breadcrumb.Item><a href="/">Home</a></Breadcrumb.Item>
              <Breadcrumb.Item>{list.data[0].typeName}</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <List
            header={<div>Latest</div>}
            itemLayout="vertical"
            dataSource={mylist}
            renderItem={item => (
              <List.Item> 
                <div className="list-title">
                  <Link href={{pathname:'/detail',query:{id:item.id}}}>
                  <a>{item.title}</a>
                  </Link>
                </div>
                <div className="list-icon">
                  <span><CalendarOutlined />{item.addTime}</span>
                  <span><FolderOutlined />{item.typeName}</span>
                  <span><FireOutlined />{item.view_count}</span>
                </div>
                <div className="list-context">{item.context}</div>  
              </List.Item>
            )}
          /> 
        </Col>
        {/* right side of page*/}
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
        </Col>
      </Row>
      <Footer />
    </div>
  )
}

Mylist.getInitialProps = async (context)=>{

  let id =context.query.id
  const promise = new Promise((resolve)=>{
    axios(servicePath.getListById+id).then(
      (res)=>resolve(res.data)
    )
  })
  return await promise
}


export default Mylist;