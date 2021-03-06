let apiURL = 'http://127.0.0.1:7001/admin/'
let servicePath = {
    checkLogin:apiURL+'checkLogin',//检查用户名和密码

    getTypeInfo:apiURL+'getTypeInfo',//获得文章类别信息

    addArticle:apiURL+'addArticle',//增加文章内容
    
    updateArticle:apiURL+'updateArticle',//修改文章

    getArticleList:apiURL+'getArticleList',//后台展示文章列表
    
    delArticle:apiURL + 'delArticle/' ,  //  删除文章

    getArticleById:apiURL + 'getArticleById/' ,  // 更具id获得文章




}
export default servicePath;