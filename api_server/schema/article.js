const joi = require('joi')

const name = joi.string().required()
const alias = joi.string().alphanum().required()
const id = joi.number().integer().min(1).required()

exports.add_cate_schema = {
    body: {
        name,
        alias
    }
}
exports.delete_cate_schema = {
    params: {
        id
    }
}
exports.get_cate_schema = {
    params: {
        id
    }
}

// 验证规则对象 - 更新分类
exports.update_cate_schema = {
    body: {
        Id: id,
        name,
        alias,
    },
}
// 分别定义 标题、分类Id、内容、发布状态的校验规则
const title = joi.string().required()
const cate_id = joi.number().integer().min(1).required()
const content = joi.string().required().allow('')
const state = joi.string().valid('已发布', '草稿').required()
const cover_img = joi.string()
const pagenum = joi.number().integer().min(1).required()
const pagesize = joi.number().integer().min(1).required()
// 验证规则对象 - 发布文章
exports.add_article_schema = {
    body: {
        title,
        cate_id,
        content,
        state,
        cover_img
    },
}

exports.get_article_schema = {
    body: {
        pagenum,
        pagesize
    }
}
exports.delete_article_schema = {
    body: {
        id
    }
}
exports.update_article_schema = {
    body: {
        id,
        content,
    }
}