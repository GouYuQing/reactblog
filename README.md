#### `learn to use react`

##### 开发环境搭建

npx create-next-app blog

让next支持CSS文件

```
yarn add @zeit/next-css
新建next.config.js配置文件
const withCss = require('@zeit/next-css')

if(typeof require !== 'undefined'){
    require.extensions['.css']=file=>{}
}

module.exports = withCss({})
```

按需加载Ant Design

```
yarn add antd 
yarn add babel-plugin-import
新建.babelrc配置文件
{
    "presets":["next/babel"],  //Next.js的总配置文件，相当于继承了它本身的所有配置
    "plugins":[     //增加新的插件，这个插件就是让antd可以按需引入，包括CSS
        [
            "import",
            {
                "libraryName":"antd"
            }
        ]
    ]
}
```

查看是否可以使用插件
##### 单独的网页头部

#### 网页首页制作

1. 首页主体分为左右两边

然后分为列表和详情展示，都是一样的结构

2. 使用List组件制作列表（List）

问题：菜单组件里面图标不显示的问题？？暂留

3. 右侧列表

自我介绍（作为一个单独的组件来写，因为其他页面也需要）

使用分割线组件和头像的组件分开

做一些其他的（加了四张图片在介绍下面，内容多一些，后期可替换）
![image-20191222214606415](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20191222214606415.png)
#### list展示页面和首页一样的结构

```js
import React,{useState} from 'react'
import Head from 'next/head'
import {Row, Col , List ,Icon ,Breadcrumb  } from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import '../static/style/pages/list.css'
```

#### 详情页制作

和首页结构差不多，直接引用组件，使用markdown做文章详情页

引入react-markdown

```js
import ReactMarkdown from 'react-markdown'
```

```jsx
<div className="detailed-content" >
    <ReactMarkdown 
      source={markdown} //来源
      escapeHtml={false}  //是否默认HTML转换，默认false
    />
</div>
```
![image-20191222214506677](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20191222214506677.png)
使用markdown-navbar：作为markdown的导航

安装

```
yarn add markdown-navbar
```

引入

```js
import MarkNav from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';//必须引入CSS样式
```

```js
//使用
<div className="detailed-nav comm-box">
  <div className="nav-title">文章目录</div>
  <MarkNav
    className="article-menu"//为导航定义一个class名称，从而定义css样式
    source={markdown}//markdown来源
	headingTopOffset={0}//锚点到页面顶部的距离，默认是0
    ordered={true}//显示数字编码，默认显示true
  />
</div>
```

固钉的使用Affix：让导航固定住

引入`import {Row, Col ,Affix, Icon ,Breadcrumb  } from 'antd'`

使用 `<Affix>内容</Affix>`
![image-20191222214524548](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20191222214524548.png)
#### 中间接口平台环境搭建

全局安装`egg.js`的脚手架工具`egg-init`：

```
npm i egg-init -g
```

```
egg-init --type=simple
```

使用命令安装egg项目所需要的所有依赖包。

```
npm install
```

安装完成后，就可以启动服务查看一下结果了。

```
npm run dev
```

egg目录结构和约定规范学习

config：配置文件，logs：日志文件，run：运行时配置文件 

app{controller:控制层，public:共用资源，router.js:项目的路由配置文件，service：业务逻辑层，extend：模板的扩展方法，middleware：中间件view:模板文件夹}

#### RESTful规则，egg为前端提供API接口

简单约束性,如下

请求方式 get（请求资源） post （新建资源）put（更新资源） delete（删除资源）

进行路由配置和接口配置，前端后端的接口和路由，在admin（后台），default（前台）

连接egg-mysql数据库

```
yarn add egg-mysql
```

进行插件配置plugin.js和config.default.js

创建react_blog数据库，创建type数据表（文章类型表）和article数据表（文章内容表）
写数据接口

使用axios从接口获取数据写入页面

#### 解决egg.js跨越问题（前台是3000，后台是7001）

安装egg-cors

```js
yarn add egg-cors
```

对`/service/config/plugin.js`文件进行修改

```json
exports.cors: {
    enable: true,
    package: 'egg-cors'
}
```

配置`/service/config/config.default.js`文件

```json
//　允许所有的域名和请求方法跨域访问
config.security = {
　　　　csrf: {
　　　　　　enable: false
　　　　},
　　　　domainWhiteList: [ '*' ]
　　};
 config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
};
//如果只要3000进行访问
 config.security = {
　　　　csrf: {enable: false},
　　　　domainWhiteList: [ '*' ]
　　};
  config.cors = {
    origin: 'http://localhost:3000', //只允许这个域进行访问接口
    credentials: true,   // 开启认证
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'//哪些方法跨域进行访问
    };
```

