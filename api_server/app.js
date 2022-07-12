//导入exprss框架
const express = require('express')
const joi = require('joi')

//实例化服务器对象
const app = express()

//配置跨域cors
const cors = require("cors")
app.use(cors())

//配置解析表单中间件;只能解析`application/x-www-form-urlencoded` 格式的表单数据的中间件
app.use(express.urlencoded({
    extended: false
}))


//封装res.cc函数
app.use((req, res, next) => {
    res.cc = function (err, status = 1) {
        res.send({
            //status默认为1，标识失败
            status,
            message: err instanceof Error ? err.message : err,
        })
    }
    next()
})

//配置解析Token的中间件
const expressJWT = require('express-jwt')
const config = require('./config')
app.use(expressJWT({
    secret: config.jwtSecretKey
}).unless({
    path: [/^\/api/]
}))
//导入用户路由
const userRouter = require('./router/user')
const {
    patch
} = require('./router/user')
app.use('/api', userRouter)
//导入用户信息路由
const userinfoRouter = require('./router/userInfo')
app.use('/my', userinfoRouter)
//导入文章分类
const artCateRouter = require('./router/artcate')
app.use('/my/article', artCateRouter)

const articleRouter = require('./router/article')
app.use('/my/article', articleRouter)
//定义错误级别的中间件
app.use((err, req, res, next) => {
    if (err instanceof joi.ValidationError) res.cc(err)
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
    //未知错误
    res.cc(err)
})
//启动服务器
app.listen(3007, () => {
    console.log('api server running at http://127.0.0.1:3007');
})