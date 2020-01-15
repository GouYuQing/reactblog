import React,{useState,useEffect} from 'react';
import marked from 'marked';
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';

import '../static/css/AddArticle.css';

import {Row,Col,Input,Select,Button,DatePicker,message} from 'antd';

import axios from 'axios';
import servicePath from '../config/apiURL';
import Item from 'antd/lib/list/Item';

const {Option} = Select;
const {TextArea} = Input;

function AddArticle(props){
    const [articleId,setArticleId] = useState(0); 
    const [articleTitle,setArticleTitle] = useState('');   
    const [articleContent , setArticleContent] = useState('');
    const [markdownContent, setMarkdownContent] = useState('预览内容');
    const [introducemd,setIntroducemd] = useState();
    const [introducehtml,setIntroducehtml] = useState('等待编辑');
    const [showDate,setShowDate] = useState();
    const [updateDate,setUpdateDate] = useState();
    const [typeInfo ,setTypeInfo] = useState([]);
    const [selectedType,setSelectType] = useState('请选择');
    useEffect(()=>{
    getTypeInfo()
    },[]);
    // const renderer = new marked.Renderer();
    marked.setOptions({
        renderer:new marked.Renderer(),
        gfm:true,
        pedantic:false,
        sanitize:false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
        highlight: function (code) {//代码高亮显示规则
            return hljs.highlightAuto(code).value;
    }
    });
    const changeContent=(e)=>{
        setArticleContent(e.target.value);
        let html=marked(e.target.value);
        setMarkdownContent(html);
    }
    const changeIntroduce=(e)=>{
        setIntroducemd(e.target.value);
        let html = marked(e.target.value);
        setIntroducehtml(html);
    }
    const getTypeInfo=()=>{
        axios({
            method:'get',
            url:servicePath.getTypeInfo,
            header:{'Access-Control-Allow-Origin':'*'},
            withCredentials:true
        }).then(
            res=>{
                if(res.data.data=="没有登录"){
                    localStorage.removeItem('openId');
                    props.history.push('/login');
                }else{
                    setTypeInfo(res.data.data);
                }
            }
        )
    };
    const selectTypeHandler=(value)=>{
        setSelectType(value)
    };
   //保存文章的方法
const saveArticle =()=>{
  
     if(!articleTitle){
        message.error('文章名称不能为空')
        return false
    }else if(!selectedType){
        message.error('选择类型不能为空')
        console.log(selectedType)
        return false
    }else if(!articleContent){
        message.error('文章内容不能为空')
        return false
    }else if(!introducemd){
        message.error('简介不能为空')
        return false
    }else if(!showDate){
        message.error('发布日期不能为空')
        return false
    }

    let dataProps={}   //传递到接口的参数
    dataProps.title = articleTitle
    dataProps.type_id = selectedType 
    dataProps.article_content =articleContent
    dataProps.introduce =introducemd
    let datetext= showDate.replace('-','/') //把字符串转换成时间戳
    dataProps.addTime =(new Date(datetext).getTime())/1000
    if(articleId==0){
        dataProps.id = articleId
        dataProps.view_count = 0;
        axios({
            method:'post',
            url:servicePath.addArticle,
            data:dataProps,
            header:{'Access-Control-Allow-Origin':'*'},
            withCredentials:true
        }).then(
            res=>{
                // console.log('测试')
                setArticleId(res.data.insertId)
                if(res.data.isSuccess){
                    message.success('文章添加成功')
                }else{
                    message.error('文章添加失败');
                }

            }
        )
    }else{
        dataProps.id = articleId
        axios({
            method:'post',
            url:servicePath.updateArticle,
            data:dataProps,
            withCredentials:true
        }).then(res=>{
            if(res.data.isSuccess){
                message.success('文章修改成功')
            }else{
                message.error('文章修改失败')

            }
        })
    }
 } 
    return(
        <div>
            <Row gutter={5}>
                <Col span={18}>
                    <Row gutter={10}>
                        <Col span={16}>
                            <Input  
                            value={articleTitle} 
                            placeholder="请输入标题" 
                            size="large" 
                            onChange={e=>{setArticleTitle(e.target.value)}}/>
                        </Col>
                        <Col span={4}>
                          <Select defaultValue={selectedType} size='large' onChange={selectTypeHandler}>
                              {
                                  typeInfo.map((item,index)=>{
                                  return (<Option key={index} value={item.id}>{item.typeName}</Option>)
                                  })
                              }
                          </Select>
                        </Col>

                    </Row>
                    <br/>
            <Row gutter={10}>
                <Col span={12}>
                    <TextArea 
                        className="markdown-content" 
                        rows={35}  
                        placeholder="请输入文章内容"
                        onChange={changeContent}
                        />
                </Col>
                <Col span={12}>
                    <div className="show-html" dangerouslySetInnerHTML={{__html:markdownContent}}>
                    </div>
                </Col>
            </Row>
                </Col>
                <Col span={6}>
                    <Row>
                        <Col span={12}>
                            <Button size="large">暂存文章</Button>
                            </Col>
                            <Col span={12}>
                            <Button size="large" type="primary" onClick={saveArticle}>发布文章</Button>
                            </Col>                       
                        <Col span={24}>
                            <br/>
                            <TextArea
                                rows={4}
                                placeholder="请输入文章简介"
                                onChange={changeIntroduce}
                            ></TextArea>
                            <br/><br/>
                            <div className="introduce-html" dangerouslySetInnerHTML={{__html:introducehtml}}></div>
                        </Col>
                        <Col span={12}>
                            <div className="date-select"> 
                            <DatePicker
                                onChange={(date,dateString)=>setShowDate(dateString)}
                                placeholder="发布日期"
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