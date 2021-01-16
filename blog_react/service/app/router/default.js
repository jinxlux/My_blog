/*
frontground router
**/

module.exports = app =>{
  const {router,controller} = app
  router.get('/default/index',controller.default.home.index) //home page
  router.get('/default/getArticleList',controller.default.home.getArticleList) // get list of all articles
  router.get('/default/getArticleById/:id',controller.default.home.getArticleById) // get specific article
  router.get('/default/getTypeInfo',controller.default.home.getTypeInfo) // get information of types (not used for now)
  router.get('/default/getListById/:id',controller.default.home.getListById) // get article of a specific type by type id
  router.post('/default/changeArticle',controller.default.home.changeArticle) 
}