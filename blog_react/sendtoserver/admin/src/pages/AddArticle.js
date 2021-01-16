import React,{useState, useEffect} from 'react';
import marked from 'marked'
import '../static/css/AddArticle.css'
import { Row, Col ,Input, Select ,Button ,DatePicker, message} from 'antd'
import axios from "axios"
import servicePath from '../config/apiUrl'

const { Option } = Select
const { TextArea } = Input


function AddArticle(props){
    const [articleId,setArticleId] = useState(0)  // 0-new article;  otherwise, updated article
    const [articleTitle,setArticleTitle] = useState('')   //title
    const [articleContent , setArticleContent] = useState('')  //markdown content
    const [markdownContent, setMarkdownContent] = useState('Preview') //html content
    const [introducemd,setIntroducemd] = useState()            //intro markdown content
    const [introducehtml,setIntroducehtml] = useState('Preview') //intro html content
    const [showDate,setShowDate] = useState()   //published date
    const [updateDate,setUpdateDate] = useState() //changed date
    const [typeInfo ,setTypeInfo] = useState([]) // all type info
    const [selectedType,setSelectType] = useState(1) //selected type

    useEffect(()=>{
        getTypeInfo()
        let tmpId = props.match.params.id
        if(tmpId){
            setArticleId(tmpId)
            getArticleById(tmpId)
        } 
    },[])


    marked.setOptions({
        renderer: marked.Renderer(),
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
      });
    
    /**
     * show the markdown rendering of content entering
     */
    const changeContent = (e)=>{
        setArticleContent(e.target.value)
        let html=marked(e.target.value)
        setMarkdownContent(html)
    }

     /**
     * show the markdown rendering of introduce entering
     */
    const changeIntroduce = (e)=>{
        setIntroducemd(e.target.value)
        let html=marked(e.target.value)
        setIntroducehtml(html)
     }

     /**
      * get all types of articles have
      */
    const getTypeInfo =()=>{

        axios({
            method:'get',
            url:servicePath.getTypeInfo,
            header:{ 'Access-Control-Allow-Origin':'*' },
            withCredentials: true
        }).then(
           res=>{
               if(res.data.data=="noLog"){
                 localStorage.removeItem('openId')
                 props.history.push('/login')  
               }else{
                setTypeInfo(res.data.data)
               }

            }
        )
    }

    /**
     * active when a type select
     */
    const selectTypeHandler =(value)=>{
        setSelectType(value)
    }

    /**
     * save article to server
     */
    const publishArticle = ()=>{
        if(!selectedType){
            message.error('Must have a type')
            return false
        }else if(!articleTitle){
            message.error('Must have a title')
            return false
        }else if(!articleContent){
            message.error('No content')
            return false
        }else if(!introducemd){
            message.error('No intro')
            return false
        }else if(!showDate){
            message.error('No date')
            return false
        }
        let dataProps={}   //data in request body send to datanase
        dataProps.type_id = selectedType 
        dataProps.title = articleTitle
        dataProps.article_content =articleContent
        dataProps.introduce =introducemd
        let datetext= showDate.replace('-','/')
        dataProps.addTime =(new Date(datetext).getTime())/1000


        if(articleId==0){
            console.log('articleId=:'+articleId)
            dataProps.view_count = 0
            axios({
                method:'post',
                url:servicePath.addArticle,
                data:dataProps,
                withCredentials: true
            }).then(
                res=>{
                    setArticleId(res.data.insertId)
                    if(res.data.isScuccess){
                        message.success('Upload Successfully!')
                    }else{
                        message.error('Error!');
                    }

                }
            )
        }
        else{
            dataProps.id = articleId 
            axios({
                method:'post', // update-better; post for easy orgainze
                url:servicePath.updateArticle,
                header:{ 'Access-Control-Allow-Origin':'*' },
                data:dataProps,
                withCredentials: true
            }).then(
                res=>{
                    if(res.data.isScuccess){
                        message.success('Update Successfully!')
                    }else{
                        message.error('Error');
                    }
                }
            )
        }
    }

    const getArticleById = (id)=>{
        axios(servicePath.getArticleById+id,{ 
            withCredentials: true,
            header:{ 'Access-Control-Allow-Origin':'*' }
        }).then(
            res=>{
                setArticleTitle(res.data.data[0].title)
                setArticleContent(res.data.data[0].article_content)
                let html=marked(res.data.data[0].article_content)
                setMarkdownContent(html)
                setIntroducemd(res.data.data[0].introduce)
                let tmpInt = marked(res.data.data[0].introduce)
                setIntroducehtml(tmpInt)
                setShowDate(res.data.data[0].addTime)
                setSelectType(res.data.data[0].typeId)
            }
        )
    } 

    return (
        <div>
            <Row gutter={15}>
                {/* left */}
                <Col span={18}>
                        <Row gutter={[15,15]} >
                            <Col span={20}>
                                <Input 
                                    value={articleTitle}
                                    placeholder="Title" 
                                    onChange={e=>{
                                        setArticleTitle(e.target.value)
                                    }}
                                    size="large" />
                            </Col>
                            <Col span={4}>
                                {/* &nbsp; */}
                                <Select defaultValue={selectedType} size="large" onChange={selectTypeHandler}>
                                    {
                                        typeInfo.map((item,index)=>{
                                            return (<Option key={index} value={item.id}>{item.typeName}</Option>)
                                        })
                                    }
                                </Select>
                            </Col>
                        </Row>
                        
                        <Row gutter={[10,10]} >
                            {/* place for writing content */}
                            <Col span={12}>
                                <TextArea 
                                    value={articleContent} 
                                    className="markdown-content" 
                                    rows={35}  
                                    placeholder="Content"
                                    onChange={changeContent}
                                    onPressEnter={changeContent}
                                    />
                            </Col>
                            {/* place for showing converted content */}
                            <Col span={12}>
                                <div 
                                    className="show-html"
                                    dangerouslySetInnerHTML = {{__html:markdownContent}} >
                                </div>

                            </Col>
                        </Row>  

                </Col>
                {/* right */}
                <Col span={6}>
                    <Row gutter={[68,15]}>
                        <Col span={10}>
                        {/* <Button  size="large">Save</Button> */}
                        </Col>
                        <Col span={6}>
                        <Button  type="primary" size="large" onClick={publishArticle}>Published</Button>
                        </Col>
                        <Col span={24}>
                            <TextArea 
                                rows={4} 
                                value={introducemd}  
                                onChange={changeIntroduce} 
                                onPressEnter={changeIntroduce}
                                placeholder="Introduce"
                            />
                            <br/><br/>
                            <div    className="introduce-html"
                                    dangerouslySetInnerHTML = {{__html:'intro：'+introducehtml}}>
                            </div>
                        </Col>
                        <Col span={24}>
                            <div className="date-select">
                                <DatePicker
                                    onChange={(date,dateString)=>setShowDate(dateString)}
                                    placeholder="Date"
                                    size="large"  
                                />
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}
export default AddArticle

