import React,{useState,useEffect} from 'react';
import { List ,Row ,Col , Modal ,message ,Button,Switch} from 'antd';
import axios from 'axios'
import  servicePath  from '../config/apiUrl'
import '../static/css/ArticleList.css'

const { confirm } = Modal;

function ArticleList(props){

    const [list,setList]=useState([])

    useEffect(()=>{
        getList()
    },[])

    const getList=()=>{
        axios({
            method:'get',
            url: servicePath.getArticleList,
            withCredentials:true
        }).then(
            res=>{
                setList(res.data.list)
                console.log(res.data.list)
            }
        )
    }

    /**
     * delete one article by id
     * @param {*} id article id
     */
    const delArticle = (id)=>{
        confirm({
            title: 'Do you really need to delete this one?',
            content: 'If you delete, you cannot put it back later!!',
            onOk() {
                axios(servicePath.delArticle+id,{ withCredentials: true}).then(
                    res=>{ 
                        message.success('Delete Successfully!')
                        getList()
                        }
                    )
            },
            onCancel() {
                message.success('Canceled!')
            },
         });
    
    }

    /**
     * update information of one article
     * @param {*} id article
     */
    const updateArticle = (id)=>{

        props.history.push('/index/add/'+id)
    
    }


    return (
        <div>
            <List
                header={
                    <Row className="list-div">
                        <Col span={8}>
                            <b>Title</b>
                        </Col>
                        <Col span={4}>
                            <b>Type</b>
                        </Col>
                        <Col span={4}>
                            <b>Date</b>
                        </Col>
                        <Col span={4}>
                            <b>Viewer count</b>
                        </Col>
                        <Col span={4}>
                            <b>Manipulate</b>
                        </Col>
                    </Row>

                }
                dataSource={list}
                renderItem={item => (
                    <List.Item>
                        <Row className="list-div">
                            <Col span={8}>
                                {item.title}
                            </Col>
                            <Col span={4}>
                             {item.typeName}
                            </Col>
                            <Col span={4}>
                                {item.addTime}
                            </Col>
                            <Col span={4}>
                              {item.view_count}
                            </Col>

                            <Col span={4}>
                              <Button type="primary" onClick={()=>{updateArticle(item.id)}}>Update</Button>&nbsp;

                              <Button onClick={()=>{delArticle(item.id)}}>Delete </Button>
                            </Col>
                        </Row>

                    </List.Item>
                )}
            />

        </div>
    )

}

export default ArticleList