// 文章的处理函数模块
const path = require('path')
const db = require('../db/index')
const moment = require('moment')
const fs = require("fs");
const {
    baseUrl
} = require('../config')
// 发布文章的处理函数
exports.addArticle = (req, res) => {
    const file = req.file;
    //文件改名保存
    fs.renameSync('uploads/' + file.filename, 'uploads/' + req.user.id + '-' + file.originalname); //这里修改文件名字
    const URL = req.user.id + '-' + req.file.originalname
    console.log(URL);
    // TODO：证明数据都是合法的，可以进行后续业务逻辑的处理
    // 处理文章的信息对象
    const articleInfo = {
        // 标题、内容、发布状态、所属分类的Id
        ...req.body,
        // 文章封面的存放路径
        cover_img: baseUrl + 'uploads/' + URL,
        // cover_img: '',

        // 文章的发布时间
        pub_date: moment().format("YYYY/MM/DD HH:mm:ss"),
        // 文章作者的Id
        author_id: req.user.id,
    }

    const sql = `insert into ev_articles set ?`
    db.query(sql, articleInfo, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('发布新文章失败！')
        res.cc('发布文章成功！', 0)
    })
}
//获取文章数据
exports.getArticles = (req, res) => {
    const page = req.body.pagenum
    const pagesize = req.body.pagesize
    const start = (page - 1) * pagesize
    const sql = `select * from ev_articles where is_delete=0  order by id limit ${start},${pagesize}`
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        if (results.length === 0) return res.cc('暂无数据！')
        let list = results
        const count = `select count(*) as total from ev_articles where is_delete=0`
        db.query(count, (err, resultss) => {
            if (err) return res.cc(err)
            let obj = {
                status: 0,
                message: '获取文章数据成功！',
                pagesize: Number(pagesize),
                pagenum: page,
                total: resultss[0].total,
                data: list
            }
            res.send(obj)

        })
    })

}
//删除id文章数据
exports.deleteArticles = (req, res) => {
    const sql = `select * from ev_articles  where id=? and is_delete=0`
    db.query(sql, req.body.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length === 0) return res.cc('删除失败，没有该条数据！')
        const SQL = `update ev_articles set is_delete=1 where id=?`
        db.query(SQL, req.body.id, (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('删除文章失败！')
            res.cc('删除文章成功！', 0)
        })
    })
}
//更新文章
exports.updateArticles = (req, res) => {
    const sql = `select * from ev_articles  where id=? and is_delete=0`
    db.query(sql, req.body.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length === 0) return res.cc('没有该条数据,请重新选择！')
        const SQL = `update ev_articles set ? where id=?`
        // 执行更新文章分类的 SQL 语句
        db.query(SQL, [req.body, req.body.id], (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('更新文章内容失败！')
            res.cc('更新文章内容成功！', 0)
        })
    })

}