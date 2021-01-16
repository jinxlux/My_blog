'use strict';

const Controller = require('egg').Controller

class MainController extends Controller{

    async index(){
        this.ctx.body='hello'
    }

    /**
     * check login of background system
     */
    async checkLogin(){
        let userName = this.ctx.request.body.userName
        let password = this.ctx.request.body.password
        const sql = " SELECT userName FROM admin_user WHERE userName = '"+userName +
                    "' AND password = '"+password+"'"
  
        const res = await this.app.mysql.query(sql)
        if(res.length>0){
            let openId=new Date().getTime()
            this.ctx.session.openId={ 'openId':openId } //session cache 
            this.ctx.body={data:'successful','openId':openId}  
        }else{
            this.ctx.body={data:'fail'}
        } 
    }

    /**
     * type info for background
     */
    async getTypeInfo(){
        const resType = await this.app.mysql.select('type')
        this.ctx.body={data:resType}
    }

    /**
     * add an article to database
     */
    async addArticle(){

        let tmpArticle= this.ctx.request.body
        // tmpArticle.
        const result = await this.app.mysql.insert('article',tmpArticle)
        const insertSuccess = result.affectedRows === 1
        const insertId = result.insertId
    
        this.ctx.body={
            isScuccess:insertSuccess,
            insertId:insertId
        }
    }

    /**
     * update information of one article
     */
    async updateArticle(){
        let tmpArticle= this.ctx.request.body
    
        const result = await this.app.mysql.update('article', tmpArticle);
        const updateSuccess = result.affectedRows === 1;
        this.ctx.body={
            isScuccess:updateSuccess
        }
    } 

    /**
     * get list of articles
     */
    async getArticleList(){

        let sql = 'SELECT article.id as id,'+
                    'article.title as title,'+
                    'article.introduce as introduce,'+
                    "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime,"+
                    'article.view_count as view_count ,'+
                    'type.typeName as typeName '+
                    'FROM article LEFT JOIN type ON article.type_id = type.id '+
                    'ORDER BY article.id DESC '
    
            const resList = await this.app.mysql.query(sql)
            this.ctx.body={list:resList}
    
    }

    /**
     * get specific article
     */
    async getArticleById(){
        let id = this.ctx.params.id
    
        let sql = 'SELECT article.id as id,'+
        'article.title as title,'+
        'article.introduce as introduce,'+
        'article.article_content as article_content,'+
        "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime,"+
        'article.view_count as view_count ,'+
        'type.typeName as typeName ,'+
        'type.id as typeId '+
        'FROM article LEFT JOIN type ON article.type_id = type.id '+
        'WHERE article.id='+id
        const result = await this.app.mysql.query(sql)
        this.ctx.body={data:result}
    }

    /**
     * delete article
     */
    async delArticle(){
        let id = this.ctx.params.id
        const res = await this.app.mysql.delete('article',{'id':id})
        this.ctx.body={data:res}
    }

}

module.exports = MainController