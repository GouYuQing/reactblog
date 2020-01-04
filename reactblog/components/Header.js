import React,{useState,useEffect} from 'react'
import '../static/style/components/header.css'
import {Row,Col,Menu,Icon} from 'antd'
import axios from 'axios'
import servicePath from '../config/apiURL'
import Router from 'next/router'
import Link from 'next/link'

const Header=()=>{
    const [navArray , setNavArray] = useState([])
    useEffect(()=>{

        const fetchData = async ()=>{
           const result= await axios(servicePath.getTypeInfo).then(
                (res)=>{
                    setNavArray(res.data.data);
                    console.log(res)
                    return res.data.data;
                    
                }
              )
           setNavArray(result)
        }
        fetchData()


    },[])
    const handClick = (e)=>{
        console.log(e.key)
        if(e.key==0){
            console.log("测试")
            Router.push('/index');
        }else{
            
            Router.push('/list?id='+e.key)
        }
    }
    return(
    <div className="header">
    <Row type="flex" justify="center">
        <Col xs={24} sm={24} md={10} lg={15} xl={12}>
            <span className="hreader-logo">
            <Link href={{pathname:'/index'}}>
                <a> 晴啊晴</a>
            </Link> </span>
            <span className="header-txt">学习react</span>
        </Col>
        <Col xs={0} sm={0} md={14} lg={8} xl={6}>
            <Menu mode="horizontal" onClick={handClick}>
                <Menu.Item key="0" >
                    <Icon key="home" />
                    首页    
                </Menu.Item>
               {
                   navArray.map((item)=>{
                       return(
                           <Menu.Item key={item.id}  >
                               <Icon type={item.icon}/>
                               {item.typeName}
                           </Menu.Item>
                       )
                   })
               }
            </Menu>
        </Col>
    </Row>
    </div>
)}
export default Header