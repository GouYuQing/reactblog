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