#### 前端页面不使用markdown，使用marked+highlight

安装

```js
yarn add marked
yarn add highlight.js
```

引入模块

```js
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
```

引入设置一下`marked.setOptions`

```js
const renderer = new marked.Renderer();
marked.setOptions({
    renderer: renderer, //自定义的Renderer渲染出自定义的格式
    gfm: true,//是否启动github样式的markdown
    pedantic: false,//是否容错
    sanitize: false,//是否忽略HTML标签
    tables: true,//是否支持github的表格形式
    breaks: false,//是否支持github的换行
    smartLists: true,//优化输出，设置为true样式会变好看
    smartypants: false,
    highlight: function (code) {//代码高亮显示规则
            return hljs.highlightAuto(code).value;
    }
  }); 

    let html = marked(props.article_content) 
```

实现文章导航

使用tocify.tsx实现导航,需要有Ant Design UI库和loadsh模块

引入

```js
import Tocify from '../components/tocify.tsx'
```

引入后，需要对`marked`的渲染进行自定义，这时候需要设置`renderer.heading`，就是写一个方法们重新定义对`#`这种标签的解析。代码如下：

```js
const tocify = new Tocify()
renderer.heading = function(text, level, raw) {
      const anchor = tocify.add(text, level);
      return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
    };
```

最后在需要显示文章导航的地方，写下面的代码:
```<div className="toc-list">
  {tocify && tocify.render()}
</div>
```
#### 后台开始搭建

脚手架生成项目 admin

```
create-react-app admin
```

-------

引入Ant Design UI

```
yarn add antd
```

页面路由配置

```
yarn add react-router-dom
```

使用路由，格式如下

```js
import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Login from './Login'
function Main(){
    return (
        <Router>      
            <Route path="/login/" exact component={Login} />
        </Router>
    )
}
export default Main
```

登录页面编写，保存变量和方法

```js
const [userName , setUserName] = useState('')
const [password , setPassword] = useState('')
const [isLoading, setIsLoading] = useState(false)
```

```js
const checkLogin = ()=>{//转圈圈UI变化实现
        setIsLoading(true)
        setTimeout(()=>{
            setIsLoading(false)
        },1000)
    }
```

后台首页页面搭建

为后台配置路由，

```js
<Router>      
            <Route path="/login/" exact component={Login} />
            <Route path="/index/" exact component={AdminIndex} />
        </Router>
```

```js
<Col span={12}>
    <div className="date-select">//一个时间的UI
        <DatePicker
            placeholder="发布日期"
            size="large"  
        />
      </div>
</Col>
```

后台使用markdown，和原先的导入安装方式一样的

设置marked

一个实时预览的方法如下

```js
const changeContent = (e)=>{
       setArticleContent(e.target.value)//设置文章内容是输入的内容
       let html=marked(e.target.value)//将文章内容转换为markdown形式
       setMarkdownContent(html)//将展示内容换成markdown形式的 文章内容
   }
```

编写登录接口

进行中台路由配置

实现登录操作

进行路由守卫（防止输入地址直接进入）

`/service/app/`文件夹下面，建立一个`mindleware`文件夹，然后在文件夹下面建立一个`adminauth.js`文件。

```js
module.exports = options =>{
    return async function adminauth(ctx,next){
        console.log(ctx.session.openId)
        if(ctx.session.openId){
            await next()
        }else{
            ctx.body={data:'没有登录'}
        }
    }
}
```

前后端分离共享session方法：`/config/config.default.js`里增加`credentials:true`就可以了。

使用中间件路由守卫

```js
 var adminauth = app.middleware.adminauth()
```
#### CRUD

得到文章信息的方法：getTypeInfo（） //从中台得到文章类别信息

保存文章的方法：saveArticle（）

添加文章的方法：addArticle()

修改文章的方法：updateArticle（）

得到文章列表展示页面：ArticleList

得到文章列表的方法：getArticleList（）

删除文章的方法：delArticle()

写增删查的方法：先去中台编写方法，然后写路由，然后在后台得到数据并进行操作

#### 部署到服务器

使用PM2守护，在Linux中安装node，npm，pm2

进入前端文件夹

```shell
pm2 start npm -- run start//启动
```

中台启动

```shell
npm run start
```

后台启动

先打包成静态页面`npm run build`

然后放到服务器中
