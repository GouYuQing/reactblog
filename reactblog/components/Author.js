import {Avatar,Divider} from "antd"
import '../static/style/components/author.css'

const Author=()=>{
    return(
        <div className="author-div comm-box">
            <div><Avatar size={100} src="../static/images/author.jpg"/></div>
            <div className="author-introduction">
                学习呀！加油呀！卑微小苟在线学习，想写一个好一点点的东西，嘻嘻嘻
                <Divider>关注我的</Divider>
                <Avatar size={28} icon="github" className="account"/>
                <Avatar size={28} icon="qq" className="account"/>
                <Avatar size={28} icon="wechat" className="account"/>  
            </div>
        </div>
    )
}
export default Author