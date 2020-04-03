This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

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
