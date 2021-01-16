import Head from 'next/head'
import React, { useState } from 'react'
import Link from 'next/link'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import {Row,Col,List} from 'antd'
import axios from 'axios'
import {FireOutlined, FolderOutlined,CalendarOutlined} from '@ant-design/icons';
import '../static/style/pages/index.css'

import servicePath from '../config/apiUrl'


const Home = (resDic) => {
  const [mylist,setMylist] = useState(
    resDic.data
  )
  // console.log(res.data)
  return(
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <Row className = "comm-main" type="flex" justify="center">
        {/* left side of page*/}
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
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
                <div className="list-context">{item.introduce}</div>  
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

Home.getInitialProps = async ()=>{
  const promise = new Promise((resolve)=>{
    axios(servicePath.getArticleList).then(
      (res)=>{
        // console.log('get result',res.data)
        resolve(res.data)
      }
    )
  })

  return await promise
}

export default Home;