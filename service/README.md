# service



## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org

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