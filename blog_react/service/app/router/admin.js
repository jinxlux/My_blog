/*
background router
**/

module.exports = app =>{
    const {router,controller} = app
    var adminauth = app.middleware.adminauth()
    router.get('/admin/index' ,controller.admin.min.index) //home page
    router.get('/admin/getTypeInfo',adminauth ,controller.admin.min.getTypeInfo) // get all types
    router.post('/admin/checkLogin' ,controller.admin.min.checkLogin) //log in; use post for better security
    router.post('/admin/addArticle',adminauth,controller.admin.min.addArticle) // add article
    router.post('/admin/updateArticle',adminauth,controller.admin.min.updateArticle) // update article
    router.get('/admin/getArticleList',adminauth,controller.admin.min.getArticleList)// get all article
    router.get('/admin/delArticle/:id',adminauth,controller.admin.min.delArticle)//delete one article by id
    router.get('/admin/getArticleById/:id',adminauth,controller.admin.min.getArticleById) //get one article by id




}