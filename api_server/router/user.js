const express = require('express')
//创建路由
const router = express.Router()

//导入路由处理函数
const user_Handler = require('../router_handler/user')

//1、导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
//2、导入需要的验证规则对象
const {
    reg_login_schema
} = require('../schema/user')


//注册用户路由
// router.post('/reguser', expressJoi(reg_login_schema), user_Handler.regUser)
router.post('/reguser', expressJoi(reg_login_schema), user_Handler.reguser)
//登录路由
router.post('/login', expressJoi(reg_login_schema), user_Handler.login)

module.exports = router