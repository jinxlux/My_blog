'use strict';

/**
 * the script is for getting data from database
 */

const Controller = require('egg').Controller;

class HomeController extends Controller {
  
  async index() {
    this.ctx.body = 'hello';
  }

  /**
   * get list of articles from sql (for list page)
   */
  async getArticleList(){

    let sql = 'SELECT article.id as id,'+
              'article.title as title,'+
              'article.introduce as introduce,'+
              "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime,"+
              'article.view_count as view_count ,'+
              'type.typeName as typeName '+
              'FROM article LEFT JOIN type ON article.type_id = type.id'
 
     const results = await this.app.mysql.query(sql)
 
     this.ctx.body={data:results}
  }

  /**
   * get one specific article by id from sql (for detail page)
   */
  async getArticleById(){
    let id = this.ctx.params.id

    let sql = 'SELECT article.id as id,'+
    'article.title as title,'+
    'article.introduce as introduce,'+
    'article.article_content as article_content,'+
    "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime,"+
    'article.view_count as view_count ,'+
    'type.typeName as typeName ,'+
    'type.id as typeId '+
    'FROM article LEFT JOIN type ON article.type_id = type.id '+
    'WHERE article.id='+id

    const result = await this.app.mysql.query(sql)
    this.ctx.body={data:result}
  }

    /**
   * change of one article
   */
  async changeArticle(){
    let req= this.ctx.request.body
    const result = await this.app.mysql.update('article', req);
    const updateSuccess = result.affectedRows === 1;
    this.ctx.body={
        isScuccess:updateSuccess
    }
  }

  /**
   * get type name & type num
   */
  async getTypeInfo(){
    const result = await this.app.mysql.select('type')
    this.ctx.body = {data:result}
  }


  //get list of articles by type id
  async getListById(){
    let id = this.ctx.params.id
    let sql = 'SELECT article.id as id,'+
    'article.title as title,'+
    'article.introduce as introduce,'+
    "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime,"+
    'article.view_count as view_count ,'+
    'type.typeName as typeName '+
    'FROM article LEFT JOIN type ON article.type_id = type.id '+
    'WHERE type_id='+id
    const result = await this.app.mysql.query(sql)
    this.ctx.body={data:result}
  }

}

module.exports = HomeController;

