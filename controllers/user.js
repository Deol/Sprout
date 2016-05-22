"use strict"

const config = require('../config');
const validator = require('validator');
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
				avartar: data.avartar,
				phone: data.phone,
				real_name: data.real_name,
				school: data.school,
				sex: data.sex,
				signature: data.signature
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