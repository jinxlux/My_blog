import React,{useState, useEffect} from 'react'
import Head from 'next/head'
import axios from 'axios'
import {Row, Col, Breadcrumb, Affix} from 'antd'

import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import MarkdownNavbar from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';

import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import '../static/style/pages/detail.css'
import {FireOutlined, FolderOutlined,CalendarOutlined} from '@ant-design/icons';

import servicePath from '../config/apiUrl'




const Detail = (props) => {

  let markdown = props.article_content
  let dataProps={}
  dataProps.id = props.id
  dataProps.view_count = props.view_count + 1;

  useEffect(()=>{
    updateViewCound()
  },[])

  const updateViewCound = () =>{
    axios({
      method:'post', // update-better; post for easy orgainze
      url:servicePath.changeArticle,
      header:{ 'Access-Control-Allow-Origin':'*' },
      data:dataProps,
      withCredentials: true
  }).then(
      res=>{
          if(res.data.isScuccess){
              console.log('Update Successfully!')
          }else{
              console.log('Error');
          }
      }
    )
  }


  return (
    <div>
      <Head>
        <title>{props.title}</title>
      </Head>
      <Header />
      <Row className = "comm-main" type="flex" justify="center">
        {/* left side of page*/}
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div>
            <div className="bread-div">
              <Breadcrumb>
              <Breadcrumb.Item><a href="/">home</a></Breadcrumb.Item>
              <Breadcrumb.Item>{props.typeName}</Breadcrumb.Item>
              <Breadcrumb.Item>{props.title}</Breadcrumb.Item>
              </Breadcrumb>
            </div>

            <div>
              <div className="detailed-title">
              {props.title}
              </div>

              <div className="list-icon center">
                <span><CalendarOutlined />{props.addTime}</span>
                <span><FolderOutlined /> {props.typeName}</span>
                <span><FireOutlined /> {props.view_count}</span>
              </div>

              <div className="detailed-content" >
                <ReactMarkdown 
                  plugins={[gfm]}
                  children={markdown} 
                />
              </div>
            </div>
          </div>
        </Col>
        {/* right side of page*/}
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
          <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">
              <div className="nav-title">menu</div>
              <MarkdownNavbar
                className="article-menu"
                source={markdown}
                ordered={false}
              />
            </div>
          </Affix>  
        </Col>
      </Row>
      <Footer />
    </div>
  )
}

Detail.getInitialProps = async(context)=>{

  console.log(context.query.id)
  let id =context.query.id
  const promise = new Promise((resolve)=>{

    axios(servicePath.getArticleById+id).then(
      (res)=>{
        // console.log(res.data)
        resolve(res.data.data[0])
      }
    )
  })

  return await promise
}

export default Detail;