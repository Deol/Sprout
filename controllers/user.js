"use strict"

const config = require('../config');
const validator = require('validator');
const _ = require('lodash');
const utils = require('../common/utils');
const User = require('../proxy').User;
const response_code = require('../common/response_code').response_code;

exports.login = (req, res, next) => {

    let result = {};

    let opts = {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        signed: true,
        httpOnly: true
    };

    if (!req.body.passwd) {
        return res.send({code: 112, msg: response_code['112']});
    }

    let phone = validator.trim(req.body.phone);
    let passwd = validator.trim(req.body.passwd);
    passwd = utils.md5(passwd);

    if (!validator.isMobilePhone(phone, 'zh-CN')) {
        return res.send({code: 102, msg: response_code['102']});
    }

    User.get_user({phone: phone}, (err, data) => {

        if (!data) {
            return res.send({code: 103, msg: response_code['103']});
        } else {

            if (data.passwd !== passwd) {
                return res.send({code: 104, msg: response_code['104']});
            }

            // 将管理员 id 存进 session 和 cookie
            req.session.user = {user_id: data._id};
            res.cookie(config.auth_cookie_name, data._id, opts);

            result = {
                user_id: data._id,
                avrtar: data.avatar,
                phone: data.phone,
                nick_name: data.nick_name,
                school: data.school,
                sex: data.sex,
                purpose: data.purpose
            };

            return res.send({code: 1, msg: response_code['1'], data: result});
        }
    });
};

exports.logout = (req, res, next) => {

    req.session.destroy();
    res.clearCookie(config.auth_cookie_name);

    if (!req.session) {
        return res.send({code: 1, msg: response_code['1']});
    }
};

exports.register = (req, res, next) => {
    let new_user = {
        phone: req.body.phone,
        nick_name: req.body.nick_name,
        passwd: utils.md5(req.body.passwd),
    }

    if (!validator.isMobilePhone(new_user.phone, 'zh-CN')) {
        return res.send({code: 102, msg: response_code['102']});
    }

    let not_complete = _.keys(new_user).some((item) => {
        return !new_user[item];
    });

    if (not_complete) {
        return res.send({code: 113, msg: response_code['113']});
    }

    User.add_user(new_user)
        .then((data) => {
            let result = {
                phone: data.phone,
                nick_name: data.nick_name
            }
            res.send({code: 1, msg: response_code['1'], data: result});
        })
        .catch((e) => {
            res.send({code: 101, msg: response_code['101']});
        });
}

exports.update_user = (req, res, next) => {

    let id = validator.trim(req.params.id);

    let options = req.body;

    if (!id) {
        return res.send({code: 113, msg: response_code['113']});
    }

    let not_complete = _.keys(options).some((item) => {
        return !options[item];
    });

    if (not_complete) {
        return res.send({code: 113, msg: response_code['113']});
    }
    console.log(not_complete);

    if (req.body.passwd) {
        options.passwd = utils.md5(req.body.passwd);
    }

    return User.update_user({_id: id}, options)
        .then((data) => {
            res.send({code: 1, msg: response_code['1'], data: data});
        })
        .catch((e) => {
            res.send({code: 13, msg: response_code['13'], err: e});
        })
}