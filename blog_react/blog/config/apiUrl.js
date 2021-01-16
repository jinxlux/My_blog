let ipUrl = 'http://localhost:7001/default/'

let servicePath = {
    getArticleList : ipUrl+'getArticleList', //server url for homepage
    getArticleById : ipUrl+'getArticleById/', // server url for detail page
    getTypeInfo : ipUrl+'getTypeInfo', // server url for detail page
    getListById:ipUrl + 'getListById/', //get list of articles by type ids
    changeArticle:ipUrl + 'changeArticle', //get list of articles by type ids
}

export default servicePath