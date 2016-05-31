/**
 * 技能树模块
 */
'use strict';

const proxy = require('../proxy/');
const Skill = proxy.Skill;
const _ = require('lodash');
const validator = require('validator');
const response_code = require('../common/response_code').response_code;

/**
 * 获取技能树信息
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.get_skill = (req, res, next) => {

    let query = req.query.belong_tag ? {belong_tag: new RegExp(req.query.belong_tag)} : {};
    let feilds = {__v: 0};
    let options = {
        sort: {
            initial_time: -1
        }
    };

    return Skill.get_skill(query, feilds, options)
        .then((data) => {
            for(let i of data) {
                i._doc.initial_time = i.initial_time;
            }
            res.send({code: 1, msg: response_code['1'], data: data});
        })
        .catch((e) => {
            res.send({code: 13, msg: response_code['13'], err: e});
        });
}

/**
 * 增加技能树
 * @param  {[type]}   req   [description]
 * @param  {[type]}   res   [description]
 * @param  {Function} next  [description]
 * @return {[type]}         [description]
 */
exports.add_skill = (req, res, next) => {

    let skill_info = {
        title: req.body.title,
        intro: req.body.intro,
        book: req.body.book,
        expand: req.body.expand,
        belong_tag: req.body.belong_tag,
        initial_time: new Date()
    }

    console.log(skill_info);

    let not_complete = _.keys(skill_info).some((item) => {
        return !skill_info[item];
    });

    // 参数不完整
    if (not_complete) {
        return res.send({code: 113, msg: response_code['113']});
    }

    return Skill.add_skill(skill_info)
        .then((data) => {
            res.send({code: 1, msg: response_code['1'], data: data});
        })
        .catch((e) => {
            res.send({code: 116, msg: response_code['116']});
        })
}

/**
 * 修改技能树资料
 * @param  {[type]}     req  [description]
 * @param  {[type]}     res  [description]
 * @param  {Function} next   [description]
 * @return {[type]}          [description]
 */
exports.update_skill = (req, res, next) => {

    let id = validator.trim(req.params.id);

    let options = {
        title: req.body.title,
        intro: req.body.intro,
        book: req.body.book,
        expand: req.body.expand,
        belong_tag: req.body.belong_tag
    }

    let not_complete = _.keys(options).some((item) => {
        return !options[item];
    });

    // 参数不完整
    if (not_complete || !id) {
        return res.send({code: 113, msg: response_code['113']});
    }

    return Skill.update_skill({_id: id}, options)
        .then((data) => {
            res.send({code: 1, msg: response_code['1'], data: data});
        })
        .catch((e) => {
            res.send({code: 13, msg: response_code['13'], err: e});
        })
}