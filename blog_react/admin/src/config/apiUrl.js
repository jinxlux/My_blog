let ipUrl = 'http://localhost:7001/admin/'

let servicePath = {
    checkLogin : ipUrl+'checkLogin', //check username and password (post)
    getTypeInfo : ipUrl+'getTypeInfo', //check types info of articles
    addArticle:ipUrl + 'addArticle' ,  //add article (post)
    updateArticle:ipUrl + 'updateArticle', //update article (post)
    getArticleList:ipUrl + 'getArticleList' ,  //  get articles
    delArticle:ipUrl + 'delArticle/', //delete one article
    getArticleById:ipUrl + 'getArticleById/',
}

export default servicePath