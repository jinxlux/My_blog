import React , {useState} from 'react';
import 'antd/dist/antd.css';
import { Card, Input, Button, Spin, message } from 'antd';
import { LoginOutlined, KeyOutlined} from '@ant-design/icons';
import '../static/css/Login.css';
import axios from 'axios';
import servicePath from '../config/apiUrl';

function Login(props){

    const [userName , setUserName] = useState('')
    const [password , setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const checkLogin=()=>{
        setIsLoading(true);
        if(!userName){
            message.error("User name cannot be empty")
            setTimeout(()=>{
                setIsLoading(false)
            },500)
            return false
        }else if(!password){
            message.error("password cannot be empty")
            setTimeout(()=>{
                setIsLoading(false)
            },500)
            return false
        }
        let userSet = {
            'userName':userName,
            'password':password
        }

        axios({
            method:'post',
            url:servicePath.checkLogin,
            data:userSet,
            withCredentials: true,
        }).then(
           res=>{
                setIsLoading(false)
                if(res.data.data=='successful'){
                    localStorage.setItem('openId',res.data.openId)
                    props.history.push('/index')
                }else{
                    message.error('Fail: Check password or user name')
                }
           }
        )

        setTimeout(()=>{
            setIsLoading(false)
        },1000)
    }

    return (
        <div className="login-div">
            <Spin tip="Loading..." spinning={isLoading}>
                <Card className="login-card" title="Xudong's Blog Background System" bordered={true} style={{width:400}}>
                    <Input
                        id="userName"
                        size="large"
                        placeholder="UserName:"
                        prefix={<LoginOutlined />}
                        onChange={(e)=>{setUserName(e.target.value)}}
                    />
                    <br/><br/>
                    <Input.Password
                        id="password"
                        size="large"
                        placeholder="Password:"
                        prefix={<KeyOutlined />}
                        onChange={(e)=>{setPassword(e.target.value)}}
                    />
                </Card>
                <br/>
                <Button className="login-button" type="primary" size="large" block onClick={checkLogin} > Login in </Button>
            </Spin>
        </div>
    )
}
export default Login