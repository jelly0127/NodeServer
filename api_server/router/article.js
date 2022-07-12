// 文章的路由模块

const express = require('express')
const router = express.Router()

// 导入需要的处理函数模块
const article_handler = require('../router_handler/article')

// 导入 multer 和 path
const multer = require('multer')
const path = require('path')

// 创建 multer 的实例
const uploads = multer({
    dest: path.join(__dirname, '../uploads')
})
// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入需要的验证规则对象
const {
    add_article_schema,
    delete_article_schema,
    update_article_schema
} = require('../schema/article')

// 发布文章的路由
router.post('/add', uploads.single('cover_img'), expressJoi(add_article_schema), article_handler.addArticle)
//获取文章数据的路由
router.get('/getarticles', article_handler.getArticles)

//删除文章 
router.post('/deletearticles', expressJoi(delete_article_schema), article_handler.deleteArticles)
//更新文章
router.post('/updatearticles', expressJoi(update_article_schema), article_handler.updateArticles)
module.exports = router