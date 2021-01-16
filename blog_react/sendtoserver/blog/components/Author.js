import {Avatar, Divider, Image} from 'antd'
import '../static/style/components/author.css'
import {GithubOutlined, LinkedinOutlined, UserOutlined} from '@ant-design/icons';

/*
incude profile/follow webs/personal info
**/
const Author = () => {
    return (
        <div className = "author-div comm-box">
            <div> <Avatar size={100} src={<Image src="https://media-exp1.licdn.com/dms/image/C5603AQEVeLWVR9rglA/profile-displayphoto-shrink_400_400/0/1579552714021?e=1616025600&v=beta&t=Pwi2pCFrQ0aGI6nPPn4pmKZ0ohOxER9n3tSpUNKtDq8"/>}/></div>
            <div className="author-intro">
                Computer Science and ISD Student
                <Divider>Follow</Divider>
                <a href='https://github.com/jinxlux'><Avatar size={28} icon={<GithubOutlined />} className="account"/></a>
                <a href='https://www.linkedin.com/in/xudong-li-01b84719b/'><Avatar size={28} icon={<LinkedinOutlined />}  className="account" /></a>
                <a href='https://jinxlux.github.io/'><Avatar size={28} icon={<UserOutlined />}  className="account" /></a>
            </div>
        </div>
    )
}

export default Author