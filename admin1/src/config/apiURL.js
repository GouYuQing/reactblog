let apiURL = 'http://127.0.0.1:7002/admin/'
let servicePath = {
    checkLogin:apiURL+'checkLogin',//检查用户名和密码
    getTypeInfo:apiURL+'getTypeInfo',//获得文章类别信息
    addArticle:apiURL+'addArticle',//增加文章内容


}
export default servicePath;