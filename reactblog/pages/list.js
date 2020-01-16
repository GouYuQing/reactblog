import React,{useState,useEffect} from 'react'
import Head from 'next/head'
import {Row,Col,List,Icon,Breadcrumb} from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import axios from 'axios'
import  servicePath  from '../config/apiURL'
import Link from 'next/link'

import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'


const MyList = (list) => {
  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    sanitize:false,
    xhtml: false,
    highlight: function (code) {
            return hljs.highlightAuto(code).value;
    }

  }); 
  const [mylist,setMylist]=useState(list.data);
  // setMylist(list.data);
  
  return(
  <div>
    <Head>
      <title>Home</title>
    </Head>
    <Header/>
    <Row className="comm-main" type="flex" justify="center">
    <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
    <div className="bread-div">
      <Breadcrumb>
        <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
        <Breadcrumb.Item>文章内容</Breadcrumb.Item>
      </Breadcrumb>
    </div>
    <List 
      header={<div>最新文章</div>}
      itemLayout="vertical"
      dataSource={mylist}
      renderItem={item=>(
        <List.Item>
          <div className="list-title">
          <Link href={{pathname:'/detailed',query:{id:item.id}}}>
            <a>{item.title}</a>
          </Link>
          </div>
          <div className="list-icon">
            <span><Icon type="calendar"/> {item.addTime} </span>
            <span><Icon tfooter-divype="folder"/> {item.typeName} </span>
            <span><Icon type="fire"/> {item.view_count}人 </span>
          </div>
          <div className="list-context" dangerouslySetInnerHTML={{__html:marked(item.introduce)}}></div>
        </List.Item>
      )}
    />
    </Col>
    <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
      <Author></Author>
      <Advert></Advert>
    </Col>
  </Row>
  <Footer></Footer>
  </div>
)
}
MyList.getInitialProps = async (context)=>{
  const id = context.query.id;
  const promise = new Promise((resolve)=>{
    axios(servicePath.getListById+id).then(
      (res)=>{
        // console.log('远程根据文章id获得获取数据结果:',res.data.data)
        resolve(res.data);
      }
    )
  })
  return await promise
}
export default MyList
