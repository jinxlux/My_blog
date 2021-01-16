import React,{useState} from 'react';
import { Layout, Menu, Breadcrumb} from 'antd';
import '../static/css/AdminIndex.css';
import {PieChartOutlined, DesktopOutlined, UserOutlined, FileOutlined} from '@ant-design/icons';
import {Route} from "react-router-dom"; 
import AddArticle from './AddArticle'
import ArticleList from './ArticleList'

const {Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdminIndex(props){

    const [collapsed,setCollapsed] = useState(false)

    const onCollapse = collapsed => {
        setCollapsed(collapsed)
    };

    const handleClickArticle = e => {
      if(e.key == 'addArticle'){
        props.history.push('/index/add')
      }else{
        props.history.push('/index/list')
      }
    }

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider  collapsible collapsed={collapsed} onCollapse={onCollapse}>
          {/* <div className="logo"/> */}
          <Menu theme="dark" defaultSelectedKeys={['addArticle']} mode="inline"
            onClick={
              handleClickArticle
            }>
            <Menu.Item key="addArticle">
                <PieChartOutlined />    
                <span>workbench</span>
            </Menu.Item>
            {/* <Menu.Item key="2">
                <DesktopOutlined />
                <span>Add Article</span>
            </Menu.Item> */}
            <SubMenu
              key="sub1"
              onClick={
                handleClickArticle
              }
              title={
                <span>
                    <UserOutlined />
                    <span>Article Management</span>
                </span>
              }
            >
              <Menu.Item key="addArticle">Add Article</Menu.Item>
              <Menu.Item key="ArticleList">Article List</Menu.Item>

            </SubMenu>

            {/* <Menu.Item key="9">
                <FileOutlined />
                <span>Message Management</span>
            </Menu.Item> */}
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ margin: '0 16px' }}>
            {/* <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Background</Breadcrumb.Item>
              <Breadcrumb.Item>workbench</Breadcrumb.Item>
            </Breadcrumb> */}
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <div>
                <Route path="/index/" exact component={AddArticle}/>
                <Route path="/index/add/" exact   component={AddArticle} />
                <Route path="/index/list/"   component={ArticleList} />
                <Route path="/index/add/:id"   component={AddArticle} />
              </div>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>XJerry.net</Footer>
        </Layout>
      </Layout>
    )

}

export default AdminIndex