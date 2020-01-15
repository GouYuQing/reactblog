let apiURL = 'http://127.0.0.1:7001/default/'
let servicePath = {
    getArticleList:apiURL+'getArticleList',//首页接口

    getArticleById:apiURL+'getArticleById/',//详细页接口

    getTypeInfo:apiURL+'getTypeInfo',//菜单接口

    getListById:apiURL+'getListById/'//根据类别id获得文章列表
}
export default servicePath;